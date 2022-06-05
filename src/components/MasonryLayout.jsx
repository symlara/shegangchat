import Masonry from 'react-masonry-css';
import image02 from '../assets/her-returns-to-form-on-her-debut-album-back-of-my-mind.jpg';
import image03 from '../assets/H.E.R._(2017)_album_cover.jpg';
import image04 from '../assets/I_Used_To_Know_Her.jpg';

const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
}

const MasonryLayout = () => {
    return (
        <div className='text-white'>
            <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj} >
                <img src={image02} className="p-4"  />
                <img src={image03} />
                <img src={image04} />
                <img src={image04} />
            </Masonry>
        </div>
       
    )
}

export default MasonryLayout