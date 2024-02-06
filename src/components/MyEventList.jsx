import styled from "styled-components"
import COLOR from "../utils/color";
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
        font-weight: bold;
        color: ${COLOR.green};
        font-size: 1.5rem;
        font-family: 'S-CoreDream-3Bold';
    }
`;

const EventListBox = styled.div`
    background-color: #f7f8f64e;
    height: 65%;
    width: 88%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'S-CoreDream-3Medium';
    .noEvents{
        margin-top: 60%;
        color: ${COLOR.green}
    }
`;

const EventBox = styled.div`
    width: 85%;
    height: 25%;
    margin-top: 8%;
    border: 0.15em solid ${COLOR.green};
    border-left: 0.6rem solid ${COLOR.green};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
    &:hover{
        border-left: 1.5rem solid ${COLOR.green};
    }
    div{
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 7%;
        justify-content: center;
        label{
            cursor: pointer;
        }
        .group{
            color: #ca6841;
            font-size: 0.9rem;
            font-family: 'S-CoreDream-3Medium';
        }
        .title{
            margin-top: 1%;
            font-size: 1.2rem;
            font-weight: 700;
            display: block;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-family: 'S-CoreDream-3Bold';
            color: #292929;
        }
        .apply{
            margin-top: 1%;
            font-size: 0.9rem;
            color: #646464;
            font-family: 'S-CoreDream-3Light';
        }
        .period{
            font-size: 0.9rem;
            color: #646464;
            font-family: 'S-CoreDream-3Light';
        }
    }
`;

export default function MyEventList(){

    const [myEvents, setMyEvents] = useState([]);

    // const [myEvents, setMyEvents] = useState([{
    //     "event_id": 1,
    //     "event_writer":"소프트웨어학부 학생회",
    //     "event_title":"소프트웨어인의 밤",
    //     "event_date": "2023.11.22 ~ 2023.11.28",
    //     "event_time": "18:00 ~ 21:00"
    // },
    // {
    //     "event_id": 2,
    //     "event_writer":"솔룩스",
    //     "event_title":"최종발표회",
    //     "event_date": "2024.12.08 ~ 2024.12.18",
    //     "event_time": "18:00 ~ 21:00"
    // }
    // ,{
    //     "event_id": 3,
    //     "event_writer":"공명",
    //     "event_title":"공과대학인의 밤",
    //     "event_date": "2023.11.22 ~ 2023.11.28",
    //     "event_time": "18:00 ~ 21:00"
    // },
    // {
    //     "event_id": 4,
    //     "event_writer":"총학생회",
    //     "event_title":"체육대회",
    //     "event_date": "2024.12.08 ~ 2024.12.18",
    //     "event_time": "18:00 ~ 21:00"
    // }
    // ,{
    //     "event_id": 5,
    //     "event_writer":"총학생회",
    //     "event_title":"개강총회",
    //     "event_date": "2023.11.22 ~ 2023.11.28",
    //     "event_time": "18:00 ~ 21:00"
    // }]);
    const [loading, setLoading] = useState(false); //로딩 state

    //페이지네이션을 위한 state
    const [currentPage, setCurrentPage] = useState(1);
    const eventIndex = (currentPage-1)*3;
    const eventSize = myEvents.length;

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
                console.log(response.data);
                setMyEvents([...response.data.likedPosts]);
                setLoading(false);
            } catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    return (
        <Wrapper>
            <label className="eventList">찜한 이벤트 목록</label>
            <EventListBox>
                {
                    loading? <h2 className="noEvents">로딩 중...</h2> : 
                    (
                        myEvents.length===0 ? <h2 className="noEvents">참여한 이벤트가 없습니다</h2> : 
                        (
                            myEvents.slice(eventIndex, eventIndex + 3).map((event, i) => (
                                <MyEvent key={eventIndex + i}
                                    group={event.eventLoc}
                                    title={event.eventTitle}
                                    date={event.eventDate}
                                    time={event.eventTime}
                                    id={event.eventId}/>
                            ))
                        )
                    )
                }
            </EventListBox>
            <MyPagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                totalItems={eventSize} itemCountPerPage={3}/>
        </Wrapper>
    )
}

function MyEvent(props){

    let navigate = useNavigate();

    return(
        <EventBox onClick={()=>{navigate("/event-detail/" + props.id)}}>
            <div>
                <label className="group">{props.group}</label>
                <label className="title">{props.title}</label>
                <label className="apply">날짜: {props.date}</label>
                <label className="period">시간: {props.time[0]} : {props.time[1]}</label>
            </div>
        </EventBox>
    )
}