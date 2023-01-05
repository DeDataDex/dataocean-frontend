import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CenteredView from '@/common/View/CenteredView';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import client from '@/utils/client';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { OfflineSigner } from "@cosmjs/proto-signing"
import { chainId, getChainInfo } from '../../../../config/chain'
import { DataOceanSigningStargateClient } from "../../../../dataocean_signingstargateclient"
import { GasPrice } from "@cosmjs/stargate"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { Log } from "@cosmjs/stargate/build/logs"
import Long from "long"

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

    formBox: {
      margin: '2rem',
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
        gridTemplateColumns: '1fr 1fr',
        gridGap: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 2}px`,
        padding: theme.spacing(1) * 2,
      },
    },
    [theme.breakpoints.up('lg')]: {
      gridCards: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 2}px`,
        padding: theme.spacing(1) * 2,
      },
    },
  });

interface UploadVideoProps {
  open: boolean;
  id?: string;
  network?: string;
  t: any;
  classes: any;
  // onClose: () => void;
  // afterSubmit: () => void;
  defaultCreator?: string;
  accounts: any[];
}

const fields = {
  title: '',
  titleEn: '',
  descriptionEn: '',
  description: '',
  creator: '',
  network: 'main',
  status: '1',
  link: '',
  typeArgs1: '',
  idOnChain: '',
  endTime: '',
  againstVotes: '',
};

const requiredFields = Object.keys(fields);

