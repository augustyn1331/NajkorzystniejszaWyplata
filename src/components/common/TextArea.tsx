import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { breakpoints, StyledPlaceholder } from 'src/styles';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  onChange?: (e: string | ChangeEvent<any>) => void;
  label: string;
}

export const TextArea: React.FC<Props> = ({ label, onChange, ...props }) => {
  return (
    <Container>
      <StyledPlaceholder htmlFor={label}>{label}</StyledPlaceholder>
      <StyledTextArea onChange={onChange} {...props} />
    </Container>
  );
};

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 87px;
  margin-bottom: 21px;
  padding: 4px 8px;
  border: 1px solid #cccccc;
  resize: none;
  font-size: 14px;
  @media only screen and (${breakpoints.md}) {
    width: 517px;
    height: 87px;
    margin-bottom: 20px;
    margin-left: 110px;
  }
`;

const Container = styled.div`
  position: relative;
  flex-direction: column;
`;
