"use client"

import Link from "next/link"
import { RxCross2 } from "react-icons/rx"

const SearchResetBtn = () => {
    const reset = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement
        if (form) {
            form.reset()
        }
    }

    return (
        <button type="reset" onClick={reset}>
            <Link className="search-btn" href={"/"}><RxCross2/></Link>
        </button>
    )
}

export default SearchResetBtn