'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import profile from "../../public/images/mradouan7.jpg";
import lamin from "../../public/images/imgae1.jpg";
import lamin1 from "../../public/images/imgae2.jpg";
import { ImageIcon, Video, MessageCircle, Heart, SendHorizontal } from 'lucide-react'
import { ProfilePicture } from "./ProfilePicture";
import { ClubPost, CommentP, CommentsResponse, Post } from "@/types/post";
import { likePost, unlikePost } from "@/lib/api/reaction";
import { MdClear } from "react-icons/md";
import CommentCard from "./CommentCard";
import { getComments, postComment } from "@/lib/api/comment";

type ClubCardProps = {
    name: string;
    description: string;
}

type PostCardProps = {
    post: Post;
};

export default function PostCard({ post }: PostCardProps) {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJDTFVCIiwiaWF0IjoxNzk1MzM1NjIzLCJleHAiOjE3OTU0MjIwMjN9.OdW1TPIM0V4LiPDC06sWQP91uJBhZZuKE18HXW5jmrI"; //club
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJGQU4iLCJpYXQiOjE3OTUzMzU0NzMsImV4cCI6MTc5NTQyMTg3M30.qVnPYZV4MrYj2RLzZrPjLZH05b9AbwAh5bMTdWEhwlA"; //fan
    const [comments, setComments] = useState<CommentP[]>([]);
    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [hasMoreComments, setHasMoreComments] = useState(true);
    const [text, setText] = useState('');
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);

    const [isLiked, setLike] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post._count.reactions);
    const [isCommented, setComment] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post._count.comments);
    const dialogRef = useRef<HTMLDialogElement | null>(null);




    useEffect(() => {
        if (!token) return;

        async function fetchComments() {

            try {
                const data: CommentsResponse = await getComments(token, post.id);
                setComments(data.comments);

                // setPosts((prev) => { console.log(prev); return prev })

            }
            catch (error) {
                console.error("Failed to fetch comments:", error);
            }
            finally {
                loadingRef.current = false;
            }
        }

        fetchComments();
    }, [token]);


    async function increaseDecreaseLikes() {

        try {
            if (!isLiked) {
                await likePost(token, post.id);
                setLikesCount((prev) => prev + 1);
            }
            else {
                await unlikePost(token, post.id);
                setLikesCount((prev) => prev - 1)
            }
            setLike((prev) => !prev);

        }
        catch (error) {
            console.log("Failed to update reaction:", error);
        }

    }

    async function postCommentHandler() {

        if (!token || !text.trim()) return;
        try {
            await postComment(token, post.id, text);
            setText('');
            const data = await getComments(token, post.id);
            setComments(data.comments);
            setCommentsCount((prev) => prev + 1);
        }
        catch (error) {
            console.log("Failed to post comment:", error);
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
                        className={`flex items-center gap-2 px-2 sm:px-3 py-2 font-medium  hover:text-[#FF4D00] ${isLiked ? "text-[#FF4D00]" : "text-[#6B7280]"} rounded-lg cursor-pointer transition-colors duration-200`}
                    >
                        <Heart fill={`${isLiked ? "#FF4D00" : "transparent"}`} className="w-5 h-5 " />
                        <span>{likesCount}</span>
                    </button>

                    <button
                        onClick={() => dialogRef.current?.showModal()}
                        className={`flex items-center gap-2 px-2 sm:px-3 py-2 hover:text-[#0055FF] ${isCommented ? "text-[#0055FF]" : "text-[#6B7280]"} rounded-lg cursor-pointer transition-colors duration-200`}
                    >
                        <MessageCircle fill={`${isCommented ? "#0055FF" : "transparent"}`} className="w-5 h-5 " />
                        {commentsCount}
                    </button>
                    <dialog
                        ref={dialogRef}
                        className="current-settings-dialoge m-auto w-4xl  rounded-2xl max-w-4xl h-[80vh] max-h-187.5"
                    >
                        <div className="flex flex-col h-full p-2 relative">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB] shrink-0">
                                <MessageCircle className="size-6" />
                                <h2 className="font-bold text-[16px]"> Comments({commentsCount}) </h2>
                                <button
                                    onClick={() => dialogRef.current?.close()}
                                    className="cursor-pointer"
                                >
                                    <MdClear className="size-6" />

                                </button>

                            </div>

                            <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-5">
                                {comments.map((comment) => (
                                    <CommentCard key={comment.id} comment={comment} />
                                ))}

                            </div>
                            <div ref={observerRef} />

                            <div className="flex items-center gap-3 p-4 border-t border-[#E5E7EB] shrink-0">
                                <ProfilePicture path="" size="size-12" />
                                <input
                                    type="text"
                                    placeholder="Write a Comment "
                                    value={text}
                                    onChange={(e)=> setText(e.target.value)}
                                    className="flex-1 min-w-0 px-4 py-3 bg-[#F3F4F6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                                />
                                <button
                                onClick={postCommentHandler}
                                    className="cursor-pointer hover:text-[#0055FF]"
                                >
                                    <SendHorizontal className="size-7" />
                                </button>

                            </div>

                        </div>
                    </dialog>

                </div>
            </div>
        </article>
    );
}