/* eslint-disable indent */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Container from 'components/Container';

const HeroWithDashboardScreenshotAndCta = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item container xs={12} md={6} alignItems={'center'}>
          <Box>
            <Box marginBottom={2}>
              <Typography
                variant="h3"
                color="text.primary"
                sx={{ fontWeight: 700 }}
              >
                About veNFT
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6" component="p" color="text.secondary">
                Voting NFT is used to determine whether a proposal is adopted. A
                67% or 90% majority vote is required to pass a proposal. Members who
                hold GEOD location NFTs, possess a GEOD locked wallet, or have
                staked GEOD tokens in a SuperHex are eligible to submit proposals
                and vote on approved ones. The panel below provides real-time
                updates on the total voting power.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          alignItems={'center'}
          justifyContent={'center'}
          xs={12}
          md={6}
        >
          <Box
            component={'img'}
            height={1}
            width={1}
            src={'/images/about/banner.jpg'}
            alt="..."
            boxShadow={3}
            borderRadius={2}
            maxWidth={600}
            sx={{
              filter:
                theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroWithDashboardScreenshotAndCta;
