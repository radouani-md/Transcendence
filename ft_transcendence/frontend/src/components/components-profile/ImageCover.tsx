import Image from "next/image";

export default function ImageCover() {
    return (
        <div className="relative h-[220px] w-full">
            <Image
            src="/images/cover.png"
            alt="Profile cover"
            fill
            className="rounded-t-2xl object-cover hover:opacity-80 transition-opacity cursor-pointer"
            />
        </div>
    );
}