'use client'

import { useState } from "react";

type ClubCardProps = {
    name: string;
    description: string;
}



export default function ClubCard({name, description}: ClubCardProps) {
    const [isLiked, setLike] = useState(false);
    const [likesCount, setLikesCount] = useState(10);


    function increaseDecreaseLikes()
    {
        
        if (!isLiked)
            setLikesCount((prev) => prev + 1)
        else
            setLikesCount((prev) => prev - 1)
        setLike((prev) => !prev);
    }
    return (
        <div>
            <h2 className="text-red-400">{name}</h2>
            <p>{description}</p>
            <button onClick={ increaseDecreaseLikes } >{ isLiked ? "Liked ❤️" : "Like 🤍"}</button> 
            <p>numbers of likes is : {likesCount} </p>
        </div>
    );
}