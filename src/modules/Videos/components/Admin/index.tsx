import React, { useState, useEffect } from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import CenteredView from '@/common/View/CenteredView';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import UploadVideo  from './UploadVideo/adapter';
import AccountsBalance  from './AccountsBalance/adapter';


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

interface IndexProps {
  t: any;
  accounts: any[];
}


interface TabPanelProps {
  children?: any;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Index = ({
  t,
  accounts,
}: IndexProps) => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // check isAdmin
    const isWalletInstalled = !!window.keplr;
    if (isWalletInstalled) {
      const accountAddress = accounts && accounts.length ? accounts[0].address : ''
      if (accountAddress && process.env.REACT_APP_DATA_OCEAN_ADMIN_ADDRESS?.split(',').filter((address) => address.toLowerCase() === accountAddress).length) {
        setIsAdmin(true)
      }else {
        setIsAdmin(false)
        history.push('/error');
      }
    };
  }, [history, accounts]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return isAdmin ? (
    <CenteredView>
      <Card>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label={t('video.uploadAVideo')} {...a11yProps(0)} />
          <Tab label={t('video.accountsBalance')} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
         <UploadVideo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AccountsBalance />
        </TabPanel>
      </Card>
    </CenteredView>
  ) : null;
}

Index.defaultProps = {
  accounts: undefined,
};

export default withStyles(useStyles)(withTranslation()(Index));
