import axios from 'axios'
import { useEffect, useState } from 'react'
import SinglePage from '../../components/Single_Page/singlepage';

const Trending = () => {
    const [content, setContenet]  = useState([])
    
    const fetchTrending = () => async() => {
       
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
        setContenet(data.results)
        console.log(data)
        
    };

    useEffect(()=>{
        return fetchTrending();
    },[])
    return (
        <div>
           <span  className="pageTitle">Trending</span>
           <div className='trending'>
              {
                content && content.map((c) => (
                    <SinglePage 
                    key={c.id}
                    id = {c.id}
                    poster = {c.poster_path}
                    title = {c.title || c.name}
                    date = {c.firest_air_date || c.release_data}
                    media_type = {c.media_type}
                    vote_average = {c.vote_average} 
                    />
                ))
              }
           </div>
        </div>
    )
}

export default Trending