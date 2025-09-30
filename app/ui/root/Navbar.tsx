
import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import { BiSolidExit } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

const Navbar = async () => {

  const session = await auth()

  return (
    <header className=" px-5 py-4 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="pageLogo" width={30} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {
            session &&
              session?.user ? (
              <>
                <Link href={"/startup/create"}>
                  <span className="max-sm:hidden">Create</span>
                  <FiPlus className="size-6 sm:hidden " />
                </Link>
                <button className="cursor-pointer" onClick={async() => {"use server"; await signOut({options: {redirectTo: "/"}})}}>
                  <span className="max-sm:hidden">Logout</span> 
                  <BiSolidExit className="size-6 sm:hidden text-red-500"/>
                </button>
                <Link href={`/users/${session?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) : (
              <form action={async () => {"use server"; await signIn('github')}} >
                <button type="submit" className="cursor-pointer">
                  Login
                 
                </button>
        </form>
        )
          }
      </div>
    </nav>
    </header >
  )
}

export default Navbar