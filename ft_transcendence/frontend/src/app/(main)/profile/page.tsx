
"use client";
import Image from "next/image";
import { Share2, Grid3X3, Bookmark ,Heart, MessageCircle, Bell} from "lucide-react";
import { useState } from "react";
import ImagePost from "@/components/components-profile/ImagePost";
import ImageAvatar from "@/components/components-profile/ImageAvatar";
import ImageCover from "@/components/components-profile/ImageCover";
import InfoUser from "@/components/components-profile/InfoUser";

export default function ProfilePage() {

  const [activeTab, setActiveTab] = useState("posts");
  const [userTab, setuserTab] = useState(true);
  
  const photos = [
    { id:1, src: "/images/posts1.png", alt: "Football photo 1"},
    { id:2, src: "/images/posts2.png", alt: "Football photo 2"},
    { id:3, src: "/images/posts3.png", alt: "Football photo 3"},
    { id:4, src: "/images/posts4.png", alt: "Football photo 4"},
    { id:5, src: "/images/posts5.png", alt: "Football photo 5"},
    { id:6, src: "/images/posts6.png", alt: "Football photo 6"},
    { id:7, src: "/images/posts1.png", alt: "Football photo 1"},
    { id:8, src: "/images/posts2.png", alt: "Football photo 2"},
    { id:9, src: "/images/posts3.png", alt: "Football photo 3"},
    { id:10, src: "/images/posts4.png", alt: "Football photo 4"},
  ];

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#ebebeb] p-4">
      <div className="relative rounded-2xl bg-white">

        {/* Cover image */}
        < ImageCover />

        {/* Avatar image*/}
        < ImageAvatar />

        {/* Space below avatar */}
        <div className="h-12" />

        {/* Profile information and buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">

          {/* User information */}
          < InfoUser />

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
              onClick={() => setActiveTab("saved posts")}
              className={`text-[#6B7280] pb-3 flex items-center gap-3 ${
                activeTab === "saved posts" ? "font-semibold text-[#0055FF] border-b-[3px] border-[#0055FF] pb-3" : "text-[#6B7280] pb-3" }`}
            >
              <Bookmark className="w-4 h-4"/>
              Saved Posts
            </button>
          </div>

          <div className="border-t border-[#E5E7EB]"/>
            {/* saved posts */}
            {activeTab === "saved posts" && (
              <p className="text-center pt-20 pb-110 text-[#6B7280]">
                <Bookmark className="w-5 h-5"/>
                No saved posts yet.
              </p>
            )}

            {/* posts image */}
            {activeTab === "posts" && (
              <div className="mt-4 grid grid-cols-3 lg:grid-cols-4 gap-0.5">
                {photos.map((photo) => (
                  <ImagePost key={photo.id} setSelectedPhoto={setSelectedPhoto} src={photo.src} alt={photo.alt} />
                ))}
              </div>
            )}
            
            {/* {selectedPhoto && (
              <div>
                <Image 
                src= {selectedPhoto}
                alt= "Selected photo"
                fill
                className="object-cover"/>
              </div>
            )} */}
          

        </div>

        <div className="h-12" />

      </div>
    </main>
  );
}
