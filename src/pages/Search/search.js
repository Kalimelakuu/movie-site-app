import { Button, Tab, Tabs, TextField } from "@mui/material"
import { createTheme ,ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import SinglePage from "../../components/Single_Page/singlepage";
import CustomPagination from "../../components/Pagination/customPagination";
const Search = () => {

    const [type, setType] = useState(0)
    const [page , setPage] = useState(1)
    const [searchText, setSearchText] = useState(" ")
    const [content , setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette:{
            mode:"dark",
            primary:{
                main:"#fff"
            }
        }
    })

    // useEffect(()=> async() => {
    //     window.scroll(0,0)
    //     const {data} = await axios.get(
    //         `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
    //     }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    //     )
    //     setContent(data.results)
    //     setNumOfPages(data.total_pages)
    //     console.log(data)
        
    // },[type, page])

    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&query=${searchText}&page=${page}`
          );
          setContent(data.results);
          setNumOfPages(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        window.scroll(0, 0);
        if(searchText !== " " ){
            fetchSearch()
        }
        // eslint-disable-next-line
      }, [page]);

  
    
    

    return (
        <div>
        <ThemeProvider theme={darkTheme}>
        <div className="search" style={{display:'flex',margin:'15px 0'}}>
           <TextField
           style={{flex:1}}
           className="searhBox"
           label="Search"
           variant ="filled"
           onChange={(e) => setSearchText(e.target.value)}
           />
           <Button 
           onClick={fetchSearch}
           variant="contained" 
           style ={{marginLeft : 10}}>
         
           <SearchIcon fontSize="large"/></Button>
           </div>

           <Tabs 
           value={type} 
           indicatorColor='primary' 
           textColor='primary' 
           style={{paddingBottom : 5}}
           onChange={(event, newValue) => {
            setType(newValue)
            setPage(1)
           }} >
              <Tab style={{width :"50%"}} label="Search Movies"/>
              <Tab style={{width:"50%"}} label="Search TV Series"/>
           </Tabs>
           
           </ThemeProvider>

           <div className="trending">
           
           {
            content && content.map((c) => (
                <SinglePage
                    key={c.id}
                    id= {c.id}
                    poster = {c.poster_path}
                    title ={c.title || c.name}
                    date= {c.first_air_date || c.release_date}
                    media_type= {type ? "tv" : "movie"}
                    vote_average={c.vote_average}
                />
    )) }

            {
                content.length < 1
                && (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>  )
            }
           </div>
           {
            numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )
           }
        </div>
    )
}

export default Search