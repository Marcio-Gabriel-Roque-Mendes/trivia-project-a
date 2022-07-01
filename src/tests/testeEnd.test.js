import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('', () => {
  const TOTAL = 40000;
  jest.setTimeout(TOTAL);

  it('Verifica se o button esta desabilitado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const campoName = screen.getByTestId('input-player-name');
    userEvent.type(campoName, 'Ada Love');

    const campoEmailGravatar = screen.getByTestId('input-gravatar-email');
    userEvent.type(campoEmailGravatar, 'adalove@email.com');

    const botaoPlay = await screen.findByRole('button', { name: /play/i });
    userEvent.click(botaoPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout: 3000 });

    const resposta = await screen.findByTestId('correct-answer', undefined, {
      timeout: 2000,
    });
    await waitFor(() => expect(resposta).toBeDisabled(), { timeout: 32000 });
  });
});
