import React, {useState, useEffect} from 'react'
import {Card, FormField, Loader} from '../components'

const RenderCards = ({data, title}) => {
  if(data?.length > 0){
    return data.map((post) => <Card key={post._id} {...post} />)
  }

  return (
    <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
  )
}


const Home = () => {
  const [loading, setLoading] = useState(false);

  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null); // 1:55:00
  const [searchTimeout, setSearchTimeout] = useState(null);


  // To get all the posts which come from 'share community', then u need to make a call 1:40:10
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://dall-e-ai-two.vercel.app/api/v1/post",
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
           
          }
        );

        if(response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());  // we are reversing the post, bcz, we want to show newest post at the top
        }
        
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

  }, []);  // making dependency empty '[]' , this means useEffect called only once at the start

  // Implementing Search functionality
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || 
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
  
        setSearchedResults(searchResults);
      }, 500)
    );
  }


  return (
    <section className='max-w-7xl mx-auto '>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of imaginative and visually stunning images generated by Dall-E AI</p>
      </div>

      <div className='mt-16 '>
        <FormField 
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing Results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}

            {/* ALL IMAGES COMES IN GRID */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Found" />
              )}
            </div>
          </>
        )}
      </div>

    </section>
  )
}

export default Home