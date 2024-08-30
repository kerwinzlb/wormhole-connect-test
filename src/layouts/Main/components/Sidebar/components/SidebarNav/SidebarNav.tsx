/* eslint-disable indent */
import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import NavItem from './components/NavItem';
import MetamaskButton from 'components/MetamaskButton';

interface Props {
  pages: {
    menu1: object;
    menu2: object;
  };
}

const SidebarNav = ({ pages }: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const { menu1: menu1, menu2: menu2 } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={
              mode === 'light'
                ? '/images/logo-black.png'
                : '/images/logo-white.png'
            }
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem
            title={menu1 && menu1['title']}
            href={menu1 && menu1['href']}
            items={menu1 && menu1['items']}
          />
        </Box>

        <Box>
          <NavItem
            title={menu2 && menu2['title']}
            href={menu2 && menu2['href']}
            items={menu2 && menu2['items']}
          />
        </Box>
        <Box marginTop={1}>
          <MetamaskButton />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
