const SOCIAL_API_URL =
    process.env.NEXT_PUBLIC_SOCIAL_API_URL;

export async function postComment(token: string,  postId: number, content:string)
{
    const url = `/api/post/${postId}/comment`;
    console.log(url)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: content })
    });

    if (!response.ok) {
        throw new Error("Failed to post comment");
    }
    const data = await response.json();

    
    return (data)
}

export async function getComments(token: string, postId: number, cursor?: number)
{
    let url = `/api/post/${postId}/comment`;
                            
    console.log(url)
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });

    if (!response.ok) {
        throw new Error("Failed to get posts");
    }
    const data = await response.json();

    
    return (data)
}