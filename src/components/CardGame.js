import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../services/fethApiTrivia';
import { getToken } from '../services/saveToken';
import './CardGame.css';
import { score } from '../store/Actions';

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
    const CORRECT = 'correct-answer';
    const token = getToken();
    const response = await getQuestion(token);
    if (response.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const SORT_NUMBER = 0.5;
      const answerReceived = response.results.map((result) => [
        {
          answer: result.correct_answer,
          className: CORRECT,
          dataTestId: CORRECT,
          difficulty: result.difficulty,
        },
        ...result.incorrect_answers.map((wrong, i) => ({
          answer: wrong,
          className: 'wrong-answer',
          dataTestId: `wrong-answer-${i}`,
          difficulty: result.difficulty,
        })),
      ].sort(() => SORT_NUMBER - Math.random()));
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

  handleButtonClick = (item) => {
    clearInterval(this.intervalId);
    const difficultyValue = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const POINT = 10;
    const { dispatchScore } = this.props;
    const { secondsAmount } = this.state;
    const { className, difficulty } = item;
    if (className === 'correct-answer') {
      const valor = POINT + (secondsAmount * difficultyValue[difficulty]);
      dispatchScore(valor);
    }
    console.log(item);
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
                        onClick={ () => this.handleButtonClick(question) }
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
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (state) => dispatch(score(state)),
});

export default connect(null, mapDispatchToProps)(CardGame);
