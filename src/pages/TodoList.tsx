import React, { FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Icon from '../assets/icons';

interface Props {
    id: string,
    text: string,
    completed: boolean,
    handleCheck: (id: string) => void,
    handleDelete: (id: string) => void,
    categoryId: string,
}

const TodoList: FC<Props> = ({id, text, completed, handleCheck, handleDelete}) => {
    const handleDeleteAction = () => {
        handleDelete(id);
    }
    const handleCheckAction = () => {
        handleCheck(id);
    }

    return (
        <Container>
            <List>
                <ListItem id={id}>
                    <TextContainer>
                        <button>
                            <Checkbox type="checkbox" onChange={handleCheckAction} checked={completed} />
                        </button>
                        <Text aria-checked={completed}>{text}</Text>
                    </TextContainer>
                    <Button onClick={handleDeleteAction}>
                        <Icon name="trash" className="stroke-current text-gray-400 h-5 w-5 mr-2" />
                    </Button>
                </ListItem>
            </List>
        </Container>
    )
}
export default TodoList;

const Container = styled.div`
    ${tw`flex`}
`;

const List = styled.ul`
    ${tw`list-none flex w-full`}
`;
const Checkbox = styled.input`
    ${tw`my-auto transform scale-125 mr-3 w-4 h-4 cursor-pointer`}
`;

const ListItem = styled.li`
${tw`flex py-6 border-b border-gray-400 px-12 hover:bg-gray-200 w-full justify-between`}
`;

const TextContainer = styled.div`
    ${tw`flex flex-nowrap`}
`;
const Text = styled.p`
    ${tw`text-black px-2 text-base break-words m-0`}
    &[aria-checked]:not([aria-checked='false']),
  &[aria-checked='true'] {
    ${tw`line-through`}
  }
`;

const Button = styled.button`
    ${tw`flex flex-row items-center cursor-pointer`}
`;