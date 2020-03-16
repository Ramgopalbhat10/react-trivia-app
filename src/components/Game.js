import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

export default function Game({ history }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadQuestions()
      .then(questions => setQuestions(questions))
      .catch(console.error);
  }, []);

  const changeQuestion = useCallback(
    (bonus = 0) => {
      if (questions.length === 0) {
        setDone(true);
        return setScore(score + bonus);
      }

      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      const currentQuestion = questions[randomQuestionIndex];
      const remainingQuestions = [...questions];
      remainingQuestions.splice(randomQuestionIndex, 1);

      setQuestions(remainingQuestions);
      setCurrentQuestion(currentQuestion);
      setLoading(false);
      setScore(score + bonus);
      setQuestionNumber(questionNumber + 1);
    },
    [
      score,
      questions,
      questionNumber,
      setScore,
      setQuestions,
      setCurrentQuestion,
      setLoading,
      setQuestionNumber
    ]
  );

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [currentQuestion, questions, changeQuestion]);

  const scoreSaved = () => {
    history.push("/");
  };

  return (
    <>
      {loading && <div id="loader" />}
      {!loading && !done && (
        <HUD score={score} questionNumber={questionNumber} />
      )}
      {!done && currentQuestion && (
        <>
          <Link className="back" to="/">
            Back
          </Link>
          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
          />
        </>
      )}
      {/* {!done && !loading && <p>NOT DONE</p>} */}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
}
