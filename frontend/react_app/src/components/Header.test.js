import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import DataContext from '../context/DataContext';

// Helper to render Header with a custom context value
const renderHeader = (contextValue, props = {}) => {
  return render(
    <MemoryRouter>
      <DataContext.Provider value={contextValue}>
        <Header {...props} />
      </DataContext.Provider>
    </MemoryRouter>,
  );
};

describe('Header component', () => {
  it('should always render the InsightPulse logo/brand name', () => {
    renderHeader({ isLoggedIn: false, handleLogOut: jest.fn(), userLoggedIn: '' });
    expect(screen.getByText('InsightPulse')).toBeInTheDocument();
  });

  describe('when showRightContent is true (navigation visible)', () => {
    it('should show the "Se connecter" login link when user is NOT logged in', () => {
      renderHeader(
        { isLoggedIn: false, handleLogOut: jest.fn(), userLoggedIn: '' },
        { showRightContent: true },
      );
      expect(screen.getByRole('link', { name: /se connecter/i })).toBeInTheDocument();
    });

    it('should show welcome message and Log out button when user IS logged in', () => {
      renderHeader(
        { isLoggedIn: true, handleLogOut: jest.fn(), userLoggedIn: 'Alice' },
        { showRightContent: true },
      );
      expect(screen.getByText(/bienvenue, alice/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /log out/i })).toBeInTheDocument();
    });
  });

  describe('when title prop is provided', () => {
    it('should render the title and a "Retour" back button', () => {
      renderHeader(
        { isLoggedIn: false, handleLogOut: jest.fn(), userLoggedIn: '' },
        { title: 'Import des données' },
      );
      expect(screen.getByText('Import des données')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retour/i })).toBeInTheDocument();
    });
  });
});
