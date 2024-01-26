// import styled from "styled-components";
// import COLOR from "../utils/color"
// import logo from '../assets/logo.png';
// import CardEvent from "../components/card-event";
// import CardReview from "../components/card-review";
// import NavBar from "../components/navBar";
// import { useEffect, useState } from "react";


// const Wrapper = styled.div`
//     width: 99vw; //부모는 뷰포트 길이로 계산됨
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
// `;

// const Banner = styled.div`
//     margin-top: 45px;
//     background-color: ${COLOR.green};
//     color: white;
//     width: 100%;
//     height: 400px;
//     display: flex;
//     flex-direction: row;
//     div{
//         text-align: center;
//         display: flex;
//         flex-direction: column;
//     }
//     #box1{
//         width: 35%;
//         align-items: center;
//         padding-left: 10%;
//         img{
//             margin-top: 10%;
//             width: 25%;
//         }
//         text{
//             font-size: 100px;
//             font-weight: 600;
//         }
//         &:hover{
            
//         }
//     }
//     #box2{
//         width: 160%;
//         font-size: 37px;
//         font-weight: 600;
//         margin: 30% 20% 5% 0%;
//         #txt{
//             padding-left: 60%;
//         }

//     }
//     #box3{
//         font-weight: 600;
//         width: 160%;
//         font-size: 17px;
//         margin-left: 10%;
//     }
// `;

// const BestEvent = styled.div`
//     text-align: center;
//     width: 100%;
//     height: 600px;
//     background-color: ${COLOR.white};
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     #best{
//         margin-top: 5%;
//         font-size: 25px;
//         font-weight: 700;
//     }
//     div{
//         /* background-color: white; */
//         width: 50%;
//         height: 65%;
//         display: flex;
//         gap: 5%;
//         margin-top: 10px;
//         margin-left: auto; //div를 가운데에 둠
//         margin-right: auto; //div를 가운데에 둠
//     }
// `;

// const BestReview = styled.div`
//     text-align: center;
//     width: 100%;
//     height: 600px;
//     background-color: #F1F0E7;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     #best{
//         margin-top: 5%;
//         font-size: 25px;
//         font-weight: 700;
//     }
//     div{
//         width: 50%;
//         height: 65%;
//         display: flex;
//         gap: 5%;
//         margin-top: 10px;
//         margin-left: auto; //div를 가운데에 둠
//         margin-right: auto; //div를 가운데에 둠
//     }
// `

// const Info = styled.div`
//     display: flex;
//     flex-direction: row;
//     width: 100%;
//     height: 90px;
//     background-color: white;
//     #div1{
//         font-size: 35px;
//         font-weight: 600;
//         color: black;
//         padding: 1% 2.5% 0 2.5%;
//         border-right: 1.5px solid black;
//         height: 80%;
//         margin-top: 0.5%;
//     }
//     #div2{
//         display: flex;
//         flex-direction: column;
//         padding: 1% 0 1% 2%;
//         color: black;
//         font-weight: 500;
//     }
// `;


// export default function Home(){

//     let [bestEvent, setBestEvent] = useState([
//         {
//             "group": "솔룩스",
//             "title": "최종 발표회",
//             "apply": "2024.01.18(목) ~",
//             "period": "2024.02.07(수) ~"
//         },
//         {
//             "group": "공명",
//             "title": "공과대학인의 날",
//             "apply": "2024.02.18(목) ~",
//             "period": "2024.02.28(수) ~"
//         },
//         {
//             "group": "소프트웨어학부",
//             "title": "소프트웨어인의 밤",
//             "apply": "2024.12.08(목) ~",
//             "period": "2024.12.17(수) ~"
//         }]
//     );
//     let [bestReview, setBestReview] = useState([
//         {
//             "group": "솔룩스",
//             "title": "최종 발표회",
//             "star": 2,
//             "review" : "좋은 시간이었습니다!"
//         },
//         {
//             "group": "공명",
//             "title": "공과대학인의 날",
//             "star": 3,
//             "review": "행사가 많고 알찼습니다."
//         },
//         {
//             "group": "소프트웨어학부",
//             "title": "소프트웨어인의 밤",
//             "star": 2,
//             "review": "친구들과 좋은 시간 보냈습니다."
//         }
//     ]);

//     useEffect(()=>{
//         window.scrollTo(0,0);
//     });

//     return(
//         <Wrapper>
//             <NavBar/>
//             <Banner>
//                 <div id="box1">
//                     <img src={logo}/>
//                     <text>U.Hang</text>
//                 </div>
//                 <div>
//                 <div id="box2">
//                     <text>너에게 필요한 이벤트,</text>           
//                     <text id="txt">같이 해볼래?</text> 
//                 </div>
//                 <div id="box3">
//                     <text>대학 생활을 알차게 보낼 수 있게</text>           
//                     <text>U.Hang에서 이벤트를 참여하고 후기 남기자!</text> 
//                 </div>
//                 </div>
//             </Banner>
//             <BestEvent>
//                 <text id="best">BEST 이벤트</text>
//                 <div>
//                     {[0,1,2].map(function(i){
//                         return(
//                             <><CardEvent group={bestEvent[i].group} title={bestEvent[i].title} apply={bestEvent[i].apply} period={bestEvent[i].period}/></>
//                         )})
//                     }
//                 </div>
//             </BestEvent>
//             <BestReview>
//                 <text id="best">BEST 후기</text>    
//                 <div>
//                 {[0,1,2].map(function(i){
//                     return(
//                         <><CardReview group={bestReview[i].group} title={bestReview[i].title} star={bestReview[i].star} review={bestReview[i].review}/></>
//                     )})
//                 }
//                 </div> 
//             </BestReview>     
//             <Info>
//                 <div id="div1">
//                     <text>U.Hang</text>           
//                 </div>
//                 <div id="div2">
//                     <text>웨비앙</text> 
//                     <text>솔룩스 웹 6팀</text> 
//                     <text>Tel.02-XXX-XXXX</text> 
//                 </div>
//             </Info>
//         </Wrapper>        
//     );
// }