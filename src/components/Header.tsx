import { match } from "react-router";
import * as H from 'history';
import _ from "lodash";
import React from "react";
import Link from "gatsby-link";
import styled, { css } from "styled-components";

interface IStates {
  currentIndex: number;
}

const Container = styled.div`
  flex-direction: column;
  width: 60px;
  min-width: 60px;
  align-items: center;
  background-color: #fff;
  box-shadow: 2px 2px 10px #6fc7e2;
  z-index: 10;
`;

const HYIconView = styled.div`
  height: 44px;
  text-align: center;
  cursor: pointer;
`;

const HYIcon = styled.img`
  width: 25.5px;
  height: 26px;
  margin-top: 18.7px;
`;

const MenuView = styled.div`
  padding-top: 197px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const MenuItem = styled.li`
  width: 100%;
`;

const MenuActiveCSS = css`
  border-left-width: 2px;
  border-left-color: #6fc7e2;
  border-left-style: solid;
`;


const MenuIconView = styled.div.attrs<{ active: boolean }>({})`
  display: block;
  width: 100%;
  height: 24px;
  text-align: center;
  margin-bottom: 69px;
  ${({ active }) => active && MenuActiveCSS};
`;

const MenuIcon = styled.img`
  width: 16.5px;
  height: 18px;
`;

const menus: any = [{
  activeIcon: require("./images/active_main_icon@2x.png"),
  icon: require("./images/main_icon@2x.png"),
  name: "main",
  path: "/",
}, {
  activeIcon: require("./images/active_gallery_icon@2x.png"),
  icon: require("./images/gallery_icon@2x.png"),
  name: "gallery",
  path: "/gallery",
}, {
  activeIcon: require("./images/active_people_icon@2x.png"),
  icon: require("./images/people_icon@2x.png"),
  name: "people",
  path: "/people",
}, {
  activeIcon: require("./images/active_cheer_icon@2x.png"),
  icon: require("./images/cheer_icon@2x.png"),
  name: "cheer",
  path: "/cheer",
}];

class Header extends React.Component<object, IStates> {

  public state = {
    currentIndex: 0
  };
  public render() {
    const { currentIndex } = this.state;
    return (
      <Container>
        <HYIconView>
          <Link to={"/"}>
            <HYIcon src={require("./images/logo@2x.png")} />
          </Link>
        </HYIconView>
        <MenuView>
          <MenuList>
            {_.map(menus, (menu, index: number) => {
              return (
                <MenuItem key={menu.name}>
                  <MenuIconView active={currentIndex === index}>
                    <Link isActive={_.partial(this.isActive, index)} to={menu.path}>
                      <MenuIcon src={currentIndex === index ? menu.activeIcon : menu.icon} />
                    </Link>
                  </MenuIconView>
                </MenuItem>
              );
            })}
          </MenuList>
        </MenuView>
      </Container>
    );
  }


  private isActive = (index: number, linkMatch: match<any>, location: H.Location) => {
    if (_.isEmpty(linkMatch)) {
      return false;
    }
    if (linkMatch.url === location.pathname) {
      if (this.state.currentIndex !== index) {
        this.setState({
          currentIndex: index
        });
      }
      return true;
    }
    return false;
  }
}

export default Header;
