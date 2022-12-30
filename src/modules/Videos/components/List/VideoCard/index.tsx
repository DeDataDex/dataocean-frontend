import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { getPollData } from '@/utils/sdk';
import { POLL_STATUS } from '@/utils/constants';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import MOCK_VIDEO_LIST from '../../../../../mocks/videoList.json'

const useStyles = (theme: Theme) =>
  createStyles({
    root: {},
    text: {
      padding: theme.spacing(1) * 2,
      height: theme.spacing(1),
    },
    cardCommon: {
      opacity: 0.5,
    },
    cardInProgress: {
      opacity: 1,
    },
    cardExecuted: {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    cardDefeated: {
      border: `1px solid ${theme.palette.secondary.light}`,
      opacity: 0.5,
    },
    [theme.breakpoints.down('xs')]: {
      cardCommon: {
        transition: '.4s ease box-shadow',
        borderRadius: '4px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      cardCommon: {
        transition: '.4s ease box-shadow',
        borderRadius: '4px',
      },
    },
    [theme.breakpoints.up('lg')]: {
      cardCommon: {
        transition: '.4s ease box-shadow',
        borderRadius: '4px',
      },
    },
    cardHover: {
      boxShadow: `
    ${theme.spacing(1) * 0}px ${theme.spacing(1) * 1}px ${theme.spacing(1) * 3
        }px ${theme.spacing(1) * 0}px rgba(0,0,0,0.2),
    ${theme.spacing(1) * 0}px ${theme.spacing(1) * 1}px ${theme.spacing(1) * 1
        }px ${theme.spacing(1) * 0}px rgba(0,0,0,0.14),
    ${theme.spacing(1) * 0}px ${theme.spacing(1) * 2}px ${theme.spacing(1) * 1
        }px -${theme.spacing(1) * 1}px rgba(0,0,0,0.12)
    `,
      cursor: 'pointer',
    },
    cardNoHover: {},
    media: {
      height: 140,
    },
    mediaCover: {
      objectFit: 'cover',
    },
    mediaContain: {
      objectFit: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      header: {
        padding: theme.spacing(1),
      },
    },
    [theme.breakpoints.up('sm')]: {
      header: {
        padding: theme.spacing(1) * 2,
      },
    },
    pic:{
      width: '100%',
    },
    name: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      alignItems: 'center',
      display: 'flex',
    },
    content: {
      padding: theme.spacing(2),
    },
    title: {
      fontWeight: 700,
    },
  });

interface ExternalProps {
  key?: string;
  className?: string;
  id: number;
  name: string;
  desc: string;
  picUrl: string;
  videoUrl: string;
  price: string;
  duration: number;
  size: number;
}

interface InternalProps {
  t: any;
  classes: any;
}

interface Props extends ExternalProps, InternalProps {
  t: any;
}

interface PollCardState {
  displayHover: boolean;
  pollData: any;
}

class VideoCard extends PureComponent<Props, PollCardState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    key: undefined,
    id: undefined,
    name: undefined,
    desc: undefined,
    picUrl: undefined,
    videoUrl: undefined,
    price: undefined,
    duration: undefined,
    size: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      displayHover: false,
      pollData: undefined,
    };
  }

  componentDidMount() {
    const data =  MOCK_VIDEO_LIST.data.list[0]
    this.setState({ pollData: data });
    // if (status < POLL_STATUS.EXECUTED) {
    //   getPollData(creator, type_args_1).then((data) => {
    //     if (data && data.id === id) {
    //       this.setState({ pollData: data });
    //     }
    //   });
    // }
  }

  onCardEnter = () => {
    this.setState({ displayHover: true });
  };

  onCardLeave = () => {
    this.setState({ displayHover: false });
  };

  render() {
    const {
      id,
    name,
    desc,
    picUrl,
    videoUrl,
    price,
    duration,
    size,
      classes,
      t,
    } = this.props;
    
    const url=`/videos/detail/${id}`
    const imgAlt = `【${name}】${desc}`
    const pUrl = `/videoPics/${picUrl}`
    const _duration = '120 分钟'
    const _size = '500 M'
    return (
      <Link component={NavLink} to={url} underline="none">
        <div
          className={classNames({
            [classes.cardHover]: this.state.displayHover,
            [classes.cardNoHover]: !this.state.displayHover,
          })}
          onMouseEnter={this.onCardEnter}
          onMouseLeave={this.onCardLeave}
        >
          <Card className={classes.cardRoom}>
            <div className={classes.pic}>
              <img src={pUrl} alt={imgAlt} loading="lazy" width="100%"/>
            </div>
            <div className={classes.name}>
              <Typography variant="body1" gutterBottom className={classes.title}>
               {name}
              </Typography>
            </div>
            <div className={classes.content}>
              <Typography variant="body2" gutterBottom>
                {t('video.price')}: {price}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('video.duration')}: {_duration}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('video.size')}: {_size}
              </Typography>
            </div>
          </Card>
        </div>
      </Link>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(VideoCard));
