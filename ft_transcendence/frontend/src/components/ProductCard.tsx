'use client'

import productImage from "../../public/images/kora3.jpg"
import Image from "next/image";
import { ProfilePicture } from "./ProfilePicture";
import { Product } from "@/types/product";


type ProductCardProps = {
    product: Product;
};

const ProductCard = ({product}: ProductCardProps) => {
    return (

        <article className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
            <Image
                src={`/${product.imageUrl}`}   //1200 × 400
                width={0}
                height={0}
                unoptimized
                alt="Football product"
                className="w-full h-48 object-cover"
            />
            <div className="flex flex-col gap-4 p-4">
                <div className="bg-[#f1f6f5] w-13 text-[#6b7280b7] text-[12px] text-center rounded-full font-medium">
                    <span> NEW </span>
                </div>
                <h3 className="text-sm font-semibold text-[#111111] truncate">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2 min-w-0">
                    {/* <ProfilePicture path="" size="size-8" /> */}

                    <span className="text-xs text-[#6B7280] truncate">
                       By Mohammed Radouani
                    </span>
                </div>
                <div className="flex justify-between">
                    <p className="lg:text-[14px] font-bold text-[#0055FF] mt-1 md:text-[14px] ">
                        {product.price} MAD
                    </p>
                    <button className=" bg-[#FF4D00]  text-white text-sm h-8 w-14 px-2 py-1 rounded-lg font-medium cursor-pointer hover:bg-[#E64500] transition-colors duration-200">
                        Buy
                    </button>
                </div>
            </div>
        </article>

    )
}


export default ProductCard;