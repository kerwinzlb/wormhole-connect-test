import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Container from 'components/Container';
import { SidebarNav } from './components';

import { useMetaMask } from 'hooks/UseMetaMask';

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props): JSX.Element => {
  const { userAddress } = useMetaMask();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (userAddress) {
      setFlag(true);
    }
  }, [userAddress]); //再wallet发生变化时执行
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(/images/account/banner.jpg)',
        }}
        //bgcolor={'primary.main'}
        paddingY={4}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: 'common.white' }}
          >
            Account Center
          </Typography>
          <Typography variant="h6" sx={{ color: 'common.white' }}>
            Change account and governance information
          </Typography>
        </Container>
      </Box>
      <Container paddingTop={'0 !important'} marginTop={-8}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <SidebarNav />
          </Grid>
          <Grid item xs={12} md={9}>
            {flag == true ? (
              <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
            ) : (
              <Card sx={{ boxShadow: 3, padding: 4 }}></Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;
