/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
} from 'react';

import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { isEmptyObject, isNotEmptyObject } from './Utils';

interface MetaMaskContextData {
  userAddress: string;
  hasProvider: boolean | null;
  chainConfig: object;
  web3: object;
  explorerUrl: string;
  usdcContract: object;
  usdtContract: object;
  usdceContract: object;
  poolContract: object;
  poolAddress: string,
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
}

const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData,
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [chainConfig, setChainConfig] = useState({});
  const [web3, setWeb3] = useState({});
  const [explorerUrl, setExplorerUrl] = useState('');
  const [usdcContract, setUsdcContract] = useState({});
  const [usdtContract, setUsdtContract] = useState({});
  const [usdceContract, setUsdceContract] = useState({});
  const [poolContract, setPoolContract] = useState({});
  const [poolAddress, setPoolAddress] = useState('');

  const clearError = () => setErrorMessage('');

  const [userAddress, setUserAddress] = useState('');

  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async () => {
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    if (
      isNotEmptyObject(chainConfig) &&
      chainId ===
        chainConfig['web3Config'][chainConfig['web3Config'].networkName]
          .chainParam.chainId
    ) {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length === 0) {
        // If there are no accounts, then the user is disconnected
        setUserAddress('');
        return;
      }

      const account = accounts[0];
      setUserAddress(account);
    } else {
      setUserAddress('');
    }
  }, [chainConfig]);

  const updateChain = useCallback(() => _updateWallet(), [_updateWallet]);
  const updateWallet = useCallback(() => _updateWallet(), [_updateWallet]);

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    //getWeb3Config(); //初始化配置
  }, []);

  useEffect(() => {
    getProvider();

    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet);
      window.ethereum?.removeListener('chainChanged', updateChain);
    };
  }, [chainConfig, updateWallet, updateChain]);

  const getProvider = async () => {
    const provider = await detectEthereumProvider({ silent: true });
    setHasProvider(Boolean(provider));
    if (provider) {
      updateChain();
      window.ethereum.on('accountsChanged', updateWallet);
      window.ethereum.on('chainChanged', updateChain);
    }
  };

  const getWeb3Config = async () => {
    const res = await fetch(`${process.env.apiHost}/getWeb3Config`, {
      method: 'POST',
      credentials: 'include',
    });
    const result = await res.json();
    console.log('result', result);
    const web3Config = result.data.web3Config;
    const rpcUrl =
      web3Config[result.data.web3Config.networkName].chainParam.rpcUrls[0];
    //const explorerUrl = web3Config[result.data.web3Config.networkName].chainParam.blockExplorerUrls[0];

    if (isEmptyObject(web3)) {
      const web3Obj = new Web3(new Web3.providers.HttpProvider(rpcUrl));
      setWeb3(web3Obj);
	  
      const poolContractAddr =
        web3Config[result.data.web3Config.networkName].poolContractAddr;
      const poolContractObj = new web3Obj.eth.Contract(
        web3Config[result.data.web3Config.networkName].poolContractAbi,
        poolContractAddr,
      );
      setPoolContract(poolContractObj);
	  setPoolAddress(poolContractAddr);
	  
      const usdcContractAddr =
        web3Config[result.data.web3Config.networkName].usdcContractAddr;
      const usdcContractObj = new web3Obj.eth.Contract(
        web3Config[result.data.web3Config.networkName].usdcContractAbi,
        usdcContractAddr,
      );
      setUsdcContract(usdcContractObj);
	  
	  const usdceContractAddr =
          web3Config[result.data.web3Config.networkName].usdceContractAddr;
        const usdceContractObj = new web3Obj.eth.Contract(
          web3Config[result.data.web3Config.networkName].usdceContractAbi,
          usdceContractAddr,
        );
        setUsdceContract(usdceContractObj);
		
		const usdtContractAddr =
          web3Config[result.data.web3Config.networkName].usdtContractAddr;
        const usdtContractObj = new web3Obj.eth.Contract(
          web3Config[result.data.web3Config.networkName].usdtContractAbi,
          usdtContractAddr,
        );
        setUsdtContract(usdtContractObj);

    }
    const resultData = { web3Config: result.data.web3Config };
    setChainConfig(resultData);
	setExplorerUrl(web3Config[result.data.web3Config.networkName].chainParam.blockExplorerUrls[0]);
  };

  const connectMetaMask = async () => {
    setIsConnecting(true);
    //console.log(chainConfig);
    try {
      let result;
      if (
        chainConfig['web3Config'][chainConfig['web3Config'].networkName].type ==
        'switch'
      ) {
        result = await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            chainConfig['web3Config'][chainConfig['web3Config'].networkName]
              .chain,
          ],
        });
      } else if (
        chainConfig['web3Config'][chainConfig['web3Config'].networkName].type ==
        'add'
      ) {
        result = await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            chainConfig['web3Config'][chainConfig['web3Config'].networkName]
              .chainParam,
          ],
        });
      }
      if (result == null) {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
      }

      clearError();
      updateWallet();
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  return (
    <MetaMaskContext.Provider
      value={{
        userAddress,
        hasProvider,
        chainConfig,
        web3,
		explorerUrl,
        usdcContract,
        usdtContract,
        usdceContract,
        poolContract,
		poolAddress,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"',
    );
  }
  return context;
};
