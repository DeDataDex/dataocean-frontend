import { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CenteredView from '@/common/View/CenteredView';
import { LoadingOutlined } from '@ant-design/icons';
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
  accounts: any[];
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
}

class List extends PureComponent<Props, IndexState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    accounts: [],
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
    };
  }

  componentDidMount() {
    this.fetchList(parseInt(this.props.match.params.page, 10) || 1);
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
    const {
      list,
      loading,
      page,
      totalPage,
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
