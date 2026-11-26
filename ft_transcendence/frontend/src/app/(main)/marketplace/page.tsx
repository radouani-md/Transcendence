'use client'

import ProductCard from "@/components/ProductCard";
import { getProduct, postProduct } from "@/lib/api/marketplace";
import { ProductResponse } from "@/types/product";
import { Product } from "@/types/product";
import { CloudUpload, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";




export default function Marcketplace() {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJDTFVCIiwiaWF0IjoxNzk1NzA4OTU2LCJleHAiOjE3OTU3OTUzNTZ9.o6Givryyc73HApTVphk2iIP6SOVWl0F9JmrsV-t1ZWk" // club;
    const [media, setMedia] = useState<File | null>(null);
    const [products, setProduct] = useState<Product[]>([]);
    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [titleTxt, setTitleTxt] = useState('')
    const [price, setPrice] = useState('')
    const loadingRef = useRef(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    let activeTab: string = "all";


    async function loadMorePosts() {
        if (
            !token ||
            !hasMorePosts ||
            nextCursor === null ||
            isLoadingMore ||
            loadingRef.current
        ) return;

        loadingRef.current = true;
        setIsLoadingMore(true);
        try {
            const data = await getProduct(token, nextCursor);
            setProduct((prev) => [...prev, ...data.product]);
            setNextCursor(data.nextCursor);
            setHasMorePosts(data.hasMoreProduct);
        }
        catch (error) {
            console.error("Failed to fetch products:", error);
        }
        finally {
            loadingRef.current = false;
            setIsLoadingMore(false);
        }
    }



    useEffect(() => {
        if (!token) return;
        let cancelled = false;

        async function fetchProducts() {
            loadingRef.current = true;

            try {
                const data: ProductResponse = await getProduct(token);
                if (cancelled) return;
                setProduct(data.product);
                setNextCursor(data.nextCursor);
                setHasMorePosts(data.hasMoreProduct);

                // setPosts((prev) => { console.log(prev); return prev })

            }
            catch (error) {
                toast.error("Failed to fetch product");
            }
            finally {
                loadingRef.current = false;
            }
        }

        fetchProducts();
        return () => {
            cancelled = true;
        };
    }, [token]);

    useEffect(() => {
        const element = observerRef.current;
        if (
            !element ||
            !token ||
            !hasMorePosts ||
            nextCursor === null ||
            isLoadingMore
        ) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMorePosts();
            }
        });
        observer.observe(element);
        function cleanup() {
            observer.disconnect();
        }
        return cleanup;

    }, [nextCursor, hasMorePosts, isLoadingMore, token]);


    async function postProductHandler() {
        if (!token) return;
        if (!media || price === "" || price.length > 7 || !titleTxt.trim()) {
            // console.log(`${media}, ${price}, ${titleTxt}`)
            if (price.length > 7)
                toast.error("Price too large");
            toast.error("Please try to fill fields");
            return;
        }
        try {

            await postProduct(token, media, titleTxt, Number(price));
            setTitleTxt('');
            setPrice('');
            toast.success('The post added successfully');
        }
        catch (error) {
            console.log("Failed to post Product");
        }

    }

    return (
        <div className="flex flex-col gap-6 p-4 lg:p-6">
            <input
                type="file"
                accept="image/*"
                id="photo-upload"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file?.size > 50 * 1024 * 1024)
                        toast.error("error size too large");
                    else if (file) setMedia(file);

                    if (!file?.type.startsWith('image'))
                        toast.error("error uploading must be video");
                }}
            />

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
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className={`flex items-center justify-center gap-2 bg-[#0055FF] ${media?.type.startsWith('image') ? "border-2 bg-[#eaedf2] border-amber-50" : "border-2 bg-[#000000] border-amber-50"} text-white px-2 sm:px-3 h-10 rounded-lg font-medium text-sm lg:text-base cursor-pointer hover:bg-[#0044CC] transition-colors duration-200 shrink-0`}
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
                        value={titleTxt}
                        type="text"
                        onChange={(e) => setTitleTxt(e.target.value)}
                        placeholder="Enter product name..."
                        className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-[#111111]"
                    >
                        Product Price (MAD)
                    </label>

                    <input
                        id="product-name"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter product price..."
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}

                        className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={postProductHandler}
                        className="bg-[#FF4D00]  text-white px-5 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#E64500] transition-colors duration-200"
                    >
                        Submit
                    </button>
                </div>
            </section>

            <div className=" gap-2 mb-6 bg-white p-2 rounded-xl w-[20%] border border-[#E5E7EB]">
                <button
                    // onClick={() => setActiveTab("all")}
                    className={`w-[30%] p-1 rounded-lg ${activeTab === "all"
                            ? "bg-[#0055FF] text-white"
                            : "bg-[#F3F4F6] text-[#111111]"
                        }`}
                >
                    All Products
                </button>

                <button
                    // onClick={() => setActiveTab("mine")}
                    className={`w-[30%] p-1 rounded-lg ${activeTab === "mine"
                            ? "bg-[#0055FF] text-white"
                            : "bg-[#F3F4F6] text-[#111111]"
                        }`}
                >
                    My Products
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">

                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

            </section>

        </div>
    )
}
/*new branch*/
