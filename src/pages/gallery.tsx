import _ from 'lodash';
import React, { Component, RefObject } from "react";
import styled from 'styled-components';
import { Image, Transformation } from 'cloudinary-react';

import { GalleryTopBar, People2Card } from '../components';
import galleryData, { IGallery } from "../data/gallery";
import peopleData, { IPeople } from "../data/people";

type IGalleryItem = IGallery;

interface IStates {
    currentMenuName: string;
    selectedGallery: IGalleryItem | null;
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #f0f9fc;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const SideContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #eee;
    overflow-y: auto;
`;

const ContentImage = styled(Image)`
    width: 100%;
    object-fit: contain;
`;

const SideBar = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    overflow-y: auto;
`;

const ThumbnailView = styled.div``;

const Profile = styled(People2Card).attrs<{ isActive: boolean; }>({})`
    ${({ isActive }) => isActive ? 'display: flex' : 'display: none'};
    margin-bottom: 24px;
`;

const Thumbnail = styled(Image).attrs<{ isActive: boolean; }>({})`
    width: 291px;
    height: 194px;
    cursor: pointer;
    margin-bottom: 24px;
    ${({ isActive }) => isActive ? 'display: none' : 'display: flex'};
`;

// tslint:disable:object-literal-sort-keys
const data: { [key: string]: IGalleryItem[] } = {
    "Brand": _.filter(galleryData, gallery => {
        const selectedPeople = _.find(peopleData, people => people.id === gallery.id);
        if (!selectedPeople) {
            return false;
        }
        return ["브랜드"].includes(selectedPeople.role);
    }),
    "UXUI": _.filter(galleryData, gallery => {
        const selectedPeople = _.find(peopleData, people => people.id === gallery.id);
        if (!selectedPeople) {
            return false;
        }
        return ["UXUI"].includes(selectedPeople.role);
    }),
    "Package": _.filter(galleryData, gallery => {
        const selectedPeople = _.find(peopleData, people => people.id === gallery.id);
        if (!selectedPeople) {
            return false;
        }
        return ["패키지"].includes(selectedPeople.role);
    }),
    "Character": _.filter(galleryData, gallery => {
        const selectedPeople = _.find(peopleData, people => people.id === gallery.id);
        if (!selectedPeople) {
            return false;
        }
        return ["캐릭터"].includes(selectedPeople.role);
    }),
    "Illustration": _.filter(galleryData, gallery => {
        const selectedPeople = _.find(peopleData, people => people.id === gallery.id);
        if (!selectedPeople) {
            return false;
        }
        return ["일러스트"].includes(selectedPeople.role);
    })
}

class GalleryPage extends Component<object, IStates> {
    public state: IStates = {
        currentMenuName: "Brand",
        selectedGallery: _.first(data.Brand)
    };

    public sideContentRef: RefObject<any> = null;
    public sideBarRef: RefObject<any> = null;

    constructor(props: object) {
        super(props);
        this.sideContentRef = React.createRef();
        this.sideBarRef = React.createRef();
    }

    public render() {
        const { currentMenuName, selectedGallery } = this.state;
        const currentData = data[currentMenuName];
        const selectedPeople: IPeople = _.find(peopleData, people => people.id === _.get(selectedGallery, "id"));

        return (
            <Container>
                <GalleryTopBar onMenuChange={this.onIndexChange} menus={["Brand", "UXUI", "Package", "Character", "Illustration"]} currentMenuName={currentMenuName} />
                <Content>
                    <SideContent innerRef={this.sideContentRef}>
                        {selectedGallery ? _.map(selectedGallery.images, image => {
                            return (<ContentImage key={image} publicId={image}>
                                <Transformation quality="100" />
                            </ContentImage>)
                        }) : null}
                    </SideContent>
                    <SideBar innerRef={this.sideBarRef}>
                        {_.map(currentData, item => {
                            const isActive = selectedGallery === item;
                            return (<ThumbnailView key={item.id}>
                                <Profile
                                    isActive={isActive}
                                    name={selectedPeople.name}
                                    subject={selectedPeople.subject}
                                    profileImage={selectedPeople.profileImage}
                                />
                                <Thumbnail isActive={isActive}
                                    publicId={item.thumbnail}
                                    onClick={_.partial(this.onSelectedGallery, item)}>
                                    <Transformation quality="60" />
                                </Thumbnail>
                            </ThumbnailView>);
                        })}
                    </SideBar>
                </Content>
            </Container>
        );
    }

    private onIndexChange = (name: string) => {
        this.setState({
            currentMenuName: name,
            selectedGallery: _.first(data[name])
        }, () => {
            this.sideContentRef.current.scrollTop = 0;
            this.sideBarRef.current.scrollTop = 0;
        });
    }

    private onSelectedGallery = (gallery: IGalleryItem) => {
        this.setState({
            selectedGallery: gallery
        }, () => {
            this.sideContentRef.current.scrollTop = 0;
        });
    }
}

export default GalleryPage;
