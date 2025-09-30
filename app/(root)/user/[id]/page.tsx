import UserStartups from "@/app/ui/user/UserStartups"
import { auth } from "@/auth"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const experimental_ppr = true

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const session = await auth()

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })
  if (!user) return notFound()

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-slate-900 uppercase text-center line-clamp-1 font-extrabold text-xl">
              {user.name}
            </h3>
          </div>
          <Image src={user?.image} alt={user?.name} width={220} height={220} className="profile_image" />

          <p className="text-2xl text-white font-extrabold mt-7 text-center">@{user?.name}</p>
          <p className="mt-1 text-center text-lg text-white">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-2xl font-extrabold">
            {session?.id === id ? "Your" : "All"} Startup
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<p>Loading...</p>}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  )
}

export default page