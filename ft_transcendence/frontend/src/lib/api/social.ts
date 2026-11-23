import { PostMedia, PostsResponse } from "@/types/post";

const SOCIAL_API_URL =
    process.env.NEXT_PUBLIC_SOCIAL_API_URL;

export async function getPosts(token: string,  cursor?: number | null): Promise<PostsResponse>
{
    const url = cursor !== undefined
                           ? `${SOCIAL_API_URL}/api/post?cursor=${cursor}`
                           : `${SOCIAL_API_URL}/api/post`
                            
    console.log(url)
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
export async function postPostMedia(token: string, media:File, content: string): Promise<PostsResponse>
{
    const url =`${SOCIAL_API_URL}/api/club/post`
    
    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", media);

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
        
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();

    
    return (data)
}

