import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';

const StarRating = ({rating, setRating}) => {
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>
                        <input 
                            type="radio"
                            name="rating" 
                            value={ratingValue} 
                            size={20}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: 'none' }}
                            
                        />
                        <FaStar 
                          className="star"
                          size={50}
                          color={ratingValue <= (hover || rating) ? "#ffc107" : "e4e5e9"}
                          onMouseEnter={() => {
                            if (hover === null) {
                                setHover(ratingValue);
                            }
                          }}
                          onMouseLeave={() => {
                            if (hover === null) {
                                setHover(null);
                            }
                          }}
                          onClick={() => {
                            setRating(ratingValue);
                            setHover(ratingValue);
                            
                          }}
                        />
                    </label>
                );
            })}
        </div>
    )
}

export default StarRating;