import { ProductResponse } from "@/types/product";
import { toast } from "react-toastify";

const SOCIAL_API_URL =
    process.env.NEXT_PUBLIC_SOCIAL_API_URL;
    // const SOCIAL_API_URL = "http://localhost:3002";

export async function getProduct(token: string, cursor?: number | null): Promise<ProductResponse> {
    const url = cursor !== undefined
        ? `${SOCIAL_API_URL}/api/product?cursor=${cursor}`
        : `/api/product`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();


    return (data)
}
export async function postProduct(token: string, media: File, content: string, price: number): Promise<ProductResponse> {
    const url = `/api/product`

    const formData = new FormData();
    formData.append("title", content);
    formData.append("price", String(price));
    formData.append("file", media);

    console.log(media);
    console.log(content);
    console.log(String(price));
    console.log(url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json"
        },
        body: formData

    });

    if (!response.ok) {
        const data = await response.json();
        toast.error(data.message[0]);
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    return (data)
}

export async function deleteProduct(token: string, productId: number) {
    const url = `/api/product/${productId}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to unlike product: ${response.status}`);
    }
    const data = await response.json();


    return (data);
}