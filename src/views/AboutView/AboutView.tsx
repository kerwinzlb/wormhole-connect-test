/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import Box from '@mui/material/Box';
import Container from 'components/Container';

import Main from 'layouts/Main';

import { Banner, Source, Explorer } from './components';

const IndexView = () => {
  return (
    <Box id="js--blocks__index">
      <Main>
        <Box>
          <Banner />
          <Box style={{ backgroundColor: '#ecedee' }}>
            <Container>
              <Explorer />
            </Container>
          </Box>
          <Source />
        </Box>
      </Main>
    </Box>
  );
};

export default IndexView;
