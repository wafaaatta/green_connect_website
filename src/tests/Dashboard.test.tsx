import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { setupMockupStore } from '../redux/mockup_store';
import { loginUser } from '../redux/mockup_stores/mockup_auth_store';

test('renders the user\'s name and profile link', async () => {
    const mockStore = setupMockupStore({
        auth_store: {
          isAuthenticated: true,
          loading: false,
          error: null,
          token: null,
          user: null,
        },
    })


    //   mockStore.dispatch(registerUser({ name: 'John Doe', email: 'XHn5w@example.com', password: 'password' }));
    await mockStore.dispatch(
        loginUser({
          email: 'XHn5w@example.com',
          password: 'password',
        })
    )

    
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>,
    
  );

//   expect(mockStore.dispatch).toHaveBeenCalled();

console.log(mockStore.getState().auth_store.user?.email);


    await waitFor(() => {
        expect(screen.getByText(/Welcome, XHn5w@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /go to profile/i })).toBeInTheDocument();
    });

});
