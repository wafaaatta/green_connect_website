import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import {  store } from '../redux/store';
import Login from '../pages/Auth/Login';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './utils/mock_i18next'
import axiosHttp from '../utils/axios_client';
import User from '../interfaces/User';
import userEvent from '@testing-library/user-event';
describe('Login Component', () => {
    test('renders login form', async () => {
        render(
            <React.StrictMode>
                <I18nextProvider i18n={i18next}>
                    <Provider store={store}>
                        <MemoryRouter >
                            <Login />
                        </MemoryRouter>
                    </Provider>
                </I18nextProvider>
            </React.StrictMode>
        )

        expect(screen.getByText('login.loginButton')).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    })

    test('should login successfully and redirect to home', async () => {
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'post').mockImplementation(() => {
            
            return Promise.resolve({
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
            })
        })
        
        render(
            <React.StrictMode>
                <I18nextProvider i18n={i18next}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <Login />
                        </BrowserRouter>
                    </Provider>
                </I18nextProvider>
            </React.StrictMode>
        )

        const emailInput = screen.getByLabelText(/login.email/i);
        const passwordInput = screen.getByLabelText(/login.password/i);
        const submitButton = screen.getByText(/login.loginButton/i)

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password');

        await userEvent.click(submitButton);
        
        await waitFor(() => {
            expect(store.getState().auth_store.isAuthenticated).toBe(true);
            expect(store.getState().auth_store.user?.email).toBe('test@example.com')
        })

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        })
    })

    test('register text button should navigate to register page', async () => {
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </I18nextProvider>
            </Provider>
        )

        const registerLink = screen.getByText("login.joinGreenConnect");
        await userEvent.click(registerLink);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/auth/register');
        })
        
    })

    test('should show if email is incorrect', async () => {
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'post').mockImplementation(() => {
            
            return Promise.reject({
                response: {
                    data: {
                        message: 'Email is incorrect'
                    }
                }
            })
        })

        render(
            <React.StrictMode>
                <I18nextProvider i18n={i18next}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <Login />
                        </BrowserRouter>
                    </Provider>
                </I18nextProvider>
            </React.StrictMode>
        )

        const emailInput = screen.getByLabelText(/login.email/i);
        const passwordInput = screen.getByLabelText(/login.password/i);
        const submitButton = screen.getByText(/login.loginButton/i)

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password');

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email is incorrect')).toBeInTheDocument();
        })
        
    })

    test('should show if password is incorrect', async () => {
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'post').mockImplementation(() => {
            
            return Promise.reject({
                response: {
                    data: {
                        message: 'Password is incorrect'
                    }
                }
            })
        })

        render(
            <React.StrictMode>
                <I18nextProvider i18n={i18next}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <Login />
                        </BrowserRouter>
                    </Provider>
                </I18nextProvider>
            </React.StrictMode>
        )

        const emailInput = screen.getByLabelText(/login.email/i);
        const passwordInput = screen.getByLabelText(/login.password/i);
        const submitButton = screen.getByText(/login.loginButton/i)

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password');

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Password is incorrect')).toBeInTheDocument();
        })
        
    })
})
