import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useMetaMask } from 'hooks/UseMetaMask';
import { formatAddress } from 'hooks/Utils';

interface Props {
  colorInvert?: boolean;
}

const MetamaskButton = ({ colorInvert = false }: Props): JSX.Element => {
  const { userAddress, hasProvider, isConnecting, connectMetaMask } =
    useMetaMask();

  //console.log(userAddress, hasProvider, isConnecting, connectMetaMask);

  return (
    <Box className="App" marginLeft={4}>
      <div>
        {!hasProvider && (
          <Button
            variant="contained"
            color="primary"
            href="https://metamask.io"
            target="_blank"
          >
            Install MetaMask
          </Button>
        )}
        {hasProvider && !userAddress && (
          <Button
            variant="contained"
            color="primary"
            disabled={isConnecting}
            onClick={connectMetaMask}
          >
            Connect MetaMask
          </Button>
        )}
        {hasProvider && userAddress && (
          <Box
            color={colorInvert ? 'common.white' : 'text.primary'}
            sx={{ cursor: 'pointer' }}
            /*onClick={() => (window.location.href = '/account-info')}*/
          >
            {formatAddress(userAddress)}
          </Box>
        )}
      </div>
    </Box>
  );
};

export default MetamaskButton;
