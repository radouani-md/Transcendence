import { CommentP } from "@/types/post";
import { ProfilePicture } from "./ProfilePicture";
import { useState } from "react";







type PostCardProps = {
    comment: CommentP;
};

const   CommentCard = ({ comment }: PostCardProps) => {
    

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <ProfilePicture path="" size="size-9" />
                    <div>
                        <p className="text-sm font-semibold">mohammed radouani</p>
                        <p className="text-xs text-[#6B7280]">@radouani-md</p>
                    </div>
                </div>
                <span className="text-xs text-[#9CA3AF] shrink-0">
                    2h ago
                </span>
            </div>

            <p className="flex pl-10 text-sm text-[#374151] mt-1">
                {comment.content}
            </p>

        </div>
    )
}

export default CommentCard;



