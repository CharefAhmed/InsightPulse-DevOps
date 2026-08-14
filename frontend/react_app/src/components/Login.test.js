import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import DataContext from '../context/DataContext';

describe('Login component', () => {
  let mockContext;

  beforeEach(() => {
    // Reset our mock context before each test
    mockContext = {
      username: '',
      setUsername: jest.fn(),
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      handleLogin: jest.fn((e) => e.preventDefault()),
      handleSignUp: jest.fn((e) => e.preventDefault()),
    };
  });

  const renderLogin = () => {
    return render(
      <DataContext.Provider value={mockContext}>
        <Login />
      </DataContext.Provider>
    );
  };

  it('renders both the login and signup forms', () => {
    renderLogin();
    // Both headings should exist on the page
    expect(screen.getByRole('heading', { name: 'Se connecter' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Créer un compte' })).toBeInTheDocument();
  });

  it('calls handleLogin when the login form is submitted', () => {
    renderLogin();
    
    // There are two "Se connecter" buttons (one in the form, one in the toggle panel).
    // The first one is the submit button for the form.
    const loginSubmitBtn = screen.getAllByRole('button', { name: 'Se connecter' })[0];
    fireEvent.click(loginSubmitBtn);
    
    expect(mockContext.handleLogin).toHaveBeenCalledTimes(1);
  });

  it('calls setUsername when typing in the username input', () => {
    renderLogin();
    
    const usernameInput = screen.getByPlaceholderText("Nom d'utilisateur");
    fireEvent.change(usernameInput, { target: { value: 'alice' } });
    
    expect(mockContext.setUsername).toHaveBeenCalledWith('alice');
  });

  it('calls handleSignUp when the signup form is submitted', () => {
    renderLogin();
    
    // Similarly, find the specific "S'inscrire" button for form submission
    const signUpSubmitBtn = screen.getAllByRole('button', { name: /S'inscrire/i })[0];
    fireEvent.click(signUpSubmitBtn);
    
    expect(mockContext.handleSignUp).toHaveBeenCalledTimes(1);
  });
});
