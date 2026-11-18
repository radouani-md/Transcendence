"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/Logo.png";
import { House, Users, Store, Ticket, Settings, Monitor, MessagesSquare} from "lucide-react";
import { usePathname } from "next/navigation";
import { LiaTvSolid } from "react-icons/lia";
import path from "path";


const Sidbar = () =>
{
    const pathname = usePathname();
    const isHome = pathname === '/home';
    const isUsers = pathname === '/users';
    const isMarketplace = pathname === '/marketplace';
    const isTickets = pathname === '/tickets';
    const isSettings = pathname === '/settings';
    const isMatches = pathname === '/matches';
    const isChat = pathname === '/chat';
    


    return (
        <aside className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:h-screen w-67 overflow-y-auto border-r border-[#E5E7EB] bg-white z-40">
            <Link href="/" className="flex items-center px-4 py-5 gap-2">
                <Image 
                    src={Logo}
                    alt="FanZone Logo"
                    width={168}
                    height={56}
                    className="w-auto h-auto object-contain"
                 />
            </Link>
            <nav className="mx-5">

                <Link href="/home" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isHome? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <House className="w-5 h-5" />
                    <span> Home </span>
                </Link>

                <Link href="/users" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isUsers? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <Users className="w-5 h-5" />
                    <span> Users </span>
                </Link>

                <Link href="/marketplace" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isMarketplace? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <Store className="w-5 h-5" />
                    <span> Marketplace </span>
                </Link>

                <Link href="/tickets" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isTickets? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <Ticket className="w-5 h-5" />
                    <span> Tickets </span>
                </Link>

                <Link href="/matches" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isMatches? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <Monitor className="w-5 h-5" />
                    <span> Matches </span>
                </Link>

                <Link href="/chat" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isChat? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <MessagesSquare className="w-5 h-5" />
                    <span> Chat </span>
                </Link>

                <Link href="/settings" className={`flex items-center gap-3 px-4 py-2  hover:bg-[#EFF6FF] hover:text-[#0055FF] hover:border-r-4 hover:border-[#0055FF] transition-colors duration-200 rounded-xl ${isSettings? "bg-[#EFF6FF] text-[#0055FF] border-r-4 border-[#0055FF]":""}`} >
                    <Settings className="w-5 h-5" />
                    <span> Settings </span>
                </Link>
                
            </nav>
        </aside>
    );
}


export default Sidbar;