/* eslint-disable no-var */
/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import Box from '@mui/material/Box';
import { useEffect } from 'react';
//import useScrollTrigger from '@mui/material/useScrollTrigger';
import Main from 'layouts/Main';
import dynamic from 'next/dynamic';

import { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect';
const WormholeConnect = dynamic(() => import('@wormhole-foundation/wormhole-connect'), {
  ssr: false,
});

const config: WormholeConnectConfig = {
	  env: 'mainnet', // from deployment.json of the NTT deployment directory
	      networks: ['polygon', 'solana'], // from https://github.com/wormhole-foundation/wormhole-connect/blob/development/wormhole-connect/src/config/testnet/chains.ts#L170
		  rpcs: {
			solana: "https://solana-mainnet.g.alchemy.com/v2/dW90tpPtM6HRzCOKWhjqowkcCL3zv_lX",
			polygon: "https://polygon-mainnet.g.alchemy.com/v2/dW90tpPtM6HRzCOKWhjqowkcCL3zv_lX"
		  },
	      tokens: ['GEODpol', 'GEODsol'], 
	      routes: ['nttManual'], // from https://github.com/wormhole-foundation/wormhole-connect/blob/d7a6b67b18db2c8eb4a249d19ef77d0174deffbe/wormhole-connect/src/config/types.ts#L70
	      bridgeDefaults: {
	        fromNetwork: 'polygon',
	        toNetwork: 'solana'
	      },
	      nttGroups: {
	        GEOD_NTT: { // arbitrary name for the ntt group
	          nttManagers: [
	            {
	              chainName: 'polygon',
	              address: '0xa0943752d6A3fDc5A80aC8Fc57ec198e882c9703', // nttManagers Address from deployment.json
	              tokenKey: 'GEODpol', 
	              transceivers: [
	                {
	                  address: '0x7705A8166237206D1F9793664Ae202bc2527f81a', // transceivers address from deployment.json
	                  type: 'wormhole'
	                }
	              ]
	            },
	            {
	              chainName: 'solana',
	              address: 'nTtEFcDjaVbDX4Weu1SXdmVUYt3x1Z4SN9axrUpLwXf', // nttManagers Address from deployment.json
	              tokenKey: 'GEODsol',
	              transceivers: [
	                {
	                  address: '2xHC7F4PYG2rYV2tSvNgdBKKQMSFdWQpkpgbZAFejKpn', // transceivers address from deployment.json
	                  type: 'wormhole'
	                }
	              ]
	            }
	          ]
	        }
	      },

	      tokensConfig: {
	        GEODpol: {
	          key: 'GEODpol',
	          symbol: 'GEOD',
	          nativeChain: 'polygon',
	          displayName: 'GEOD (polygon)',
	          tokenId: {
	            chain: 'polygon',
	            address: '0x233e4e85DC985F68599099859618A3e2ea373220' // token address
	          },
	          coinGeckoId: 'test',
	          icon: 'https://wormhole.com/token.png',
	          color: '#00C3D9',
	          decimals: {
	            Ethereum: 18,
	            default: 8
	          }
	        },
	    
	        GEODsol: {
	          key: 'GEODsol',
	          symbol: 'GEOD',
	          nativeChain: 'solana',
	          displayName: 'GEOD (Solana)',
	          tokenId: {
	            chain: 'solana',
	            address: 'DxwsMCwxLkzPdvPCRtPZT1ddMMww67Zzds8QFzfmNoAd' // token address
	          },
	          coinGeckoId: 'test',
	          icon: 'https://wormhole.com/token.png',
	          color: '#00C3D9',
	          decimals: {
	            Solana: 9,
	            Ethereum: 9,
	            default: 8
	          }
	        }
	      }
};

const IndexView = () => {
	
  useEffect(() => {
  }, []);

  return (
    <Box id="js--blocks__index">
      <Main>
        <Box>
		<WormholeConnect config={config}/>
        </Box>
      </Main>
    </Box>
  );
};

export default IndexView;
