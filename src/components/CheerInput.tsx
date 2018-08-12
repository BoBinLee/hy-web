import React, { SFC } from "react";
import styled from "styled-components";

interface IProps {
    className?: string;
    onChange?: (event: any) => void;
    onSubmit?: (event: any) => void;
    value: string;
}

const Container = styled.form`
    text-align: center;
    width: 100px;
    height: 80px;
    border-radius: 8px;
    padding-top: 22px;
    padding-bottom: 22px;
    padding-left: 39px;
    padding-right: 39px;
    box-shadow: 2px 2px 10px #6fc7e2;
    background-color: white;
`;

const Input = styled.input`
    font-size: 24px;
    color: #dadada;
    width: 100%;
    height: 36px;
    border-width: 0px;
    ::placeholder {
        color: #dadada;
    }
`;

class CheerInput extends React.Component<IProps> {
    public render() {
        const { className, onChange, value } = this.props;
        return (
            <Container className={className} onSubmit={this.onCheerSubmit}>
                <Input onChange={onChange} name="cheer" value={value}
                    placeholder={'응원은 지울 수 없습니다. 마음을 담아 신중하게 작성해주세요.'} />
            </Container>
        );
    }
    private onCheerSubmit = (event: any) => {
        const { onSubmit } = this.props;
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
    };
}

export default CheerInput;
