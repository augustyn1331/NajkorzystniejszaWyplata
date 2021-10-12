import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { breakpoints } from 'src/styles';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: string | ChangeEvent<any>) => void;
  label: string;
}

export const Input: React.FC<Props> = ({ label, onChange, ...props }) => {
  return (
    <Container>
      <StyledPlaceholder htmlFor={label}>{label}</StyledPlaceholder>
      <StyledInput required onChange={onChange} {...props} />
    </Container>
  );
};

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 21px;
  padding: 0 8px;
  border: 1px solid #cccccc;
  transition: all 0.2s ease-in;
  &:hover {
    transition: all 0.2s ease-in;
  }
  @media only screen and (${breakpoints.md}) {
    width: 304px;
    margin-bottom: 20px;
    margin-left: 110px;
  }
`;

const Container = styled.div`
  position: relative;
  flex-direction: column;
`;

const StyledPlaceholder = styled.label`
  font-size: 14px;
  line-height: 18px;
  align-self: flex-start;
  margin: 0 0 4px 0;
  @media only screen and (${breakpoints.md}) {
    position: absolute;
    bottom: 21px;
    font-size: 14px;
    line-height: 18px;
    margin: 0;
  }
`;
