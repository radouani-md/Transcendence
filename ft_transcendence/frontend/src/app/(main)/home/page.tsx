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
import { getPosts } from "@/lib/api/social";
import { Post, PostsResponse } from "@/types/post";




export default function HomePage() {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJDTFVCIiwiaWF0IjoxNzk1MjcyOTQ3LCJleHAiOjE3OTUzNTkzNDd9.lNpby-fapIBO92_0Osu4WxsM_LPiYKP43QNxBKPpZ8o";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJGQU4iLCJpYXQiOjE3OTUyNzk5NzIsImV4cCI6MTc5NTM2NjM3Mn0.rlnhCP5YvXkdpRxmM4R_xvOQGKzFV4EqO0yx7dGvWME";
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);


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






    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6">
            <section className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-col gap-6 bg-white rounded-xl border border-[#E5E7EB] p-4">

                    <div className="flex items-center gap-3">
                        <ProfilePicture path="" size="size-12" />
                        <input
                            type="text"
                            placeholder="What's on your mind about today's matches?"
                            className="flex-1 min-w-0 px-4 py-3 bg-[#F3F4F6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                        />
                    </div>

                    <div className="border-t border-[#E5E7EB]" />

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-2 sm:px-3 py-2 font-medium rounded-lg bg-[#F3F4F6] text-[#0055FF] cursor-pointer hover:bg-[#d0d9eb] transition-colors duration-200"
                            >
                                <ImageIcon className="w-5 h-5 text-[#0055FF]" />
                                <span>Photo</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center gap-2 bg-[#F3F4F6] text-[#FF4D00] px-2 sm:px-3 py-2 rounded-lg cursor-pointer hover:bg-[#d0d9eb] transition-colors duration-200"
                            >
                                <Video className="w-5 h-5 text-[#FF4D00]" />
                                Video
                            </button>
                        </div>

                        <button
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


