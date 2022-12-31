import React, { useEffect, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import Helmet from 'react-helmet';
import StarMaskOnboarding from '@starcoin/starmask-onboarding';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CenteredView from '@/common/View/CenteredView';
import { POLL_STATUS } from '@/utils/constants';
import client from '@/utils/client';
import { getNetwork } from '@/utils/helper';
import { LoadingOutlined } from '@ant-design/icons';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import account from 'mobxStore/account';
import VideoCard from './VideoCard';
import MOCK_VIDEO_LIST from '../../../../mocks/videoList.json'

const useStyles = (theme: Theme) =>
  createStyles({
    pagerArea: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
    },

    component: {
      marginTop: '30px',
    },

    header: {
      marginBottom: '20px',
    },

    title: {
      color: 'white',
      fontSize: '16px',
    },

    wrapper: {
      position: 'relative',
      i: {
        position: 'absolute',
        top: '50%',
        right: '6px',
        transform: 'translate(0, -50%)',
        pointerEvents: 'none',
      },
    },

    select: {
      appearance: 'none',
      border: '1px solid $slate',
      borderRadius: '3px',
      fontSize: '12px',
      padding: '6px 10px',
      paddingRight: '32px',
      textTransform: 'capitalize',
    },

    dim: {
      opacity: '0.5',
    },
    [theme.breakpoints.down('xs')]: {
      gridCards: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 2}px`,
        padding: theme.spacing(1) * 2,
      },
    },
    [theme.breakpoints.up('sm')]: {
      gridCards: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 2}px`,
        padding: theme.spacing(1) * 2,
      },
    },
    [theme.breakpoints.up('lg')]: {
      gridCards: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 2}px`,
        padding: theme.spacing(1) * 2,
      },
    },
  });

interface ExternalProps {
  className?: string;
}

interface InternalProps {
  pollList: any;
  isLoadingMore: boolean;
  getPollList: (contents: any, callback?: any) => any;
  classes: any;
  t: any;
  match: any;
}

interface Props extends ExternalProps, InternalProps { }

interface IndexState {
  filter: string;
  status: number;
  hideVoted: boolean;
  open: boolean;
  list: Record<string, any>[];
  page: number;
  loading: boolean;
  totalPage: number;
  accounts: Array<any>;
  isAdmin: boolean;
}

// const isLocal = window.location.host.includes('localhost');
// const isLocal = window.starcoin.selectedAddrerss === '0xc4800d2c0c24ac6e068010fadacd2d5e';
// let isLocal = false;

class List extends PureComponent<Props, IndexState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    pollList: null,
    isLoadingMore: undefined,
    getPollList: () => { },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      filter: '',
      status: 0,
      hideVoted: false,
      open: false,
      loading: true,
      page: 1,
      list: [],
      totalPage: 1,
      accounts: [],
      isAdmin: false,
    };
  }

  componentDidMount() {
    this.fetchList(parseInt(this.props.match.params.page, 10) || 1);

    const isStarMaskInstalled = StarMaskOnboarding.isStarMaskInstalled();
    if (isStarMaskInstalled) {
      this.setState({
        accounts: [window.starcoin.selectedAddress]
      })
      if (process.env.REACT_APP_DATA_OCEAN_ADMIN_ADDRESS?.split(',').filter((address) => address.toLowerCase() === window.starcoin.selectedAddress).length) {
        this.setState({
          isAdmin: true
        })
      }
    }
  }

  fetchList = async (page = 1) => {
    let { list } = this.state;
    if (page === 1) {
      list = [];
    }
    this.setState({
      loading: true,
    });
    try {
      // const resp = await client.get(
      //   `videos/page/${getNetwork()}?page=${page}&count=20`,
      // );
      const resp = MOCK_VIDEO_LIST.data
      const newlist = list.concat(resp.list);
      const totalPage = resp.totalPage;
      this.setState({
        list: newlist,
        totalPage,
        page,
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  setFilter = (value: string) => {
    this.setState({ filter: value });
  };

  render() {
    const { t, classes } = this.props;
    const suffix = i18n.language === 'en' ? 'En' : '';
    const {
      hideVoted,
      status,
      open,
      list,
      loading,
      page,
      totalPage,
      accounts,
      isAdmin
    } = this.state;

    const menus = [{ label: t('video.all'), value: 0 }];
    for (let i = 1; i < 8; i++) {
      menus.push({
        label: t(`poll.statusText.${i}`),
        value: i,
      });
    }

    const loadingProps = loading
      ? {
        disabled: true,
        startIcon: <LoadingOutlined />,
      }
      : {};

    return (
      <div>
        <Helmet>
          <title>{t('header.videos')}</title>
        </Helmet>
        <CenteredView>
          <Card>
            <div className={classes.gridCards}>
              {list.length
                ? list.map((video: any, index: number) => (
                  <VideoCard
                    key={`key_${index}`}
                    id={video.id}
                    name={video.name}
                    desc={video.desc}
                    picUrl={video.picUrl}
                    videoUrl={video.videoUrl}
                    price={video.price}
                    duration={video.duration}
                    size={video.size}
                  />
                ))
                : t('video.NoPoll')}
            </div>
            {page < totalPage ? (
              <div style={{ padding: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => this.fetchList(page + 1)}
                  {...loadingProps}
                >
                  View More
                </Button>
              </div>
            ) : null}
          </Card>
        </CenteredView>
      </div>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(List));
