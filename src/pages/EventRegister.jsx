import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/navBar";
import COLOR from '../utils/color';

const EventRegister = () => {

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [board, setBoard] = useState({
    title: '',
    time: '',
    period: '',
    location: '',
    field: [], 
    contents: '',
    image: '',
  });

  const { title, period, time, location, field, contents, image } = board;

  const fieldIds = { 
    '1': '공과대학',
    '2': '이과대학',
    '3': '문과대학',
    '4': '사회과학대학',
    '5': '생활과학대학',
    '6': '법과대학',
    '7': '경상대학',
    '8': '음악대학',
    '9': '약학대학',
    '10': '미술대학',
    '11': '기초교양대학',
    '12': '글로벌융합대학',
    '13': '글로벌서비스학부',
    '14': '영어영문학부',
    '15': '미디어학부',
    '16': '동아리',
  };
  
 
  const onChange = (event) => {
    const { value, name, type, checked } = event.target;

    if (type === 'checkbox') {
      const updatedFields = checked
        ? [...field, value]
        : field.filter((f) => f !== value);

      setBoard({
        ...board,
        field: updatedFields,
      });
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
            image: resizedImage,
          });
        };
      };

      reader.readAsDataURL(selectedImage);
      console.log('리사이징된 이미지:', resizedImage);
    }
  };

  const saveBoard = () => {
    // 필수 입력 필드 확인
    if (!title || !period || !time ||!location) {
      alert('제목, 기간, 시간, 장소는 필수 입력 항목입니다.');
      return;
    }

    /* if (image) {
      console.log('이미지 업로드:', image);
    } */

    console.log('등록되었습니다.', board);

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
    padding: '10px 60px',
    marginLeft:'20px'
  };

  const topwrite = {
    display: 'flex'
  };
  
  const input = {
    width: '70%',
    padding: '7px',
    marginTop: '20px',
    borderRadius: '5px',
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
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: image ? '15' : '0', 
  };
  
  const selectedImage = {
    width: '250px',
    height: image ? '300px' : '0', 
    objectFit: 'contain',
    marginBottom: image ? '0' : '20px', 
    borderRadius: '5px',
  };
  
  const checkbox = {
    margin: '10px 7px',
    alignItems: 'center'
  };
  
  const allcheck = {
    margin: '5px 0px', 
  };
  
  const text = {
    fontWeight: 'bold',
    margin: '5px 10px',
  };

  const text2 = {
    color: 'grey',
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
    width: '50rem',
    padding: '7px',
    height: '200px',
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
            <div style={{ flex: '1'}}>
              {image ? (
              <img
                src={image}
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
                name="title"
                value={title}
                onChange={onChange}
                style={input2}
                placeholder="제목을 입력하세요"
              />
              </div>
              <div style={text}>
              <span>기간 </span>
              <input
                type="text"
                name="period"
                value={period}
                onChange={onChange}
                style={input}
              />
              </div>
              <div style={text}>
              <span>시간 </span>
              <input
                type="text"
                name="time"
                value={time}
                onChange={onChange}
                style={input}
              />
              </div>
              <div style={text}>
              <span>장소 </span>
              <input
                type="text"
                name="location"
                value={location}
                onChange={onChange}
                style={input}
              />
              </div>
            </div>
          </div>
          <div>
            <span style={text}>분야</span>
            <span style={text2}>
              해당하는 키워드를 모두 선택해주세요. ex) IT학회동아리 : 공과대학, 동아리
            </span>
            <br />
          </div>
          <div style={allcheck}>
            {Object.entries(fieldIds).map(([fieldId, fieldName], index) => (
              <React.Fragment key={fieldId}>
                <label style={checkbox}>
                  <input
                    type="checkbox"
                    name="field"
                    value={fieldId}
                    id={fieldId}
                    checked={field.includes(fieldId)}
                    onChange={onChange}
                  />
                  {fieldName}
                </label>
                {index % 9 === 8 && <br />}
              </React.Fragment>
            ))}
          </div>
          <textarea
            name="contents"
            value={contents}
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