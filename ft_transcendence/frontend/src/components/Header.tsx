import "../app/globals.css";
import Image from "next/image";
import profile from "../../public/images/mradouan7.jpg"
import { Bell } from 'lucide-react'
import { Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
    
    
    return (
        <header className="bg-[#FFFFFF] w-full h-18 border-b border-[#E5E7EB] ">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
                
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-[#111111]">
                        Global Feed
                    </h1>
                </div>

                <div className="flex-1 max-w-md" >
                    <div className="flex items-center bg-[#F3F4F6] rounded-full px-4 py-2 gap-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <Search className="w-5 h-5 text-[#6B7280] border-none outline-none" />
                        <input 
                            type="text" 
                            placeholder="Search..."
                            className="w-full bg-transparent min-w-0"
                            />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="../app/(main)/marketplace">
                        Marketplace
                    </Link>
                    <p><Bell /></p>
                    <p>profile</p>

                </div>

            </div>
        </header>
    )
}

export default Header;