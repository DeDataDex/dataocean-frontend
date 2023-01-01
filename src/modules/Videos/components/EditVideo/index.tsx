import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CenteredView from '@/common/View/CenteredView';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import client from '@/utils/client';
import moment from 'moment';

import 'moment/locale/zh-cn';

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

interface PollDialogProps {
  open: boolean;
  id?: string;
  network?: string;
  t: any;
  classes: any;
  // onClose: () => void;
  // afterSubmit: () => void;
  defaultCreator?: string;
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
  databaseID: '',
  endTime: '',
  forVotes: '',
  againstVotes: '',
};

const requiredFields = Object.keys(fields);

const PollDialog = ({
  open,
  t,
  classes,
  // onClose,
  // afterSubmit,
  id,
  defaultCreator,
}: PollDialogProps) => {
  const [form, setForm] = useState<Record<string, any>>(fields);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

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
    databaseID: t('video.databaseIDHelperText'),
    forVotes: t('video.forVotesHelperText'),
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

  const handleSubmit = async () => {
    try {
      const inputs = await validateFields();
      inputs.description = inputs.description.replaceAll('\n', '\n\n');
      inputs.descriptionEn = inputs.descriptionEn.replaceAll('\n', '\n\n');
      // console.log({inputs});
      /*
      const values = {
        creator: "0x1",
        description: "testcn",
        descriptionEn: "descn",
        idOnChain: "5",
        link: "http://test.org",
        network: "main",
        title: "testcn",
        titleEn: "test",
        typeArgs1: "0x1::Test::Test",
        status: 7,
        againstVotes: 100,
        forVotes: 1000,
        endTime: 1699999999
      };
      */

      const params = new URLSearchParams();
      const keys = Object.keys(inputs);
      const values = Object.values(inputs);
      keys.forEach((key, index) => {
        // console.log(`${key}: ${values[key]}`);
        params.append(key,values[index].toString());
      });

      const addURL = 'videos/modif';

      const postConfig = {
        headers: {
          // 'Authorization': 'Basic YWRtaW46YWRtaW4=',
          'Authorization': 'Basic c3RhcmNvaW46QClAIUBTdGFyY29pbk9yZw==',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': '*/*'
        }
      };

      // const url = '/videos/add?againstVotes=1&creator=0x1&description=1&descriptionEn=1&endTime=1&forVotes=1&idOnChain=1&link=1&network=1&status=1&title=1&titleEn=1&typeArgs1=1';
      // await client.post(values.id ? 'videos/modif' : 'videos/add', values);
      // await client.post('videos/add', values);
      // await client.post(url, values);
      // await client.post(addURL, params, postCconfig);
      // await client.post(`${addURL}?${params.toString()}`, params, postConfig);
      await client.post(addURL, params, postConfig);
      // await afterSubmit();
      handleClose();
      alert('Success');
      window.location.href = "/";
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
    forVotes,
    againstVotes,
    status,
    network,
  } = form;

  useEffect(() => {
    const init = async () => {
      if (!open) {
        const detail = await client.get(`videos/detail/${id}`);
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
          databaseID: detail.id,
          forVotes: detail.forVotes,
          againstVotes: detail.againstVotes,
          endTime: detail.endTime,
          id: detail.id,
        });
      }
    };
    init();
  }, [open, id, defaultCreator, network]);

  moment.locale(t('video.locale'));

  return (
    <div>
      <Helmet>
        <title>{t('video.createAPoll')}</title>
      </Helmet>
      <CenteredView>
          <Card>
            <CardHeader
              title={
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography>{id ? t('video.edit') : t('video.createAPoll')}</Typography>
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
              id="creator"
              required
              name="creator"
              helperText={errors.creator ? helperTextMaps.creator : undefined}
              error={errors.creator}
              value={creator}
              label={t('video.creator')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="link"
              name="link"
              helperText={errors.link ? helperTextMaps.link : undefined}
              error={errors.link}
              value={link}
              label={t('video.externalUrl')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="endTime"
              name="endTime"
              helperText={errors.endTime ? helperTextMaps.endTime : undefined}
              error={errors.endTime}
              value={endTime}
              label={t('video.endTime')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              required
              id="typeArgs1"
              name="typeArgs1"
              error={errors.typeArgs1}
              helperText={
                errors.typeArgs1 ? helperTextMaps.typeArgs1 : undefined
              }
              value={typeArgs1}
              label={t('video.type_args_1')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              id="idOnChain"
              required
              name="idOnChain"
              error={errors.idOnChain}
              helperText={
                errors.idOnChain ? helperTextMaps.idOnChain : undefined
              }
              value={idOnChain}
              label={t('video.id_on_chain')}
              fullWidth
              onChange={handleFormChange}
              inputProps={
                { readOnly: true }
              }
            />
            <TextField
              margin="dense"
              id="forVotes"
              required
              name="forVotes"
              error={errors.forVotes}
              helperText={
                errors.forVotes ? helperTextMaps.forVotes : undefined
              }
              value={forVotes}
              label={t('video.forVotes')}
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              id="againstVotes"
              required
              name="againstVotes"
              error={errors.againstVotes}
              helperText={
                errors.againstVotes ? helperTextMaps.againstVotes : undefined
              }
              value={againstVotes}
              label={t('video.againstVotes')}
              fullWidth
              onChange={handleFormChange}
            />

            <FormControl style={{ marginRight: 8 }}>
              <InputLabel id="demo-simple-select-label">
                {t('video.status')}
              </InputLabel>
              <Select
                margin="dense"
                labelId="demo-simple-select-label"
                id="status"
                name="status"
                style={{ width: 150 }}
                value={status}
                error={errors.status}
                label={t('video.status')}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setForm({
                    ...form,
                    status: event.target.value as number,
                  });
                  setErrors({
                    ...errors,
                    status: false,
                  });
                }}
              >
                {menus.slice(1).map(({ label, value }) => (
                  <MenuItem value={value} key={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className={classes.formBox}>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                {t('video.cancel')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {t('video.ok')}
              </Button>
            </DialogActions>
          </Box>
          </Card>
        </CenteredView>
    </div>
  );
};

PollDialog.defaultProps = {
  id: undefined,
  defaultCreator: '',
  network: undefined,
};

export default withStyles(useStyles)(withTranslation()(PollDialog));
