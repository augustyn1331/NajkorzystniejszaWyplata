import React, { ChangeEvent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';

// I use Material UI's styling here - I would waste too much time on trying it to work with Styled Components
const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '14px',
    lineHeight: '16px',
  },
  wrapper: {
    margin: '25px 0px',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0px 0px 25px 0px',
    },
  },
  radioButton: {
    '& svg': {
      width: '26px',
      height: '26px',
    },
  },
  radioGroup: {
    display: 'flex',
    marginTop: '16px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      marginLeft: '110px',
    },
  },
  tagsLabel: {
    fontSize: '14px',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: 0,
      bottom: 15,
    },
  },
}));

interface Props {
  onChange?: (e: string | ChangeEvent<any>) => void;
  value: string;
}

export const Tags: React.FC<Props> = ({ onChange, value }) => {
  const classes = useStyles();

  return (
    <FormControl component='fieldset' className={classes.wrapper}>
      <p className={classes.tagsLabel}>Tags</p>
      <RadioGroup
        aria-label='Tags'
        name='Tags'
        className={classes.radioGroup}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value='Very high prio'
          control={<Radio className={classes.radioButton} />}
          label='Very High Prio'
        />
        <FormControlLabel
          value='important'
          control={<Radio />}
          label='Important'
        />
        <FormControlLabel
          value='Low Prio'
          control={<Radio />}
          label='Low Prio'
        />
      </RadioGroup>
    </FormControl>
  );
};
