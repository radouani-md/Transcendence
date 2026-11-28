import Image from "next/image";

export default function ImageAvatar() {
    return (
        <div className="absolute left-6 top-[172px] w-24 h-24">
            <Image
            src="/images/mradouan7.jpg"
            alt="Profile avatar"
            fill
            className="rounded-full object-cover border-2 border-white cursor-pointer"
            />
        </div>
    );
}