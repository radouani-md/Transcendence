"use client";

import "../app/globals.css";
import Image from "next/image";
import profile from "../../public/images/mradouan7.jpg"
import { Bell } from 'lucide-react'
import { Search } from "lucide-react";
import Link from "next/link";
import { Store } from "lucide-react";
import { usePathname } from "next/navigation";




const Header = () => {
    const pathname = usePathname();
    const isNotification = pathname === "/notification"    
    
    return (
        <header className="bg-[#FFFFFF] w-full h-18 border-b border-[#E5E7EB] ">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
                
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-[#111111]">
                        Global Feed
                    </h1>
                </div>

                <div className="hidden md:block flex-1 max-w-md" >
                    <div className="flex items-center bg-[#F3F4F6] rounded-full px-4 py-2 gap-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <Search className="w-5 h-5 text-[#6B7280]" />
                        <input 
                            type="text" 
                            placeholder="Search..."
                            className="w-full bg-transparent min-w-0 focus:outline-none"
                            />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link 
                        href="/marketplace"
                        className="flex items-center gap-2 bg-[#FFF0E8] text-[#FF4D00] px-4 py-1.5 text-sm rounded-full hover:text-[#FFF0E8] hover:bg-[#FF4D00] font-medium transition-colors duration-200 "
                    >
                        <Store className="w-4 h-4" />
                        Marketplace
                    </Link>
                    <Link href="/notification" className="relative">
                        <Bell className={`h-6 w-6 ${isNotification? "text-[#0055FF]" : "text-[#111111]"}`} />
                        {!isNotification && (
                            <span className="absolute -top-0.5 -right-0.5 rounded-full bg-[#FF4D00]  w-3 h-3"></span>
                        )}
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3">
                        <Image 
                            src={profile}
                            alt="user prifle"
                            className="rounded-full h-10 w-10 object-cover text-[#6B7280]" 
                        />
                        <div className="hidden lg:flex flex-col">
                            <p className="text-sm font-semibold">mohammed radouani</p>  
                            <p className="text-xs text-[#6B7280]">@radouani-md</p>
                        </div>
                    </Link>
                </div>

            </div>
        </header>
    )
}

export default Header;