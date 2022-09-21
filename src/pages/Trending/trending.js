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
                    <SinglePage/>
                ))
              }
           </div>
        </div>
    )
}

export default Trending