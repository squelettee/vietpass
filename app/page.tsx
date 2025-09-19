"use client";

import { Dashboard } from "@/components/dashboard";
import { LandingPage } from "@/components/landing-page";
import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";
import { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function Home() {
  const { wallet, status: walletStatus } = useWallet();
  const { status: authStatus } = useAuth();
  const nodeRef = useRef(null);

  const isLoggedIn = wallet != null && authStatus === "logged-in";
  const isLoading =
    walletStatus === "in-progress" || authStatus === "initializing";


  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isLoggedIn ? "dashboard" : "landing"}
            nodeRef={nodeRef}
            timeout={400}
            classNames="page-transition"
            unmountOnExit
          >
            <div ref={nodeRef}>
              {isLoggedIn ? (
                <Dashboard />
              ) : (
                <LandingPage isLoading={isLoading} />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </main>
    </div>
  );
}
