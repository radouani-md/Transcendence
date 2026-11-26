import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { JwtAuthGuard } from "../guards/auth.guard.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { JwtModule } from "@nestjs/jwt";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.service.js";


@Module({
    controllers: [ProductController],
    providers: [PrismaService, ProductService, JwtAuthGuard],
    imports: [
        PrismaModule,
        JwtModule.register({})
    ]
})
export class ProductModule {

}