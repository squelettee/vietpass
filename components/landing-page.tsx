import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmbeddedAuthForm } from "@crossmint/client-sdk-react-ui";
import Image from "next/image";

const howItWorks = [
  {
    step: "1",
    title: "Sign Up",
    description: "with email or social account.",
    iconPath: "/log-in.svg",
  },
  {
    step: "2",
    title: "Pay $19",
    description: "with card or crypto.",
    iconPath: "/usdxm.svg",
  },
  {
    step: "3",
    title: "Receive Your VietPass NFT",
    description: "your digital membership.",
    iconPath: "/shield-check.svg",
  },
  {
    step: "4",
    title: "Unlock Benefits",
    description: "Download the Welcome Kit + member perks.",
    iconPath: "/circle-check-big.svg",
  },
];

const welcomeKitFeatures = [
  {
    title: "Day 1 Checklist",
    description: "From airport to your first coffee.",
    iconPath: "/rocket.svg",
  },
  {
    title: "Arrival & Basics",
    description: "Transport, SIM cards, ATMs.",
    iconPath: "/trending-up.svg",
  },
  {
    title: "Neighborhood Guide",
    description: "Where to live, eat, and work.",
    iconPath: "/globe.svg",
  },
  {
    title: "Lifestyle Picks",
    description: "Cafés, coworking spaces, food to try.",
    iconPath: "/code.svg",
  },
  {
    title: "Community Access",
    description: "Invite to VietPass members' group.",
    iconPath: "/log-in.svg",
  },
  {
    title: "Perks",
    description: "Free Vietnamese iced coffee, curated Google Map, discounts with partners.",
    iconPath: "/circle-check-big.svg",
  },
];

const targetAudience = [
  {
    title: "Digital Nomads",
    description: "staying 1–6 months.",
    iconPath: "/globe.svg",
  },
  {
    title: "First-time Visitors",
    description: "who want to avoid common mistakes.",
    iconPath: "/trending-up.svg",
  },
  {
    title: "Remote Workers",
    description: "who want trusted cafés, coworking, and gyms.",
    iconPath: "/code.svg",
  },
];

export function LandingPage({ isLoading }: { isLoading: boolean }) {
  const scrollToAuth = () => {
    const authSection = document.getElementById('auth-section');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Settle Into Da Nang Like a Local
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your digital companion for the first week in Da Nang — skip the stress, save money, and discover trusted local services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-3 text-lg" onClick={scrollToAuth}>
              Get Your VietPass for $19
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started in just 4 simple steps and unlock your Da Nang experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step) => (
            <Card key={step.step} className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={step.iconPath}
                    alt={step.title}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <Badge variant="secondary" className="w-fit mx-auto mb-2">
                  Step {step.step}
                </Badge>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You Get</h2>
            <p className="text-gray-600 mb-2">The Complete Welcome Kit</p>
            <Badge variant="outline">5-page Digital Welcome Kit included</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {welcomeKitFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src={feature.iconPath}
                        alt={feature.title}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who It's For</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Perfect for travelers who want to experience Da Nang like a local from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {targetAudience.map((audience) => (
            <Card key={audience.title} className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={audience.iconPath}
                    alt={audience.title}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <CardTitle>{audience.title}</CardTitle>
                <CardDescription>{audience.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="auth-section" className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Ready to Start Your Da Nang Journey?
            </h2>
            <p className="text-xl text-gray-600">
              Get your VietPass and unlock all the benefits for your first week in Da Nang.
            </p>

            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <EmbeddedAuthForm />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
