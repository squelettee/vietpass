"use client";

import { CrossmintHostedCheckout } from "@crossmint/client-sdk-react-ui";

export default function Home() {

  return (
    <CrossmintHostedCheckout
      lineItems={{
        collectionLocator: `crossmint:05beb57c-5ed2-4ef4-bc59-e2d4743ea699`,
        callData: {
          totalPrice: "0.001",
          quantity: 1,
        },
      }}
      payment={{
        crypto: { enabled: true },
        fiat: { enabled: true },
      }}


    />
  );
}