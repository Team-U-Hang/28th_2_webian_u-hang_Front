import styled from "styled-components"
import COLOR from "../utils/color";
import { useEffect, useState } from "react";
import "../fonts/Font.css";
import axios from "axios";

export const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    font-family: 'S-CoreDream-3Medium';
    .btns{
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
    }
    h2{
        font-family: 'S-CoreDream-3Bold';
    }
`;

export const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(49,49,49,0.8);
`;

export const ModalContent = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -35%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        color: #053816;
    }
`;

const CheckContainer = styled.div`
    max-width: 500px;
    min-width: 500px;
    height: 80%;
    background-color: #D3D1BF;
    border-radius: 10px;
    display: flex;
    overflow-y: auto;
    padding: 10px;
    font-family: 'S-CoreDream-3Medium';
    .checkList {
        margin: 1.5rem 0 1.5rem 0;
        display: flex;
        flex-direction: row;
        flex-wrap : wrap;
        gap: 1rem;
        div{
            display: flex;
            font-weight: 600;
            color: #053816;
            margin-top: 0.5rem;
            label{
                cursor: pointer;
                &:hover{
                    color: #053816be;
                }
            }
        }
    }
`;

const CheckBox = styled.input`
    cursor: pointer;
    appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    background-color: #3A4D39;
    border-radius: 0.1rem;
    &:checked{
        background-color: #3A4D39;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    }
`;

export const CancelBtn = styled.button`
    background-color: ${COLOR.green};
    color: white;
    font-weight: 600;
    width: 5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: 0.5s;
    &:hover{
        border-color: ${COLOR.white};
    }
`;

export const CompleteBtn = styled.button`
    background-color: ${COLOR.green};
    color: white;
    font-weight: 600;
    width: 5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: 0.5s;
    &:hover{
        border-color: ${COLOR.white};
    }
`;

export default function InterestModal(props){

    const modal = props.InModal;
    const toggleModal = props.toggleModal1;

    const major = ["", "공과대학", "이과대학", "문과대학", "사회과학대학", "생활과학대학", "법과대학", "경상대학", "음악대학",
                    "약학대학", "미술대학", "기초교양대학", "글로벌융합대학", "글로벌서비스학부", "영어영문학부", "미디어학부", "동아리"];

    //기존 관심사 받아오기
    const [myInterest, setMyInterest] = useState([]); //백에서 받아와야 됨
    const [newInterest, setNewInterest] = useState([]); //새로운 관심사를 저장할 state
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const accessToken = localStorage.getItem("accessToken");
                console.log("accessToken: " + accessToken);

                const response = await axios.get('http://localhost:8080/mypage/my-data',{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setMyInterest([...response.data.interestCategories]);
                setNewInterest([...response.data.interestCategories]);
                console.log(response.data);
            } catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    // const [newInterest, setNewInterest] = useState([...myInterest]); //체크되면 추가해줄 배열(완료 버튼 누르면 이 배열을 백으로 전송
    const onClickCheck = target => {
        if(newInterest.includes(target)){
            setNewInterest([...newInterest].filter(check => check !== target));
            return;
        }
        return setNewInterest([...newInterest, target]);
    }
    
    //백으로 업데이트된 관심사 post
    const update = async() => {
        console.log(newInterest);
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        await axios.post('http://localhost:8080/interest-category/save',newInterest,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(()=>{
            console.log("well done!");
        })
        .catch((error) => {
            console.log('An error occurred: ', error.response);
        })
    };

    //'완료'버튼 누르면 동작할 함수
    const onComplete = () => {
        alert("관심분야 설정이 완료되었습니다");
        console.log(myInterest);
        toggleModal();
        // 백으로 데이터 보내주는 함수
        update();
    }

    return(
        <>
        {modal && (
            <Modal>
                <Overlay>
                <ModalContent>
                <h2>관심 분야 설정</h2>
                <CheckContainer>
                    <div className="checkList">
                        {
                            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((i)=>(
                                <div key={i}><label htmlFor={i}>{major[i]}</label>
                                <CheckBox id={i} value={i} type="checkbox" checked={newInterest.includes(i)? true : undefined}
                                onChange={() => onClickCheck(i)}/>
                                </div>
                            ))
                        }
                    </div>
                </CheckContainer>
                <div className="btns">
                    <CancelBtn onClick={toggleModal}>취소</CancelBtn>
                    <CompleteBtn onClick={onComplete}>완료</CompleteBtn>
                </div>
                </ModalContent>
            </Overlay>
            </Modal>
        )}
        </>
    )
}