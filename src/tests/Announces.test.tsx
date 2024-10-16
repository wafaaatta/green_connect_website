import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AnnouncesPage from '../pages/Announces/Announces';
import { store } from '../redux/store';
import axiosHttp from '../utils/axios_client';
import Announce from '../interfaces/Announce';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextMock from './utils/mock_i18next';

describe('Announces Component', () => {
    test('renders announces page', async () => { //Test de rendu //Test d'intégration
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'get').mockImplementation(() => Promise.resolve({
            data: [
                {
                    id: 1,
                    title: 'xcvb',
                    description: 'gsfgsfgsf',
                    city: 'City 1',
                    country: 'Country 1',
                    postal_code: 'Postal 1',
                    image: 'https://example.com/image1.jpg',
                    status: 'pending',
                    created_at: '2022-01-01T00:00:00.000Z',
                    category: 'category 1',
                    user: {
                        id: 1,
                        name: 'User 1',
                        email: 'XHn5w@example.com',
                        created_at: '2022-01-01T00:00:00.000Z'
                    }
                }
            ] as Announce[]
        }))
        const component = render(
            <React.StrictMode>
                <Provider store={store}>
                    <MemoryRouter>
                        <AnnouncesPage />
                    </MemoryRouter>
                </Provider>
            </React.StrictMode>
        )

        await waitFor(() => {
            expect(component.getByText(/xcvb/i)).toBeInTheDocument();
        })
    })

    test('should render empty message when there is no data', async () => { //Test Unitaire //Test de Rendu
        jest.mock('../utils/axios_client')
        jest.spyOn(axiosHttp, 'get').mockImplementation(() => Promise.resolve({
            data: []
        }))

        const component = render(
            <React.StrictMode>
                <I18nextProvider i18n={i18nextMock}>
                    <Provider store={store}>
                        <MemoryRouter>
                            <AnnouncesPage />
                        </MemoryRouter>
                    </Provider>
                </I18nextProvider>
            </React.StrictMode>
        )

        await waitFor(() => {
            expect(component.getByText(/postsPage.noPlants/i)).toBeInTheDocument();
        })
    })
})