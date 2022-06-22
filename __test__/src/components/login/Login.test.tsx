/**
 * @jest-environment jsdom
 */

// @testing-library/jest-dom is imported as part of the jest setup file (see jest.setup.ts)

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Router } from 'react-router-dom';
// import {createMemoryHistory} from 'history';

import Login from '../../../../src/components/login/Login';
import App from '../../../../src/app';

describe('Unit testing Login component', () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        )
    });

    it('Should render username and password input fields', () => {
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
    })

    it('Should update the input fields when the user types', async () => {
        const user = userEvent.setup()
        const UN = screen.getByPlaceholderText('username') as HTMLInputElement;
        const PW = screen.getByPlaceholderText('password') as HTMLInputElement;

        expect(UN.value).toBe('')
        expect(PW.value).toBe('')

        await user.type(UN, 'usernameTest')
        await user.type(PW, 'passwordTest')

        expect(UN.value).toBe('usernameTest')
        expect(PW.value).toBe('passwordTest')
    })

    it('Should have links to forgotPassword and Signup', () => {
        expect(screen.getByText('Forgot password?')).toBeInTheDocument()
        expect(screen.getByText('Sign up')).toBeInTheDocument()
    })

    it('Should toggle the password\'s visbility', async () => {
        const user = userEvent.setup()
        expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password')
        await user.click(screen.getByTestId('passwordToggle'))
        expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'text')
    })

    it('Should have a button to log in', () => {
        expect(screen.getByText('Login')).toBeInTheDocument()
    })

    it('Should show an error when a login fails', async () => {
        const user = userEvent.setup()
        const UN = screen.getByPlaceholderText('username') as HTMLInputElement;
        const PW = screen.getByPlaceholderText('password') as HTMLInputElement;

        expect(screen.queryByText('Error: Incorrect username or password')).toBeNull()
        expect(UN.value).toBe('')
        expect(PW.value).toBe('')

        await user.type(UN, 'usernameTest')
        await user.type(PW, 'passwordTest')

        await user.click(screen.getByText('Login'))

        await waitFor(() => {
            expect(UN.value).toBe('')
            expect(PW.value).toBe('')
            expect(screen.getByText('Error: Incorrect username or password')).toBeInTheDocument()
        })
    })
})

// xdescribe('Testing Login component links', () => { 
//     beforeEach(() => {
//         render(
//             <App />
//         )
//     });

//     it('Should navigate the user when the forgot password link is clicked', async () => {
//         const user = userEvent.setup()
//         await user.click(screen.getByText('Forgot password?'))

//         // expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
//         await waitFor(() => {
//             expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
//         })
//     })

//     it('Should navigate the user when the sign up link is clicked', async () => {
//         const user = userEvent.setup()
//         await user.click(screen.getByText('Sign up'))

//         await waitFor(() => {
//             expect(screen.getByText('Create an account')).toBeInTheDocument();
//         })
//     })

//     // it('Should navigate the user when the login is successful', async () => {
//     //     const user = userEvent.setup()
//     //     await user.click(screen.getByText('Login'))
//     // })
// })