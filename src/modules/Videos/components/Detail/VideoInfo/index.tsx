import { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { chainId, getChainInfo } from '../../../../../config/chain'
import { OfflineSigner } from "@cosmjs/proto-signing"
import { DataOceanSigningStargateClient } from "../../../../../dataocean_signingstargateclient"
import { GasPrice } from "@cosmjs/stargate"
import { DeliverTxResponse,defaultRegistryTypes } from "@cosmjs/stargate"
import { coins } from "@cosmjs/amino"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { toHex } from "@cosmjs/encoding"
import Long from "long"
import { dataoceanTypes } from "../../../../../types/dataocean/messages"
import { GeneratedType } from "@cosmjs/proto-signing"

export const dataoceanDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ...defaultRegistryTypes,
  ...dataoceanTypes,
]

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
    play: {
      marginBottom: '10px',
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
  accountAddress:string;
  grantee:string;
  updateVideoInfo: (videoPlayUrl: string, paySign: string, payPrivateKey: string, payPublicKey: string) => void;
}

interface InternalProps {
  t: any;
  classes: any;
}

interface Props extends ExternalProps, InternalProps {
  t: any;
}

interface VideoCardState {
  displayHover: boolean;
  loading: boolean;
}

class VideoInfo extends PureComponent<Props, VideoCardState> {
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
    accountAddress: undefined,
    grantee: undefined,
    updateVideoInfo: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      displayHover: false,
      loading: false,
    };
  }

  componentDidMount() {
  }

  handlePlay = async() => {
    try {
      this.setState({ loading: true });
      const { t, id, grantee, videoUrl, updateVideoInfo} = this.props
      const { keplr } = window
      if (!keplr) {
          alert("You need to install Keplr")
          throw new Error("You need to install Keplr")
      }
      const chain = getChainInfo()
      await keplr.experimentalSuggestChain(chain)
      const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(chainId)

      const fee = {
        amount: coins(0, 'stake'),
        gas: '100000'
      }

      const creator = (await offlineSigner.getAccounts())[0].address

      const client: DataOceanSigningStargateClient = await DataOceanSigningStargateClient.connectWithSigner(
        chain.rpc,
        offlineSigner,
        {
            gasPrice: GasPrice.fromString("1stake"),
        },
      )

      const result: DeliverTxResponse = await client.authzGrantSend(
        creator,
        grantee,
        fee,
        t('video.authGrantSend')
      )

      const {code} = result
      if (code === 0) {
        const result2: DeliverTxResponse = await client.playVideo(
          creator,
          Long.fromNumber(id),
          fee,
          t('video.getVideoPlayUrl')
        )
        const {code: code2, rawLog} = result2
        if (code2 === 0) {
          if (rawLog) {
            const rawLogObj = JSON.parse(rawLog)
            const eventPlayVideo = rawLogObj[0].events.filter((e: any) => e.type === 'play_video')
            const url = eventPlayVideo ? eventPlayVideo[0].attributes[0].value : ''
            const payPrivateKey = eventPlayVideo ? eventPlayVideo[0].attributes[1].value : ''
            const payPublicKey = eventPlayVideo ? eventPlayVideo[0].attributes[2].value : ''
            console.log({url, creator, id, payPrivateKey, payPublicKey})
           
            const signed: TxRaw = await client.paySign(
              creator,
              Long.fromNumber(id),
              payPublicKey,
              fee,
              t('video.signPay')
            )
            const signedBytes= TxRaw.encode(signed).finish()
            // dataoceand tx decode [paySign] --hex
            const paySign= toHex(signedBytes)
            console.log({paySign})

            // updateVideoInfo(url, paySign, payPrivateKey, payPublicKey)
            updateVideoInfo(videoUrl, paySign, payPrivateKey, payPublicKey)
          }
       }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  onCardEnter = () => {
    this.setState({ displayHover: true });
  };

  onCardLeave = () => {
    this.setState({ displayHover: false });
  };

  render() {
    const {
      accountAddress,
      name,
      desc,
      picUrl,
      price,
        classes,
        t,
    } = this.props;
    const { loading } = this.state
    const imgAlt = `【${name}】${desc}`
    const imgUrl = `/videoPics/${picUrl}`
    // const _duration = '120 分钟'
    // const _size = '500 M'
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
                {/* <Typography variant="body2" gutterBottom>
                  {t('video.duration')}: {_duration}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('video.size')}: {_size}
                </Typography> */}
                <Button variant="contained" color="primary" onClick={this.handlePlay} className={classes.play} disabled={(!accountAddress || loading)}>
                  {!accountAddress ? t('video.play') : (loading ? t('video.loading') : t('video.play'))}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(VideoInfo));
