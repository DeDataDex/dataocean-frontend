import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LANGUAGES_LABEL } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import BaseRouteLink from '@/common/BaseRouteLink';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import store from '@/Videos/store';
import Tabs from './Tabs';

const useStyles = (theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
      display: 'flex',
      flexDirection: 'column',
    },
    headerNormal: {
      height: theme.spacing(8),
    },
    headerWallet: {
      height: theme.spacing(14),
    },
    mainHeader: {
      alignItems: 'center',
      display: 'flex',
      height: theme.spacing(8),
      flex: '0 0 auto',
      flexDirection: 'row',
    },
    mainHeaderWallet: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.075)',
    },
    tabs: {
      alignItems: 'flex-end',
      display: 'flex',
      height: '100%',
    },
    title: {
      marginRight: theme.spacing(2),
    },
    pad: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    noUpperCase: {
      textTransform: 'none',
    },
    rightBox: {
      marginLeft: 'auto',
    },
    button: {
      height: theme.spacing(6),
      border: 'none',
    },
    buttonStyle: {
      borderColor: '#1C4BDE',
      borderRadius: '25px',
      marginRight: '0.3rem',
    },
    darkBgButton: {
      color: '#000',
      backgroundColor: '#F7F9FA',
      borderRadius: '25px',
      marginRight: '0.3rem',
    },
    search: {
      alignItems: 'center',
      borderTop: '1px solid rgba(0, 0, 0, 0.075)',
      display: 'flex',
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    logoLink: {
      marginBottom: theme.spacing(1),
      display: 'grid',
      gridGap: '10px',
      gridAutoFlow: 'column',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logo: {
      fontFamily: 'Bauhaus93',
      fontSize: `${theme.spacing(4)}px`,
      color: '#3d454d',
      letterSpacing: `-${theme.spacing(1 / 4)}px`,
      textAlign: 'left',
      marginLeft: theme.spacing(1 / 2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1 / 2),
      lineHeight: 1,
      textTransform: 'none',
    },
    i18n: {
      height: theme.spacing(6),
    },
    language: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    admin:{
      color: '#fff',
      backgroundColor: '#f44336',
      "&:hover": {
        backgroundColor: '#f44336',
      }
    }
  });

function Index(props: any) {
  const { classes } = props;
  const { t, i18n }: { t: any; i18n: any } = useTranslation();
  const userLanguage = i18n.language || 'en';
  const [languageMenu, setLanguageMenu] = React.useState(null);
  const handleLanguageIconClick = (event: any) => {
    setLanguageMenu(event.currentTarget);
  };

  // initial data
  const dispatch = useDispatch();
  const [connectStatus, setConnectStatus] = useState(0);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // statusText fix: Solve problems that cannot be translated.
  const textContent = [
    t('video.install'),
    t('video.connect'),
    t('video.installing'),
    t('video.connecting'),
  ];
  const [textStatus, setTextStatus] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);

  // connectStatusChange callback
  const handleNewAccounts = useCallback( (newAccounts: any[]) => {
    console.log('handleNewAccounts',{newAccounts})

    const isWalletConnected = newAccounts.length > 0;
    if (isWalletConnected) {
      // onAccountChange(newAccounts);
      setTextStatus(4);
      setConnectStatus(4);
      setAccountAddress(newAccounts[0].address);
      if (process.env.REACT_APP_DATA_OCEAN_ADMIN_ADDRESS?.split(',').filter((address) => address.toLowerCase() === newAccounts[0].address).length) {
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
      dispatch(
        store.actions.getAccountBalance(newAccounts[0].address, (data: any) => setAccountBalance(data)),
      );
    } else {
      // disconnect
      setTextStatus(1);
      setConnectStatus(1);

      // clean [accounts, pollvotes]store
    }

    dispatch(store.actions.setWalletAccounts(newAccounts));
    setButtonDisable(false);
  }, [dispatch]);

  // Fixed the issue of refreshing page data presentation
  const initialConnectStatus = useCallback(() => {
    const isWalletInstalled = !!window.keplr;
    const isWalletConnected = accountAddress.length > 0;

    if (!isWalletInstalled) {
      setTextStatus(0);
      setConnectStatus(0);
    } else if (isWalletConnected) {
      setTextStatus(4);
      setConnectStatus(4);
    } else {
      setTextStatus(1);
      setConnectStatus(1);
    }
  }, [accountAddress]);

  useEffect(() => {
    initialConnectStatus()
  }, [initialConnectStatus]);

  async function connectWallet() {
    // wallet click
    if (connectStatus === 0) {
      window.open('https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap', '_blank')
      // setText installing
      setTextStatus(2);
      setButtonDisable(true);
    } else if (connectStatus === 1) {
      setTextStatus(3);
      setButtonDisable(true);
      dispatch(
        store.actions.connectWallet((data: any) => handleNewAccounts(data)),
      );
    }
  }

  const handleLanguageMenuClose = (lang?: string) => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
    setLanguageMenu(null);
  };

  // set a default value before locales/*/transaction.json is loaded
  const current = LANGUAGES_LABEL.filter(
    (language) => language.code === userLanguage,
  );
  const currentLabel = (current[0] && current[0].text) || '-';
  const i18nMenu = (
    <>
      <Tooltip title={t('header.changeLanguage')} enterDelay={300}>
        <Button
          className={classes.i18n}
          color="inherit"
          aria-owns={languageMenu ? 'language-menu' : undefined}
          aria-haspopup="true"
          onClick={handleLanguageIconClick}
        >
          <LanguageIcon />
          <span className={classes.language}>{currentLabel}</span>
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={languageMenu}
        open={Boolean(languageMenu)}
        onClose={() => handleLanguageMenuClose()}
      >
        {LANGUAGES_LABEL.map((language) => (
          <MenuItem
            key={language.code}
            selected={userLanguage === language.code}
            onClick={() => handleLanguageMenuClose(language.code)}
          >
            {language.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const pathname = window.location.pathname;
  const tabs = (
    <Tabs
      tabs={[
        {
          className: classes.button,
          id: 'videos',
          label: t('header.videos'),
          selected: pathname.startsWith('/videos'),
          href: '/videos/1',
        },
      ]}
    />
  );

  return (
    <div
      className={classNames({
        [classes.header]: true,
        [classes.headerNormal]: true,
      })}
    >
      <div
        className={classNames({
          [classes.mainHeader]: true,
          [classes.pad]: true,
        })}
      >
        <div className={classes.tabs}>
          <BaseRouteLink to="/" underline="none">
            <div className={classes.logoLink}>
              <img
                src={`${process.env.PUBLIC_URL}/logo.svg`}
                height="30"
                alt="logo"
              />
              <Typography className={classes.logo} variant="h3">
                DATAOCEAN
              </Typography>
            </div>
          </BaseRouteLink>
          {tabs}
          {i18nMenu}
        </div>
        <Box display="flex" alignItems="center" className={classes.rightBox}>
          {isAdmin ? (
            <Button component={NavLink} to="/videos/upload" variant="outlined" className={classNames(classes.darkBgButton, classes.admin)}>
              {t('header.admin')}
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonStyle}
            onClick={connectWallet}
            disabled={buttonDisable}
          >
            {textStatus !== 4
              ? textContent[textStatus]
              : `${accountAddress.substr(0, 10)}....${accountAddress.substring(
                  accountAddress.length - 4,
                )}`}
          </Button>
          {textStatus === 4 && accountBalance ? (
            <Button variant="outlined" className={classes.darkBgButton}>
              {accountBalance}
            </Button>
          ) : null}
        </Box>
      </div>
    </div>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Index);
