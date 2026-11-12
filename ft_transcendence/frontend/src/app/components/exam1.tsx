'use client'

import { useState } from "react";





export default function liked(){

    const [content, setContent] = useState("");

    return(
        <>
            <input 
                type="text"
                placeholder="type your comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <p> Your comment is : {content} </p>
        </>
    )

}