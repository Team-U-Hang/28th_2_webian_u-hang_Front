import styled from "styled-components"
import NavBar from "../components/navBar";
import COLOR from "../utils/color";
import myProfile from "../assets/MyProfile.png";
import Mycalendar from "../components/Mycalendar";

const Wrapper = styled.div`
    width: 99vw; //부모는 뷰포트 길이로 계산됨
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Section1 = styled.div`
    margin-top: 45px;
    height: 200px;
    background-color: ${COLOR.green};
    display: flex;
    align-items: center;
`;

const MyInfo = styled.div`
    width: 400px;
    height: 150px;
    background-color: #5F8062;
    margin-left: 150px;
    display: flex;
    align-items: center;
    justify-content: start;
    img{
        margin-left: 10%;
    }
    label{
        color: white;
        font-weight: 600;
        font-size: 30px;
        margin-left: 10%;
    }
`;

const Section2 = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    background-color: ${COLOR.white};
`;

const MyCalender = styled.div`
    width: 65%;
    height: 100vh;
`;

const MyList = styled.div`
    width: 25%;
    height: 100vh;
    background-color: #e9e3d0c4;
    border-right: 2px solid #586e55af;
`;

const MyNav = styled.div`
    width: 10%;
    height: 100vh;
    background-color: #e9e3d0c4;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: ${COLOR.green};
    font-weight: 600;
    font-size: 17px;
`;

export default function Mypage(){
    return(
        <Wrapper>
            <NavBar/>
            <Section1>
                <MyInfo>
                    <img src={myProfile}/>
                    <label>익명</label>
                </MyInfo>
            </Section1>
            <Section2>
                <MyCalender>
                    <Mycalendar/>
                    {/* <Viewpage /> */}
                </MyCalender>
                <MyList>
                </MyList>
                <MyNav>
                    <label htmlFor="">이벤트 참여 목록</label>
                    <label htmlFor="">나의 후기 내역</label>
                    <label htmlFor="">관심분야 설정</label>
                    <label htmlFor="">권한 설정</label>
                </MyNav>
            </Section2>
        </Wrapper>
    )
}