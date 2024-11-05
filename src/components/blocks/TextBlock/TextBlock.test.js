import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TextBlock from './TextBlock';

describe('TextBlock Component', () => {
    afterEach(cleanup);

    test('renders textarea in base mode with placeholder', () => {
        render(<TextBlock mode="base" content={{ text: '' }} />);
        const textareaElement = screen.getByTestId('textBlock-input');
        expect(textareaElement).toBeInTheDocument();
    });

    test('renders textarea with initial content in base mode', () => {
        render(<TextBlock mode="base" content={{ text: 'Initial Text' }} />);
        const textareaElement = screen.getByTestId('textBlock-input');
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement.value).toBe('Initial Text');
    });

    test('calls onChange when textarea text is changed', () => {
        const handleChangeMock = jest.fn();
        render(<TextBlock mode="base" content={{ text: 'Initial Text' }} onChange={handleChangeMock} />);
        const textareaElement = screen.getByTestId('textBlock-input');
        fireEvent.change(textareaElement, { target: { value: 'New Text' } });
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(handleChangeMock).toHaveBeenCalledWith('New Text');
    });

    test('renders paragraph in modal mode with content text', () => {
        render(<TextBlock mode="modal" content={{ text: 'Modal Text' }} />);
        const paragraphElement = screen.getByText('Modal Text');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement.tagName).toBe('P');
    });

    test('automatically adjusts height of textarea as text is entered', () => {
        render(<TextBlock mode="base" content={{ text: 'Initial Text' }} />);
        const textareaElement = screen.getByTestId('textBlock-input');
        fireEvent.change(textareaElement, { target: { value: '' } });
        fireEvent.change(textareaElement, { target: { value: 'New Text\nwith multiple lines\nfor testing' } });
        setTimeout(() => {
            expect(textareaElement.style.height).not.toBe('0px');
            expect(textareaElement.scrollHeight).toBeGreaterThan(0);
            fireEvent.input(textareaElement, { target: { value: 'Another line\nNew Text' } });
            expect(textareaElement.style.height).toBe(`${textareaElement.scrollHeight}px`);
        }, 100);
    });

});


