import { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MOCK_VIDEO_LIST from '../../../../../mocks/videoList.json'

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: '20px',
    },
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
    img:{
      margin: '10px 10px',
      display: 'block',
      maxWidth: '272px',
      maxHeight: '153px',
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
    info: {
      marginTop: '10px',
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

class VideoInfo extends PureComponent<Props, PollCardState> {
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
    name,
    desc,
    picUrl,
    price,
      classes,
      t,
    } = this.props;
    
    const imgAlt = `【${name}】${desc}`
    const imgUrl = `/videoPics/${picUrl}`
    const _duration = '120 分钟'
    const _size = '500 M'
    return (
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item className={classes.pic}>
              <img className={classes.img} src={imgUrl} alt={imgAlt} loading="lazy" />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={classes.info}>
                <Typography gutterBottom variant="h5" component="div" className={classes.title}>
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {desc}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('video.price')}: {price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('video.duration')}: {_duration}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('video.size')}: {_size}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(VideoInfo));
