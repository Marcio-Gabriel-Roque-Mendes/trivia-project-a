import React from 'react';
import PropTypes from 'prop-types';
import { getQuestion } from '../services/fethApiTrivia';
import { getToken } from '../services/saveToken';
import './CardGame.css';

class CardGame extends React.Component {
  state = {
    questions: [],
    answers: [],
    isClicked: false,
    secondsAmount: 30,
    timeOver: false,
  }

  async componentDidMount() {
    const { history } = this.props;
    const ERROR_CODE = 3;
    const token = getToken();
    const response = await getQuestion(token);
    if (response.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      // const INCORRECT = 'wrong-answer';
      const SORT_NUMBER = 0.5;
      const answerReceived = response.results.map((result) => [
        {
          answer: result.correct_answer,
          className: 'correct-answer',
          dataTestId: 'correct-answer',
          difficulty: result.difficulty,
        },
        ...result.incorrect_answers.map((wrong, i) => ({
          answer: wrong,
          className: 'wrong-answer',
          dataTestId: `wrong-answer-${i}`,
        })),
      ].sort(() => SORT_NUMBER - Math.random()));
      // const answerReceived = [
      //   {
      //     answer: response.results[0].correct_answer,
      //     className: 'correct-answer',
      //     dataTestId: 'correct-answer',
      //   },
      //   {
      //     answer: response.results[0].incorrect_answers[0],
      //     className: INCORRECT,
      //     dataTestId: 'wrong-answer-0',
      //   },
      //   {
      //     answer: response.results[0].incorrect_answers[1],
      //     className: INCORRECT,
      //     dataTestId: 'wrong-answer-1',
      //   },
      //   {
      //     answer: response.results[0].incorrect_answers[2],
      //     className: INCORRECT,
      //     dataTestId: 'wrong-answer-2',
      //   },
      // ].sort(() => SORT_NUMBER - Math.random());
      this.setState({ questions: response.results, answers: answerReceived });
    }
    this.startTimer();
  }

  componentDidUpdate() {
    const { secondsAmount } = this.state;
    if (secondsAmount === 0) {
      this.handleTimeOver();
    }
  }

  handleTimeOver = () => {
    clearInterval(this.intervalId);
    this.setState({
      secondsAmount: 'Over',
      timeOver: true,
      isClicked: true,
    });
  };

  handleButtonClick = () => {
    clearInterval(this.intervalId);
    this.setState({ isClicked: true });
  }

  startTimer = () => {
    const ONE_SECOND_IN_MS = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        secondsAmount: prevState.secondsAmount - 1,
        firstTime: false,
      }));
    }, ONE_SECOND_IN_MS);
  };

  sortOneTime = (array) => {
    const { firstTime } = this.state;
    const SORT_NUMBER = 0.5;
    const arraySorted = array.sort(() => SORT_NUMBER - Math.random());
    if (firstTime) {
      this.arraySaved = [...arraySorted];
      return arraySorted;
    }
    return this.arraySaved;
  }

  render() {
    const { questions, isClicked, secondsAmount, timeOver, answers } = this.state;
    return (
      <div>
        <p>Meu Jogo</p>
        <span>{String(secondsAmount).padStart(2, '0')}</span>
        {
          questions.length && (
            <div>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{questions[0].question}</p>
              <div data-testid="answer-options">
                {
                  answers[0].map((question) => (
                    question.answer
                    && (
                      <button
                        key={ question.dataTestId }
                        type="button"
                        data-testid={ question.dataTestId }
                        onClick={ this.handleButtonClick }
                        disabled={ timeOver }
                        className={ isClicked ? question.className : undefined }
                        difficulty={ question.difficulty }
                      >
                        {question.answer}
                      </button>
                    )
                  ))

                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
// Só para commitar
CardGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CardGame;
