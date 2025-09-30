import { formatDate } from "@/lib/utils"
import { Author, Startup } from "@/sanity/types"
import Image from "next/image"
import Link from "next/link"
import { IoEyeSharp } from "react-icons/io5"

export type StartupTypeCard = Omit<Startup, "author"> & {author: Author}

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const {_createdAt, views, author, title,category , description, image, _id} = post

    return (
        <li className=" flex flex-col gap-4 p-6 border border-border rounded-xl hover:shadow-lg hover:border-pink-600 hover:bg-pink-100 duration-200 ">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <IoEyeSharp className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?.id}`}>
                        <p className="text-16-medium line-clamp-1">
                            {author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/startup/${_id}`}>
                    <Image src={author?.image!} alt={author?.name!} width={48} height={48} className="rounded-full"/>
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card_description mb-5 line-clamp-2">
                    {description}
                </p>
                <img src={image} alt="cardImage"  className="startup-card_image w-[100%] h-[200px] object-cover rounded-xl" />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <button className="bg-black text-white px-3 py-1 rounded-2xl font-semibold" >
                    <Link href={`/startup/${_id}`}>Details</Link>
                </button>
            </div>
        </li>
    )
}

export default StartupCard