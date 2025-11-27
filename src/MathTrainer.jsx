import React, { useState, useEffect } from 'react';
import './MathTrainer.css';

const MathTrainer = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const generateNewProblem = () => {
    const newNum1 = Math.floor(Math.random() * 50) + 1;
    const newNum2 = Math.floor(Math.random() * 50) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);
    } else {
      setIsCorrect(false);
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const resetStats = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    generateNewProblem();
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  return (
    <div className="math-trainer">
      <h1>Тренажёр по математике</h1>
      <div className="problem">
        <span>{num1} + {num2} = </span>
        <input
          type="number"
          value={userAnswer}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isCorrect !== null}
        />
      </div>
      
      <div className="controls">
        <button 
          onClick={checkAnswer} 
          disabled={isCorrect !== null || userAnswer === ''}
        >
          Проверить
        </button>
        <button onClick={generateNewProblem}>
          Следующий пример
        </button>
      </div>
      
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect 
            ? 'Правильно! 👍' 
            : `Неправильно. Правильный ответ: ${num1 + num2}`}
        </div>
      )}
      
      <div className="stats">
        <h2>Статистика:</h2>
        <p>Правильных ответов: {correctCount}</p>
        <p>Неправильных ответов: {incorrectCount}</p>
        <button onClick={resetStats} className="reset-btn">
          Сбросить статистику
        </button>
      </div>
    </div>
  );
};

export default MathTrainer;