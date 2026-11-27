import Image from "next/image";


type ImagePostProps = {
    src: string;
    alt: string;
};


export default function ImagePost({ src, alt }: ImagePostProps) {
    return (
        <div className="relative aspect-[3/4] overflow-hidden"> 
            <Image 
                src= {src}
                alt= {alt}
                fill
                className="object-cover"/>
        </div>
    );
}
