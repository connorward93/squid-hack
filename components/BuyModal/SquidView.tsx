import { useContext, useEffect, useState } from "react";
import BuyContext from "@/context/Buy";
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import { ethers } from "ethers";
import Modal from "./Modal";
import Button from "../Button";
import SquidContext from "@/context/Squid";
import { useParams } from "next/navigation";
import chains from "@/constants/chains";
import Select from "../Select";
import classes from "./buy-modal.module.css";
import Product from "./Product";
import erc1155Abi from "@/abi/erc1155";
import erc20Abi from "@/abi/erc20";

export default function CurrencyView() {
  const params = useParams();
  const {
    state: { item: token },
  } = useContext(BuyContext);
  const {
    state: { squid },
  } = useContext(SquidContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [selectedChain, setSelectedChain] = useState<any>({
    chain: null,
    tokens: null,
  });
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [balance, setBalance] = useState<any>(0);
  const { chain: connectedChain } = useNetwork();
  const {
    chains: availableChains,
    error: networkError,
    isLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork({
    onError(error) {
      setError("Unrecognised chain. Try adding chain to wallet.");
    },
  });
  const { address, isConnected } = useAccount();

  const chain = chains.find((chain) => chain.routePrefix === params.chainId);

  const handleNetworkSwitch = () => {
    switchNetwork?.(selectedChain.chain);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error, networkError]);

  useEffect(() => {
    if (!address || !squid) return;
    setLoading(false);
    const tokens = squid.tokens.filter(
      ({ chainId }) => chainId === squid.chains[0].chainId
    );
    setSelectedChain({
      select: {
        label: squid.chains[0].networkName,
        value: squid.chains[0].chainId,
      },
      chain: squid.chains[0].chainId,
      tokens,
    });
    setSelectedToken({
      ...tokens[0],
      select: { value: tokens[0].symbol, label: tokens[0].symbol },
    });
  }, [address, token, squid]);

  useEffect(() => {
    if (!address) return;
    (async () => {
      try {
        const balance = await fetchBalance({
          address: address,
          chainId: selectedChain?.chain,
          token:
            selectedToken &&
            selectedToken.symbol !== selectedChain?.tokens?.[0].symbol
              ? selectedToken.address
              : null,
        });

        setBalance(balance);
      } catch {
        setBalance(0);
      }
    })();
  }, [address, selectedChain, selectedToken]);

  const buyToken = async () => {
    const owner = token.token.owner;
    const toToken = squid?.tokens.find(({ chainId, symbol }) => {
      return (
        chainId === chain?.id &&
        symbol === token.market.floorAsk.price.currency.symbol
      );
    });

    if (!address || !squid || !chain || !toToken) return;

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const SquidCallType = {
      DEFAULT: 0,
      FULL_TOKEN_BALANCE: 1,
      FULL_NATIVE_BALANCE: 2,
      COLLECT_TOKEN_BALANCE: 3,
    };

    const erc20ContractInterface = new ethers.utils.Interface(erc20Abi);
    const approveEncodeData = erc20ContractInterface.encodeFunctionData(
      "approve",
      [token.token.contract, "0"]
    );

    const squidMulticall = "0x4fd39C9E151e50580779bd04B1f7eCc310079fd3";

    const erc1155Interface = new ethers.utils.Interface(erc1155Abi);

    const buyNftEncodeData = erc1155Interface.encodeFunctionData(
      "safeTransferFrom",
      [
        token.token.owner,
        address,
        token.token.tokenId,
        token.market.floorAsk.price.amount.raw,
        1,
      ]
    );

    const transferNftEncodeData = erc1155Interface.encodeFunctionData(
      "safeTransferFrom",
      [squidMulticall, address, 1, 1, 0x00]
    );

    const transferEncodeData = erc20ContractInterface.encodeFunctionData(
      "transfer",
      [address, "0"]
    );

    const { route } = await squid.getRoute({
      toAddress: address,
      fromChain: selectedToken.chainId,
      fromToken: selectedToken.address,
      fromAmount: token.market.floorAsk.price.amount.raw,
      toChain: toToken?.chainId,
      toToken: toToken?.address,
      slippage: 1,
      customContractCalls: [
        {
          callType: SquidCallType.FULL_TOKEN_BALANCE,
          target: toToken?.address,
          value: "0",
          callData: approveEncodeData,
          payload: {
            tokenAddress: toToken?.address,
            inputPos: 1,
          },
          estimatedGas: "50000",
        },
        {
          callType: SquidCallType.DEFAULT,
          target: token.token.contract,
          value: "0",
          callData: buyNftEncodeData,
          payload: {
            tokenAddress: "1",
            inputPos: 1,
          },
          estimatedGas: "80000",
        },
        {
          callType: SquidCallType.DEFAULT,
          target: token.token.contract,
          value: "0",
          callData: transferNftEncodeData,
          payload: {
            tokenAddress: "0x",
            inputPos: 1,
          },
          estimatedGas: "50000",
        },
        {
          callType: SquidCallType.FULL_TOKEN_BALANCE,
          target: toToken?.address,
          value: "0",
          callData: transferEncodeData,
          payload: {
            tokenAddress: toToken?.address,
            inputPos: 1,
          },
          estimatedGas: "50000",
        },
      ],
    });

    const tx = (await squid.executeRoute({
      signer,
      route,
    })) as ethers.providers.TransactionResponse;
    const txReceipt = await tx.wait();

    const axelarScanLink =
      "https://axelarscan.io/gmp/" + txReceipt.transactionHash;
    console.log(
      "Finished! Please check Axelarscan for more details: ",
      axelarScanLink,
      "\n"
    );

    console.log(
      "Track status via API call to: https://api.squidrouter.com/v1/status?transactionId=" +
        txReceipt.transactionHash,
      "\n"
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const status = await squid.getStatus({
      transactionId: txReceipt.transactionHash,
    });

    console.log("Status: ", status);
  };

  return (
    <Modal heading="Pay with Squid">
      {!loading && selectedChain.chain && squid ? (
        <>
          <Product data={token} />
          <div className={classes.currency}>
            <p>Select Currency</p>
            <div className={classes.select}>
              <span className={classes.network}>
                <Select
                  value={selectedChain.select}
                  options={squid.chains.map((chain) => ({
                    value: chain.chainId,
                    label: chain.networkName,
                  }))}
                  onChange={(newValue: any) => {
                    const tokens = squid.tokens.filter(
                      ({ chainId }) => chainId == newValue.value
                    );
                    setSelectedChain({
                      select: newValue,
                      chain: newValue.value,
                      tokens,
                    });
                    setSelectedToken({
                      ...tokens[0],
                      select: {
                        value: tokens[0].symbol,
                        label: tokens[0].symbol,
                      },
                    });
                  }}
                />
              </span>
              <Select
                value={selectedToken.select}
                options={selectedChain.tokens.map((token: any) => ({
                  value: token.symbol,
                  label: token.symbol,
                }))}
                onChange={(newValue: any) => {
                  const token = selectedChain.tokens.find(
                    (token: any) => token.symbol === newValue.value
                  );
                  setSelectedToken({
                    ...token,
                    select: { value: token.symbol, label: token.symbol },
                  });
                }}
              />
            </div>
            <div className={classes.price}>
              <div>Required: -</div>
              <div> Balance: {balance?.formatted || "-"}</div>
            </div>
            <br />
            <div>
              {connectedChain!.id !== selectedChain.chain ? (
                <Button
                  variant="squid"
                  label="Switch Network"
                  onClick={handleNetworkSwitch}
                />
              ) : (
                <Button variant="squid" label="Buy token" onClick={buyToken} />
              )}
            </div>
            {error ? <div className={classes.error}>Error: {error}</div> : null}
          </div>
        </>
      ) : null}
    </Modal>
  );
}
