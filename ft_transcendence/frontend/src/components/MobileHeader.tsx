"use client";


import { Bell } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/Logo.png"
import { usePathname } from "next/navigation";





const MobileHeader = () => {

    const pathname = usePathname();
    const isNotification = pathname === "/notification"  


  return (
    <header className="fixed top-0 left-0 w-full h-16">
        <div className="flex items-center justify-between px-4 py-3 bg-white lg:hidden border-b border-[#E5E7EB]">
            <Link href="/" className="flex items-center ">
                <Image
                    src={Logo}
                    alt="FanZone Logo"
                    width={168}
                    height={56}
                    className="w-auto h-auto object-contain"
                    />
            </Link>

            <Link href="/notification" className="relative">
                <Bell className={`h-6 w-6 ${isNotification? "text-[#0055FF]" : "text-[#111111]"}`} />
                {!isNotification && (
                    <span className="absolute -top-0.5 -right-0.5 rounded-full bg-[#FF4D00]  w-3 h-3"></span>
                )}
            </Link>
        </div>

    </header>
    );
}

export default MobileHeader;