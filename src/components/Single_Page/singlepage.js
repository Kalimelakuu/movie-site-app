import {img_300, unavailable} from'../../config/config'
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
        <div className='media'>
        <img className='poster' alt={title} src={poster ? `${img_300}/${poster}` : unavailable}/>
        <b className='title'>{title}</b>
        <span className='subTitle'>
           {media_type === 'tv' ? "Tv Series" : "Movie"}
        <span className='subTitle'>{date}</span></span>
        </div>
    )
}

export default SinglePage