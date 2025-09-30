import SearchForm from "../ui/root/SearchForm";
import StartupCard, { StartupTypeCard } from "../ui/root/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {
  searchParams?: Promise<{query?: string}>
}) {
  const query = (await searchParams)?.query
  const params = {search: query || null}

  const session = await auth()

  const {data: posts} = await sanityFetch({query: STARTUP_QUERY, params})

  // const posts = [
  //   {
  //     id: 1,
  //     _createdAt: new Date(),
  //     views: 53,
  //     author: {id: 1, name: "John Doe"},
  //     title: "hello World",
  //     description: "This is a test description",
  //     image: "https://i.ibb.co/vvP3R5S1/use3.jpg",
  //     category: "smilling"      
  //   },
  //   {
  //     id: 2,
  //     _createdAt: "2 days ago",
  //     views: 23,
  //     author: {id: 2 , name: "Jane Smith"},
  //     title: "Hello Friend",
  //     description: "This is a test description",
  //     image: "https://i.ibb.co/V0LHrG7N/use6.jpg",
  //     category: "blue"
  //   }
  // ]

  return (
    <>
      <section className="pink_container">
        <h1 className="text-3xl heading">🌟 Share What You Love,<br /> Discover What Others Create</h1>
        <p className="sub-heading !max-w-3xl">Post freely about anime, food, entertainment, hobbies, or any idea that inspires you. Connect with a community that shares your interests.</p>
        <SearchForm query={query}/>
      </section>

      <section className=" w-11/12 mx-auto">

        <p className="text-30-semibold mt-5">
          {
            query ? `Search results for "${query}"`:
            `All Startups`
          }
        </p>

        <ul className="mt-7 card_grid">
          {
            posts.length > 0 ? 
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post}/>
            )) :
            <p className="no-results">No Startup Found</p>
          }
        </ul>

      </section>
      <SanityLive/>
    </>
  );
}
