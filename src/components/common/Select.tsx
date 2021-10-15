import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { breakpoints, StyledInputBase, StyledPlaceholder } from 'src/styles';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  onChange?: (e: string | ChangeEvent<any>) => void;
  label: string;
  options: string[];
}

export const Select: React.FC<Props> = ({
  label,
  onChange,
  options,
  ...props
}) => {
  return (
    <Container>
      <StyledPlaceholder htmlFor={label}>{label}</StyledPlaceholder>
      <StyledSelect required onChange={onChange} {...props}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </StyledSelect>
      <StyledIcon />
    </Container>
  );
};

const StyledSelect = styled.select`
  ${StyledInputBase}
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  position: relative;
  background: transparent;
  z-index: 1000;
`;

const Container = styled.div`
  position: relative;
  flex-direction: column;
`;
const StyledIcon = styled(ExpandMoreIcon)`
  position: absolute;
  color: rgba(0, 71, 255, 0.65);
  font-size: 30px !important;
  right: 6px;
  top: 24px;
  @media only screen and (${breakpoints.md}) {
    top: 5px;
  }
`;
