import React from 'react';
import { ButtonProps, default as MuiButton } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// I use Material UI's styling here - I would waste too much time on trying it to work with Styled Components

const useStyles = makeStyles((theme) => ({
  button: {
    boxShadow: 'none',
    flexDirection: 'row',
    borderRadius: '30px !important',
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',
    letterSpacing: '0.04rem',
  },
  contained: {
    height: '50px',
    width: '210px',
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: '0',
      bottom: '0',
    },
  },
  outlined: {
    height: '30px',
    width: '189px',
    border: '1px solid #0047FF',
    textTransform: 'capitalize',
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      marginTop: '-6px',
    },
    [theme.breakpoints.up('md')]: {
      height: '40px',
      position: 'absolute',
      right: 0,
    },
  },
}));

interface Props extends ButtonProps {
  variant: 'contained' | 'outlined';
  label: string;
  startIcon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  variant,
  label,
  startIcon,
  onClick,
  ...props
}) => {
  const classes = useStyles();

  if (variant === 'outlined') {
    return (
      <MuiButton
        onClick={onClick}
        startIcon={startIcon && startIcon}
        variant={'outlined'}
        color={'secondary'}
        className={`${classes.outlined} ${classes.button}`}
        {...props}
      >
        {label}
      </MuiButton>
    );
  }
  return (
    <MuiButton
      onClick={onClick}
      variant={'contained'}
      color={'primary'}
      {...props}
      className={`${classes.contained} ${classes.button}`}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
