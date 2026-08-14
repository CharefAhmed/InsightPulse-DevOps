import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import DataContext from './context/DataContext';

test('renders App without crashing', () => {
  const mockContext = {
    isLoggedIn: false,
    userLoggedIn: '',
    handleLogOut: jest.fn(),
    analysedComments: [],
    posAnalysedComments: [],
    neuAnalysedComments: [],
    negAnalysedComments: [],
  };

  render(
    <MemoryRouter initialEntries={['/']}>
      <DataContext.Provider value={mockContext}>
        <App />
      </DataContext.Provider>
    </MemoryRouter>
  );
});
