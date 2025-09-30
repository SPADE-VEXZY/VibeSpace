import StartupForm from "@/app/ui/create/StartupForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const page = async () => {
    const session = await auth()
    if(!session) redirect("/")

  return (
    <>
        <section className="pink_container !min-h-[230px]">
            <h1 className="heading text-white">Submit Your Startup Post</h1>
        </section>

        <StartupForm/>
    </>
  )
}

export default page