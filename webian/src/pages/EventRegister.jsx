import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import COLOR from '../utils/color';

const EventRegister = () => {

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [board, setBoard] = useState({
    title: '',
    time: '',
    period: '',
    location: '',
    contents: '',
    field: [], 
    image: '',
  });

  const { title, period, time, location, field, contents, image } = board;

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

  const onImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          const maxWidth = 100;
          const maxHeight = 500;

          let newWidth = img.width;
          let newHeight = img.height;
  
          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }
  
          if (img.height > maxHeight) {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          }
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const resizedImage = canvas.toDataURL('image/jpeg');

          setBoard({
            ...board,
            image: resizedImage,
          });
        };
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const saveBoard = () => {
    // 필수 입력 필드 확인
    if (!title || !period || !time ||!location) {
      setError('제목, 기간, 시간, 장소는 필수 입력 항목입니다.');
      return;
    }

    if (image) {
      console.log('이미지 업로드:', image);
    }

    console.log('등록되었습니다.', board);

    navigate('/event-detail', { state: { board } });
 
  };

  const bodyStyle = {
    backgroundColor: COLOR.green,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const contentStyle = {
    backgroundColor: COLOR.white,
    width: '80%',
    minHeight: '100vh',
    padding: '10px'
  };

  const writeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 60px',
    marginLeft:'20px'
  };

  const topwriteStyle = {
    display: 'flex'
  };
  
  const inputStyle = {
    width: '70%',
    padding: '7px',
    marginTop: '20px',
    borderRadius: '5px',
    borderColor: COLOR.green
  };

  const inputStyle2 = {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    borderRadius: '5px',
    borderColor: COLOR.green
  }

  const fileInputStyle = {
    display: 'none',
  };

  const fileInputLabelStyle = {
    backgroundColor: COLOR.green,
    color: COLOR.white,
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const selectedImageStyle = {
    width: '70%',
    maxHeight: '200px', 
    objectFit: 'contain', 
    marginBottom: '20px',
    borderRadius: '5px',
    
  };
  
  const checkboxStyle = {
    margin: '10px 7px',
    alignItems: 'center'
  };
  
  const allcheck = {
    margin: '5px 0px', 
  };
  
  const textStyle = {
    fontWeight: 'bold',
    margin: '5px 10px',
  };

  const textStyle2 = {
    color: 'grey',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '5px',
  };

  const buttonStyle = {
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

  const textareaStyle = {
    justifyContent: 'center',
    width: '70%',
    padding: '7px',
    height: '200px',
    resize: 'none',
    border: `2px solid ${COLOR.green}`, 
    borderRadius: '8px', 
    overflow: 'auto'
  };

  
  return (
    <div style={bodyStyle}>
      <form style={contentStyle}>
        <div style={writeStyle}>
        <div style={topwriteStyle}>
      <div style={{ flex: '1', marginTop:'8rem' }}>
        {image ? (
          <img
            src={image}
            alt="Selected"
            style={selectedImageStyle}
          />
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={fileInputStyle}
              id="imageInput"
            />
            <label htmlFor="imageInput" style={fileInputLabelStyle}>
              파일 선택
            </label>
          </>
        )}
      </div>
      <div style={writeStyle}>
        {error && <div style={errorStyle}>{error}</div>}
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            style={inputStyle2}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div style={textStyle}>
          <span>기간 </span>
          <input
            type="text"
            name="period"
            value={period}
            onChange={onChange}
            style={inputStyle}
          />
        </div>
        <div style={textStyle}>
          <span>시간 </span>
          <input
            type="text"
            name="time"
            value={time}
            onChange={onChange}
            style={inputStyle}
          />
        </div>
        <div style={textStyle}>
          <span>장소 </span>
          <input
            type="text"
            name="location"
            value={location}
            onChange={onChange}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
          <div>
            <span style={textStyle}>분야</span>
            <span style={textStyle2}>
              해당하는 키워드를 모두 선택해주세요. ex) IT학회동아리 : 공과대학, 동아리
            </span>
            <br />
          </div>
          <div style={allcheck}>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="공과대학"
                checked={field.includes('공과대학')}
                onChange={onChange}
              />
              공과대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="이과대학"
                checked={field.includes('이과대학')}
                onChange={onChange}
              />
              이과대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="문과대학"
                checked={field.includes('문과대학')}
                onChange={onChange}
              />
              문과대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="사회과학대학"
                checked={field.includes('사회과학대학')}
                onChange={onChange}
              />
              사회과학대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="생활과학대학"
                checked={field.includes('생활과학대학')}
                onChange={onChange}
              />
              생활과학대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="법과대학"
                checked={field.includes('법과대학')}
                onChange={onChange}
              />
              법과대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="경상대학"
                checked={field.includes('경상대학')}
                onChange={onChange}
              />
              경상대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="음악대학"
                checked={field.includes('음악대학')}
                onChange={onChange}
              />
              음악대학
            </label>
            <br/>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="약학대학"
                checked={field.includes('약학대학')}
                onChange={onChange}
              />
              약학대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="미술대학"
                checked={field.includes('미술대학')}
                onChange={onChange}
              />
              미술대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="기초교양대학"
                checked={field.includes('기초교양대학')}
                onChange={onChange}
              />
              기초교양대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="글로벌융합대학"
                checked={field.includes('글로벌융합대학')}
                onChange={onChange}
              />
              글로벌융합대학
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="글로벌서비스학부"
                checked={field.includes('글로벌서비스학부')}
                onChange={onChange}
              />
              글로벌서비스학부
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="영어영문학부"
                checked={field.includes('영어영문학부')}
                onChange={onChange}
              />
              영어영문학부
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="미디어학부"
                checked={field.includes('미디어학부')}
                onChange={onChange}
              />
              미디어학부
            </label>
            <label style={checkboxStyle}>
              <input
                type="checkbox"
                name="field"
                value="동아리"
                checked={field.includes('동아리')}
                onChange={onChange}
              />
              동아리
            </label>
          </div>
        </div>
        <div>
          <textarea
            name="contents"
            value={contents}
            onChange={onChange}
            style={textareaStyle}
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <button style={buttonStyle} onClick={saveBoard}>
          등록
        </button>
      </form>
    </div>
  );
};

export default EventRegister;
