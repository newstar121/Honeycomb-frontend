import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CountUp from 'react-countup';
import Bank from '../Bank';
import { makeStyles } from '@material-ui/core/styles';
import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js'

import { Box, Card, CardContent, Typography, Grid, Container } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';

const assetList = [
  {
    depositTokenName: '2SHARES',
  },
  {
    depositTokenName: '2SHARES-WFTM LP',
  },
  {
    depositTokenName: '3OMB-WFTM LP',
  },
  {
    depositTokenName: '3SHARES',
  },
  {
    depositTokenName: '3SHARES-WFTM LP',
  },
]

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: #ffffff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
//   }
// `;

const BackgroundImage = createGlobalStyle`
  body {
    background-color: var(--black);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%231D1E1F' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
}

* {
    border-radius: 0 !important;
}
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Cemetery = () => {
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const { balance, balance_2shares_wftm, balance_3omb_wftm, balance_3shares_wftm, balance_3omb, balance_3shares, balance_2shares } = useTotalTreasuryBalance();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom style={{ marginBottom: '50px' }}>
                Treasury
              </Typography>

              {/* <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box> */}
              
              <Box mt={2}>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <Card style={{ height: "auto" }}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          Total Treasury Balance:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance} separator="," prefix="$" />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={2} style={{ marginTop: '100px' }}>
              <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{ marginBottom: '50px' }}>
                Protocol Owned Liquidity
              </Typography>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <Card style={{ height: "auto" }}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          3OMB-WFTM LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_3omb_wftm} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          3SHARES-WFTM LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_3shares_wftm} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          2SHARES-WFTM LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_2shares_wftm} separator="," prefix="$" />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <Card style={{ height: "auto" }}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          3OMB:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_3omb} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          3SHARES:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_3shares} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          2SHARES:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_2shares} separator="," prefix="$" />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* <Grid container justify="center" spacing={3}>
                {assetList.map((asset) => 
                <Card>
                  <CemeteryCard bank={asset} />
                </Card>
                )}
              </Grid> */}




              

            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
