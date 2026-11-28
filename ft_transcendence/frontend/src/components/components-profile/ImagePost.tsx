import Image from "next/image";

type ImagePostProps = {
    src: string;
    alt: string;
    setSelectedPhoto: (src: string) => void;
};


export default function ImagePost({ setSelectedPhoto, src, alt }: ImagePostProps) {
    return (
        <div onClick={() => setSelectedPhoto(src)} className="relative aspect-[3/4] overflow-hidden"> 
            <Image 
                src= {src}
                alt= {alt}
                fill
                className="object-cover hover:opacity-80 transition-opacity duration-300 cursor-pointer"/>
        </div>
    );
}