const UploadVideo = ({
  open,
  t,
  classes,
  // onClose,
  // afterSubmit,
  id,
  defaultCreator,
  accounts,
}: UploadVideoProps) => {
  const [form, setForm] = useState<Record<string, any>>(fields);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  const chain = getChainInfo();

  const helperTextMaps = {
    titleEn: 'Please input title.',
    title: '请输入中文标题.',
    descriptionEn: 'Please input description.',
    description: '请输入中文描述.',
    deposite: t('video.depositeHelperText'),
    endTime: t('video.endTimeHelperText'),
    creator: t('video.creatorHelperText'),
    link: t('video.urlHelperText'),
    network: t('video.networkHelperText'),
    typeArgs1: t('video.type_args_1HelperText'),
    idOnChain: t('video.id_on_chainHelperText'),
    againstVotes: t('video.againstVotesHelperText'),
  };

  const validateFields = async () => {
    let hasError;
    requiredFields.forEach((field) => {
      if (!form[field]) {
        hasError = true;
        setErrors({
          ...errors,
          [field]: true,
        });
      }
    });
    if (hasError) {
      throw new Error('Error occured！');
    } else {
      return form;
    }
  };

  const handleFormChange = (
    event: React.ChangeEvent<{ value: unknown; name: string }>,
  ) => {
    const { value, name } = event.target;
    // console.log(value, name);
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleClose = () => {
    setForm(fields);
    setErrors({});
    // onClose();
  };

  // const  getSigningStargateClient = async () => {
  //   if (this.state.creator && this.state.signingClient)
  //       return {
  //           creator: this.state.creator,
  //           signingClient: this.state.signingClient,
  //       }
  //   const { keplr } = window
  //   if (!keplr) {
  //       alert("You need to install Keplr")
  //       throw new Error("You need to install Keplr")
  //   }
  //   await keplr.experimentalSuggestChain(getCheckersChainInfo())
  //   const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(checkersChainId)
  //   const creator = (await offlineSigner.getAccounts())[0].address
  //   const client: CheckersSigningStargateClient = await CheckersSigningStargateClient.connectWithSigner(
  //       this.props.rpcUrl,
  //       offlineSigner,
  //       {
  //           gasPrice: GasPrice.fromString("1stake"),
  //       },
  //   )
  //   this.setState({ creator: creator, signingClient: client })
  //   return { creator: creator, signingClient: client }
  // }

  const handleSubmit = async () => {
    try {
      const accountAddress = (accounts && accounts.length) ? accounts[0].address : ''
      console.log({accountAddress})
      const { keplr } = window
        if (!keplr) {
            alert("You need to install Keplr")
            throw new Error("You need to install Keplr")
        }
        await keplr.experimentalSuggestChain(chain)
        console.log({chainId})
        const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(chainId)
        console.log({offlineSigner})
        const creator = (await offlineSigner.getAccounts())[0].address
        console.log({creator, accountAddress},creator === accountAddress)
        const client: DataOceanSigningStargateClient = await DataOceanSigningStargateClient.connectWithSigner(
          chain.rpc,
          offlineSigner,
          {
              gasPrice: GasPrice.fromString("1stake"),
          },
        )
        console.log({client})
        const result: DeliverTxResponse = await client.createVideo(accountAddress,
          "title1",
          "description1",
          "coverLink1",
          "videoLink1",
          Long.fromNumber(10),
           "auto" )
        console.log({result})
        const logs: Log[] = JSON.parse(result.rawLog!)
        console.log({logs})
        //logs.connectWithSigner.attributes.find((attribute: Attribute) => attribute.key == "game-index")!.val

      // const inputs = await validateFields();
      // inputs.description = inputs.description.replaceAll('\n', '\n\n');
      // inputs.descriptionEn = inputs.descriptionEn.replaceAll('\n', '\n\n');
      // // console.log({inputs});
      // /*
      // const values = {
      //   creator: "0x1",
      //   description: "testcn",
      //   descriptionEn: "descn",
      //   idOnChain: "5",
      //   link: "http://test.org",
      //   network: "main",
      //   title: "testcn",
      //   titleEn: "test",
      //   typeArgs1: "0x1::Test::Test",
      //   status: 7,
      //   againstVotes: 100,
      //   endTime: 1699999999
      // };
      // */

      // const params = new URLSearchParams();
      // const keys = Object.keys(inputs);
      // const values = Object.values(inputs);
      // keys.forEach((key, index) => {
      //   // console.log(`${key}: ${values[key]}`);
      //   params.append(key,values[index].toString())
      // });

      // const addURL = 'videos/add';

      // const postConfig = {
      //   headers: {
      //     // 'Authorization': 'Basic YWRtaW46YWRtaW4=',
      //     'Authorization': 'Basic c3RhcmNvaW46QClAIUBTdGFyY29pbk9yZw==',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Accept': '*/*'
      //   }
      // };

      // await client.post(addURL, params, postConfig);
      // // await afterSubmit();
      // handleClose();
      // alert('Success');
      // window.location.href = '/';
    } catch (e) {
      console.error(e);
    }
  };

  const menus = [{ label: t('video.all'), value: 0 }];
  for (let i = 1; i < 8; i++) {
    menus.push({
      label: t(`poll.statusText.${i}`),
      value: i,
    });
  }

  const {
    title,
    titleEn,
    descriptionEn,
    description,
    creator,
    link,
    endTime,
    typeArgs1,
    idOnChain,
    network,
  } = form;

  useEffect(() => {
    // check isAdmin
    const isWalletInstalled = !!window.keplr;
    if (isWalletInstalled) {
      const accountAddress = accounts && accounts.length ? accounts[0].address : ''
      if (accountAddress && process.env.REACT_APP_DATA_OCEAN_ADMIN_ADDRESS?.split(',').filter((address) => address.toLowerCase() === accountAddress).length) {
        setIsAdmin(true)
      }else {
        setIsAdmin(false)
        window.location.href = '/error';
      }
    };
  
    const init = async () => {
      if (open) {
        // 此时为添加，会带上默认 creator
        if (id === undefined) {
          // setForm({ ...fields, creator: defaultCreator });
          setForm({ ...fields });
        } else {
          const detail = await client.get(`get?id=${id}&network=${network}`);
          setForm({
            title: detail.title,
            titleEn: detail.titleEn,
            descriptionEn: detail.descriptionEn,
            description: detail.description,
            creator: detail.creator,
            network: detail.network,
            status: detail.status,
            link: detail.link,
            typeArgs1: detail.typeArgs1,
            idOnChain: detail.idOnChain,
            forVotes: detail.forVotes,
            againstVotes: detail.againstVotes,
            endTime: detail.endTime,
            id: detail.id,
          });
        }
      }
    };
    init();
  }, [open, id, defaultCreator, network, accounts]);

  moment.locale(t('video.locale'));

  return isAdmin ? (
    <div>
      <Helmet>
        <title>{t('video.uploadAVideo')}</title>
      </Helmet>
      <CenteredView>
          <Card>
            <CardHeader
              title={
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography>{id ? t('video.edit') : t('video.uploadAVideo')}</Typography>
                  </Grid>
                  </Grid>
              } />
          <Box className={classes.formBox}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="titleEn"
              name="titleEn"
              error={errors.titleEn}
              helperText={errors.titleEn ? helperTextMaps.titleEn : undefined}
              value={titleEn}
              label="Title"
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="title"
              name="title"
              helperText={errors.title ? helperTextMaps.title : undefined}
              error={errors.title}
              value={title}
              label="中文标题"
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="descriptionEn"
              name="descriptionEn"
              error={errors.descriptionEn}
              helperText={errors.descriptionEn ? helperTextMaps.descriptionEn : undefined}
              value={descriptionEn}
              label="Description"
              multiline
              rowsMax="4"
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              id="description"
              required
              name="description"
              helperText={errors.description ? helperTextMaps.description : undefined}
              error={errors.description}
              value={description}
              label="中文描述"
              multiline
              rowsMax="4"
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              id="picUrl"
              required
              name="picUrl"
              helperText={errors.picUrl ? helperTextMaps.creator : undefined}
              error={errors.picUrl}
              value={creator}
              label={t('video.picUrl')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="videoUrl"
              name="videoUrl"
              helperText={errors.link ? helperTextMaps.link : undefined}
              error={errors.link}
              value={link}
              label={t('video.videoUrl')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="price"
              name="price"
              helperText={errors.endTime ? helperTextMaps.endTime : undefined}
              error={errors.endTime}
              value={endTime}
              label={t('video.price')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="duration"
              name="duration"
              error={errors.typeArgs1}
              helperText={
                errors.typeArgs1 ? helperTextMaps.typeArgs1 : undefined
              }
              value={typeArgs1}
              label={t('video.duration')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              id="size"
              required
              name="size"
              error={errors.idOnChain}
              helperText={
                errors.idOnChain ? helperTextMaps.idOnChain : undefined
              }
              value={idOnChain}
              label={t('video.size')}
              fullWidth
              onChange={handleFormChange}
            />
          </Box>
          <Box className={classes.formBox}>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                {t('video.cancel')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {t('video.upload')}
              </Button>
            </DialogActions>
          </Box>
          </Card>
        </CenteredView>
    </div>
  ) : null;
};

UploadVideo.defaultProps = {
  id: undefined,
  defaultCreator: '',
  network: undefined,
};

export default withStyles(useStyles)(withTranslation()(UploadVideo));
