import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Login from '../pages/Login';

describe('Testes do component Login', () => {
    it('Verifique se os inputs e botões estão visiveis para o usuario', () => {
        const { history } = renderWithRouterAndRedux(<Login />)
        const campos = screen.getAllByRole('textbox')
        
        const campoName = campos[0]
        expect(campoName).toBeInTheDocument();

        const campoEmailGravatar = campos[1]
        expect(campoEmailGravatar).toBeInTheDocument()

        const botaoPlay = screen.getByRole('button', {name: /play/i})
        expect(botaoPlay).toBeInTheDocument();

        const botaoConf = screen.getByRole('button', {name: /configurações/i});
        expect(botaoConf).toBeInTheDocument();
    })
    // it('', () => {
    //     renderWithRouterAndRedux(<Login />);
    //     const campos = screen.getAllByRole('textbox')
        
    //     const campoName = campos[0];
    //     userEvent.type('Ada Love')

    //     const campoEmailGravatar = campos[1];
    // })
})