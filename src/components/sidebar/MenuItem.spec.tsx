import React from 'react';
import { render, cleanup } from '@testing-library/react';

import MenuItem from './MenuItem';


afterEach(cleanup);

describe('render Sidebar Menu', () => {
    const text = '';
    const id = 'task1';
    const iconName = '';
    const handleDelete = () => {};
    const onClick = () => {};
    const activeMenu = '';

    it('renders a Menu item with text, icon name, and active menu', () => {
        const { container } = render(<MenuItem 
            id={id}
            text={text}
            iconName={iconName}
            handleDelete={handleDelete}
            onClick={onClick}
            activeMenu={activeMenu}
        />);
        expect(container).toBeInTheDocument();
    });
})