import React, { FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  children?: React.ReactElement<string> | React.ReactElement[],
}

const Sidebar: FC<Props>  = ({children}) => {
    return (
        <Container>
            <div className="flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">Todo Categories</h3>
            </div>
            <MenuContainer>
               {children}
            </MenuContainer>
        </Container>
    )
}
export default Sidebar;

const Container = styled.nav`
  min-width: 300px;
  overflow-x: hidden;
  transition: min-width 300ms ease-in;
  ${tw`w-72 h-screen bg-gray-800 z-10 text-white py-4`}
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px gray;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px white;
    border-radius: 5px;
  }
`;

const MenuContainer = styled.div`
  ${tw`items-center justify-center p-4`};
`;