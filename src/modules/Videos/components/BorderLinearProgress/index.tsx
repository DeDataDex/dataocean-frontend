import React from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import { withTranslation } from 'react-i18next';
import {
  createStyles,
  withStyles,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import style from './style';

const Progress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
    },
    dashedColorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      backgroundImage: 'none',
      animation: 'none',
    },
    bar: {
      backgroundColor: '#3f51b5',
    },
    bar2Buffer: {
      backgroundColor: 'red',
    },
  }),
)(LinearProgress);

interface BorderLinearProgressProps extends LinearProgressProps {
  t: any;
}

const useStyles = makeStyles(style);
const BorderLinearProgress = (props: BorderLinearProgressProps) => {
  const classes = useStyles();
  const { value, valueBuffer, variant, t } = props;
  const total = Number(value) + Number(valueBuffer);
  const text = total < 4 ? `${t('video.quorum')} 4%` : `${t('video.threshold')}`;
  return (
    <div>
      <div className={classes.threshold}>
        <Typography variant="caption" className={classes.text}>{text}</Typography>
      </div>
      <div className={classes.diving} />
      <Progress value={value} valueBuffer={valueBuffer} variant={variant} />
    </div>
  );
};

export default withTranslation()(BorderLinearProgress);
