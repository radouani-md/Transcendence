'use client'

import ClubCard from "@/components/PostCard";
import Image from "next/image";
import { AwardIcon, ImageIcon, Video } from 'lucide-react'
import profile from "../../../../public/images/mradouan7.jpg"
import raja from "../../../../public/images/raja.jpg"
import widad from "../../../../public/images/widad.jpg"
import far from "../../../../public/images/far.jpg"

import PostCard from "@/components/PostCard";
import { ProfilePicture } from "@/components/ProfilePicture";
import { useEffect, useRef, useState } from "react";
import { getPosts, postPostMedia } from "@/lib/api/social";
import { Post, PostsResponse } from "@/types/post";
import { toast } from "react-toastify";



export default function HomePage() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJDTFVCIiwiaWF0IjoxNzk1NDIzODk0LCJleHAiOjE3OTU1MTAyOTR9.1NgFWjiknrbr0ocF_bQ0S2-Y8aIWGTh_sr4wk3qBQVw" // club;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJGQU4iLCJpYXQiOjE3OTU0MjQxNjAsImV4cCI6MTc5NTUxMDU2MH0.hvNTjh2LxEBVnWNmls_tJ5A7sEdfyB__BRoMxyiFo1s" //fan;
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);
    const [text, setText] = useState('');
    const [media, setMedia] = useState<File | null>(null);


    async function loadMorePosts() {
        if (
            !token ||
            !hasMorePosts ||
            nextCursor === null ||
            isLoadingMore ||
            loadingRef.current
        ) return;

        loadingRef.current = true;
        setIsLoadingMore(true);
        try {
            const data = await getPosts(token, nextCursor);
            setPosts((prev) => [...prev, ...data.posts]);
            setNextCursor(data.nextCursor);
            setHasMorePosts(data.hasMorePosts);
        }
        catch (error) {
            console.error("Failed to fetch posts:", error);
        }
        finally {
            loadingRef.current = false;
            setIsLoadingMore(false);
        }
    }



    useEffect(() => {
        if (!token) return;
        let cancelled = false;

        async function fetchPosts() {
            loadingRef.current = true;

            try {
                const data: PostsResponse = await getPosts(token);
                if (cancelled) return;
                setPosts(data.posts);
                setNextCursor(data.nextCursor);
                setHasMorePosts(data.hasMorePosts);

                // setPosts((prev) => { console.log(prev); return prev })

            }
            catch (error) {
                console.error("Failed to fetch posts:", error);
            }
            finally {
                loadingRef.current = false;
            }
        }

        fetchPosts();
        return () => {
            cancelled = true;
        };
    }, [token]);

    useEffect(() => {
        const element = observerRef.current;
        if (
            !element ||
            !token ||
            !hasMorePosts ||
            nextCursor === null ||
            isLoadingMore
        ) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMorePosts();
            }
        });
        observer.observe(element);
        function cleanup() {
            observer.disconnect();
        }
        return cleanup;

    }, [nextCursor, hasMorePosts, isLoadingMore, token]);


    async function postPostsHandler() {
        if (!token || !text.trim()) return;
        if (!media) {
            console.log("Please select an image or video");
            return;
        }
        try {

            await postPostMedia(token, media, text);
            setText('');
        }
        catch (error) {
            console.log("Failed to post Post:", error);
        }

    }



    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6">
            <input
                type="file"
                accept="image/*"
                id="photo-upload"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setMedia(file);
                    if (!file?.type.startsWith('image'))
                         toast.error("error uploading must be image");
                        
                }}
            />

            <input
                type="file"
                accept="video/*"
                id="video-upload"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setMedia(file);
                    if (!file?.type.startsWith('video'))
                        toast.error("error uploading must be video");
                }}
            />
            <section className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-col gap-6 bg-white rounded-xl border border-[#E5E7EB] p-4">

                    <div className="flex items-center gap-3">
                        <ProfilePicture path="" size="size-12" />
                        <input
                            type="text"
                            value={text}
                            placeholder="What's on your mind about today's matches?"
                            onChange={(e) => setText(e.target.value)}
                            className="flex-1 min-w-0 px-4 py-3 bg-[#F3F4F6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                        />
                    </div>

                    <div className="border-t border-[#E5E7EB]" />

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => document.getElementById('photo-upload')?.click()}
                                className={`flex items-center gap-2 px-2 sm:px-3 py-2 font-medium ${media?.type.startsWith('image') ? "border bg-[#d0d9eb]":""} rounded-lg bg-[#F3F4F6] text-[#0055FF] cursor-pointer hover:bg-[#d0d9eb] transition-colors duration-200`}
                            >
                                <ImageIcon className="w-5 h-5 text-[#0055FF]" />
                                <span>Photo</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => document.getElementById('video-upload')?.click()}
                                className={`flex items-center gap-2 bg-[#F3F4F6] text-[#FF4D00] px-2 sm:px-3 py-2 ${media?.type.startsWith('video') ? "border bg-[#d0d9eb]":""} rounded-lg cursor-pointer hover:bg-[#d0d9eb] transition-colors duration-200`}
                            >
                                <Video className="w-5 h-5 text-[#FF4D00]" />
                                Video
                            </button>
                        </div>

                        <button
                            onClick={postPostsHandler}
                            type="button"
                            className="bg-[#0055FF] px-3 sm:px-5 py-2 rounded-lg text-white font-medium cursor-pointer hover:bg-[#0044CC] transition-colors duration-200"
                        >
                            Share Post
                        </button>
                    </div>

                </div>


                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}



                <div ref={observerRef} />

            </section>

            <aside className="hidden lg:flex flex-col gap-6 p-4 lg:sticky lg:top-24  max-h-[calc(100vh-6rem)] ">
                <div className="bg-white rounded-xl border border-[#E5E7EB] flex flex-col gap-3 p-4">
                    <div>
                        <h2 className="font-bold text-[15px]"> Trending News </h2>
                    </div>
                    <div>
                        <p className="text-[#3675f4] font-medium text-sm">#ClashOfChampions</p>
                        <p className="text-[11px] text-[#6B7280]">Male Tournament ⚬ 4 posts</p>
                    </div>
                    <div>
                        <p className="text-[#3675f4] font-medium text-sm">#GoldenBootStricker</p>
                        <p className="text-[11px] text-[#6B7280]">Player State ⚬ 54 posts</p>
                    </div>
                    <div>
                        <p className="text-[#3675f4] font-medium text-sm">#UnitedFanZone</p>
                        <p className="text-[11px] text-[#6B7280]">Fan Clubs ⚬ 12 posts</p>
                    </div>

                </div>

                <div className="bg-white rounded-xl border border-[#E5E7EB] flex flex-col gap-3 p-4">
                    <div>
                        <h2 className="font-bold text-[15px]"> Popular Clubs </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Image
                            src={raja}
                            alt="Real Madrid"
                            className="w-10 h-10 rounded-full border border-[#6B7280]  object-contain shrink-0"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                                Raja
                            </p>
                            <p className="text-xs text-[#6B7280]">
                                Football Club
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            src={widad}
                            alt="FC Barcelona"
                            className="w-10 h-10 rounded-full border border-[#6B7280] object-contain shrink-0"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                                Widade
                            </p>
                            <p className="text-xs text-[#6B7280]">
                                Football Club
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            src={far}
                            alt="Manchester City"
                            className="w-10 h-10 rounded-full border border-[#6B7280]  object-contain shrink-0"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                                FAR
                            </p>
                            <p className="text-xs text-[#6B7280]">
                                Football Club
                            </p>
                        </div>
                    </div>

                </div>

            </aside>

        </div>
    );
}


