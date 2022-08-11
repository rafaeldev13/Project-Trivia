import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback'
import userEvent from '@testing-library/user-event';
import App from '../App'

const INITIAL_STATE = {
    player: {
      name: 'tryber',
      assertions: 4,
      score: 0,
      gravatarEmail: 'tryber@teste.com',
    },
  };
  
  describe('Testando a página de Feedback', () => {
    it('Verifica se os componentes estão sendo renderizados na tela', () => {
      renderWithRouterAndRedux(<Feedback />);
  
      const feedbackMessage = screen.getByTestId('feedback-text');
      expect(feedbackMessage).toBeInTheDocument();

      const feedbackScore = screen.getByTestId('feedback-total-score');
      expect(feedbackScore).toBeInTheDocument();

      const feedbackAssertions = screen.getByTestId('feedback-total-question');
      expect(feedbackAssertions).toBeInTheDocument();

      const btnPlayAgain = screen.getByTestId('btn-play-again');
      expect(btnPlayAgain).toBeInTheDocument();

      const btnRanking = screen.getByTestId('btn-ranking');
      expect(btnRanking).toBeInTheDocument();
    });

    it('Verifica se a mensagem de feedback esta aparecendo conforme a quantidade de acertos', () => {
      renderWithRouterAndRedux(<Feedback/>, INITIAL_STATE);

      const feedbackMessage = screen.getByText("Well Done!");
        expect(feedbackMessage).toBeInTheDocument();
    });

    it('Verifica se as informações do usuário estão sendo renderizadas no Header', () => {
        renderWithRouterAndRedux(<Feedback />, INITIAL_STATE)

        const userName = screen.getByText(/tryber/i);
        expect(userName).toBeInTheDocument();

        const gravatarImage = screen.getByRole("img", { name: /user/i });
        expect(gravatarImage).toBeInTheDocument();
    })

    it('Verifica se ao clicar no botão Play Again a rota muda para "/"', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
        const btnPlayAgain = screen.getByTestId('btn-play-again');
        expect(btnPlayAgain).toBeInTheDocument();
        userEvent.click(btnPlayAgain)
        const { pathname } = history.location
        expect(pathname).toBe('/')
    })
    
    it('Verifica se ao clicar no botão Ranking a rota muda para "/ranking"', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
        const btnRanking = screen.getByTestId('btn-ranking');
        expect(btnRanking).toBeInTheDocument();
        userEvent.click(btnRanking)
        const { pathname } = history.location
        expect(pathname).toBe('/ranking')
    })
  });