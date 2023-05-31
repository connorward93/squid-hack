import { useContext, useEffect, useState } from "react";
import BuyContext from "@/context/Buy";
import { useAccount, useContractWrite, useFeeData } from "wagmi";
import { prepareWriteContract, erc721ABI } from "@wagmi/core";
import { ethers } from "ethers";
import Modal from "./Modal";
import Button from "../Button";
import SquidContext from "@/context/Squid";
import { useParams } from "next/navigation";
import chains from "@/constants/chains";
import Select from "../Select";
import classes from "./buy-modal.module.css";
import Product from "./Product";

export default function CurrencyView() {
  const params = useParams();
  console.log(params);
  const {
    state: { item: token },
  } = useContext(BuyContext);
  const {
    state: { squid },
  } = useContext(SquidContext);
  const [loading, setLoading] = useState(true);
  const [selectedChain, setSelectedChain] = useState<any>({
    chain: null,
    tokens: null,
  });
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { address, isConnected } = useAccount();
  const chain = chains.find((chain) => chain.routePrefix === params.chainId);
  console.log({ chain });
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

  const buyToken = async () => {
    const owner = token.token.owner;

    if (!address || !squid) return;
    // write({ args: [owner, address, token.token.tokenId] });
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const amount = "1000000000000000000";
    // const { route } = await squid.getRoute({
    //   toAddress: address,
    //   fromChain: selectedToken.chainId,
    //   fromToken: selectedToken.address,
    //   fromAmount: amount,
    //   toChain: "",
    // });
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
            <div className={classes.price}>{}</div>
            <br />
            <div>
              <Button variant="squid" label="Buy token" onClick={buyToken} />
            </div>
          </div>
        </>
      ) : null}
    </Modal>
  );
}
