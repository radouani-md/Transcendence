"use client";

import "../app/globals.css";
import Image from "next/image";
import profile from "../../public/images/mradouan7.jpg"
import { Bell } from 'lucide-react'
import { Search } from "lucide-react";
import Link from "next/link";
import { Store } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProfilePicture } from "./ProfilePicture";




const Header = () => {
    const pathname = usePathname();
    const isNotification = pathname === "/notification"

    return (
        <header className="fixed top-0 right-0 left-67 z-30 h-20 bg-white border-b border-[#E5E7EB]">
            <div className="w-full h-full max-w-7xl mx-auto px-4 xl:px-6 flex items-center gap-4 xl:gap-6">

                {/* LEFT: Title */}
                <div className="shrink-0">
                    <h1 className="text-3xl font-bold text-[#111111] whitespace-nowrap">
                        Global Feed
                    </h1>
                </div>

                {/* CENTER: Search */}
                <div className="flex-1 min-w-0 max-w-md">
                    <div className="flex items-center bg-[#F3F4F6] rounded-full px-3 xl:px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#0055FF]">
                        <Search className="w-5 h-5 shrink-0 text-[#6B7280]" />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full min-w-0 bg-transparent focus:outline-none"
                        />
                    </div>
                </div>

                {/* RIGHT: Marketplace, Notification, Profile */}
                <div className="flex items-center gap-3 xl:gap-4 shrink-0 ml-auto">

                    <Link
                        href="/marketplace"
                        className="flex items-center gap-2 shrink-0 whitespace-nowrap bg-[#FFF0E8] text-[#FF4D00] px-3 xl:px-4 py-1.5 text-sm rounded-full hover:text-[#FFF0E8] hover:bg-[#FF4D00] font-medium transition-colors duration-200"
                    >
                        <Store className="w-4 h-4 shrink-0" />
                        <span className="hidden xl:inline">Marketplace</span>
                    </Link>

                    <Link href="/notification" className="relative shrink-0">
                        <Bell
                            className={`h-6 w-6 ${isNotification ? "text-[#0055FF]" : "text-[#111111]"
                                }`}
                        />
                        {!isNotification && (
                            <span className="absolute -top-0.5 -right-0.5 rounded-full bg-[#FF4D00] w-3 h-3" />
                        )}
                    </Link>

                    <Link href="/profile" className="flex items-center gap-3 shrink-0">

                        <ProfilePicture size="size-10" path={`${profile}`} />
                        
                        <div className="hidden xl:flex flex-col min-w-0 max-w-40">
                            <p className="text-sm font-semibold truncate">
                                mohammed radouani
                            </p>
                            <p className="text-xs text-[#6B7280] truncate">
                                @radouani-md
                            </p>
                        </div>
                    </Link>

                </div>
            </div>
        </header>
    )
}

export default Header;