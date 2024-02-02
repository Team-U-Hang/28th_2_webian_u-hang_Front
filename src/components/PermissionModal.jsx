import styled from "styled-components";
import { CancelBtn, CompleteBtn, Modal, ModalContent, Overlay } from "./InterestModal";
import COLOR from "../utils/color";
import { useRef, useState } from "react";
import axios from "axios";

const Container = styled.form`
    width: 500px;
    height: 60vh;
    border-radius: 0.5rem;
    background-color: #D3D1BF;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ImageForm = styled.div`
    margin: 3% 3% 0 3% ;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40%;
    .upload{
        display: flex;
        flex-direction: row;
        align-items: center;
        label{
            font-weight: 600;
            color: #053816;
        }
        .btn-upload{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${COLOR.green};
            color: white;
            width: 50px;
            height: 30px;
            cursor: pointer;
            text-align: center;
            border-radius: 0.5rem;
            margin-left: 20%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: 0.5s;
        }
    }
    .imgBackground{
        margin-top: 0.5rem;
        width: 50%;
        height: 80%;
        background-color: white;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input{
        display: none;
    }
    img{
        width: 50%;
        height: 130px;
        object-fit: cover; //이미지 미리보기 시, 크기 고정
    }
`;

const GroupNameForm = styled.div`
    margin: 3% 3% 0 3% ;
    display: flex;
    flex-direction: column;
    height: 10%;
    label{
        font-weight: 600;
        color: #053816;
    }
    input{
        border: none;
        border-radius: 0.2rem;
        width: 90%;
        outline: none;
    }
    input::-ms-clear, input::-ms-reveal{
        display: none;
    }
    div{
        background-color: white;
        display: flex;
        height: 2rem;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
    }
`;

const GroupExplanation = styled.div`
    margin: 3% 3% 0 3% ;
    display: flex;
    flex-direction: column;
    height: 50%;
    label{
        font-weight: 600;
        color: #053816;
    }
    div{
        background-color: white;
        display: flex;
        height: 80%;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
    }
    textarea{
        margin-top: 0.5rem;
        width: 100%;
        border: none;
        resize: none;
        outline: none;
        border-radius: 0.5rem;
    }
`;

//onChange={(e)=>{setWord(e.target.value)}}

export default function PermissionModal(props){

    const modal = props.PerModal;
    const toggleModal = props.toggleModal2;

    const [imgFile, setImgFile] = useState(""); //이미지 url state
    const imgRef = useRef();
    const [groupName, setGroupName] = useState(""); // 단체명 state
    const [groupIntro, setGroupIntro] = useState(""); // 단체소개 state


    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };

    // 단체 신청 post
    const groupPermission = async() => {
        await axios.post('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io/interest-update',{
            group_name: groupName,
            group_intro: groupIntro,
            group_image: imgFile,
        })
        .then(()=>{
            console.log("well done!");
        })
        .catch((error) => {
            console.log('An error occurred: ', error.response);
        })
    }

    // 완료 버튼 누르면 수행할 함수
    const onComplete = () => {
        groupPermission();
        alert("권한 신청이 완료되었습니다");
        toggleModal();
    };

    console.log(imgFile);
    console.log(groupName);
    console.log(groupIntro);

    return(
        <>
        {modal && (
            <Modal>
                <Overlay>
                <ModalContent>
                    <h2>단체 권한 신청</h2>
                    <Container>
                        <ImageForm>
                            <div className="upload">
                                <label>단체 대표 이미지</label>
                                <label htmlFor="file">
                                    <div className="btn-upload">첨부</div>
                                </label>
                                <input type="file" id="file" accept="image/*"
                                    onChange={saveImgFile} ref={imgRef}/>
                            </div>
                            <div className="imgBackground">
                                {
                                    imgFile ? <img src={imgFile}/> : "사진을 첨부해주세요"
                                }
                            </div>
                        </ImageForm>
                        <GroupNameForm>
                            <label>단체명</label>
                            <div>
                                <input type="text" placeholder="단체명을 입력해주세요" required
                                    onChange={(e)=>{setGroupName(e.target.value)}}/>
                            </div>
                        </GroupNameForm>
                        <GroupExplanation>
                            <label>단체 소개글</label>
                            <div>
                                <textarea rows="9" placeholder="단체의 정보(ex.소속,주된 활동 내용 등)에 대해 입력해주세요"
                                    onChange={(e)=>{setGroupIntro(e.target.value)}}/>
                            </div>
                        </GroupExplanation>
                        </Container>
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