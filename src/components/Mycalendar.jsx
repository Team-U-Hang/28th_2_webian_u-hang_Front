import { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './Mycalendar.css';
import moment from "moment";
// import { group_data } from "../groupData";
// import { personal_data } from "../personalData";
// import { useNavigate } from "react-router-dom";

function Mycalendar() {
    const [visible, setVisible] = useState(false);
    const [mark, setMark] = useState([]);
    const [value, onChange] = useState(new Date());
    const data = [
        { 'date': "2024-02-07", 'title': '솔룩스 발표회' },
        { 'date': "2024-02-15", 'title': '공과대학 OT' },
        { 'date': "2024-02-15", 'title': '체육대회' },
        { 'date': "2024-02-20", 'title': '소프트웨어인의 밤' },
        { 'date': "2024-02-26", 'title': '예체능 모임' },
    ];
    const marks = data.map(a => a.date);
    // const scheduleArr = [
    //     { 'date': "230410", 'title': '치과 예약' },
    //     { 'date': "230411", 'title': '점심 약속' },
    //     { 'date': "230420", 'title': '안과 예약' },
    // ];
    // const dateArr = scheduleArr.map(a => a.date);

    return (
        <div className='wrapper'>
            <h3 className="sub-title">나의 이벤트 일정</h3>
            <div className="calendar-wrap layout">
                <Calendar
                    locale="en"
                    onChange={onChange}
                    value={value}
                    onClickDay={(date) => {
                        if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
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
                    tileContent={({ date, view }) => {
                        if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                            return <div className="dot"></div>;
                        }
                    }}
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
                        .filter((item) => item.date === moment(value).format("YYYY-MM-DD"))
                        .map((item, index) => (
                            <p key={index}>{item.title}</p>
                        ))}
                </div>
            ) : null}


        </div>
    )
}
export default Mycalendar;