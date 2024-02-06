import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import './Mycalendar.css'; // 이전에 작성한 CSS 파일을 불러옵니다.

function Mycalendar() {
    const [visible, setVisible] = useState(false);
    const [value, onChange] = useState(new Date());
    const [data, setData] = useState([]);
    const [mark, setMark] = useState([]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                console.log("accessToken: " + accessToken);
    
                if (accessToken) { // accessToken이 존재하는 경우에만 요청 보냄    
                    const response = await axios.get('http://localhost:8080/mypage/my-data', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    console.log("데이터: " + JSON.stringify(response.data.likedPosts));
                    setData(response.data.likedPosts);
                } else {
                    console.error('Access token not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        // data 값이 변경될 때마다 mark 배열을 업데이트합니다
        const eventDates = data.map(event => event.eventDate);
        setMark(eventDates);
        console.log(mark);
    }, [data]);

    // const handleDateClick = date => {
    //     const clickedDate = moment(date).format("YYYY.MM.DD");
    //     const event = events.find(event => event.eventDate === clickedDate);
    //     if (event) {
    //         setVisible(true);
    //         setSelectedEvent(event);
    //     } else {
    //         setVisible(false);
    //         setSelectedEvent(null);
    //     }
    // };

    return (
        <div className='wrapper'>
            <h3 className="sub-title">나의 이벤트 일정</h3>
            <div className="calendar-wrap layout">
                <Calendar
                    locale="en"
                    onChange={onChange}
                    value={value}
                    // onClickDay={(date) => {
                    //     // 클릭한 날짜의 문자열 형식을 구합니다 (YYYY.MM.DD)
                    //     const dateString = moment(date).format("YYYY.MM.DD");
                        
                    //     // mark 배열에서 해당 날짜와 일치하는 이벤트를 찾습니다
                    //     const event = data.find(item => item.eventDate === dateString);
                        
                    //     // 찾은 이벤트가 있는 경우, 해당 이벤트의 제목을 표시합니다
                    //     if (event) {
                    //         alert(event.eventTitle); // 이벤트 제목을 알림으로 표시하거나 모달 등을 사용하여 표시할 수 있습니다
                    //     }
                    // }}
                    onClickDay={(date) => {
                        if (mark.find((x) => x === moment(date).format("YYYY.MM.DD"))) {
                            setVisible(true);
                            // Viewpage.setVisible(!visible);
                        }
                        else {
                            setVisible(false);
                        }
                    }}
                    formatDay={(locale, date) =>
                        //xx일 -> xx 으로 format 변경
                        new Date(date).toLocaleDateString("en-us", {
                            day: "2-digit",
                        })
                    }
                    tileContent={({ date }) => {
                        // 해당 날짜의 문자열 형식을 구합니다 (YYYY.MM.DD)
                        const dateString = moment(date).format("YYYY.MM.DD");
                        
                        // mark 배열에 해당하는 날짜가 있는지 확인합니다
                        const isMarked = mark.includes(dateString);
                        
                        // 해당 날짜에 점을 표시합니다
                        if (isMarked) {
                            return <div className="dot"></div>;
                        }
                        
                        // 점을 표시하지 않는 경우, null을 반환합니다
                        return null;
                    }}
                    // tileContent={({ date, view }) => {
                    //     if (marks.find((x) => x === moment(date).format("YYYY.MM.DD"))) {
                    //         return <div className="dot"></div>;
                    //     }
                    // }}
                    formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
                    formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                    calendarType="gregory" // 일요일 부터 시작
                    next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                    prev2Label={null} // -1년 & -10년 이동 버튼 숨기기


                // tileContent={({ date, view }) => {
                //     // 각 날짜에 들어갈 content
                //     const stringDate = new Date(date).toLocaleDateString("ko", {
                //         year: "numeric", month: "2-digit", day: "2-digit",
                //     });
                //     const exist = scheduleArr.findIndex((x) => x.date === stringDate);
                //     const html = exist > -1 ? <p>{scheduleArr[exist].title}</p> : <p></p>;
                //     if (scheduleArr && scheduleArr.find((x) => x === moment(date).format("YYMMDD"))) {
                //         return <div className = "dot"></div>
                //     }
                //     return html
                // }}
                />

                {/* {visible && <Viewpage />} */}
                {/* <div className='montly-sch'>
                    <h4>이번달 일정</h4>
                    <div className='con'>
                        {marks.map((item, idx) => {
                            return (
                                <p>{item.date} - {item.title}</p>
                            );
                        })}
                    </div>

                </div> */}
            </div>
            {/* <div id="my-div" color="#305dfd">
                치과예약
            </div> */}
            {visible === true ? (
                <div className="my-div">
                    <h4 className="date-header">{moment(value).format("YYYY년 MM월 DD일")}</h4>
                    {data
                        .filter((item) => item.eventDate === moment(value).format("YYYY.MM.DD"))
                        .map((item, index) => (
                            <p key={index}>{item.eventTitle}</p>
                        ))}
                </div>
            ) : null}


        </div>
    )
}
export default Mycalendar;




// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import './Mycalendar.css';
// import moment from "moment";
// import axios from "axios";
// // import { group_data } from "../groupData";
// // import { personal_data } from "../personalData";
// // import { useNavigate } from "react-router-dom";

// function Mycalendar() {
//     const [visible, setVisible] = useState(false);
//     const [mark, setMark] = useState([]);
//     const [value, onChange] = useState(new Date());
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");

//             const headers = {
//                 Authorization : `Bearer ${accessToken}`
//             }

//             const response = await axios.get(headers + 'http://localhost:8080/mypage/my-data');
//             setData(response.data.likedPosts);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const marks = data.map(data =>moment(data.eventDate, YYYY.MM.DD).toDate());
//     // const scheduleArr = [
//     //     { 'date': "230410", 'title': '치과 예약' },
//     //     { 'date': "230411", 'title': '점심 약속' },
//     //     { 'date': "230420", 'title': '안과 예약' },
//     // ];
//     // const dateArr = scheduleArr.map(a => a.date);

//     return (
//         <div className='wrapper'>
//             <h3 className="sub-title">나의 이벤트 일정</h3>
//             <div className="calendar-wrap layout">
//                 <Calendar
//                     locale="en"
//                     onChange={onChange}
//                     value={value}
//                     onClickDay={(date) => {
//                         if (marks.find((x) => x === moment(date).format("YYYY.MM.DD"))) {
//                             setVisible(true);
//                             // Viewpage.setVisible(!visible);
//                         }
//                         else {
//                             setVisible(false);
//                         }
//                     }}
//                     formatDay={(locale, date) =>
//                         //xx일 -> xx 으로 format 변경
//                         new Date(date).toLocaleDateString("en-us", {
//                             day: "2-digit",
//                         })
//                     }
//                     tileContent={({ date, view }) => {
//                         if (marks.find((x) => x === moment(date).format("YYYY.MM.DD"))) {
//                             return <div className="dot"></div>;
//                         }
//                     }}
//                     formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
//                     formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
//                     calendarType="gregory" // 일요일 부터 시작
//                     next2Label={null} // +1년 & +10년 이동 버튼 숨기기
//                     prev2Label={null} // -1년 & -10년 이동 버튼 숨기기


//                 // tileContent={({ date, view }) => {
//                 //     // 각 날짜에 들어갈 content
//                 //     const stringDate = new Date(date).toLocaleDateString("ko", {
//                 //         year: "numeric", month: "2-digit", day: "2-digit",
//                 //     });
//                 //     const exist = scheduleArr.findIndex((x) => x.date === stringDate);
//                 //     const html = exist > -1 ? <p>{scheduleArr[exist].title}</p> : <p></p>;
//                 //     if (scheduleArr && scheduleArr.find((x) => x === moment(date).format("YYMMDD"))) {
//                 //         return <div className = "dot"></div>
//                 //     }
//                 //     return html
//                 // }}
//                 />

//                 {/* {visible && <Viewpage />} */}
//                 {/* <div className='montly-sch'>
//                     <h4>이번달 일정</h4>
//                     <div className='con'>
//                         {marks.map((item, idx) => {
//                             return (
//                                 <p>{item.date} - {item.title}</p>
//                             );
//                         })}
//                     </div>

//                 </div> */}
//             </div>
//             {/* <div id="my-div" color="#305dfd">
//                 치과예약
//             </div> */}
//             {visible === true ? (
//                 <div className="my-div">
//                     <h4 className="date-header">{moment(value).format("YYYY년 MM월 DD일")}</h4>
//                     {data
//                         .filter((item) => item.date === moment(value).format("YYYY.MM.DD"))
//                         .map((item, index) => (
//                             <p key={index}>{item.eventTitle}</p>
//                         ))}
//                 </div>
//             ) : null}


//         </div>
//     )
// }
// export default Mycalendar;


//예비용 (껍데기만)
// import { useState } from "react";
// import styled from "styled-components";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import './Mycalendar.css';
// import moment from "moment";
// // import { group_data } from "../groupData";
// // import { personal_data } from "../personalData";
// // import { useNavigate } from "react-router-dom";

// function Mycalendar() {
//     const [visible, setVisible] = useState(false);
//     const [mark, setMark] = useState([]);
//     const [value, onChange] = useState(new Date());
//     const data = [
//         { 'date': "2024-02-07", 'title': '솔룩스 발표회' },
//         { 'date': "2024-02-15", 'title': '공과대학 OT' },
//         { 'date': "2024-02-15", 'title': '체육대회' },
//         { 'date': "2024-02-20", 'title': '소프트웨어인의 밤' },
//         { 'date': "2024-02-26", 'title': '예체능 모임' },
//     ];
//     const marks = data.map(a => a.date);
//     // const scheduleArr = [
//     //     { 'date': "230410", 'title': '치과 예약' },
//     //     { 'date': "230411", 'title': '점심 약속' },
//     //     { 'date': "230420", 'title': '안과 예약' },
//     // ];
//     // const dateArr = scheduleArr.map(a => a.date);

//     return (
//         <div className='wrapper'>
//             <h3 className="sub-title">나의 이벤트 일정</h3>
//             <div className="calendar-wrap layout">
//                 <Calendar
//                     locale="en"
//                     onChange={onChange}
//                     value={value}
//                     onClickDay={(date) => {
//                         if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
//                             setVisible(true);
//                             // Viewpage.setVisible(!visible);
//                         }
//                         else {
//                             setVisible(false);
//                         }
//                     }}
//                     formatDay={(locale, date) =>
//                         //xx일 -> xx 으로 format 변경
//                         new Date(date).toLocaleDateString("en-us", {
//                             day: "2-digit",
//                         })
//                     }
//                     tileContent={({ date, view }) => {
//                         if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
//                             return <div className="dot"></div>;
//                         }
//                     }}
//                     formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
//                     formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
//                     calendarType="gregory" // 일요일 부터 시작
//                     next2Label={null} // +1년 & +10년 이동 버튼 숨기기
//                     prev2Label={null} // -1년 & -10년 이동 버튼 숨기기


//                 // tileContent={({ date, view }) => {
//                 //     // 각 날짜에 들어갈 content
//                 //     const stringDate = new Date(date).toLocaleDateString("ko", {
//                 //         year: "numeric", month: "2-digit", day: "2-digit",
//                 //     });
//                 //     const exist = scheduleArr.findIndex((x) => x.date === stringDate);
//                 //     const html = exist > -1 ? <p>{scheduleArr[exist].title}</p> : <p></p>;
//                 //     if (scheduleArr && scheduleArr.find((x) => x === moment(date).format("YYMMDD"))) {
//                 //         return <div className = "dot"></div>
//                 //     }
//                 //     return html
//                 // }}
//                 />

//                 {/* {visible && <Viewpage />} */}
//                 {/* <div className='montly-sch'>
//                     <h4>이번달 일정</h4>
//                     <div className='con'>
//                         {marks.map((item, idx) => {
//                             return (
//                                 <p>{item.date} - {item.title}</p>
//                             );
//                         })}
//                     </div>

//                 </div> */}
//             </div>
//             {/* <div id="my-div" color="#305dfd">
//                 치과예약
//             </div> */}
//             {visible === true ? (
//                 <div className="my-div">
//                     <h4 className="date-header">{moment(value).format("YYYY년 MM월 DD일")}</h4>
//                     {data
//                         .filter((item) => item.date === moment(value).format("YYYY-MM-DD"))
//                         .map((item, index) => (
//                             <p key={index}>{item.title}</p>
//                         ))}
//                 </div>
//             ) : null}


//         </div>
//     )
// }
// export default Mycalendar;