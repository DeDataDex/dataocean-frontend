import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import client from '@/utils/client';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { OfflineSigner } from "@cosmjs/proto-signing"
import { chainId, getChainInfo } from '../../../../../config/chain'
import { DataOceanSigningStargateClient } from "../../../../../dataocean_signingstargateclient"
import { GasPrice } from "@cosmjs/stargate"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { coins } from "@cosmjs/amino"
import Long from "long"
import MOCK_VIDEO_LIST from '../../../../../mocks/videoList.json'

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

const videoInfo = MOCK_VIDEO_LIST.data.list[0]

const fields = {
  title: videoInfo.name,
  description: videoInfo.desc,
  picUrl: videoInfo.picUrl,
  videoUrl: videoInfo.videoUrl,
  price: videoInfo.price,
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
  const history = useHistory();
  const [form, setForm] = useState<Record<string, any>>(fields);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const chain = getChainInfo();

  const helperTextMaps = {
    title: '?????????????????????.',
    description: '?????????????????????.',
    picUrl: t('video.picUrlHelperText'),
    videoUrl: t('video.videoUrlHelperText'),
    price: t('video.priceHelperText'),
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
      throw new Error('Error occured among Input fields???');
    } else {
      return form;
    }
  };

  const handleFormChange = (
    event: React.ChangeEvent<{ value: unknown; name: string }>,
  ) => {
    const { value, name } = event.target;
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
    history.push('/videos/1');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const inputs = await validateFields();

      const accountAddress = (accounts && accounts.length) ? accounts[0].address : ''
      const { keplr } = window
      if (!keplr) {
          alert("You need to install Keplr")
          throw new Error("You need to install Keplr")
      }
      await keplr.experimentalSuggestChain(chain)
      const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(chainId)
      const creator = (await offlineSigner.getAccounts())[0].address
      if (accountAddress !== creator){
        alert("Current selected account is not admin")
        history.push('/error');
      }
      const client: DataOceanSigningStargateClient = await DataOceanSigningStargateClient.connectWithSigner(
        chain.rpc,
        offlineSigner,
        {
            gasPrice: GasPrice.fromString("0token"),
        },
      )

      const fee = {
        amount: coins(0, 'token'),
        gas: '100000'
      }

      const result: DeliverTxResponse = await client.createVideo(
          creator,
          inputs.title,
          inputs.description,
          inputs.picUrl,
          inputs.videoUrl,
          Long.fromNumber(parseInt(inputs.price) * 1000000),
          fee,
          t('video.uploadAVideo')
        )
      
      const {code} = result
      setLoading(false)
      if (code === 0) {
        history.push('/videos/1');
      }
    } catch (e) {
      console.error(e);
      setLoading(false)
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
    description,
    picUrl,
    videoUrl,
    price,
  } = form;

  useEffect(() => {
    const init = async () => {
      if (open) {
        // ????????????????????????????????? creator
        if (id === undefined) {
          // setForm({ ...fields, creator: defaultCreator });
          setForm({ ...fields });
        } else {
          const detail = await client.get(`get?id=${id}`);
          setForm({
            title: detail.title,
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
  }, [open, id, defaultCreator, accounts, history]);

  moment.locale(t('video.locale'));

  return (
    <Card>
      <Box className={classes.formBox}>
        <TextField
          margin="dense"
          required
          id="title"
          name="title"
          helperText={errors.title ? helperTextMaps.title : undefined}
          error={errors.title}
          value={title}
          label="????????????"
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
          label="????????????"
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
          helperText={errors.picUrl ? helperTextMaps.picUrl : undefined}
          error={errors.picUrl}
          value={picUrl}
          label={t('video.picUrl')}
          fullWidth
          onChange={handleFormChange}
        />
        <TextField
          margin="dense"
          required
          id="videoUrl"
          name="videoUrl"
          helperText={errors.videoUrl ? helperTextMaps.videoUrl : undefined}
          error={errors.videoUrl}
          value={videoUrl}
          label={t('video.videoUrl')}
          fullWidth
          onChange={handleFormChange}
        />
        <TextField
          margin="dense"
          required
          id="price"
          name="price"
          helperText={errors.price ? helperTextMaps.price : undefined}
          error={errors.price}
          value={price}
          label={`${t('video.price')} TOKEN/MB`}
          fullWidth
          onChange={handleFormChange}
        />
        {/* <TextField
          margin="dense"
          required
          id="duration"
          name="duration"
          error={errors.duration}
          helperText={
            errors.duration ? helperTextMaps.duration : undefined
          }
          value={duration}
          label={t('video.duration')}
          fullWidth
          onChange={handleFormChange}
        />
        <TextField
          margin="dense"
          id="size"
          required
          name="size"
          error={errors.size}
          helperText={
            errors.size ? helperTextMaps.size : undefined
          }
          value={size}
          label={t('video.size')}
          fullWidth
          onChange={handleFormChange}
        /> */}
      </Box>
      <Box className={classes.formBox}>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose} disabled={loading}>
            {t('video.cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? t('video.loading') : t('video.upload')}
          </Button>
        </DialogActions>
      </Box>
    </Card>
  )
};

UploadVideo.defaultProps = {
  id: undefined,
  defaultCreator: '',
  network: undefined,
};

export default withStyles(useStyles)(withTranslation()(UploadVideo));
