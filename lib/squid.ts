import { Squid } from "@0xsquid/sdk";

const getSDK = (): Squid => {
  const squid = new Squid({
    baseUrl: "https://testnet.api.0xsquid.com",
  });
  return squid;
};

export const squid = getSDK();
