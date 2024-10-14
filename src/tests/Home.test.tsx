import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../pages/Home/Home'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { MemoryRouter } from 'react-router-dom'

test('home is rendered', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
            <HomePage />
            </MemoryRouter>
        </Provider>
    )

    const heading = screen.getByText('homePage.heroTitle')
    expect(heading).toBeInTheDocument()
})