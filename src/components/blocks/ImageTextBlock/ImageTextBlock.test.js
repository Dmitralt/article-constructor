import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ImageTextBlock from './ImageTextBlock';

describe('ImageTextBlock Component', () => {
    afterEach(cleanup);

    test('renders textarea in base mode with placeholder', () => {
        render(<ImageTextBlock mode="base" content={{ text: '' }} />);
        const textareaElement = screen.getByTestId('imageTextBlock-textarea');
        expect(textareaElement).toBeInTheDocument();
    });

    test('renders textarea with initial content in base mode', () => {
        render(<ImageTextBlock mode="base" content={{ text: 'Initial Text' }} />);
        const textareaElement = screen.getByTestId('imageTextBlock-textarea');
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement.value).toBe('Initial Text');
    });

    test('renders image and text in modal mode', () => {
        render(<ImageTextBlock mode="modal" content={{ text: 'Modal Text', image: 'path/to/image.jpg' }} />);
        const paragraphElement = screen.getByText('Modal Text');
        const imageElement = screen.getByTestId('imageTextBlock-image');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement.tagName).toBe('P');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.tagName).toBe('IMG');
    });

    test('automatically adjusts height of textarea as text is entered', () => {
        render(<ImageTextBlock mode="base" content={{ text: 'Initial Text' }} />);
        const textareaElement = screen.getByTestId('imageTextBlock-textarea');
        fireEvent.change(textareaElement, { target: { value: 'New Text\nwith multiple lines\nfor testing' } });
        expect(textareaElement.style.height).not.toBe('0px');
        fireEvent.input(textareaElement, { target: { value: 'Another line\nNew Text' } });
        expect(textareaElement.style.height).toBe(`${textareaElement.scrollHeight}px`);
    });

});
