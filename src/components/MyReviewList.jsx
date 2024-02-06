import styled from "styled-components"
import COLOR from "../utils/color";
import { ReviewStar } from "./card-review";
import MyPagination from "./MyPagination";
import { useEffect, useState } from "react";
import "../fonts/Font.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .eventList{
        margin-top: 13%;
        font-weight: 700;
        color: ${COLOR.green};
        font-size: 1.5rem;
        font-family: 'S-CoreDream-3Bold';
    }
`;

const ReviewListBox = styled.div`
    background-color: #f7f8f64e;
    height: 65%;
    width: 88%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'S-CoreDream-3Medium';
    .noReviews{
        margin-top: 60%;
        color: ${COLOR.green};
    }
`;

const ReviewBox = styled.div`
    width: 85%;
    height: 20%;
    margin-top: 5%;
    border: 0.15rem solid ${COLOR.green};
    border-left: 0.6rem solid ${COLOR.green};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover{
        border-left: 1.5rem solid ${COLOR.green};
    }
    div{
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 10%;
        justify-content: center;
        label{
            cursor: pointer;
            font-weight: 700;
        }
        .group{
            color: #ca6841;
            font-size: 0.9rem;
            font-family: 'S-CoreDream-3Medium';
        }
        .title{
            margin-top: 1%;
            font-size: 1.2rem;
            font-family: 'S-CoreDream-3Bold';
            display: block;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .star{
            display: flex;
            flex-direction: row;
            width: 50%;
            height: 30%;
            margin-top: 2%;
            margin-left: 0;
        }
    }
`;

export default function MyReviewList(){

    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    //페이지네이션을 위한 state
    const [currentPage, setCurrentPage] = useState(1);
    const reviewIndex = (currentPage-1)*4;
    const reviewSize = myReviews.length;

    useEffect(()=>{
        const fetchData = async () => {
            try{
                setLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                console.log("accessToken: " + accessToken);

                const response = await axios.get('http://localhost:8080/mypage/my-data',{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setMyReviews([...response.data.myComments]);
                setLoading(false);
            } catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    console.log(myReviews);

    return (
        <Wrapper>
            <label className="eventList">나의 후기 내역</label>
            <ReviewListBox>
                {
                    loading? <h2 className="noReviews">로딩 중...</h2> : 
                    (
                        myReviews.length===0 ? <h2 className="noReviews">작성한 후기가 없습니다</h2> : 
                        (
                            myReviews.slice(reviewIndex, reviewIndex+4).map((review,i) => (
                                <MyReview key={reviewIndex+i}
                                    group={review.post.eventLoc}
                                    title={review.post.eventTitle}
                                    id={review.post.eventId}
                                    likes={review.reviewRate}/>
                            ))
                        )
                    )
                }
            </ReviewListBox>
            <MyPagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                totalItems={reviewSize} itemCountPerPage={4}/> 
        </Wrapper>
    )
}

function MyReview(props){

    let navigate = useNavigate();

    return(
        <ReviewBox onClick={()=>{navigate("/event-detail/" + props.id)}}>
            <div>
                <label className="group">{props.group}</label>
                <label className="title">{props.title}</label>
                <div className="star">
                    <ReviewStar star={props.likes} size={30}/>
                </div>
            </div>
        </ReviewBox>
    )
}