import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DialogContent from '@material-ui/core/DialogContent';
import { palette } from 'src/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: palette.black,
    padding: '0px 20px',
  },
  title: {
    flex: 1,
    color: palette.white,
  },
  iconButton: {
    color: palette.white,
    padding: '0px 0px',
  },
  icon: {
    fontSize: '1.6em !important',
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface Props {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  togglePopup: () => void;
}

export const Popup: React.FC<Props> = ({
  title,
  children,
  visible,
  togglePopup,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    togglePopup();
  };

  return (
    <Dialog
      open={visible}
      maxWidth={'sm'}
      TransitionComponent={Transition}
      scroll='paper'
    >
      <Toolbar className={classes.appBar}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        <IconButton
          edge='end'
          onClick={handleClose}
          className={classes.iconButton}
        >
          <CloseRoundedIcon className={classes.icon} />
        </IconButton>
      </Toolbar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
