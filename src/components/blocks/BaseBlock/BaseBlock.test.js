import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseBlock from './BaseBlock';

describe('BaseBlock Component', () => {
    test('renders base mode by default', () => {
        render(<BaseBlock />);
        expect(screen.getByText(/You should override this/i)).toBeInTheDocument();
    });

    test('renders in "modal" mode when mode is set to "modal"', () => {
        render(<BaseBlock mode="modal" />);
        expect(screen.getByText(/You should override this/i)).toBeInTheDocument();
    });
});
