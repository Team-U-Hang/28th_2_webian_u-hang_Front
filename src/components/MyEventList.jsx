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
    const [loading, setLoading] = useState(false); //로딩 state

    //페이지네이션을 위한 state
    const [currentPage, setCurrentPage] = useState(1);
    const eventIndex = (currentPage-1)*3;
    const eventSize = myEvents.length;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io/mypage/events/1');
                setMyEvents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    },[]);

    return (
        <Wrapper>
            <label className="eventList">이벤트 참여 목록</label>
            <EventListBox>
                {
                    loading? <h2 className="noEvents">로딩 중...</h2> : 
                    (
                        myEvents.length===0 ? <h2 className="noEvents">참여한 이벤트가 없습니다</h2> : 
                        (
                            myEvents.slice(eventIndex, eventIndex + 3).map((event, i) => (
                                <MyEvent key={eventIndex + i}
                                    group={event.event_writer}
                                    title={event.event_title}
                                    date={event.event_date}
                                    time={event.event_time}
                                    id={event.event_id}/>
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
                <label className="apply">운영: {props.date}</label>
                <label className="period">시간: {props.time}</label>
            </div>
        </EventBox>
    )
}