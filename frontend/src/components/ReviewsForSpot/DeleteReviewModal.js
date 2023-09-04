import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";



const DeleteReviewModal = ({review}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    console.log(review)
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id))
        .then(closeModal());
        window.location.reload()
    }
    
    return(
        <>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete}>Yes (Delete Review)</button>
            <button onClick={(e) => closeModal()}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReviewModal