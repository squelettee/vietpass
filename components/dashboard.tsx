"use client";

import { useWallet } from "@crossmint/client-sdk-react-ui";
import Image from "next/image";
import { useState } from "react";
import { LogoutButton } from "./logout";
import { WalletNFTs } from "./nfts";

// shadcn/ui imports
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wallet } from "lucide-react";

export function Dashboard() {
  const { wallet } = useWallet();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const walletAddress = wallet?.address;

  const handleCopyAddress = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 content-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:pt-12">
        {/* Dashboard Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <Badge variant="outline" className="ml-2 text-xs px-2 py-1">
                MVP
              </Badge>
            </div>
            <LogoutButton />
          </div>
          <Separator />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Column - Wallet Details */}
          <div className="flex flex-col gap-6">
            <Card className="shadow-lg border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {/* cherche une icon */}
                  <Wallet />
                  Wallet Details
                </CardTitle>
                <CardDescription>
                  Your connected wallet information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Address
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {walletAddress
                        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}`
                        : ""}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleCopyAddress}
                            className="h-7 w-7"
                          >
                            {copiedAddress ? (
                              <Image
                                src="/circle-check-big.svg"
                                alt="Copied"
                                width={18}
                                height={18}
                              />
                            ) : (
                              <Image
                                src="/copy.svg"
                                alt="Copy"
                                width={18}
                                height={18}
                              />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {copiedAddress ? "Copied!" : "Copy address"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Owner
                  </span>
                  <span className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                    {wallet?.owner?.replace(/^[^:]*:/, "") || "Current User"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Chain
                  </span>
                  <Badge variant="secondary" className="capitalize">
                    {wallet?.chain}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - NFTs */}
          <div className="lg:col-span-2">
            <WalletNFTs />
          </div>
        </div>
      </div>
    </div>
  );
}
