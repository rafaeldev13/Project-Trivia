import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

import Ranking from '../pages/Ranking';
import App from '../App';
import rankingMock from './mock/rankingMock';

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => rankingMock),
    setItem: jest.fn(() => null)
  },
  writable: true
});

describe('testar page ranking', () => {
  it('verificar se o título ranking está aparencendo', () => {
    renderWithRouterAndRedux(<Ranking />);
    expect(screen.getByRole("heading", { name: /ranking/i })).toBeInTheDocument();
  })

  it('verificar se o botão leva pra rota /', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
    const button = screen.getByRole("button", { name: /voltar para home/i });;
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })
});