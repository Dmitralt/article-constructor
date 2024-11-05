import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  afterEach(cleanup);

  test('renders the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Articles constructor/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the ArticleConstructor component', () => {
    render(<App />);
    const articleConstructorElement = screen.getByTestId('article-constructor');
    expect(articleConstructorElement).toBeInTheDocument();
  });
});

