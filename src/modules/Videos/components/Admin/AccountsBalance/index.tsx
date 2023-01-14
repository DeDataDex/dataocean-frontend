import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from '@/Videos/store';

const useStyles = (theme: Theme) =>
  createStyles({
    label: {
      width: '100px',
      alignItems: 'right',
      display: 'flex',
      justifyContent: 'flex-end',
    },

    address: {
      width: '400px',
      margin: '0 10px',
    },

    header: {
      marginBottom: '20px',
    },

    formBox: {
      margin: '2rem',
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

interface AccountsBalanceProps {
  t: any;
  classes: any;
  accounts: any[];
}

const _accountBalance = {
  cp: '',
  miner: '',
  user: '',
};

const AccountsBalance = ({
  t,
  classes,
  accounts,
}: AccountsBalanceProps) => {
  const dispatch = useDispatch();
  const [accountBalance, setAccountBalance] = useState<Record<string, any>>(_accountBalance);

  const validateAddress = (address: string) => {
    return address && address.length === 45 && address.startsWith('cosmos')
  };

  const updateAccountBalance = useCallback((type: string, address: string) => {
    dispatch(
      store.actions.getAccountBalance(address, (data: any) =>{
        accountBalance[type] = data
        setAccountBalance({...accountBalance})
      }),
    );
  }, [dispatch, accountBalance]);

  useEffect(() => {
    const updateAccount = async () => {
      const _accountAddress = {
        cp: localStorage.getItem('address-cp') || '',
        miner: localStorage.getItem('address-miner') || '',
        user: localStorage.getItem('address-user') || '',
      };
      Object.entries(_accountAddress).forEach(([key, value], index) => {
        if (validateAddress(value)) {
          updateAccountBalance(key, value)
        }
      });
    }

    const intervalId = setInterval(() => {
      updateAccount()
    }, 2000 ) 
    return () => clearInterval(intervalId)
  }, [updateAccountBalance])

  moment.locale(t('video.locale'));

  const ariaLabel = { 'aria-label': 'description' };

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name: string }>) => {
    const { value, name } = event.target;
    const address = value as string
    if (validateAddress(address)) {
      localStorage.setItem(`address-${name}`, address);
    }
  };

  const accountInfo = (type: string) => {
    return (
      <ListItem key={`list-${type}`}>
        <InputLabel id={`label-${type}`} className={classes.label}>
          {t(`video.${type}`)}
        </InputLabel>
        <Input id={type} name={type} className={classes.address} defaultValue={localStorage.getItem(`address-${type}`)} onChange={handleChange} inputProps={ariaLabel} />
        <InputLabel id={`balance-${type}`}  className={classes.balance}>
          {accountBalance[type]}
        </InputLabel>
      </ListItem>
    )
  }
  return (
    <Card>
      <List>
        {
          ['cp', 'miner','user'].map((type: string) => accountInfo(type))
        }
      </List>
    </Card>
  )
};

AccountsBalance.defaultProps = {
};

export default withStyles(useStyles)(withTranslation()(AccountsBalance));
