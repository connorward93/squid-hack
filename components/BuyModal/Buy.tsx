import { squid } from "@/lib/squid";
import { ethers } from "ethers";

const buyToken = async () => {
  // set up your RPC provider and signer

  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // init the SDK
  await squid.init();
  console.log("Squid inited");
  // log Squid supported tokens and chains
  console.log("squid.tokens: \n", squid.tokens);
  console.log("squid.chains: \n", squid.chains);
  // set the token and chain you are looking for
  // chainNames are here: https://docs.axelar.dev/dev/build/chain-names
  const searchTokenSymbol = "WETH";
  const searchChainName = "Ethereum-2";
  const searchChainData = squid.chains.find(
    (t) =>
      t.chainId ===
      squid.chains.find((c) => c.chainName === searchChainName)?.chainId
  );
  const searchToken = squid.tokens.find(
    (t) =>
      t.symbol === searchTokenSymbol &&
      t.chainId ===
        squid.chains.find((c) => c.chainName === searchChainName)?.chainId
  );
  console.log(
    "chainId for " + searchChainName + ": " + searchChainData?.chainId
  ); // output is 43113
  console.log(
    "tokenAddress for " +
      searchTokenSymbol +
      " on " +
      searchChainData?.networkName +
      ": " +
      searchToken?.address
  );
  const params = {
    fromChain: 5, // Goerli testnet
    fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // WETH on Goerli
    fromAmount: "20000000000000000", // 0.05 WETH
    toChain: 43113, // Avalanche Fuji Testnet
    toToken: "0x57f1c63497aee0be305b8852b354cec793da43bb", // aUSDC on Avalanche Fuji Testnet
    toAddress: "0xAD3A87a43489C44f0a8A33113B2745338ae71A9D", // the recipient of the trade
    slippage: 1.0, // 1.00 = 1% max slippage across the entire route
    enableForecall: true, // instant execution service, defaults to true
    quoteOnly: false, // optional, defaults to false
  };
  console.log("params: \n", params);
  const { route } = await squid.getRoute(params);
  console.log("route: \n", route);
  // console.log("route: \n", JSON.stringify(route, null, 2))
  const tx = await squid.executeRoute({ signer, route });
  console.log("tx: ", tx);
  const txReceipt = await tx.wait();
  console.log("txReciept: ", txReceipt);
  const getStatusParams = {
    transactionId: txReceipt.transactionHash,
    routeType: route?.transactionRequest?.routeType,
  };
  const status = await squid.getStatus(getStatusParams);
  console.log(status);
};

export default function Buy() {
  return <button onClick={buyToken}>Buy token</button>;
}