import React from 'react';
import { ButtonProps, default as MuiButton } from '@material-ui/core/Button';
import styled from 'styled-components';

interface Props extends ButtonProps {
  variant: 'contained' | 'outlined';
  colorVariant: 'primary' | 'secondary';
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  variant,
  label,
  startIcon,
  endIcon,
  onClick,
  colorVariant,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      variant={variant}
      color={colorVariant}
      {...props}
    >
      {label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled(MuiButton)`
  box-shadow: none;
  flex-direction: row;
  border-radius: 30px !important;
  line-height: 16px;
  text-align: 'center';
  letter-spacing: '0.04rem';
`;
