import { ForbiddenException, Injectable, NotFoundException, UnsupportedMediaTypeException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { ProductDto } from "./dtos/product.dto.js";
import { fileTypeFromFile } from 'file-type';
import { unlink } from "node:fs/promises";
import { join } from 'node:path';

import { unlinkSync } from "node:fs";


@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    public async postProduct(productDto: ProductDto, userId: number, file: Express.Multer.File) {
        const allowedMimeTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
        ];

        const { title, price } = productDto;
        try {
            const fileBinary = await fileTypeFromFile(file.path);

            if (!fileBinary || !allowedMimeTypes.includes(fileBinary.mime)) {
                throw new UnsupportedMediaTypeException('Unknown file type');
            }
        }
        catch (error) {
            try {
                await unlink(file.path);
            } catch (deleteError) {
                console.error('Failed to delete file:', deleteError);
            }
            throw error;
        }

        const newProduct = await this.prisma.listing.create({
            data: {
                sellerId: userId,
                title,
                price,
                imageUrl: file.path
            }
        })
        return ({ newProduct });
    }

    public async getAllProduct(cursor: number | undefined, userId: number) {

        const limit = 10;

        const product = await this.prisma.listing.findMany({

            where: {
                ...(cursor !== undefined && {
                    id: { lt: cursor }
                })
            },
            take: limit + 1,

            orderBy: { id: 'desc' },
        })

        // if (!posts.at(0))
        //     throw new NotFoundException('posts Not found');

        const hasMoreProduct: boolean = product.length > limit;

        if (hasMoreProduct)
            product.pop();

        const nextCursor = hasMoreProduct ?
            product[limit - 1].id
            : null
        return ({ product, hasMoreProduct, nextCursor });
    }

    public async deleteProduct(productId: number, userId: number) {

        const product = await this.prisma.listing.findUnique({
            where: { id: productId },
        })

        if (!product)
            throw new NotFoundException("The product deosn't exist");
        if (product?.sellerId !== userId)
            throw new ForbiddenException('You cannot delete product of someone else');

        const deleteProduct = await this.prisma.listing.delete({
            where: {
                id: productId
            }
        })
        // console.log(`${product.media.length}`)
        try {
            const imagePath = join(process.cwd(), `./${product.imageUrl}`)
            unlinkSync(imagePath);

        } catch {
            return ({ message: "The product have already removed from the server" })
        }

        return ({ message: "The product deleted successfully" })
    }


}


