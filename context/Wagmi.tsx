"use client";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  arbitrum,
  arbitrumGoerli,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  baseGoerli,
  boba,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  celoCannoli,
  cronos,
  crossbell,
  dfk,
  dogechain,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  flare,
  flareTestnet,
  foundry,
  gnosis,
  gnosisChiado,
  goerli,
  haqqMainnet,
  haqqTestedge2,
  hardhat,
  harmonyOne,
  iotex,
  iotexTestnet,
  klaytn,
  lineaTestnet,
  localhost,
  mainnet,
  metis,
  metisGoerli,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  nexi,
  okc,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  pulsechain,
  pulsechainV4,
  scrollTestnet,
  sepolia,
  shardeumSphinx,
  skaleBlockBrawlers,
  skaleCalypso,
  skaleCalypsoTestnet,
  skaleChaosTestnet,
  skaleCryptoBlades,
  skaleCryptoColosseum,
  skaleEuropa,
  skaleEuropaTestnet,
  skaleExorde,
  skaleHumanProtocol,
  skaleNebula,
  skaleNebulaTestnet,
  skaleRazor,
  skaleTitan,
  skaleTitanTestnet,
  songbird,
  songbirdTestnet,
  syscoin,
  taraxa,
  taraxaTestnet,
  telos,
  telosTestnet,
  thunderTestnet,
  wanchain,
  wanchainTestnet,
  xdc,
  xdcTestnet,
  zhejiang,
  zkSync,
  zkSyncTestnet,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    aurora,
    auroraTestnet,
    avalanche,
    avalancheFuji,
    baseGoerli,
    boba,
    bronos,
    bronosTestnet,
    bsc,
    bscTestnet,
    canto,
    celo,
    celoAlfajores,
    celoCannoli,
    cronos,
    crossbell,
    dfk,
    dogechain,
    evmos,
    evmosTestnet,
    fantom,
    fantomTestnet,
    filecoin,
    filecoinCalibration,
    filecoinHyperspace,
    flare,
    flareTestnet,
    foundry,
    gnosis,
    gnosisChiado,
    goerli,
    haqqMainnet,
    haqqTestedge2,
    hardhat,
    harmonyOne,
    iotex,
    iotexTestnet,
    klaytn,
    lineaTestnet,
    localhost,
    mainnet,
    metis,
    metisGoerli,
    moonbaseAlpha,
    moonbeam,
    moonriver,
    nexi,
    okc,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    polygonZkEvm,
    polygonZkEvmTestnet,
    pulsechain,
    pulsechainV4,
    scrollTestnet,
    sepolia,
    shardeumSphinx,
    skaleBlockBrawlers,
    skaleCalypso,
    skaleCalypsoTestnet,
    skaleChaosTestnet,
    skaleCryptoBlades,
    skaleCryptoColosseum,
    skaleEuropa,
    skaleEuropaTestnet,
    skaleExorde,
    skaleHumanProtocol,
    skaleNebula,
    skaleNebulaTestnet,
    skaleRazor,
    skaleTitan,
    skaleTitanTestnet,
    songbird,
    songbirdTestnet,
    syscoin,
    taraxa,
    taraxaTestnet,
    telos,
    telosTestnet,
    thunderTestnet,
    wanchain,
    wanchainTestnet,
    xdc,
    xdcTestnet,
    zhejiang,
    zkSync,
    zkSyncTestnet,
  ],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
