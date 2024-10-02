// LoginPage.test.tsx
import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Auth/Login';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import { MemoryRouter, RouterProvider } from 'react-router-dom';
import router from '../router';
import { PersistGate } from 'redux-persist/integration/react';
import Register from '../pages/Auth/Register';

/* const mockupValidatePassword = jest.fn(
  (password: string) => {
    const regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
    return regx.test(password);
  }
);

test('renders the register form and validates input', async () => {
  const { getByText, getByTestId, getByLabelText } = render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    </PersistGate>
  );
  
  expect(getByText('Create Account')).toBeTruthy();
  expect(getByLabelText('Email')).toBeTruthy();
  expect(getByLabelText('Password')).toBeTruthy();

  const passwordInput = getByTestId('password-input')


  fireEvent.change(passwordInput, { target: { value: 'al' } });
  fireEvent.blur(passwordInput);

  expect(passwordInput).not.toBeInvalid();

  fireEvent.change(passwordInput, { target: { value: 'ali' } });
  fireEvent.blur(passwordInput);

  await waitFor(() => expect(passwordInput).toBeInvalid());

  const error = passwordInput.getAttribute('data-invalid');
  if (error) {
    console.error(error);
  }
}); */


test('test valid login', async () => {
  const store = mockStore
  const { getByText, getByTestId, getByLabelText, getByRole } = render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    </PersistGate>
  );
  
  expect(getByText('Login')).toBeTruthy();
  expect(getByLabelText('Email')).toBeTruthy();
  expect(getByLabelText('Password')).toBeTruthy();

  // Simulate login
  fireEvent.click(getByRole('button', { name: /login/i }));
  const emailInput = getByLabelText('Email');

  fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
  fireEvent.blur(emailInput);

  expect(emailInput).not.toBeInvalid();

  fireEvent.change(getByLabelText('Password'), { target: { value: 'test' } });
  fireEvent.blur(getByLabelText('Password'));

  // Simulate login
  fireEvent.click(getByRole('button', { name: /login/i }));
  

  // Check for redirection
  expect(location.pathname).toBe('/');
})


