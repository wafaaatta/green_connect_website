// Register.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Register from '../pages/Auth/Register';
import '@testing-library/jest-dom'
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from './utils/mock_i18next'
import axiosHttp from '../utils/axios_client';
import User from '../interfaces/User';


describe('Register Component', () => {

    test('renders the register page', async () => {
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </I18nextProvider>
            </Provider>
        )

        expect(screen.getByLabelText('register.username')).toBeInTheDocument();
        expect(screen.getByLabelText('register.email')).toBeInTheDocument();
        expect(screen.getByLabelText('register.password')).toBeInTheDocument();
        expect(screen.getByLabelText('register.confirmPassword')).toBeInTheDocument();
        expect(screen.getByText('register.createAccount')).toBeInTheDocument();
    })

    it('should tell user if email already exists', async () => {
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'post').mockImplementation((url, data) => {
            const payload = data as { name: string, email: string, password: string }
            
            if(payload.email == 'test@example.com') {
                return Promise.reject({
                    response: {
                        data: {
                            message: 'Email already exists'
                        }
                    }
                })
            }

            return Promise.resolve({
                data: {
                    token: 'token',
                    user: {
                        email: payload.email,
                        id: 1,
                        name: payload.name,
                        created_at: '2020-01-01 00:00:00',
                        email_verified_at: '2020-01-01 00:00:00'
                    } as User
                }
            })
        })
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </I18nextProvider>
            </Provider>
        )

        const emailInput = screen.getByLabelText(/register.email/i);
        const passwordInput = screen.getByLabelText(/register.password/i);
        const confirmPasswordInput = screen.getByLabelText(/register.confirmPassword/i);
        const submitButton = screen.getByText(/register.createAccount/i);

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'Password123!@#');
        await userEvent.type(confirmPasswordInput, 'Password123!@#');
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email already exists')).toBeInTheDocument();
        })

        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, 'new@example.com');

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, 'Password123!@#');

        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, 'Password123!@#');
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(store.getState().auth_store.user).not.toBe(null);
        })
    })

    test('should inform user when passwords do not match ', async () => {
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </I18nextProvider>
            </Provider>
        )

        const emailInput = screen.getByLabelText(/register.email/i);
        const passwordInput = screen.getByLabelText(/register.password/i);
        const confirmPasswordInput = screen.getByLabelText(/register.confirmPassword/i);
        const submitButton = screen.getByText(/register.createAccount/i);

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password');
        await userEvent.type(confirmPasswordInput, 'password1');
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('register.errors.passwordMismatch')).toBeInTheDocument();
        })
    })

    test('if password does not meet requirements', async () => {
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'post').mockImplementation(() => Promise.resolve({
            data: {
                token: 'token',
                user: {
                    email: 'test@example.com',
                    id: 1,
                    name: 'test',
                    created_at: '2020-01-01 00:00:00',
                    email_verified_at: '2020-01-01 00:00:00'
                } as User
            }
        }))
        
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </I18nextProvider>
            </Provider>
        )

        const emailInput = screen.getByLabelText(/register.email/i);
        const passwordInput = screen.getByLabelText(/register.password/i);
        const confirmPasswordInput = screen.getByLabelText(/register.confirmPassword/i);
        const submitButton = screen.getByText(/register.createAccount/i);

        const validPassword = 'Password123!@#'
        const invalidPasswordTooShort = 'P@ss1'
        const invalidPasswordNoCapital = 'password123!@#'
        const invalidPasswordNoNumber = 'Password!@#'
        const invalidPasswordNoSpecial = 'Password123'
        const invalidPasswordNoChar = '123!@#'
        const invalidPasswordTooLong = 'Password123!@#1234567890'

        await userEvent.type(emailInput, 'test@example.com');

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, invalidPasswordTooShort);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, invalidPasswordTooShort);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('register.errors.passwordTooShort')).toBeInTheDocument();
        })

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, invalidPasswordTooLong);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, invalidPasswordTooLong);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('register.errors.passwordTooLong')).toBeInTheDocument();
        })


        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, invalidPasswordNoCapital);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, invalidPasswordNoCapital);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/register.errors.passwordNeedsCapital/i)).toBeInTheDocument();
        })

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, invalidPasswordNoNumber);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, invalidPasswordNoNumber);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('register.errors.passwordNeedsNumber')).toBeInTheDocument();
        })

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, invalidPasswordNoSpecial);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, invalidPasswordNoSpecial);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('register.errors.passwordNeedsSpecialChar')).toBeInTheDocument();
        })

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, invalidPasswordNoChar);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, invalidPasswordNoChar);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/register.errors.passwordNeedsChar/i)).toBeInTheDocument();
        })

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, validPassword);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, validPassword);
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(store.getState().auth_store.user).not.toBe(null);
        })
    })

});
