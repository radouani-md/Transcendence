'use client'

import { useState } from "react";
import Image from "next/image";
import profile  from "../../public/images/mradouan7.jpg";
import lamin  from "../../public/images/imgae1.jpg";
import lamin1  from "../../public/images/imgae2.jpg";
import {ImageIcon, Video, MessageCircle, Heart} from 'lucide-react'
import { ProfilePicture } from "./ProfilePicture";

// type ClubCardProps = {
//     name: string;
//     description: string;
// }



export default function PostCard(/*{name, description}: ClubCardProps*/) {
    const [isLiked, setLike] = useState(false);
    const [likesCount, setLikesCount] = useState(234);
    const [isCommented, setComment] = useState(false);
    const [commentsCount, setCommentsCount] = useState(17);


    function increaseDecreaseLikes()
    {
        
        if (!isLiked)
            setLikesCount((prev) => prev + 1)
        else
            setLikesCount((prev) => prev - 1)
        setLike((prev) => !prev);
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
                    <p>Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long,</p>
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
                        className={`flex items-center gap-2 px-2 sm:px-3 py-2 font-medium  hover:text-[#FF4D00] ${isLiked? "text-[#FF4D00]" : "text-[#6B7280]"} rounded-lg cursor-pointer transition-colors duration-200`}
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