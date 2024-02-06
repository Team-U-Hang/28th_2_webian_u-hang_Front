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
    margin: 10% 0% 0% 5%;
    border-radius: 5px;
    border-color: #3A4D39;
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

     const registerAll = async() => {
      try{
        const response = await axios
              .post('http://localhost:8080/posting' , {
                event_title: groupTitle,
                event_time: groupTime,
                event_date: groupPeriod,
                event_loc: groupLocation,
                event_type: groupField,
                event_text: groupContents,
                image_url: groupImage,
                timestamp: groupUploadtime
              });
            
              console.log("전달 완료",response.data);
              alert('내용조회'+response.data);
        }
      catch(error){
        console.log("error",error.response);
        alert('잘못됨');
      }
    }; 
 
  const onChange = (event) => {
    const { value, name } = event.target;

      setBoard({
        ...board,
        [name]: value,
      });

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

    registerAll();
    alert("데이터가 전송 완료되었습니다");

    navigate('/event-detail-personal', { state: { board } });
 
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
  
  const text = {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'baseline',
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
              <span style={{paddingLeft:'13px'}}>기간 &nbsp;</span>
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