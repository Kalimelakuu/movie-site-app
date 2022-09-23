import { Badge } from '@mui/material'
import {img_300, unavailable} from'../../config/config'
import ContentModal from '../ContentMode/contentMode'
import './singlepage.css'
const SinglePage = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {
    return(
        <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} 
                color={vote_average > 6 ? "primary":"secondary"} />
        <img className='poster' alt={title} src={poster ? `${img_300}/${poster}` : unavailable}/>
        <b className='title'>{title}</b>
        <span className='subTitle'>
           {media_type === 'tv' ? "Tv Series" : "Movie"}
        <span className='subTitle'>{date}</span></span>
        </ContentModal>
    )
}

export default SinglePage