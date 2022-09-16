import './App.css';

import { ChangeEvent, useRef, useState } from 'react';

import { quizData } from './data';

function App() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const ref = useRef<(EventTarget & HTMLInputElement) | null>(null);

  const currentQuizData = quizData[currentQuiz];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === currentQuizData.correct) {
      setCorrectAnswer(e.target.value);
    }

    ref.current = e.target;
  };

  const handleSubmit = () => {
    if (correctAnswer) {
      setScore(score + 1);
      setCurrentQuiz(currentQuiz + 1);
    }

    if (!ref.current) return;
    ref.current.checked = false;
  };

  return (
    <div className="quiz-container">
      {currentQuiz < quizData.length ? (
        <>
          <div className="quiz-header">
            <h2 id="question">{currentQuizData.question}</h2>
            <ul>
              {['a', 'b', 'c', 'd'].map(id => (
                <li key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="answer"
                    className="answer"
                    value={id}
                    onChange={handleChange}
                  />

                  <label htmlFor={id}>
                    {currentQuizData[id as 'a' | 'b' | 'c' | 'd']}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button id="submit" onClick={handleSubmit}>
            Submit
          </button>
        </>
      ) : (
        <>
          <h2>
            You answered correctly at {score}/{quizData.length} questions.
          </h2>
          <button onClick={() => location.reload()}>Reload</button>
        </>
      )}
    </div>
  );
}

export default App;
