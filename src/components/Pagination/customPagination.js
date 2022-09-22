import { Pagination } from '@material-ui/lab';
import {makeStyles } from "@mui/styles";
import { createTheme ,ThemeProvider ,CssBaseline} from '@mui/material/styles'

const theme = createTheme({
    palette: {
      mode:'dark'
    },
  });
const useStyles = makeStyles(() => ({
ul: {
    '& .MuiPaginationItem-root': {
        '&.Mui-selected': {
        background: 'red',
        color: 'white',
        // borderRadius: '50%',
        },
    },
},
}));


const CustomPagination = ({setPage, numOfPages=10}) => {

    const hanldePageChange = (page) => {
        setPage(page)
        window.scroll(0,0)
    }
    const classes = useStyles();
    return(
        <div 
           style={{
            width:'100%',
            display: 'flex',
            justifyContent:'center',
            marginTop:10
           }
           }
        >
            <ThemeProvider  theme={theme}>
                <Pagination 
                
                count={numOfPages}
                onChange={(e) => hanldePageChange(e.target.textContent)} 
                hideNextButton
                hidePrevButton
                color='primary'/>
            </ThemeProvider >
          
        </div>
    )
}

export default CustomPagination