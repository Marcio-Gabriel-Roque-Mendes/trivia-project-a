import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import Login from '../pages/Login';
import App from '../App';

describe('Teste do component Feedback', () => {
    it('Verifica se os elementos estão na tela', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        history.push('/feedback')

        const title = screen.getByRole('heading')
        expect(title).toBeInTheDocument();

        const imgGravatar = screen.getByRole('img')
        expect(imgGravatar).toBeInTheDocument();

        const playAgainButton = screen.getByRole('button', {  name: /play again/i})
        expect(playAgainButton).toBeInTheDocument();

        const rankingButton = screen.getByRole('button', {  name: /ranking/i})
        expect(rankingButton).toBeInTheDocument();
    })

    it('Verifica se ao clicar no botão Play Again, é redirecionado para a pagina de login', () => {
        const { history } = renderWithRouterAndRedux(<App />)

        history.push('/feedback')

        const playAgainButton = screen.getByRole('button', {  name: /play again/i})
        userEvent.click(playAgainButton)

        expect(history.location.pathname).toBe('/')

    })
    
    it('Verifica se ao clicar no botão Ranking, é redirecionado para a pagina de Ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        history.push('/feedback')

        const rankingButton = screen.getByRole('button', {  name: /ranking/i})
        userEvent.click(rankingButton)

        expect(history.location.pathname).toBe('/ranking')
    })

    it('Verifica se o heading: Could be better, esteja na tela', () => {
        const initialState = {
            player: {
                name: 'Player Name',
                assertions: 0,
                score: 0,
                gravatarEmail: 'player@email.com',
            }
          };
        const { history } = renderWithRouterAndRedux(<App />, initialState)
        
        history.push('/feedback');

        const heading = screen.getByText(/could be better\.\.\./i);
        expect(heading).toBeInTheDocument()
    });

    // player: { name: 'Player Name', gravatarEmail: 'player@email.com', score: 0, assertions: 0, } 

    it('Verifica se o heading: Well Done, esteja na tela', () => {
        const initialState = {
            player: {
                name: 'Player Name',
                assertions: 3,
                score: 0,
                gravatarEmail: 'player@email.com',
            }
          };
        const { history } = renderWithRouterAndRedux(<App />, initialState)
        
        history.push('/feedback');

        const heading = screen.getByText(/Well Done/i);
        expect(heading).toBeInTheDocument()
    })
})

// it('Acessando o FeedBack', async () => {
    //     const { history } = renderWithRouterAndRedux(<App />);
        
    //     const campoName = screen.getByTestId('input-player-name');
    //     userEvent.type(campoName, 'Ada Love')

    //     const campoEmailGravatar = screen.getByTestId('input-gravatar-email')
    //     userEvent.type(campoEmailGravatar, 'adalove@email.com');

    //     const botaoPlay = await screen.findByRole('button', {name: /play/i})
    //     userEvent.click(botaoPlay);

        
    //     const respostaCerta1 = await screen.findByTestId('correct-answer');
    //     userEvent.click(respostaCerta1)
    //     const nextButton = await screen.findByRole('button', {name: /next/i});
    //     userEvent.click(nextButton);

    //     const respostaCerta2 = await screen.findByTestId('correct-answer');
    //     userEvent.click(respostaCerta2)

    //     const respostaCerta3 = await screen.findByTestId('correct-answer');
    //     userEvent.click(respostaCerta3)
        
    //     const respostaCerta4 = await screen.findByTestId('correct-answer');
    //     userEvent.click(respostaCerta4)

    //     const respostaCerta5 = await screen.findByTestId('correct-answer');
    //     userEvent.click(respostaCerta5)
    // })