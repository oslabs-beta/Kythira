/**
 * @jest-environment jsdom
 */

// @testing-library/jest-dom is imported as part of the jest setup file (see jest.setup.ts)

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
// import {createMemoryHistory} from 'history';

import Signup from '../../../../src/components/login/Signup';

describe('Unit testing Signup component', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  });

  it('Should render email, username and password input fields', () => {
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('Should update the input fields when the user types', async () => {
    const user = userEvent.setup();
    const EM = screen.getByPlaceholderText('email') as HTMLInputElement;
    const UN = screen.getByPlaceholderText('username') as HTMLInputElement;
    const PW = screen.getByPlaceholderText('password') as HTMLInputElement;

    expect(EM.value).toBe('');
    expect(UN.value).toBe('');
    expect(PW.value).toBe('');

    await user.type(EM, 'emailTest');
    await user.type(UN, 'usernameTest');
    await user.type(PW, 'passwordTest');

    expect(EM.value).toBe('emailTest');
    expect(UN.value).toBe('usernameTest');
    expect(PW.value).toBe('passwordTest');
  });

  it('Should have a link to the login page', () => {
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('Should toggle the password\'s visbility', async () => {
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password');
    await user.click(screen.getByTestId('passwordToggle'));
    expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'text');
  });

  it('Should have a button to sign up', () => {
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  // it('Should show an error when a sign up fails', async () => {
  //     const user = userEvent.setup()
  //     const UN = screen.getByPlaceholderText('username') as HTMLInputElement;
  //     const PW = screen.getByPlaceholderText('password') as HTMLInputElement;

  //     expect(screen.queryByText('Error: Incorrect username or password')).toBeNull()
  //     expect(UN.value).toBe('')
  //     expect(PW.value).toBe('')

  //     await user.type(UN, 'usernameTest')
  //     await user.type(PW, 'passwordTest')

  //     await user.click(screen.getByText('Login'))

  //     await waitFor(() => {
  //         expect(UN.value).toBe('')
  //         expect(PW.value).toBe('')
  //         expect(screen.getByText('Error: Incorrect username or password')).toBeInTheDocument()
  //     })
  // })
});

/*
it should reroute the user if the signup is successful


it should navigate the user when the log in link is clicked
*/