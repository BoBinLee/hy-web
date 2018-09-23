import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';

interface IProps {
    currentIndex: number;
    menus: string[];
    onIndexChange: (index: number) => void;
}

const Container = styled.div`
    height: 61.5px;
    padding-left: 39px;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(81, 162, 187, 0.5);
`;

const Menu = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const MenuItem = styled.li`
    padding-top: 23px;
    padding-bottom: 23px;
    margin-right: 48px;
    float: left;
`;

const MenuText = styled.div.attrs<{ isActive: boolean; }>({})`
    font-size: 12px;
    color: #637280;
    opacity: ${({ isActive }) => isActive ? '1' : '0.3'};
    cursor: pointer;
`;


class GalleryTopBar extends Component<IProps> {
    render() {
        const { currentIndex, menus, onIndexChange } = this.props;
        return (
            <Container>
                <Menu>
                    {_.map(menus, (menu, index) => {
                        return (
                            <MenuItem key={menu}>
                                <MenuText onClick={_.partial(onIndexChange, index)} isActive={currentIndex === index}>{menu}</MenuText>
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Container>
        );
    }
}

export default GalleryTopBar;
