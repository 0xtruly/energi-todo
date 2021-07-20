import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Icon from '../../assets/icons'

interface Props {
  text: string,
  iconName: string,
  id: string,
  onClick: (id: string) => void,
  activeMenu: string,
  handleDelete: (id: string) => void
}

const MenuItem: FC<Props> = ({text, iconName, onClick, id, activeMenu, handleDelete}) => {
  const handleSelectMenuAction = () => {
    onClick(id);
  };
  const handleDeleteAction = () => {
    handleDelete(id);
  }
    return (
        <ListItemGroup aria-current={activeMenu === id}>
          <Button id="delete" className="w-4/5" onClick={handleSelectMenuAction}>
            <List>
              <Icon name={iconName} className="stroke-current text-white h-4 w-4 mr-2" />
              <Item aria-current={activeMenu === id}>
                  {text}
              </Item>
            </List>
          </Button>
          <Button className="" onClick={handleDeleteAction}>
            <Icon name="trash" className="stroke-current text-gray-400 h-5 w-5 mr-2" />
          </Button>
        </ListItemGroup>
    )
}
export default MenuItem;


const IconTextStyle = css`
${tw`text-lg h-full text-gray-400 m-0 py-1 px-0 no-underline text-right min-w-min hover:text-blue-300`}
`;

const ListItemGroup = styled.div`
${tw`flex my-4 w-full justify-between`}
&[aria-current]:not([aria-current='false']),
  &[aria-current='true'] {
    ${tw`bg-blue-300`}
  }
  `;

const Button = styled.button`
  ${tw``}
`;
const List = styled.ul`
${tw`w-full items-center pl-3 flex flex-row cursor-pointer`};
&:hover svg {
  ${tw`text-blue-300`}
}
`;

const Item = styled.li`
  ${IconTextStyle};
  min-width: 0;
  &[aria-current]:not([aria-current='false']),
  &[aria-current='true'] {
    ${tw`text-white`}
  }
`;