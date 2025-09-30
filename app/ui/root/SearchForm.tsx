
import Form from "next/form"
import SearchResetBtn from "./SearchResetBtn"
import { IoSearch } from "react-icons/io5"

const SearchForm = ({query}: {query?: string}) => {

  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input type="text" name="query" defaultValue={query} className="search-input" placeholder="Search Startups" />

      <div className="flex gap-2">
        {query && <SearchResetBtn/>}
        <button type="submit"><span className="search-btn cursor-pointer"><IoSearch /></span></button>
      </div>
    </Form>
  )
}

export default SearchForm