import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import HeaderBlock from './HeaderBlock';

describe('HeaderBlock Component', () => {
    afterEach(cleanup);

    test('renders input with initial value from props in base mode', () => {
        render(<HeaderBlock mode="base" content={{ text: 'Initial Text' }} />);
        const inputElement = screen.getByTestId('header-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe('Initial Text');
    });

    test('calls onChange when input text is changed', () => {
        const handleChangeMock = jest.fn();
        render(<HeaderBlock mode="base" content={{ text: 'Initial Text' }} onChange={handleChangeMock} />);
        const inputElement = screen.getByTestId('header-input');
        fireEvent.change(inputElement, { target: { value: 'New Text' } });
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(handleChangeMock).toHaveBeenCalledWith('New Text');
    });

    test('renders heading in modal mode', () => {
        render(<HeaderBlock mode="modal" content={{ text: 'Modal Text' }} />);
        const headingElement = screen.getByText('Modal Text');
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.tagName).toBe('H1');
    });

    test('automatically adjusts height of input as text is entered', () => {
        render(<HeaderBlock mode="base" content={{ text: 'Initial Text' }} />);
        const inputElement = screen.getByTestId('header-input');
        fireEvent.change(inputElement, { target: { value: '' } });
        fireEvent.change(inputElement, { target: { value: 'New Text\nwith multiple lines\nfor testing' } });
        setTimeout(() => {
            expect(inputElement.style.height).not.toBe('0px');
            expect(inputElement.scrollHeight).toBeGreaterThan(0);
            fireEvent.input(inputElement, { target: { value: 'Another line\nNew Text' } });
            expect(inputElement.style.height).toBe(`${inputElement.scrollHeight}px`);
        }, 100);
    });
});
