import React from 'react';
import { render, cleanup} from '@testing-library/react';

import Sidebar from './Sidebar';

afterEach(cleanup);

describe('render Sidebar', () => {
    it('should render Sidebar component', () => {
        const { getByText } = render(<Sidebar />);
        expect(getByText('Todo Categories')).toBeInTheDocument();
    })

})