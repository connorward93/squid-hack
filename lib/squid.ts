import { Squid } from "@0xsquid/sdk";

const getSDK = (): Squid => {
  const squid = new Squid({
    baseUrl: "https://api.0xsquid.com",
  });
  return squid;
};

export const squid = getSDK();
