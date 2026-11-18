import Image from "next/image";
import profile from "../../public/images/mradouan7.jpg"



export function ProfilePicture({ size, path }: { size: string, path: string }) {
    return (
        <Image

            src={profile}
            // width={size}
            // height={size}
            alt="User profile"
            className={`rounded-full ${size} shrink-0  object-cover`}
        />
    )
}