'use client'

import ClubCard from "@/components/PostCard";
import Image from "next/image";
import {ImageIcon, Video} from 'lucide-react'
import profile from "../../../../public/images/mradouan7.jpg"
import PostCard from "@/components/PostCard";

export default function HomePage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6">
            <section className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-col gap-6 bg-white rounded-xl border border-[#E5E7EB] p-4">

                    <div className="flex items-center gap-3">
                        <Image
                        src={profile}
                        alt="User profile"
                        className="rounded-full h-12 w-12 shrink-0 object-cover"
                        />

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

                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />

            </section>

            <aside className="hidden lg:block">
                right sidbar
            </aside>

        </div>
    );
}    


     