import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/navBar";
import styled from 'styled-components';
import COLOR from '../utils/color';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SDatePicker = styled(DatePicker)`
    width: 70%;
    padding: 7%;
    margin: 10% 0% 0% 6%;
    border-radius: 5px;
    border-color: #3A4D39;
  `;

const CheckboxWrapper = styled.input`
  cursor: pointer;
  appearance: none;
  width: 1.1rem;
  height: 1.1rem;
  background-color: #3A4D39;
  border-radius: 0.1rem;

/* checked 상태일 때 스타일 */
  &:checked {
    background-color: #3A4D39;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }
`;

const EventRegister = () => {

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [board, setBoard] = useState({
    groupTitle: '',
    groupTime: '',
    groupPeriod: new Date(),
    groupLocation: '',
    groupField: [], 
    groupContents: '',
    groupImage: '',
    groupUploadtime: new Date()
  });

  const { groupTitle, groupPeriod, groupTime, groupLocation, groupField, groupContents, groupImage, groupUploadtime} = board;

  const fieldIds = { 
    1: '공과대학',
    2: '이과대학',
    3: '문과대학',
    4: '사회과학대학',
    5: '생활과학대학',
    6: '법과대학',
    7: '경상대학',
    8: '음악대학',
    9: '약학대학',
    10: '미술대학',
    11: '기초교양대학',
    12: '글로벌융합대학',
    13: '글로벌서비스학부',
    14: '영어영문학부',
    15: '미디어학부',
    16: '동아리',
  };

     const registerAll = async() => {
      try{
        const accessToken = localStorage.getItem('accessToken')
        console.log('토큰:',accessToken)
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          /* 'Content-type': 'application/json' */
        };
        console.log('토큰:',accessToken)
        const response = await axios.post('http://localhost:8080/posting' ,
              
              setBoard( () => ({
                event_title: groupTitle,
                event_time: groupTime,
                event_date: groupPeriod,
                event_loc: groupLocation,
                event_type: groupField,
                event_text: groupContents,
                /* image_url: groupImage, */
                timestamp: groupUploadtime
              })),
              {headers}
              );

              /*  */
            
              console.log("전달 완료",response.data);
              alert('내용조회'+response.data);
        }
      catch(error){
        if (error.response) {
          // 서버 응답은 왔지만 에러 응답이 있는 경우
          console.log('error', error.response);
        } else if (error.request) {
          // 서버 응답이 없는 경우 (요청이 전송되지 않았거나 응답이 없는 경우)
          console.log('error', error.request);
        } else {
          // 기타 다른 에러가 있는 경우
          console.log('error', error.message);
        }
        alert('잘못됨');
      }
    }; 

  const onChange = (event) => {
    const { value, name, type, checked } = event.target;

    if (type === 'checkbox') {
      const fieldId = parseInt(value, 10);

      // 기존 체크 유무 확인
      const isChecked = groupField.includes(fieldId);

      // 체크되어 있으면 제거, 없으면 추가
      const updatedFields = isChecked
        ? groupField.filter((f) => f !== fieldId)
        : [...groupField, fieldId];

      setBoard({
        ...board,
        groupField: updatedFields,
      });

      console.log('분야 상태:', updatedFields);

    } else {
      setBoard({
        ...board,
        [name]: value,
      });
    }

  };
  

  const imageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          /* const maxWidth = 100;
          const maxHeight = 500; */

          let newWidth = img.width;
          let newHeight = img.height;
  
          /* if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }
  
          if (img.height > maxHeight) {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          } */
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const resizedImage = canvas.toDataURL('image');

          setBoard({
            ...board,
            groupImage: resizedImage,
          });
        };
      };

      reader.readAsDataURL(selectedImage);
      console.log('리사이징된 이미지:', resizedImage);
    }
  };

  const saveBoard = () => {
    // 필수 입력 필드 확인
    if (!groupTitle || !groupPeriod || !groupTime ||!groupLocation) {
      alert('제목, 기간, 시간, 장소는 필수 입력 항목입니다.');
      return;
    }

    /* if (groupImage) {
      console.log('이미지 업로드:', image);
    } */

    console.log('등록되었습니다.', board);

    /* registerAll(); */
    alert("데이터가 전송 완료되었습니다");

    navigate('/event-detail', { state: { board } });
 
  };

  const body = {
    backgroundColor: COLOR.green,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh'
  };

  const content = {
    backgroundColor: COLOR.white,
    width: '80%',
    minHeight: '100vh',
    padding: '3rem 10px',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const write = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0px 10px 0px',
    marginLeft: '20px',
    width:'100%',
  };

  const topwrite = {
    display: 'flex'
  };
  
  const input = {
    width: '70%',
    padding: '5% 1%',
    margin: '5% 0% 0% 10% ',
    borderRadius: '5px',
    alignItems:'flex-end',
    borderColor: COLOR.green
  };
  
  

  const input2 = {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    borderRadius: '5px',
    borderColor: COLOR.green
  }

  const fileInput = {
    display: 'none',
  };

  const fileInputLabel = {
    backgroundColor: COLOR.green,
    color: COLOR.white,
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: groupImage ? '15' : '0', 
    position: 'relative',
    top: '40%',
    right:'7%',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  };
  
  const selectedImage = {
    width: '250px',
    height: groupImage ? '300px' : '0', 
    objectFit: 'contain',
    marginBottom: groupImage ? '0' : '20px', 
    borderRadius: '5px',
    marginRight: groupImage ? '50px' : '0',
  };
  
  const checkbox = {
    margin: '3px 7px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    cursor:'pointer'
  };
  

  
  const allcheck = {
    marginBottom: '1%',
    padding: '0px 9%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  };
  
  const text = {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  };  

  const text2 = {
    color: 'grey',
    paddingTop: '1%'
  };

  const button = {
    backgroundColor: COLOR.beige,
    color: COLOR.green,
    border:'none',
    borderRadius: '10px',
    width: '7%',
    marginTop: '1rem',
    marginLeft: '65%',
    padding: '8px 0px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px'
  };

  const textarea = {
    justifyContent: 'center',
    width: '65%',
    height: '200px',
    marginTop: '1%',
    padding: '1%',
    resize: 'none',
    border: `2px solid ${COLOR.green}`, 
    borderRadius: '8px', 
    overflow: 'auto'
  };
  
  return (
    <div style={body}>
      <NavBar/>
      <form style={content}>
        <div style={write}>
          <div style={topwrite}>
            <div /* style={{ flex: '1'}} */>
              {groupImage ? (
              <img
                src={groupImage}
                alt="Selected"
                style={selectedImage}
              />
              ) : (
              <>
              <input
                type="file"
                accept="image/*"
                onChange={imageChange}
                style={fileInput}
                id="imageInput"
              />
              <label htmlFor="imageInput" style={fileInputLabel}>
                파일 선택
              </label>
              </>
              )}
            </div>
            <div style={write}>
              {error && <div style={error}>{error}</div>}
              <div>
              <input
                type="text"
                name="groupTitle"
                value={groupTitle}
                onChange={onChange}
                style={input2}
                placeholder="제목을 입력하세요"
              />
              </div>
              <div style={text}>
              <span style={{alignItems:'baseline', marginLeft:'10px'}}>기간 &nbsp;</span>
              {/* <input 
                type="text"
                name="groupPeriod"
                value={groupPeriod}
                onChange={onChange}
                style={input}
              /> */}
              <SDatePicker
                selected={groupPeriod}
                onChange={(date) => setBoard({ ...board, groupPeriod: date })}
                selectsStart
                startDate={groupPeriod}
                endDate={groupPeriod}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
              </div>
              <div style={text}>
              <span >시간 </span>
              <input
                type="text"
                name="groupTime"
                value={groupTime}
                onChange={onChange}
                style={input}
              />
              </div>
              <div style={text}>
              <span>장소 </span>
              <input
                type="text"
                name="groupLocation"
                value={groupLocation}
                onChange={onChange}
                style={input}
              />
              </div>
            </div>
          </div>
          <div style={{display:'flex'}}>
            <span style={{text, margin: '1% 10px'}}>분야</span>
            <span style={text2}>
              해당하는 키워드를 모두 선택해주세요. ex) IT학회동아리 : 공과대학, 동아리
            </span>
            <br />
          </div>
          <div style={allcheck}>
            {Object.entries(fieldIds).map(([fieldId, fieldName], index) => (
              <React.Fragment key={fieldId}>
                <label style={checkbox}>
                  <CheckboxWrapper /* input */
                    type="checkbox"
                    name="groupField"
                    value={fieldId}
                    id={fieldId}
                    checked={groupField.includes(parseInt(fieldId))}
                    onChange={onChange}
                  />
                  {fieldName}
                </label>
                {index % 9 === 8 && <br />}
              </React.Fragment>
            ))}
          </div>
          <textarea
            name="groupContents"
            value={groupContents}
            onChange={onChange}
            style={textarea}
            placeholder="내용을 입력하세요"
          ></textarea>
          <button style={button} onClick={saveBoard}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRegister;