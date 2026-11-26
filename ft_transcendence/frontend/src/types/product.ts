

export type Product = {
    id: number;
    sellerId: number;
    title: string;
    price: string;
    imageUrl: string;
    status: "AVAILABLE" | "SOLD" | "HIDDEN";
    createdAt: string;
    updatedAt: string;
};

export type ProductResponse = {
    product: Product[];
    hasMoreProduct: boolean;
    nextCursor: number | null;
};