import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsForSpot from '../ReviewsForSpot';
import { fetchSpotDetails } from '../../store/spots';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateReviewModal from '../ReviewsForSpot/CreateReviewModal';
import { fetchSpotReviews } from '../../store/reviews';
import './SpotShow.css'

const SpotShow = () => {
    const {spotId} = useParams();
    let review = 'reviews';
    let newReview = ''
    let postReview = ''
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) =>
    state.spots ? state.spots[spotId] : null );
    const reviews = useSelector((state) => (state.reviews ? state.reviews : []));
    const dispatch = useDispatch();
    const [reviewBtn, setReviewBtn] = useState(true)
    useEffect(() => {
        dispatch(fetchSpotReviews(spotId))
        .then(dispatch(fetchSpotDetails(spotId)))
    },[dispatch, spotId, reviews.length]);
    
    
    if(!spot){
        return null
    }
    if(!spot.SpotImages){
        return null
    }
    // if(!spot.reviews){
    //     return null
    // }
    if(!spot.avgRating){
        spot.avgRating = 'New'
    }
    if(Number.isInteger(spot.avgRating)){
        spot.avgRating = spot.avgRating.toFixed(1)
    }
    if(Number.isInteger(spot.price)){
        spot.price = spot.price.toFixed(2)
    }
    if(spot.numReviews === 1){
        review = 'review'
    }
    if(spot.numReviews === 0){
        newReview = 'Be the first to post a review!'
    }
    const previewImage = spot.SpotImages.find((image)=> image.preview === true)
    let previewIndex = spot.SpotImages.indexOf(previewImage)
    let extraImages = []
    for( let i = 0; i < spot.SpotImages.length; i++){
        if(spot.SpotImages[i].preview === false && spot.SpotImages[i].url){
            extraImages.push(spot.SpotImages[i])
        }
    }
   
   
    return (
        <div className='spot-details'>
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className='spot-images'>
                <img className='feature-img' src={previewImage.url}/> 
                <ul className='misc-images'>

                {extraImages.map((image) =>(
                    <li>
                    <img className='extra-img' src={image.url}/> 
                    </li>
                    ))}
                </ul>
            </div>
            <div className='details'>
                <div className='host'>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
                </div>
            <div className='reservation'>
                <div className='price-reviews'>
                <p>${spot.price} night</p>
                <div className='review-details'>
                <p><i class="fa-solid fa-star"></i>{spot.avgRating}</p> 
                {spot.numReviews > 0 &&<p>{'\u2022'} {spot.numReviews} {review}</p>}
                </div>
                </div>
                <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
            </div>
            </div>
            <div>
                <div className='guest-reviews'>
                <h2><i class="fa-solid fa-star"></i>{spot.avgRating}</h2>  
                {spot.numReviews > 0 && <h2>{'\u2022'} {spot.numReviews} {review}</h2>}
                </div>
                <ReviewsForSpot spot={spot}/>
                
                
            </div>
        </div>
    )
}

export default SpotShow