import React, { useState } from 'react';
import './LearnMore.css'; // Import the CSS file
import Header from '../Header/Header';

const Faq = () => {
  const [isExpanded, setIsExpanded] = useState({});

  const toggleExpand = (index) => {
    setIsExpanded({ ...isExpanded, [index]: !isExpanded[index] });
  };

  const questions = [
    'How do I get started as a contributor?',
    'What kind of data can I upload as a contributor?',
    'How do I earn tokens, and how are they calculated?',
    'What kind of data can I upload as a contributor?',
    'How do I earn tokens, and how are they calculated?',
  ];

  return (
    <>
        <Header/>
    <div className="faq-container">
      <h2 className="faq-heading">Frequently asked questions</h2>
      <p className='faq-quote'>These are the most frequently asked questions to help you understand how the platform works and how to get the most out of it.</p>

      <ul>
        {questions.map((question, index) => (
          <li className='faq-list' key={index}>
            <div
              className={`faq-question ${isExpanded[index] ? 'expanded' : ''}`}
              onClick={() => toggleExpand(index)}
            >
              {question}
              <span className="arrow">{isExpanded[index] ? '▲' : '▼'}</span>
            </div>  
            {isExpanded[index] && (
              <div className="faq-answer">
                {/* Add your answer content here */}
                <p>Answer to the question: {question}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div></>

  );
};

export default Faq;