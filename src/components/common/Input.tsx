import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { StyledInputBase, StyledPlaceholder } from 'src/styles';
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
  ${StyledInputBase}
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
