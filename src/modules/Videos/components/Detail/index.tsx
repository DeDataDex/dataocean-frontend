/* eslint-disable func-names */
import React, { PureComponent,RefObject } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import get from 'lodash/get';
import StarMaskOnboarding from '@starcoin/starmask-onboarding';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loading from '@/common/Loading';
import CenteredView from '@/common/View/CenteredView';
import CommonLink from '@/common/Link';
import Markdown from '@/common/Markdown';
import formatNumber from '@/utils/formatNumber';
import { formatBalance } from '@/utils/helper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getPollData, getAddressSTCBalance, getPollAccountVotes } from '@/utils/sdk';
import PollDialog from '@/Videos/components/PollDialog';
import { providers, utils, bcs } from '@starcoin/starcoin';
import { POLL_STATUS } from '@/utils/constants';
import client from '@/utils/client';
import qs from 'qs';
import BorderLinearProgress from '../BorderLinearProgress';
import MOCK_VIDEO_LIST from '../../../../mocks/videoList.json'
import VideoPlayer from './VideoPlayer'
import VideoInfo from './VideoInfo';

const useStyles = (theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
      display: 'block',
    },
    shrinkMaxCol: {
      flex: '1 100 auto',
      minWidth: 60,
    },
    shrinkCol: {
      flex: '1 10 auto',
    },
    voteTextBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRight: `1px solid ${theme.palette.grey[300]}`,
      width: '50%',
      padding: theme.spacing(1),
      '&:first-child': {
        color: theme.palette.primary.main,
      },
      '&:last-child': {
        border: 'none',
        color: theme.palette.secondary.light,
      },
    },
    flexZoomBox: {
      flex: '1',
    },
    voteActionsContent: {
      width: 600,
    },
    voteActions: {
      border: '2px solid red',
      height: 80,
      textTransform: 'uppercase',
      cursor: 'pointer',
      lineHeight: '80px',
      width: '100%',
      textAlign: 'center',
      opacity: '0.25',
      borderRadius: '4px',
      transition: 'opacity .3s ease-out',
      userSelect: 'none',
      '&:hover': {
        opacity: 1,
      },
    },
    voteActionsActive: {
      opacity: '1',
    },
    voteActionsYes: {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    voteActionsNo: {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.light,
    },
    voteFeeBox: {
      padding: theme.spacing(2),
      height: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    voteFeeIcon: {
      paddingTop: 4,
      marginLeft: 2,
      fontSize: '1em',
    },
    voteFeePop: {
      padding: theme.spacing(1),
    },
    button: {
      marginLeft: theme.spacing(2),
    },
    tooltipIcon: {
      "&:hover": {
        background: '#fff!important',
      }
    },
    [theme.breakpoints.down('sm')]: {
      cardContainer: {
        marginBottom: theme.spacing(1),
      },
      shrinkMaxCol: {
        flex: '1 100 auto',
        minWidth: 60,
      },
      shrinkCol: {
        flex: '1 10 auto',
      },
      [theme.breakpoints.down('sm')]: {
        cardContainer: {
          marginBottom: theme.spacing(1),
        },
        cardHeader: {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
        metric: {
          paddingLeft: theme.spacing(2),
        },
        voteActionsContent: {
          width: 200,
        },
      },
      [theme.breakpoints.up('sm')]: {
        cardContainer: {
          marginBottom: theme.spacing(2),
        },
        cardHeader: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        },
        metric: {
          paddingLeft: theme.spacing(4),
        },
        voteActionsContent: {
          width: 400,
        },
      },
      [theme.breakpoints.down('md')]: {
        textFieldLabel: {
          fontSize: '0.75em',
        },
      },
      [theme.breakpoints.up('md')]: {
        textFieldLabel: {
          fontSize: '1em',
        },
        voteActionsContent: {
          width: 600,
        },
      },
      root: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
      },
      card: {
        display: 'flex',
        flexDirection: 'column',
      },
      cardHeader: {
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.075)',
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
      },
      textField: {
        display: 'flex',
        flex: '1 1 auto',
        marginRight: theme.spacing(1),
      },
      textFieldLabel: {},
      title: {
        fontWeight: 700,
      },
      metric: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderLeft: '1px solid rgba(0, 0, 0, 0.075)',
      },
    },
  });

interface IndexProps {
  classes: any;
  t: any;
  match: any;
  poll: any;
  pollVotes: any;
  accounts: string[];
  getPoll: (data: any, callback?: any) => any;
  history: any;
}

interface IndexState {
  id?: number;
  pollData: any;
  checked: boolean;
  votedForAnotherPoll: boolean;
  open: boolean;
  sendAmount: string | number;
  page: number;
  rowsPerPage: number;
  detail: Record<string, any>;
  pollDialogOpen: boolean;
  isAdmin: boolean;
}

let startToVerify: boolean = false;

class Detail extends PureComponent<IndexProps, IndexState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    match: {},
    poll: undefined,
    pollVotes: undefined,
    accounts: [],
  };

  maxFee: number = 0;

  starcoinProvider: any;

  constructor(props: IndexProps) {
    super(props);

    try {
      // We must specify the network as 'any' for starcoin to allow network changes
      this.starcoinProvider = new providers.Web3Provider(
        window.starcoin,
        'any',
      );
    } catch (error) {
      console.error(error);
    }

    this.state = {
      id: parseInt(props.match.params.id, 10),
      pollData: undefined,
      votedForAnotherPoll: false,
      checked: true,
      open: false,
      sendAmount: '1',
      page: 0,
      rowsPerPage: 5,
      detail: {},
      pollDialogOpen: false,
      isAdmin: false,
    };
  }

  componentDidMount = async () => {
    const isStarMaskInstalled = StarMaskOnboarding.isStarMaskInstalled();
    if (isStarMaskInstalled) {
      if (process.env.REACT_APP_STARCOIN_POLL_ADMIN_ADDRESS?.split(',').filter((address) => address.toLowerCase() === window.starcoin.selectedAddress).length) {
        this.setState({
          isAdmin: true
        })
      }
    };

    this.init();
  };

  init = async () => {
    const { match, history } = this.props;
    const id = match.params.id;
    
    // const detail = await client.get(`videos/detail/${id}`);
    const detail  = MOCK_VIDEO_LIST.data.list.filter(item => item.id === parseInt(id))[0]
    // getPollData(detail.creator, detail.typeArgs1).then((data) => {
    //   if (data && data.id === detail.id) {
    //     this.setState({ pollData: data });
    //   }
    // });

    this.setState({
      detail,
    });
  };


  render() {
    const {detail} = this.state;
    console.log(detail);
    return (
      <CenteredView>
        <VideoPlayer src={detail.videoUrl} />
        <VideoInfo
          key={detail.id}
          id={detail.id}
          name={detail.name}
          desc={detail.desc}
          picUrl={detail.picUrl}
          videoUrl={detail.videoUrl}
          price={detail.price}
          duration={detail.duration}
          size={detail.size}
        />
      </CenteredView>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(Detail));
