import styled from "styled-components";
import NavBar from "../components/navBar";
import COLOR from "../utils/color";
import search from "../assets/search.png"
import EventCard from "../components/eventlist-card";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { personalData } from "../personalData";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    background-color: ${COLOR.white};
    width: 99vw; //부모는 뷰포트 길이로 계산됨
    display: flex;
    flex-direction: column;
    justify-content: center;
    #paging{
        display: flex;
        justify-content: center;
        margin-top: 4%;
        margin-bottom: 5%;
    }
`;

const Section1 = styled.div`
    background-color: ${COLOR.green};
    margin-top: 45px;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #whiteBox{
        background-color: #F9F8FA;
        width: 80%;
        height: 200px;
        border-radius: 10px;
        display: flex;
        #searchBox{
            width: 95%;
            height: 130px;
            margin: auto;
            display: flex;
        }
    }
    #buttonGroup{
        width: 300px;
        margin-left: 80%;
        margin-top: 3%;
        display: flex;
        gap: 15px;
        select{
            background-color: #EAE5D4;
            border-radius: 5px;
            width: 30%;
            height: 40px;
            color: ${COLOR.green};
            font-weight: 600;
            /* appearance: none;     */
        }
    }
`;

const SearchBar = styled.form`
    background-color: #EAE5D4;
    border: 2px solid #4F6F52;
    border-radius: 15px;
    width: 60%;
    height: 45px;
    font-size: 20px;
    font-weight: 500;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    input{
        border: 0;
        background-color: #EAE5D4;
        width: 80%;
        height: 40px;
        font-size: 1.1rem;
        font-weight: 600;
        outline: none;
    }
    input::placeholder{
        color: gray;
    }
    input::-ms-clear, input::-ms-reveal{
        display: none;
    }
    img{
        width: 6%;
        cursor: pointer;
    }
`;

const Section2 = styled.div`
    background-color: ${COLOR.white};
    width: 100%;
    height: 1100px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    button{
        position: absolute;
        top: 2rem;
        right: 5rem;
        background-color: ${COLOR.green};
        color: white;
        font-weight: 550;
        width: 90px;
        height: 40px;
        text-align: center;
    }
    #word{
        margin-top: 8%;
        font-size: x-large;
        font-weight: 600;
        text-align: center;
    }
    #displayCard{
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        height: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap : wrap; //flexbox의 폭이 지정되어있다면 flexbox의 width를 넘어가게 되면 여러 행에 나열
        gap: 5%;
        padding-left: 7%;
    }

    #txt {
        background-color: ${COLOR.white};
        text-align: center;
        font-size: 18px;
        margin-top: 80px;
        margin-bottom: 40px;
        cursor: pointer;
    }

`;

export default function BoardPersonal(){

    const navigate = useNavigate();

    let [events, setEvents] = useState(personalData.sort(function(a,b){
        if(parseInt(a.id) > parseInt(b.id)){
            return b.id-a.id;
        }
    }));

    useEffect(()=>{
        window.scrollTo(0,0);
    });

    // 페이지네이션을 위한 state
    const [currentPage, setCurrentPage] = useState(1);
    let eventIndex = (currentPage-1)*8;
    let eventSize = events.length;
    const [showEvents, setShowEvents] = useState(false);

    //검색 기능을 위한 state와 function
    const [word, setWord] = useState("");
    const onSubmit = async() => {
        window.location.href = "personal/search/" + word;
    };

    //정렬 기능을 위한 state와 function
    const [sort, setSort] = useState("latest");
    const eventSort = async(sort)=>{
        let copy = [...events];
        if(sort === "latest"){
            copy.sort(function(a,b){
                if(parseInt(a.id) > parseInt(b.id)){
                    return b.id-a.id;
                }
            });
        } 
        else if(sort === "recommend"){
            copy.sort(function(a,b){
                if(parseInt(a.likes) > parseInt(b.likes)){
                    return a.id-b.id;
                }
            });
        }
        setEvents(copy);
    };
    //sort변수가 바뀔 때마다 eventSort() 실행하여 정렬
    useEffect(()=>{
        eventSort(sort);
    },[sort])

    // 페이징 시, 0.1초 딜레이 주기
    useEffect(()=>{
        setShowEvents(false);
        const timer = setTimeout(()=>{
            setShowEvents(true);
        }, 100);
        window.scrollTo(0,0); // 페이징 시, 맨 위로 스크롤 조정
        return () => clearTimeout(timer);
    }, [currentPage, events]);

    return(
        <Wrapper>
            <NavBar/>
            <Section1>
                <div id="whiteBox">
                    <div id="searchBox">
                        <SearchBar>
                            <input type="search" placeholder="찾고 싶은 이벤트를 검색하세요"
                            onChange={(e)=>{setWord(e.target.value)}}/>
                            <img type="button" src={search}
                                onClick={()=>{onSubmit()}}/>
                        </SearchBar>
                    </div>
                </div>
                <div id="buttonGroup">
                    <select onChange={(e)=>{setSort(e.target.value)}}>
                        <option value="latest">최신순</option>
                        <option value="recommend">추천순</option>
                    </select>
                </div>
            </Section1>
            <Section2>
                <div>
                    <button onClick={()=>{navigate("/event-register")}}>등록</button>
                </div>
                <label id="word">
                    {events.length===0 ? `해당하는 이벤트가 없습니다` : ``}
                </label>
                <div id="displayCard">
                    {
                        [eventIndex,eventIndex+1,eventIndex+2,eventIndex+3,eventIndex+4,eventIndex+5,eventIndex+6,eventIndex+7].map(function(i){
                            return(
                                <>
                                {showEvents && i <= eventSize-1 && (
                                    <EventCard id={events[i].id} writer={events[i].group} title={events[i].title} apply={events[i].apply} period={events[i].period}/>
                                )}
                                </>
                            )
                        })
                    }
                </div>
            </Section2>
            <div id="paging">
                <Pagination eventsNum={events.length} eventsPerPage={8} 
                setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
        </Wrapper>
    )
}