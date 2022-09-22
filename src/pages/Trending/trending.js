import axios from 'axios'
import { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/customPagination';
import SinglePage from '../../components/Single_Page/singlepage';
import './trending.css'
const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContenet]  = useState([])
    
    useEffect(()=> async() => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        setContenet(data.results)
       // console.log(data)
        
    },[page])

    // const fetchTrending = () => async() => {
       
    //     const { data } = await axios.get(
    //         `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
    //     setContenet(data.results)
    //     console.log(data)
        
    // };
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
                    date = {c.first_air_date || c.release_date}
                    media_type = {c.media_type}
                    vote_average = {c.vote_average} 
                    />
                ))
              }
           </div>

           <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending