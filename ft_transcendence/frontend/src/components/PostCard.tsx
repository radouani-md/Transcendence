'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import profile  from "../../public/images/mradouan7.jpg";
import lamin  from "../../public/images/imgae1.jpg";
import lamin1  from "../../public/images/imgae2.jpg";
import {ImageIcon, Video, MessageCircle, Heart} from 'lucide-react'
import { ProfilePicture } from "./ProfilePicture";
import { ClubPost, Post } from "@/types/post";
import { likePost, unlikePost } from "@/lib/api/reaction";

type ClubCardProps = {
    name: string;
    description: string;
}

type PostCardProps = {
  post: Post;
};

export default function PostCard({post}: PostCardProps) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJDTFVCIiwiaWF0IjoxNzk1MjcyOTQ3LCJleHAiOjE3OTUzNTkzNDd9.lNpby-fapIBO92_0Osu4WxsM_LPiYKP43QNxBKPpZ8o";
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJGQU4iLCJpYXQiOjE3OTUyNzk5NzIsImV4cCI6MTc5NTM2NjM3Mn0.rlnhCP5YvXkdpRxmM4R_xvOQGKzFV4EqO0yx7dGvWME";
    const [isLiked, setLike] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post._count.reactions);
    const [isCommented, setComment] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post._count.comments);
    const [isUpdating, setIsUpdating] = useState(false);

    async function postLikeReaction() {
        try{
            const reaction = await likePost(token, post.id);

        }
        catch (error)
        {
            console.error("Failed to like post:", error);
        }
        
    }
    async function postUnlikeReaction() {
        try{
            const reaction = await unlikePost(token, post.id);

        }
        catch (error)
        {
            console.error("Failed to unlike post:", error);
        }
        
    }

    async function increaseDecreaseLikes()
    {
        if (isUpdating) return;
        setIsUpdating(true);

        try
        {
            if (!isLiked)
            {
                setLikesCount((prev) => prev + 1)
                postLikeReaction()
            }
            else
            {
                setLikesCount((prev) => prev - 1)
                postUnlikeReaction()
            }
            setLike((prev) => !prev);

        }
        catch (error)
        {
            console.log("Failed to update reaction:", error);
        }
        finally{
            setIsUpdating(false);
        }
        
    }

    return (
        <article className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <ProfilePicture path="" size="size-12" />
                        <div>
                            <p className="text-sm font-semibold">mohammed radouani</p>  
                            <p className="text-xs text-[#6B7280]">@radouani-md</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>{post.content}</p>
                </div>

                <Image 
                    src={lamin}
                    alt="lamin picture"
                    className="w-full rounded-2xl h-64 sm:h-100 object-cover"
                />

                <div className="border-t border-[#E5E7EB]" />

                <div className="flex items-center gap-2">
                    {/* text-[#FF4D00]  text-[#0055FF]*/}
                    <button 
                        type="button"
                        onClick={increaseDecreaseLikes}
                        className={`flex items-center gap-2 px-2 sm:px-3 py-2 font-medium  hover:text-[#FF4D00] ${post.isLiked? "text-[#FF4D00]" : "text-[#6B7280]"} rounded-lg cursor-pointer transition-colors duration-200`}
                    >
                        <Heart fill={`${isLiked? "#FF4D00" : "transparent"}`} className="w-5 h-5 " />
                        <span>{ likesCount }</span>
                    </button>
                    
                    <button
                        type="button"
                        className={`flex items-center gap-2 px-2 sm:px-3 py-2 hover:text-[#0055FF] ${isCommented? "text-[#0055FF]" : "text-[#6B7280]"} rounded-lg cursor-pointer transition-colors duration-200`}
                        >
                        <MessageCircle fill={`${isCommented? "#0055FF" : "transparent"}`} className="w-5 h-5 " />
                            { commentsCount }
                        </button>

                </div>
            </div>
        </article>
    );
}