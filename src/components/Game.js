import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Question from './Question';
import { loadQuestions } from '../helpers/QuestionsHelper';
import HUD from './HUD';
import SaveScoreForm from './SaveScoreForm';

export default class Game extends Component {

  state = {
    questions: null,
    currentQuestion: null,
    loading: true,
    score: 0,
    questionNumber: 0,
    done: false
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();
      console.log(questions);
      this.setState({
        questions
      }, () => {
        this.changeQuestion();
      });
    } catch (error) {
      console.error(error);
    }
  }

  changeQuestion = (bonus = 0) => {
    const { questions } = this.state;

    if (questions.length === 0) {
      return this.setState(prevState => ({
        done: true,
        score: prevState.score + bonus
      }));
    }

    const randomQuestionIndex = Math.floor(Math.random() * questions.length);

    const currentQuestion = questions[randomQuestionIndex];

    const remainingQuestions = [...questions];
    remainingQuestions.splice(randomQuestionIndex, 1);

    this.setState((prevState) => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: prevState.score += bonus,
      questionNumber: prevState.questionNumber + 1
    }))
  }

  render() {
    const { score, questionNumber, currentQuestion, loading, done } = this.state;

    return (
      <>
        {loading && <div id="loader"></div>}
        {!loading && !done && <HUD
          score={score}
          questionNumber={questionNumber}
        />}
        {!done && currentQuestion && (
          <>
            <Link className="back" to="/">Back</Link>
            <Question
              question={currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}
        {/* {!done && !loading && <p>NOT DONE</p>} */}
        {done && <SaveScoreForm score={score} />}
      </>
    )
  }
}
