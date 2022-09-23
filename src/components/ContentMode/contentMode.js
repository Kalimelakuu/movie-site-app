import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {makeStyles } from "@mui/styles";
import axios from 'axios'
import { useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './contentMode.css'
import { Fragment } from 'react';
import Carousel from '../Carousel/Carousel';
const useStyles = makeStyles( (theme)=> ({
  modal: {
    display: "flex",
    paddingTop: "50px",
    justifyContent: "center",
    
    
  },
  paper: {
    position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height:"80%",
  bgcolor: 'background.paper',
  boxShadow: "10px 2px 10px",
  color: "white",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  p: 4,
    // width: "90%",
    // height: "80%",
    // alignContent:"center",
    // backgroundColor: "#39445a",
    // border: "1px solid #282c34",
    // borderRadius: 10,
    // color: "white",
    // padding: "10px 10px 10px",
    // boxShadow: "10px 10px 10px"
  },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children,media_type, id }) {
  const classes = useStyles();
 
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState()
  const [ video, setVideo] = useState()

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    console.log(data)
    setContent(data)
  }

  const fetchVideo = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    console.log(data)
    setVideo(data.results[0]?.key)
    
  }


  React.useEffect(()=>{
    fetchData()
    fetchVideo()
  },[])
  return (
    <Fragment> 
      <div className='media' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
         {  content &&
           (<div className={classes.paper} >
             <div className='ContentModal'>
             
              
             <img
             src={
               content.poster_path
                 ? `${img_500}/${content.poster_path}`
                 : unavailable
             }
             alt={content.name || content.title}
             className="ContentModal__portrait"
           />
           <img
             src={
               content.backdrop_path
                 ? `${img_500}/${content.backdrop_path}`
                 : unavailableLandscape
             }
             alt={content.name || content.title}
             className="ContentModal__landscape"
           />
                <div className='ContentModal__about'>
                  <span className='ContentModal__title'>
                     {content.name || content.title}(
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-------"
                      ).substring(0,4)}
                     )
                  </span>
                  {
                    content.tagline && (
                      <i className='tagline'>{content.tagline}</i>
                    )}
                    <span className='ContentModal__description'>
                        {content.overview}
                    </span>
                    <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                
                <Button 
                    variant='contained'
                    startIcon={<YouTubeIcon/>}
                    color="secondary"
                    target='_blank'
                    href={`https://www.youtube.com/watch?v=${video}`}
                    >
                Watch the Trailer
                </Button>
             </div>
             </div>
          </div>
          )}
        </Fade>
      </Modal>
    </Fragment>
  );
}
