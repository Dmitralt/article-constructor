import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ArticleConstructor from './ArticleConstructor';
import Modal from './modal/Modal';
import HeaderBlock from './blocks/HeaderBlock/HeaderBlock';
import TextBlock from './blocks/TextBlock/TextBlock';
import ImageTextBlock from './blocks/ImageTextBlock/ImageTextBlock';

jest.mock('./modal/Modal', () => (props) => (
    <div data-testid="modal">{props.children}</div>
));
jest.mock('./blocks/HeaderBlock/HeaderBlock', () => (props) => (
    <div data-testid="header-block">{props.children}</div>
));
jest.mock('./blocks/TextBlock/TextBlock', () => (props) => (
    <div data-testid="text-block">{props.children}</div>
));
jest.mock('./blocks/ImageTextBlock/ImageTextBlock', () => (props) => (
    <div data-testid="image-text-block">{props.children}</div>
));

describe('ArticleConstructor Component', () => {
    afterEach(cleanup);

    test('renders Add Block buttons', () => {
        render(<ArticleConstructor />);
        expect(screen.getByText(/Add Header/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Text/i)).toBeInTheDocument();
        expect(screen.getByText(/Image Block Left/i)).toBeInTheDocument();
        expect(screen.getByText(/Image Block Right/i)).toBeInTheDocument();
    });

    test('can add header block', () => {
        render(<ArticleConstructor />);
        fireEvent.click(screen.getByText(/Add Header/i));
        const headerBlocks = screen.getAllByTestId('header-block');
        expect(headerBlocks.length).toBeGreaterThan(0);
    });

    test('can add text block', () => {
        render(<ArticleConstructor />);
        fireEvent.click(screen.getByText(/Add Text/i));
        const textBlocks = screen.getAllByTestId('text-block');
        expect(textBlocks.length).toBeGreaterThan(0);
    });

    test('can add image block left', () => {
        render(<ArticleConstructor />);
        fireEvent.click(screen.getByText(/Image Block Left/i));
        const imageTextBlocks = screen.getAllByTestId('image-text-block');
        expect(imageTextBlocks.length).toBeGreaterThan(0);
    });

    test('can add image block right', () => {
        render(<ArticleConstructor />);
        fireEvent.click(screen.getByText(/Image Block Right/i));
        const imageTextBlocks = screen.getAllByTestId('image-text-block');
        expect(imageTextBlocks.length).toBeGreaterThan(0);
    });

    test('opens modal on preview button click', () => {
        render(<ArticleConstructor />);
        fireEvent.click(screen.getByText(/Preview/i));
        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
});
