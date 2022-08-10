import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import he from 'he';

import questionsMock from './mock/questionsMock';
import Game from '../pages/Game';
import App from '../App';

//mockar api
jest.spyOn(global, 'fetch');
global.fetch.mockResolvedValue({
  json: jest.fn().mockResolvedValue(questionsMock),
});

describe('testar component Game', () => {
  it('verifica se a pergunta está na tela', async () => {
    renderWithRouterAndRedux(<Game />);
    const renderedQuestion = await screen.findByText('Which city is the capital of Switzerland?');
    expect(renderedQuestion).toBeInTheDocument();
  });

  it('verifica se os botões estão na tela', async () => {
    renderWithRouterAndRedux(<Game />);
    await screen.findByText('Bern');
    await screen.findByText(he.decode('Z&uuml;rich'));
    await screen.findByText('Frankfurt');
    await screen.findByText('Wien');

    expect(screen.getByRole('button', {name: /Bern/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: he.decode('Z&uuml;rich')})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Frankfurt/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Wien/i})).toBeInTheDocument();
  });

  it('verifica se ao clicar em um botão, todos eles são desabilitados', async () => {
    renderWithRouterAndRedux(<Game />);
    await screen.findByText('Bern');
    await screen.findByText(he.decode('Z&uuml;rich'));
    await screen.findByText('Frankfurt');
    await screen.findByText('Wien');

    const firstButton = screen.getByRole('button', {name: /Bern/i});
    userEvent.click(firstButton);

    expect(firstButton).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', {name: he.decode('Z&uuml;rich')})).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', {name: /Frankfurt/i})).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', {name: /Wien/i})).toHaveProperty('disabled', true);
  });

  it('verifica se ao não clicar em nenhum botão, em 30s eles são desabilitados', async () => {
    jest.setTimeout(40000);
    renderWithRouterAndRedux(<Game />);
    await screen.findByText('Bern');

    await waitFor(() => {
      expect(screen.getByRole('button', {name: /Bern/i})).toHaveProperty('disabled', true);
      expect(screen.getByRole('button', {name: /Frankfurt/i})).toHaveProperty('disabled', true);
      expect(screen.getByRole('button', {name: /Frankfurt/i})).toHaveProperty('disabled', true);
      expect(screen.getByRole('button', {name: /Wien/i})).toHaveProperty('disabled', true);
    }, {interval: 40000, timeout: 40000});
  });

  it('verifica se ao clicar no botão next, a próxima pergunta é apresentada na tela', async () => {
    renderWithRouterAndRedux(<Game />);
    await screen.findByText('Bern');
    const firstButton = screen.getByRole('button', {name: /Bern/i});

    userEvent.click(firstButton);
    await screen.findByText('Next');
    const nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);

    expect(screen.findByText(he.decode('This movie contains the quote, &quot;Houston, we have a problem.&quot;')));
  })

  it('verifica se ao clicar no botão next, a próxima pergunta é apresentada na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {} , '/game');
    await screen.findByText('Bern');
    const firstButton = screen.getByRole('button', {name: /Bern/i});
    userEvent.click(firstButton);
    await screen.findByText('Next');
    let nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);

    await screen.findByText('Apollo 13');
    const secondButton = screen.getByRole('button', {name: /Apollo 13/i});
    userEvent.click(secondButton);
    await screen.findByText('Next');
    nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);

    await screen.findByText('1991');
    const thirdButton = screen.getByRole('button', {name: /1991/i});
    userEvent.click(thirdButton);
    await screen.findByText('Next');
    nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);

    await screen.findByText('Sonic the Hedgehog');
    const fourthButton = screen.getByRole('button', {name: /Sonic the Hedgehog/i});
    userEvent.click(fourthButton);
    await screen.findByText('Next');
    nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);

    await screen.findByText('Shamir');
    const fifthButton = screen.getByRole('button', {name: /Shamir/i});
    userEvent.click(fifthButton);
    await screen.findByText('Next');
    nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  })
})