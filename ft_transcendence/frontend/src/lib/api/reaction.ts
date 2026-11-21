const SOCIAL_API_URL =
    process.env.NEXT_PUBLIC_SOCIAL_API_URL;

export async function likePost(token: string,  postId: number)
{
    const url = `${SOCIAL_API_URL}/api/post/${postId}/like`;
                            
    console.log(url)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to like posts");
    }
    const data = await response.json();

    
    return (data)
}

export async function unlikePost(token: string,  postId: number)
{
    const url = `${SOCIAL_API_URL}/api/post/${postId}/like`;
                            
    console.log(url)
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.text();

        console.error("Backend response:", error);

        throw new Error(
            `Failed to unlike post: ${response.status}`
        );
    }
    const data = await response.json();

    
    return (data)
}

