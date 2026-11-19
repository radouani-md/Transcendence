import ProductCard from "@/components/ProductCard";
import { CloudUpload, Plus } from "lucide-react";




export default function Marcketplace() {
    return (
        <div className="flex flex-col gap-6 p-4 lg:p-6">
            <section className=" bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col gap-4 justify-between w-full">
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#EFF6FF] p-4 rounded-xl shrink-0">
                            <CloudUpload className="w-5 h-5 text-[#0055FF]" />
                        </div>

                        <div className="flex flex-col gap-1 min-w-0">
                            <h2 className="text-lg font-bold">
                                Sell a Product
                            </h2>

                            <p className="text-sm text-[#6B7280] ">
                                List your football items for the community.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 bg-[#0055FF] text-white px-2 sm:px-3 h-10 rounded-lg font-medium text-sm lg:text-base cursor-pointer hover:bg-[#0044CC] transition-colors duration-200 shrink-0"
                    >
                        <span className="">Upload Product</span>
                    </button>

                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-[#111111]"
                    >
                        Product Name
                    </label>

                    <input
                        id="product-name"
                        type="text"
                        placeholder="Enter product name..."
                        className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#FF4D00]  text-white px-5 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#E64500] transition-colors duration-200"
                    >
                        Submit
                    </button>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />

            </section>

        </div>
    )
}
/*new branch*/
