import React from 'react';
import { render, cleanup} from '@testing-library/react';

import TodoList from './TodoList';

afterEach(cleanup);

describe('render TodoList', () => {
    const text = '';
    const id = 'task1';
    const completed = false;
    const categoryId = '';
    const handleDelete = () => {};
    const handleCheck = () => {};

    it('should render TodoList component', () => {
        const { container } = render(<TodoList 
            id={id}
            text={text}
            completed={completed}
            categoryId={categoryId}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
        />);
        expect(container).toBeInTheDocument();
    })

})
