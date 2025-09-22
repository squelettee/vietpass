"use client";

import {
  useCrossmint,
  useWallet,
} from "@crossmint/client-sdk-react-ui";
import { useEffect, useState } from "react";
import Mint from "./mint";

// shadcn/ui imports
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Building2,
  Coffee,
  CreditCard,
  FileText,
  Heart,
  Home,
  MapPin,
  Plane,
  Smartphone
} from "lucide-react";

// The NFT response is an array of objects with this shape:
// [
//   {
//     "chain": "base-sepolia",
//     "contractAddress": "...",
//     "tokenId": "...",
//     "metadata": { ... },
//     "locator": "...",
//     "tokenStandard": "..."
//   }
// ]
interface NFT {
  chain: string;
  contractAddress: string;
  tokenId: string;
  metadata: {
    name?: string;
    image?: string;
    description?: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
    collection?: Record<string, any>;
    animation_url?: string | null;
  };
  locator: string;
  tokenStandard: string;
}

export function WalletNFTs() {
  const {
    crossmint: { apiKey },
  } = useCrossmint();
  const { wallet } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNFTs() {
      if (!wallet || !apiKey) return;

      setIsLoading(true);
      setError(null);

      try {
        // Construct the wallet identifier with email and chain
        const walletIdentifier = encodeURIComponent(
          `email:${wallet.owner?.replace(/^[^:]*:/, "")}:${wallet.chain}`
        );

        const url = `https://staging.crossmint.com/api/2022-06-09/wallets/${walletIdentifier}/nfts`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
        }

        // The response is an array of NFTs
        const data = await response.json();
        // If the response is { nfts: [...] }, use data.nfts; if it's just an array, use data directly
        const nftsArray = Array.isArray(data) ? data : data.nfts || [];
        setNfts(nftsArray);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch NFTs"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchNFTs();
  }, [wallet, apiKey]);

  if (isLoading) {
    return (
      <Card className="rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>VietPass - Service Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>VietPass - Service Access</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Helper: uniform card content layout for guide cards
  function GuideCard({
    title,
    titleClass,
    icon,
    children,
    buttonText,
    buttonColor,
    buttonHref,
    buttonIcon,
  }: {
    title: string;
    titleClass: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    buttonText: string;
    buttonColor: string;
    buttonHref: string;
    buttonIcon: React.ReactNode;
  }) {
    return (
      <Card className="p-0 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <h4 className={`font-bold mb-2 flex items-center gap-2 ${titleClass}`}>
              {icon}
              {title}
            </h4>
            <div className="space-y-2 text-sm mb-3">{children}</div>
          </div>
          <div className="mt-auto pt-2">
            <Button
              onClick={() => window.open(buttonHref, '_blank')}
              className={`w-full ${buttonColor}`}
              size="sm"
            >
              {buttonIcon}
              {buttonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>VietPass - Service Access</CardTitle>
        <CardDescription>
          Your VietPass NFT gives you access to all exclusive services
        </CardDescription>
      </CardHeader>
      <CardContent>
        {nfts.length === 0 ? (
          <div className="flex flex-col items-center py-8">
            <Mint />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Vietnam Travel Guide */}
            <div className="bg-gradient-to-r from-green-50 to-red-50 p-6 rounded-lg border">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-green-800 mb-2">🇻🇳 VIETNAM</h2>
                <p className="text-xl font-semibold text-red-700">2025 - DA NANG</p>
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      // Create a download link for the PDF
                      const link = document.createElement('a');
                      link.href = '/VietPass-Digital-Welcome-Kit.pdf';
                      link.download = 'VietPass-Digital-Welcome-Kit.pdf';
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    📄 Download Complete Guide (PDF)
                  </Button>
                </div>
              </div>
            </div>

            {/* Guide Contents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Visa Section */}
              <GuideCard
                title="🛂 Visa Options"
                titleClass="text-green-700"
                buttonText="View Visa Guide"
                buttonColor="bg-green-600 hover:bg-green-700"
                buttonHref="/visa-guide"
                buttonIcon={<FileText className="w-4 h-4 mr-2" />}
              >
                <div className="p-2 bg-green-50 rounded">
                  <strong>Free:</strong> 45-day stamp on arrival
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <strong>Paid:</strong> 90-day eVisa ($25)
                </div>
              </GuideCard>

              {/* Money Exchange */}
              <GuideCard
                title="💰 Money Exchange"
                titleClass="text-blue-700"
                buttonText="Banking Guide"
                buttonColor="bg-blue-600 hover:bg-blue-700"
                buttonHref="/money-exchange"
                buttonIcon={<CreditCard className="w-4 h-4 mr-2" />}
              >
                <p><strong>Currency:</strong> Vietnamese Dong (VND)</p>
                <p><strong>Rate:</strong> 100,000 VND ≈ $4.20</p>
                <p>Open Vietnamese bank account at Vietcombank for best rates</p>
              </GuideCard>

              {/* Accommodation */}
              <GuideCard
                title="🏠 Housing"
                titleClass="text-purple-700"
                buttonText="Housing Guide"
                buttonColor="bg-purple-600 hover:bg-purple-700"
                buttonHref="/housing-guide"
                buttonIcon={<Home className="w-4 h-4 mr-2" />}
              >
                <p><strong>Minimum rental:</strong> 3 months</p>
                <p><strong>Deposit:</strong> 1 month + 2 months advance</p>
                <p><strong>Utilities:</strong> ~$15/month</p>
                <p>Use Facebook Marketplace or local agents</p>
              </GuideCard>

              {/* Visa Runs */}
              <GuideCard
                title="✈️ Visa Runs"
                titleClass="text-orange-700"
                buttonText="Visa Run Options"
                buttonColor="bg-orange-600 hover:bg-orange-700"
                buttonHref="/visa-runs"
                buttonIcon={<Plane className="w-4 h-4 mr-2" />}
              >
                <p><strong>Flight to Thailand:</strong> ~$80 round trip</p>
                <p><strong>Sleeper bus:</strong> ~$25 per person</p>
                <p><strong>Border crossing:</strong> Nam Giang, La lay, Bo Y</p>
              </GuideCard>

              {/* Healthcare */}
              <GuideCard
                title="🏥 Healthcare"
                titleClass="text-red-700"
                buttonText="Healthcare Guide"
                buttonColor="bg-red-600 hover:bg-red-700"
                buttonHref="/healthcare-guide"
                buttonIcon={<Heart className="w-4 h-4 mr-2" />}
              >
                <p><strong>Health checkup:</strong> $20-50</p>
                <p><strong>Dental cleaning:</strong> FREE with code</p>
                <p><strong>Cavity treatment:</strong> ~$3</p>
                <p><strong>Full braces:</strong> ~$300 (includes adjustments)</p>
              </GuideCard>

              {/* Food Culture */}
              <GuideCard
                title="🍜 Vietnamese Cuisine"
                titleClass="text-yellow-700"
                buttonText="Food Guide"
                buttonColor="bg-yellow-600 hover:bg-yellow-700"
                buttonHref="/food-guide"
                buttonIcon={<Coffee className="w-4 h-4 mr-2" />}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Pho Bo:</span>
                  <span>Beef noodle soup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Banh Mi:</span>
                  <span>Vietnamese baguette</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Avocado Coffee:</span>
                  <span>Unique local drink</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Egg Coffee:</span>
                  <span>Coffee with whipped egg cream</span>
                </div>
              </GuideCard>
            </div>

            {/* Essential Apps */}
            <Card className="p-0 h-full flex flex-col">
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h4 className="font-bold text-indigo-700 mb-3">📱 Essential Apps</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                    <Badge variant="outline">Grab - Taxi & Food</Badge>
                    <Badge variant="outline">Maxim - Taxi</Badge>
                    <Badge variant="outline">Lazada - Shopping</Badge>
                    <Badge variant="outline">InDrive - Taxi</Badge>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <Button
                    onClick={() => window.open('/apps-guide', '_blank')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    size="sm"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Download Apps
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* About Da Nang */}
            <Card className="p-0 h-full flex flex-col bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">🏖️ About Da Nang</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Da Nang is like Miami, but located in Asia with much cheaper prices than most Western cities.
                    Located in central Vietnam, so it's not hot year-round. Winter brings rain and wind,
                    with temperatures dropping to +18°C (64°F).
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <Button
                    onClick={() => window.open('/danang-guide', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    City Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Location Features */}
            <Card className="p-0 h-full flex flex-col">
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-3">📍 200+ Useful Locations Included</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs mb-4">
                    <span>• Vintage clothing stores</span>
                    <span>• Hospitals & dentists</span>
                    <span>• Waterfalls (30-40 min by bike)</span>
                    <span>• Scenic cafes</span>
                    <span>• Coworking spaces</span>
                    <span>• Fine dining restaurants</span>
                    <span>• Gyms & fitness</span>
                    <span>• Massage & spa</span>
                    <span>• Tailors</span>
                    <span>• Bakeries</span>
                    <span>• Yoga/Pilates studios</span>
                    <span>• Beauty salons</span>
                    <span>• Local markets</span>
                    <span>• Tourist attractions</span>
                    <span>• Hoi An (UNESCO site)</span>
                    <span>• Hookah lounges</span>
                    <span>• Russian food</span>
                    <span>• Bike rentals</span>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <Button
                    onClick={() => window.open('/locations-guide', '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View All Locations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        {nfts.length > 0 && (
          <>
            <Separator className="my-6" />
            <div className="text-center">
              <p className="text-sm text-green-600 font-medium mb-1">
                ✅ Access granted to VietPass services
              </p>
              <p className="text-sm text-gray-500">
                {nfts.length} VietPass NFT{nfts.length !== 1 ? "s" : ""} in your collection
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
