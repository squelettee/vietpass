## Project goals and features

*Goal:* VietPass aims to be the essential digital companion for digital nomads and long-stay travelers in Da Nang. The MVP provides a simple and trustworthy way for nomads to access curated services, exclusive discounts, and insider knowledge of the city.

*Core Features:*

*Public dApp Landing Page* – Communicates value proposition, guides users through a “Login → Pay → Mint NFT → Access” flow.
*Web3 Authentication via Social Login* – Frictionless wallet creation with Google or similar, powered by thirdweb SDK.
*Membership NFT Purchase via Stripe* – A $19 one-time payment automatically mints a VietPass NFT on U2U Network, acting as the membership key.
*Digital Welcome Kit (PDF)* – Immediate access to arrival essentials: airport guide, ATM guide, SIM card guide, free coffee voucher, curated Google Maps list, visa agent recommendation, and invite to private VietPass community.
*Token-Gated User Dashboard* – Displays membership details and unlocks partner directory (hotels, gyms, cafés, laundry, rentals).

## U2U Network Integration

*NFT Minting:* VietPass membership NFT is designed as an ERC-721 contract to be deployed on the U2U Network.
*Social Login + Wallet Creation:* Users connect seamlessly without prior blockchain knowledge; the custodial wallet is auto-generated and holds the NFT.
*On-Chain Proof of Membership:* The NFT serves as an on-chain key to unlock partner benefits, ensuring transparency and verifiability.

**Current Status:* For the MVP, we are temporarily using Crossmint for payments and NFT minting. While U2U is supported on Crossmint, integration is not yet functional. Our team has submitted a support ticket to Crossmint and will enable full U2U Network integration once the issue is resolved.*

## Instructions for Running the Demo

Open the demo site: https://vietpass-1c7r.vercel.app/. Click the button “Get Your VietPass for $19”.
Log in using your email.
To purchase VietPass NFT:
- Click “Pay with Crossmint.”
- Option A *–* Pay with Card *(recommended for demo)*:
- Select “Pay with Card” and enter dummy card details.
- In “Choose a delivery method,” enter your email (you’ll receive an NFT confirmation).
- Click “Pay.”
- Option B – Pay with Crypto:
- Switch to the Base Sepolia testnet chain in your wallet. To add Base Sepolia to your wallet, follow the instructions here: https://revoke.cash/learn/wallets/add-network/base-sepolia.
- Complete the transaction in crypto.
A payment success pop-up will appear. Close it.
You now have access to the Digital Welcome Kit.
- You can download the kit immediately.
- Other guides and partner directory section are still a work in progress.
