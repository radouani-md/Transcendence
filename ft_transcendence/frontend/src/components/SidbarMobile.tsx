"use client";

import Link from "next/link";
import Image from "next/image";
import profile from "../../public/images/mradouan7.jpg"
import { House, Users, Monitor, UserRound, Store, Ticket, Settings, MessageCircle, MessagesSquare} from "lucide-react";
import { usePathname } from "next/navigation";
import { LiaTvSolid } from "react-icons/lia";
import path from "path";



const SidbarMobile = () =>
{
    const pathname = usePathname();
    const isHome = pathname === '/home';
    const isUsers = pathname === '/users';
    const isMarketplace = pathname === '/marketplace';
    const isTickets = pathname === '/tickets';
    const isProfile = pathname === '/profile';
    const isMatches = pathname === '/matches';
    const isChat = pathname === '/chat';
    


    return (
        <aside >
            <nav className="px-2 py-2 fixed bottom-0 left-0 w-full lg:hidden z-50 border-t border-[#E5E7EB] bg-white">
                <div className="flex items-center justify-around">

                    <Link href="/home" className={`px-4 py-2 text-base flex flex-col items-center  hover:text-[#0055FF] transition-colors duration-200 rounded-full ${isHome? "text-[#0055FF]":"text-[#6B7280]"}`} >
                        <House className="w-7 h-7" />
                        <span> Home </span>

                    </Link>
                    <Link href="/matches" className={`px-4 py-2 text-base flex flex-col items-center  hover:text-[#0055FF] transition-colors duration-200 rounded-full ${isMatches? "text-[#0055FF]":"text-[#6B7280]"}`} >
                        <Monitor className="w-7 h-7" />
                        <span> Matches </span>
                    </Link>
                    <Link href="/marketplace" className={`px-4 py-2 text-base flex flex-col items-center  hover:text-[#0055FF] transition-colors duration-200 rounded-full ${isMarketplace? "text-[#0055FF]":"text-[#6B7280]"}`} >
                        <Store className="w-7 h-7" />
                        <span> Marketplace </span>
                    </Link>
                    <Link href="/chat" className={`px-4 py-2 text-base flex flex-col items-center  hover:text-[#0055FF] transition-colors duration-200 rounded-full ${isChat? "text-[#0055FF]":"text-[#6B7280]"}`} >
                        <MessagesSquare className="w-7 h-7" />
                        <span> Chat </span>
                    </Link>
                    <Link href="/profile" className={`px-4 py-2 text-base flex flex-col items-center  hover:text-[#0055FF] transition-colors duration-200 rounded-full ${isProfile? "text-[#0055FF]":"text-[#6B7280]"}`} >
                        {/* <Image 
                                src={profile}
                                alt="user prifle"
                                className={`rounded-full h-7 w-7 text-base object-cover text-[#6B7280] ${isProfile? "text-[#0055FF]":""}`} 
                            /> */}
                        <UserRound className="w-7 h-7" />
                        <span> Profile </span>
                    </Link>

                </div>

                
            </nav>
        </aside>
    );
}


export default SidbarMobile;