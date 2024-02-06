import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import COLOR from '../utils/color';
import NavBar from "../components/navBar";
import StarRating from '../components/StarRating';
import { FaStar } from 'react-icons/fa';
import Profile from '../assets/profile.png'
import Thumb from '../assets/thumb.png'
import SookMyung from '../assets/sookmyung.jpg'
import axios from "axios";

const EventDetail = () => {

  const [visible, setVisible] = useState(false); //글자 변경
  const [likeStatus, setLikeStatus] = useState(false); // 찜하기 여부 저장 변수
  const location = useLocation();
  const {board} = location.state; // board 추출 후 사용

  /* //기존 관심사 받아오기
  const [board, setBoard] = useState({
    groupId: '',
    groupTitle: '',
    groupTime: '',
    groupPeriod: new Date(),
    groupLocation: '',
    groupField: [], 
    groupContents: '',
    groupImage: '',
    groupUploadtime: new Date()
  }); //백 */

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios
                .get('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io/interest'+ "/event-detail/"/* +  {event_id}*/);

              console.log('groupPeriod:', board.groupPeriod);
              console.log('groupUploadtime:', board.groupUploadtime);

              setBoard((prevBoard) => ({
                ...prevBoard,
                groupId: response.data.groupId,
                groupTitle: response.data.groupTitle,
                groupTime: response.data.groupTime,
                groupPeriod: new Date(response.data.groupPeriod),
                groupLocation: response.data.groupLocation,
                groupField: response.data.groupField,
                groupContents: response.data.groupContents,
                groupImage: response.data.groupImage,
                /* groupUploadtime: response.data.groupUploadtime ? new Date(response.data.groupUploadtime) : null */
            }));
              console.log("good",response.data)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  },[]);

  /* const [rating, setRating] = useState(null); */
  const [showDetail, setShowDetail] = useState(true); // 토글용 변수

  const [userRating, setUserRating] = useState(null); // 사용자 별점 저장 변수
  const [review, setReview] = useState(); // 후기 입력 관리 변수_입력하고 등록할 때마다 초기화
  const [feedReviews, setFeedReviews] = useState([]); // 후기 목록 저장 변수_새로운 후기 계속 담김
  const [isValid, setIsValid] = useState(false); // 후기 유효 상태 확인 변수
  const [reviewId, setReviewId] = useState(1); // 초기값은 1 //이것도..넘겨주시는건가..?



  //작성한 후기 전송
   /*  useEffect(() => { */
      const regReview = async() => {
        try{
          const response = await axios
            .post('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io',{
            review_id: reviewId,
            my_rev_text: review,
            my_rev_rate: userRating,
          });
          console.log("well done!",response.data);
      }
      catch(error) {
          console.log('An error occurred: ', error.response);
          alert('리뷰 등록X');
      }
    };
  /*   regReview();
  }) */

  // 후기 목록 받기
  useEffect(() => {
    const reviewData = async () => {
      try {
        const response = await axios
          .get('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io'+ "/event-detail/"/* +  {event_id}*/);

          setFeedReviews((prevReviews) => ({
            ...prevReviews,
            my_rev_text: review,
            my_rev_rate: userRating,
          }));
          setFeedReviews([...response.data.my_interest]);
        } catch (error) {
            console.error('후기 못 받음', error.response);
        }
    };
    reviewData();
  },[]);

// 찜 여부 전송
useEffect(() => {
  const sendLikeStatus = async (likestatus) => {
    try {
      const response = await axios.post('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io', {
        event_id: board.groupId, 
        is_register: likestatus,
      });
      console.log('찜 전송', response.data);
    } catch (error) {
      console.error('Error sending like status:', error.response);
    }
  };
  sendLikeStatus();
},[]);

const handleLikeClick = () => {
  const newLikeStatus = !likeStatus;
  setLikeStatus(newLikeStatus); // 상태 업데이트
  sendLikeStatus(newLikeStatus); // 백엔드로 전송
};

