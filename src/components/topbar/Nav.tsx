import React, { FC }from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
    children?: React.ReactElement<string> | React.ReactElement[];
    className?: string
}

const Nav: FC<Props> = ({ children, className }) => {
    return (
        <NavContainer className={className}>
            <Content>
            {children}
            </Content>
        </NavContainer>
    )
}
export default Nav;

const NavContainer = styled.nav`
    ${tw`shadow-sm w-full bg-gray-50 h-24 fixed`}
`;

const Content = styled.div`
${tw`flex px-4 py-3`}
`;