import React from 'react';
import '../styles/PersonalInfoCard.css';

const PersonalInfoCard = () => {
  const firstName = "אביגיל";
  const lastName = "סטחי";
  const birthYear = 2005; 

  // חישוב הגיל
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  // פונקציה לטיפול בלחיצת כפתור
  const handleButtonClick = () => {
    console.log(`${firstName} ${lastName}`);
  };

  return (
    <div className="personal-info-card">
      <h2>פרטים אישיים</h2>
      <p><strong>שם מלא:</strong> {firstName} {lastName}</p>
      <p><strong>שנת לידה:</strong> {birthYear}</p>
      <p><strong>גיל:</strong> {age}</p>
      <button onClick={handleButtonClick} className="console-button">
        הדפס שם לקונסול
      </button>
    </div>
  );
};

export default PersonalInfoCard;