
import { createTheme ,ThemeProvider } from '@mui/material/styles'
import { Pagination } from '@mui/material'

const theme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#fff"
        }
    }
})



const CustomPagination = ({setPage, numOfPages=10}) => {

    const hanldePageChange = (page) => {
        setPage(page)
        window.scroll(0,0)
    }
    return(
        <div style={{
            width:'100%',
            display: 'flex',
            justifyContent:'center',
            marginTop:10
           }
           }>
           <ThemeProvider  theme={theme}>
              <Pagination
              count={numOfPages}
              onChange={(e) => hanldePageChange(e.target.textContent)} 
              hideNextButton
              hidePrevButton
              color='primary'  
              />
           </ThemeProvider>
        </div>
    )
}

export default CustomPagination