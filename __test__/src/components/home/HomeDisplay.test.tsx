/**
 * @jest-environment jsdom
 */

// @testing-library/jest-dom is imported as part of the jest setup file (see jest.setup.ts)

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
// import {createMemoryHistory} from 'history';

import HomeDisplay from '../../../../src/components/home/HomeDisplay';

describe('Unit testing HomeDisplay component', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomeDisplay />
      </BrowserRouter>
    );
  });

  it('Should have links to the login, signup, and password pages', () => {
    expect(screen.getByText('Back to the log in page')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('Should render the navigator and visualizer components', () => {
    expect(screen.getByText('Active pods below')).toBeInTheDocument();
    expect(screen.getByTestId('tempID')).toBeInTheDocument();
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

  // it('Should update the input fields when the user types', async () => {
  //     const user = userEvent.setup()
  //     const EM = screen.getByPlaceholderText('email') as HTMLInputElement;
  //     const UN = screen.getByPlaceholderText('username') as HTMLInputElement;
  //     const PW = screen.getByPlaceholderText('password') as HTMLInputElement;

  //     expect(EM.value).toBe('')
  //     expect(UN.value).toBe('')
  //     expect(PW.value).toBe('')

  //     await user.type(EM, 'emailTest')
  //     await user.type(UN, 'usernameTest')
  //     await user.type(PW, 'passwordTest')

  //     expect(EM.value).toBe('emailTest')
  //     expect(UN.value).toBe('usernameTest')
  //     expect(PW.value).toBe('passwordTest')
  // })
});