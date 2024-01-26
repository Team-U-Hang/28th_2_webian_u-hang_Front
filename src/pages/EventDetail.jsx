import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import COLOR from '../utils/color';
import StarRating from '../components/StarRating';
import { FaStar } from 'react-icons/fa';
import Profile from '../assets/profile.png'
import Thumb from '../assets/thumb.png'

const EventDetail = () => {

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const {board} = location.state;

  const [rating, setRating] = useState(null);
  const [showDetail, setShowDetail] = useState(true);

  const [review, setReview] = useState('');
  const [feedReviews, setFeedReviews] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const [recommendations, setRecommendations] = useState(() => (
    Array.from({ length: feedReviews.length }, () => ({ count: 0 }))
  ));

  const post = e => {
    const copyFeedReviews = [...feedReviews];
    copyFeedReviews.push(review);
    setFeedReviews(copyFeedReviews);
    setReview('');
  };

  const bodyStyle = {
    backgroundColor: COLOR.green,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const contentStyle = {
    backgroundColor: COLOR.white,
    width: '80%',
    padding: '0px 10px',
    minHeight: '100vh',
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    marginLeft:'20px'
  };

  const imageStyle = {
    padding: '20px 20px 30px 200px',
    width: '320px',
    height: '350px',
  };

  const textContainerStyle = {
    padding: '50px 10px 0px 10px',
    flexDirection: 'column',
    marginLeft: '50px',
    justifyContent: 'flex-start',
    textAlign: 'left'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyle = {
    backgroundColor: COLOR.white,
    color: COLOR.green,
    border: `1.7px solid ${COLOR.green}`,
    marginBottom: '20px',
    padding: '10px 18%',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
  };
  const buttonStyle2 = {
    margin: '20px 20px 0px 20rem',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.green,
    color: COLOR.white,
    fontSize: '15px',
    fontWeight: '500',
    padding: '10px 20px',
    borderRadius: '10px',
  };
  
  const fieldItemStyle = {
    border: '1px solid black',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '3px 7px',
    margin: '2px'
  };

  const hoverStyle = {
    backgroundColor: COLOR.green,
    color: COLOR.white,
  };

  const averageStar = {
    zIndex: '1',
    margin: '0px 10% 20px 10%',
    paddingBottom: '20px',
    fontSize: '20px',
    fontWeight: '700',
    borderBottom: `2px solid ${COLOR.green}`
  };

  const reviewbuttonStyle = {
    ...buttonStyle,
    ...buttonStyle2,
    position: 'absolute',
    top: '74%',
    left: '52%',
    zIndex: '2'
  };


  const handleSubmit = () => {
    if (userRating === null) {
      alert('별점을 선택해주세요.');
      return;
    }
  
    const newReview = {
      rating: userRating,
      text: review,
    };

    setFeedReviews(prevReviews => [...prevReviews, newReview]);
    setRecommendations(prevRecommendations => [
      ...prevRecommendations,
      { count: 0 },
    ]);
  
    setReview('');
    setUserRating(null);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

  return averageRating;
};
const averageRating = calculateAverageRating(feedReviews);

const handleRecommendationClick = (reviewIndex) => {
  setRecommendations((prevRecommendations) => {
    const updatedRecommendations = [...prevRecommendations];
    updatedRecommendations[reviewIndex] = {
      count: updatedRecommendations[reviewIndex].count + 1
    };
    return updatedRecommendations;
  });
};

  return (
    <div style={bodyStyle}>
      <div style={contentStyle}>  
        <div style={headerStyle}>
          <div style={{ display: 'flex' }}>
            <img
              src={board.image}
              alt="Your Image"
              style={imageStyle}
            />
            <div style={textContainerStyle}>
              <h1>{board.title}</h1>
              <br />
              기간 &nbsp; {board.period}<br />
              <br />
              시간 &nbsp; {board.time}<br />
              <br />
              장소 &nbsp; {board.location}<br />
              <br />
              분야 &nbsp; {board.field.map((item, index) => (
                <span key={index} style={fieldItemStyle}>
                {item}
              </span>
            ))}<br />
              <button 
                style={{...buttonStyle, ...buttonStyle2}} 
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? "찜취소" : "찜하기"}
              </button>
            </div>
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button
            style={{ ...buttonStyle, ...(showDetail && hoverStyle), borderTopRightRadius: '0'}}
            onClick={() => setShowDetail(true)}
          >
            상세정보
          </button>
          <button
            style={{ ...buttonStyle, ...(!showDetail && hoverStyle),  borderTopLeftRadius: '0'}}
            onClick={() => setShowDetail(false)}
          >
            후기
          </button>
        </div>

        {showDetail ? (
          <div>
            {board.contents}
          </div>
        ) : (
          <div>
            {[...Array(Math.round(averageRating))].map(() =>{
              return <FaStar size={50} color="#ffc107"/>;
            })}
            {[...Array(5-Math.round(averageRating))].map(() =>{
              return <FaStar size={50} color="#b3b3b3"/>;
            })}
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'0% 10%', padding: '1% 4%',borderBottom: `2px solid ${COLOR.green}` }}>               
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
                  style={{ width: '80%', padding: '15px 10px', marginTop: '5px', borderRadius: '5px', border: `2px solid ${COLOR.green}`}}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isValid ? false : true}
                  style={{reviewbuttonStyle, marginLeft: '20px', top:'50%'}}
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
                  {recommendations[i] ? recommendations[i].count : 0}</span>
                </div>
                  <div style={{display: 'flex', alignItems: 'center', margin:'1% 5%'}}>
                    
                    {`${reviewObj.text}`}
                    </div>  

                  <button style ={{
                    ...buttonStyle, 
                    ...buttonStyle2, 
                    padding: '5px 10px', 
                    margin:'10px 10px 10px 55rem'
                  }} 
                  onClick={() => {
                    handleRecommendationClick(i)
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
