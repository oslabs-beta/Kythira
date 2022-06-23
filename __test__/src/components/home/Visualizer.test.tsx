/**
 * @jest-environment jsdom
 */

// @testing-library/jest-dom is imported as part of the jest setup file (see jest.setup.ts)

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
// import {createMemoryHistory} from 'history';

import Visualizer from '../../../../src/components/home/Visualizer';

describe('Unit testing Visualizer component', () => {

    beforeEach(() => {
        render(
            <Visualizer />
        )
    });

    it('Should render a div', () => {
        expect(screen.getByTestId('tempID')).toBeInTheDocument();
    })

    // it('Should render email input', () => {
    //     expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
    // })

    // it('Should update the input field when the user types', async () => {
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

    // it('Should have a link to the login page', () => {
    //     expect(screen.getByText('Back to the log in page')).toBeInTheDocument()
    // })

    // it('Should have a button to send the reset link', () => {
    //     expect(screen.getByText('Send reset password link')).toBeInTheDocument()
    // })
})