// 후기 작성 폼 제출
  const handleSubmit = () => {  
    if (userRating === null) {
      alert('별점을 선택해주세요.');
      return;
    }
    // 새 후기 객체 생성
    const newReview = {
      rating: userRating,
      text: review,
    };

    setReviewId((prevId) => prevId + 1);

    //기존 목록에 추가 + 추천수 0
    setFeedReviews(prevReviews => [...prevReviews, newReview]);
    setRecommends(prevRecommends => [
      ...prevRecommends,
      { count: 0 },
    ]);
    //추가 후 후기 및 별점 초기화
    setReview('');
    setUserRating(null);

    registerReview(newReview);
  };


  const calculateAverageRating = (reviews) => { // 후기에서 평점 계산 함수

    //후기가 없을 경우 0 반환
    if (reviews.length === 0) {
      return 0;
    }
    //평점 계산
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };
  //전체 평점
  const averageRating = calculateAverageRating(feedReviews);

  // 후기 수 만큼의 배열 생성 후 추천 수 각각 저장 
  const [recommends, setRecommends] = useState(() => (
    Array.from({ length: feedReviews.length }, () => ({ count: 0 , isRecommended: false}))
  ));

  const handleRecommendClick = async (reviewIndex) => {
    try {
      const updatedRecommends = [...recommends];
      const currentReview = updatedRecommends[reviewIndex];

      /* // 추천은 1번만 가능
      if (!currentReview.isRecommended) {
        // 서버로 추천 여부 전송
        await axios.post('https://3002977a-a5eb-412a-af38-97496707f6f7.mock.pstmn.io', {
          review_id: reviewIndex,
          is_comment_like: true,
        });

        // 상태 업데이트
        updatedRecommends[reviewIndex] = {
          ...currentReview,
          count: currentReview.count + 1,
          isRecommended: true,
        };
        console.log('서버 응답:', '성공');
      } else {
        alert("이미 추천한 후기입니다.");
      } */
      if (!currentReview.isRecommended) {
        currentReview.count += 1;
        currentReview.isRecommended = true;
      } else {
        alert("이미 추천함");
      }

      // 상태 업데이트
      setRecommends(updatedRecommends);
    } catch (error) {
      console.error('추천 여부 전송 X', error.response);
    }
  };

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

  const body = {
    backgroundColor: COLOR.green,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  };
  const content = {
    backgroundColor: COLOR.white,
    width: '80%',
    minHeight: '100vh',
    padding: '3rem 10px',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const header = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    marginLeft:'20px'
  };
  const image = {
    padding: '20px 20px 30px 200px',
    width: '320px',
    height: '350px',
  };
  const textContainer = {
    padding: '50px 10px 0px 10px',
    flexDirection: 'column',
    marginLeft: '50px',
    justifyContent: 'flex-start',
    textAlign: 'left'
  };
  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
  };
  const button = {
    backgroundColor: COLOR.white,
    color: COLOR.green,
    border: `1.7px solid ${COLOR.green}`,
    marginBottom: '20px',
    padding: '10px 18%',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600'
  };
  const button2 = {
    margin: '20px 20px 0px 20rem',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.green,
    color: COLOR.white,
    fontSize: '15px',
    fontWeight: '500',
    padding: '10px 20px',
    borderRadius: '10px',
  };
  
  const fieldItem = {
    border: '1px solid black',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '3px 7px',
    margin: '2px'
  };
  const hover = {
    backgroundColor: COLOR.green,
    color: COLOR.white,
  };
  const averageStar = {
    margin: '0px 10% 20px 10%',
    paddingBottom: '20px',
    fontSize: '20px',
    fontWeight: '700',
    borderBottom: `2px solid ${COLOR.green}`,
    display: 'flex', 
    justifyContent: 'center'
  };
  const reviewbutton = {
    ...button,
    ...button2,
    /* position: 'absolute', */
    /* top: '74%',
    left: '52%', */
    zIndex: '2',
    marginLeft: '20px', /* top:'50%' */
  };
  const writereview = { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin:'0% 10%', 
    padding: '1% 4%',
    borderBottom: `2px solid ${COLOR.green}` 
  };
  const contentstyle = {
    justifyContent:'flex-start', 
    paddingLeft:'10%',
    paddingRight: '10%'
  };
  const reviewtextarea = { 
    width: '80%', 
    padding: '15px 10px', 
    marginTop: '5px', 
    borderRadius: '5px', 
    border: `2px solid ${COLOR.green}`
  }
  const uploadTime = board.groupUploadtime
  ? board.groupUploadtime.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    })
  : null;

  return (
    <div style={body}>
      <NavBar/>
      <div style={content}>  
        <div style={header}>
          <div style={{ display: 'flex' }}>
            {board.groupImage ? (
              <img
              src={board.groupImage}
              alt='이미지'
              style={image}
              />
              ) : (   
              <img
                src={SookMyung}
                alt='대체이미지'
                style={image}
              />
            )}
            <div style={textContainer}>
              <h2>{board.groupTitle}</h2>
              <br /> {board.groupId}
              기간 &nbsp; {board.groupPeriod.toISOString().slice(0, 10)}<br />
              <br />
              시간 &nbsp; {board.groupTime}<br />
              <br />
              장소 &nbsp; {board.groupLocation}<br />
              <br />
              분야 &nbsp; {board.groupField.sort((a, b) => parseInt(a) - parseInt(b)) // id값이 작은 순서대로 정렬
                          .map((fieldId, index) => (
                  <span key={index} style={fieldItem}>
                    {fieldIds[fieldId]}
                  </span>
              ))}<br />

              <button 
                style={{...button, ...button2}} 
                onClick={handleLikeClick}
              >
                {likeStatus ? "찜취소" : "찜하기"}
              </button>
              <div style={{display:'column', color: 'grey', fontSize: '14px', marginTop: '10px', justifyContent: 'flex-end'}}>
              {uploadTime}
              </div>
            </div>
          </div>
        </div>
        <div style={buttonContainer}>
          <button
            style={{ ...button, ...(showDetail && hover), borderRadius: '7px 0 0 0'}}
            onClick={() => setShowDetail(true)}
          >
            상세정보
          </button>
          <button
            style={{ ...button, ...(!showDetail && hover), borderRadius: '0 7px 0 0',}}
            onClick={() => setShowDetail(false)}
          >
            후기
          </button>
        </div>

        {showDetail ? (
          <div style={contentstyle}>
            {board.groupContents.split('\n').map((paragraph, index) => (
              <div key={index}>{paragraph} <br /></div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            {[...Array(Math.round(averageRating))].map(() =>{
              return <FaStar size={50} color="#ffc107"/>;
            })}
            {[...Array(5-Math.round(averageRating))].map(() =>{
              return <FaStar size={50} color="#b3b3b3"/>;
            })}
            </div>
            <div style={averageStar}>
              {averageRating.toFixed(1)}/5 
            </div>
            {setReview && (
              <div>
                <div style={{margin:'0% 10%', display: 'flex'}}>
                <div style={{ marginRight: '10px' }}>
                    <img
                      type="profile"
                      src={Profile}
                      alt="프로필 사진"
                      style={{ width: '50px', height: '50px', }}
                    />
                  </div>
                  <StarRating setRating={setUserRating} />
                </div>
                <div style={writereview}>               
                  <input
                    type="text"
                    className="inputReview"
                    placeholder="후기를 작성하세요"
                    onChange={e => {
                      setReview(e.target.value);
                    }}
                    onKeyUp={e => {
                      e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
                    }}
                    value={review}
                    style={reviewtextarea}
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isValid ? false : true}
                    style={{reviewbutton, }}
                  >
                    후기 작성
                  </button>
                </div>
              </div>
            )}
            {feedReviews.length > 0 && (
              <div style={{ textAlign: 'left', marginTop: '20px'}}>
                {feedReviews.map((reviewObj, i) => (
                  <div style={{display: 'flex', paddingLeft:'10px'}}>
                    <div key={i} style={{ margin: '0px 10% 20px 10%', borderBottom: `2px solid ${COLOR.green}` }}>
                      <div style={{display:'flex'}}>
                        <div style={{ marginRight: '10px' }}>
                          <img
                            type="profile"
                            src={Profile}
                            alt="프로필 사진"
                            style={{ width: '40px', height: '40px'}}
                          />
                        </div>
                        <div>
                          {[...Array(reviewObj.rating)].map(() =>{
                              return <FaStar size={30} color="#ffc107"/>;
                          })}
                          {[...Array(5-reviewObj.rating)].map(() =>{
                              return <FaStar size={30} color="#b3b3b3"/>;
                          })}
                        </div>
                        <span style={{ marginLeft: '10px' }}>
                          <img
                            src={Thumb}
                            alt="추천"
                            style={{ width: '20px', height: '20px', padding:'5px 3px 0px 3px'}}
                          />
                          {recommends[i] ? recommends[i].count : 0}</span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', margin:'1% 5%'}}>
                        {`${reviewObj.text}`}
                      </div>
                      <button style ={{
                        ...button, 
                        ...button2, 
                        padding: '5px 10px', 
                        margin:'10px 10px 10px 55rem'
                      }} 
                        onClick={() => {
                          handleRecommendClick(i)
                        }}
                        >
                        {visible ? "취소" : "추천"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default EventDetail;