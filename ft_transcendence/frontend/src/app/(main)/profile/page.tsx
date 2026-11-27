
"use client";
import Image from "next/image";
import { Share2, Grid3X3, Bookmark ,Heart, MessageCircle, Bell} from "lucide-react";
import { useState } from "react";
import ImagePost from "@/components/ImagePost";


export default function ProfilePage() {

  const [activeTab, setActiveTab] = useState("posts");
  const [userTab, setuserTab] = useState(true);
  
  const photos = [
    { src: "/images/posts1.png", alt: "Football photo 1"},
    { src: "/images/posts2.png", alt: "Football photo 2"},
    { src: "/images/posts3.png", alt: "Football photo 3"},
    { src: "/images/posts4.png", alt: "Football photo 4"},
    { src: "/images/posts5.png", alt: "Football photo 5"},
    { src: "/images/posts6.png", alt: "Football photo 6"},
    { src: "/images/posts1.png", alt: "Football photo 1"},
    { src: "/images/posts2.png", alt: "Football photo 2"},
    { src: "/images/posts3.png", alt: "Football photo 3"},
    { src: "/images/posts4.png", alt: "Football photo 4"},
  ];

  return (
    <main className="min-h-screen bg-[#ebebeb] p-4">
      <div className="relative rounded-2xl bg-white">

        {/* Cover image */}
        <div className="relative h-[220px] w-full">
          <Image
            src="/images/cover.png"
            alt="Profile cover"
            fill
            className="rounded-t-2xl object-cover"
          />
        </div>

        {/* Avatar */}
        <div className="absolute left-6 top-[172px] w-24 h-24">
          <Image
            src="/images/mradouan7.jpg"
            alt="Profile avatar"
            fill
            className="rounded-full object-cover border-2 border-white"
          />
        </div>

        {/* Space below avatar */}
        <div className="h-12" />

        {/* Profile information and buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">

          {/* User information */}
          <div className=" h-full w-[350px]">
            <h1 className="text-2xl font-bold">YoussefLagzouli</h1>

            <p className="text-xl font-medium text-[#6B7280]">@ylagzoul</p>

            <p className="mt-2">Football fan who loves watching matches. ljkgs ag ...</p>
          </div>

          {/* Profile actions */}
          <div className="ml-auto self-end md:self-start flex items-center gap-2 font-medium">

            <button
              type="button"
              className="rounded-lg bg-[#0055FF] px-4 py-2 text-white"
            >
              {userTab === true ? "Edit Profile" : "Follow"}
              
            </button>

            {/* Share */}
            <button
              type="button"
              className="rounded-lg bg-[#F3F4F6] px-4 py-2 flex items-center gap-2"
            >
              < Share2 className="w-5 h-5"/>
              Share
            </button>
          </div>
        </div>

        <div className="h-12" />

        {/* Posts section */}
        <div className="border-t border-[#E5E7EB] p-6">
          
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("posts")}
              className={`  flex items-center gap-3 ${
                activeTab === "posts" ? "font-semibold text-[#0055FF] border-b-[3px] border-[#0055FF] pb-3" : "text-[#6B7280] pb-3" }`}
            >
              <Grid3X3 className="w-4 h-4"/>
              Posts
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab("Saved")}
              className={`text-[#6B7280] pb-3 flex items-center gap-3 ${
                activeTab === "Saved" ? "font-semibold text-[#0055FF] border-b-[3px] border-[#0055FF] pb-3" : "text-[#6B7280] pb-3" }`}
            >
              <Bookmark className="w-4 h-4"/>
              Saved Posts
            </button>
          </div>

          <div className="border-t border-[#E5E7EB] p-6"/>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5">

            {photos.map((photo) => (
              <ImagePost src={photo.src} alt={photo.alt} />
            ))}

          </div>

          
        </div>

        <div className="h-12" />

      </div>
    </main>
  );
}
