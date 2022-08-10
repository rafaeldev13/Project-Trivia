import React from "react";
import App from '../App'
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import userEvent from "@testing-library/user-event";

describe('Testando o componente Login', () => {

    it('Testa se o input de email e nome aparecem na tela, e os botões de Play e Configurações', () => {
        renderWithRouterAndRedux(<App />);

        const email = screen.getByTestId('input-gravatar-email');
        const nome = screen.getByTestId('input-player-name');
        ;
        const buttonPlay = screen.getByRole('button', { name: /Play/i, });
        const buttonConfiguracoes = screen.getByRole('button', { name: /Configurações/i, });

        expect(buttonPlay).toBeInTheDocument();
        expect(buttonConfiguracoes).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(nome).toBeInTheDocument()
    })

    it('Verifica se é a rota /', () => {
        const { history } = renderWithRouterAndRedux(<App />);
         expect(history.location.pathname).toBe('/');
       });


    it('Verifica se ao ciclar no botão play ele redireciona para a rota game', async () => {
        const { history } = renderWithRouterAndRedux(<App />)
        const email = screen.getByTestId('input-gravatar-email');
        const nome = screen.getByTestId('input-player-name');
        userEvent.type(email, 'grupo23')
        userEvent.type(nome, 'grupo23')
        const button = screen.getByRole('button', { name: /Play/i, });
        userEvent.click(button)
        await screen.findByText('0');
        const { pathname } = history.location;
        expect(pathname).toBe('/game')

    })

    it('Verifica se ao ciclar no botão Configurações ele redireciona para a rota Configurações', () => {
        const { history } = renderWithRouterAndRedux(<App />)

        const button = screen.getByRole('button', { name: /Configurações/i, });
        userEvent.click(button)

        expect(history.location.pathname).toBe('/Configurações')

    })

    it(`Teste se o input do email possui um PLaceHolder 
    com o texto: Email`,
    
    () => {
        renderWithRouterAndRedux(<App />);
      const email = screen.getByPlaceholderText(/Email/i);
      expect(email).toBeInTheDocument();
    });
  
    it(`Teste se o input do campo senha possui um PLaceHolder 
    com o texto: EmailEmail`,
    () => {
        renderWithRouterAndRedux(<App />);
      const inputSenha = screen.getByPlaceholderText(/Email/i);
      expect(inputSenha).toBeInTheDocument();
    });
    it ('Verifica se o botão é desabilitado quando o email e o nome estão vazios', () => {
        renderWithRouterAndRedux(<App />);
    
        const email = screen.getByTestId("input-gravatar-email")
        const nome = screen.getByTestId("input-player-name")
        const button = screen.getByRole('button', {
          name: 'Play'
        });
    
        userEvent.type(email, '')
        expect(button).toHaveProperty('disabled', true);
        userEvent.type(nome, '')
        expect(button).toHaveProperty('disabled', true);
      })
      
});
