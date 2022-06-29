import React from 'react';
import PropTypes from 'prop-types';
import { getQuestion } from '../services/fethApiTrivia';
import { getToken } from '../services/saveToken';
import './CardGame.css';

class CardGame extends React.Component {
  state = {
    questions: [],
    isClicked: false,
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
      this.setState({ questions: response.results });
    }
  }

  handleButtonClick = () => {
    this.setState({ isClicked: true });
  }

  render() {
    const { questions, isClicked } = this.state;
    const SORT_NUMBER = 0.5;
    return (
      <div>
        <p>Meu Jogo</p>

        {
          questions.length && (
            <div>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{questions[0].question}</p>
              <div data-testid="answer-options">
                {
                  [questions[0].correct_answer, ...questions[0]
                    .incorrect_answers]
                    .map((question, index) => (
                      <button
                        key={ index }
                        type="button"
                        data-testid={
                          index
                            ? `wrong-answer-${index - 1}`
                            : 'correct-answer'
                        }
                        onClick={ this.handleButtonClick }
                        className={ isClicked && (
                          index ? 'wrong-answer' : 'correct-answer') }
                      >
                        {question}
                      </button>
                    ))
                    .sort(() => SORT_NUMBER - Math.random())
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
