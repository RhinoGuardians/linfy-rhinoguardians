import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  Camera,
  ChartSpline,
  Fingerprint,
  GraduationCap,
  MapPinned,
  Orbit,
  Radar,
  ShieldCheck,
  Siren,
  Trees,
  Waypoints,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarketingCapabilityCard } from "@/components/shared/marketing-capability-card";
import { MarketingMetricChip } from "@/components/shared/marketing-metric-chip";
import { MarketingStepCard } from "@/components/shared/marketing-step-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { appRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";

const missionPoints = [
  "Linfy Tech Solutions is building RhinoGuardians to bring disciplined software execution into conservation operations that cannot afford ambiguity.",
  "The platform connects live detections, field reports, mapped reserve context, and stakeholder visibility in one trusted intelligence layer.",
  "It is designed for NGOs, reserve operators, grant programs, and partners who need a platform that feels operationally credible from day one.",
] as const;

const capabilities = [
  {
    title: "AI Detection With Operational Context",
    description:
      "Surface rhinos, people, and vehicles from live camera and sensor inputs with enough timing, location, and severity context to support real decisions.",
    icon: BrainCircuit,
  },
  {
    title: "Reserve-Wide Field Visibility",
    description:
      "Unify patrol notes, detections, and mapped zone intelligence into one readable operating picture across reserve sectors.",
    icon: MapPinned,
  },
  {
    title: "Threat Escalation And Ranger Coordination",
    description:
      "Turn risk signals into routed alerts, clear ownership, and coordinated field response workflows across distributed teams.",
    icon: BellRing,
  },
  {
    title: "Stakeholder-Grade Reporting",
    description:
      "Support operational reviews, donor conversations, grant reporting, and leadership oversight with calmer reporting surfaces and historical insight.",
    icon: ChartSpline,
  },
] as const;

const workflowSteps = [
  {
    index: "01",
    title: "Capture Across Reserve Infrastructure",
    description:
      "Cameras, edge devices, and monitored corridors capture movement and imagery across high-risk routes, perimeters, and wildlife zones.",
  },
  {
    index: "02",
    title: "Interpret With Real-Time AI",
    description:
      "Detection models classify rhinos, vehicles, and threats while preserving the timing and location context that field teams need to act.",
  },
  {
    index: "03",
    title: "Structure Through A Trusted Data Layer",
    description:
      "Signals are enriched, structured, and prioritized through a central intelligence layer built for enterprise-grade operational workflows.",
  },
  {
    index: "04",
    title: "Coordinate Response With Clarity",
    description:
      "Operations teams review alerts, coordinate response, and communicate outcomes through one premium command and reporting surface.",
  },
] as const;

const impactPoints = [
  {
    title: "Stronger partnership confidence",
    description:
      "Present a platform that feels credible to conservation partners, reserve operators, grant programs, and long-term funders.",
  },
  {
    title: "Operational visibility that scales",
    description:
      "Maintain a shared view across reserves, patrol routes, monitored zones, and response teams without fragmented reporting chains.",
  },
  {
    title: "Faster, calmer decision-making",
    description:
      "Move from scattered signals to prioritized action fast enough to matter while preserving clarity for analysts and leadership.",
  },
  {
    title: "Institution-ready conservation reporting",
    description:
      "Support measurable conservation outcomes with reporting surfaces that feel ready for stakeholders, audits, and long-term programs.",
  },
] as const;

const trustPoints = [
  {
    title: "Parent platform discipline",
    description:
      "RhinoGuardians is built by Linfy Tech Solutions, a company operating across cybersecurity, digital platforms, and mission-aligned software delivery.",
    icon: Fingerprint,
  },
  {
    title: "Flagship conservation product",
    description:
      "Within the Linfy ecosystem, RhinoGuardians serves as the conservation intelligence platform for wildlife protection, anti-poaching visibility, and reserve coordination.",
    icon: Trees,
  },
  {
    title: "Broader ecosystem credibility",
    description:
      "Linfy also develops adjacent security and education technology, bringing deeper operational rigor, platform thinking, and long-horizon product maturity into conservation work.",
    icon: Orbit,
  },
] as const;

const proofBand = [
  {
    label: "Built by",
    value: "Linfy Tech Solutions",
  },
  {
    label: "Positioning",
    value: "AI-powered conservation intelligence",
  },
  {
    label: "Audience fit",
    value: "NGOs, reserve operators, partners, investors",
  },
] as const;

export default function LandingPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <div className="space-y-8">
            <Badge className="border border-brand-primary/20 bg-brand-primary/10 text-brand-secondary">
              Flagship conservation intelligence platform
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl font-[var(--font-display)] text-5xl leading-[1.02] text-text-primary md:text-6xl xl:text-7xl">
                AI-powered conservation intelligence for wildlife protection,
                anti-poaching visibility, and reserve operations.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-text-muted md:text-xl">
                RhinoGuardians is Linfy Tech Solutions&apos; flagship conservation
                platform, built to help reserves, NGOs, and operational partners
                detect wildlife and threats in real time, coordinate response,
                and report with confidence from one premium system.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "group gap-2")}
                href={appRoutes.signUp}
              >
                Book partnership demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                className={buttonVariants({ size: "lg", variant: "secondary" })}
                href={appRoutes.dashboard}
              >
                Explore platform
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MarketingMetricChip label="Detection posture" value="Real-time monitoring" />
              <MarketingMetricChip label="Reserve model" value="Zone-aware operations" />
              <MarketingMetricChip label="Delivery standard" value="Platform-grade discipline" />
            </div>
          </div>
          <Card className="overflow-hidden border-border-subtle/80 bg-surface/85 shadow-[0_30px_70px_-30px_rgba(8,26,18,0.9)] backdrop-blur">
            <CardContent className="space-y-6 p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                    Flagship platform preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                    Conservation operations at launch quality
                  </h2>
                </div>
                <div className="rounded-full border border-status-success/20 bg-status-success/10 px-3 py-1 text-xs font-semibold text-status-success">
                  Operational preview
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-text-primary">
                        Eastern perimeter intelligence
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                        Live reserve command view
                      </p>
                    </div>
                    <Waypoints className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <div className="mt-5 grid min-h-72 grid-cols-6 gap-2 rounded-[1.5rem] border border-border-subtle/70 bg-[linear-gradient(180deg,rgba(57,94,73,0.28),rgba(15,27,20,0.5))] p-3">
                    {Array.from({ length: 24 }).map((_, index) => (
                      <div
                        className={`rounded-xl border ${
                          index === 7 || index === 13
                            ? "border-status-danger/40 bg-status-danger/20"
                            : index === 3 || index === 17 || index === 21
                              ? "border-brand-primary/35 bg-brand-primary/18"
                              : "border-border-subtle/40 bg-surface/25"
                        }`}
                        key={index}
                      />
                    ))}
                    <div className="col-span-3 flex items-center gap-2 rounded-2xl border border-brand-primary/30 bg-brand-primary/10 px-3 py-2 text-xs text-text-primary">
                      <Camera className="h-4 w-4 text-brand-secondary" />
                      Corridor camera network online
                    </div>
                    <div className="col-span-3 flex items-center gap-2 rounded-2xl border border-status-danger/30 bg-status-danger/10 px-3 py-2 text-xs text-text-primary">
                      <Siren className="h-4 w-4 text-status-danger" />
                      Suspicious vehicle corridor escalated
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                    <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                        Active detections
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-text-primary">
                        18
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                        Ranger units visible
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-text-primary">
                        7
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">Operational intelligence feed</p>
                      <ShieldCheck className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        {
                          title: "Rhino herd movement verified",
                          detail: "Northern waterline corridor · 2 min ago",
                          tone: "success",
                        },
                        {
                          title: "Vehicle intrusion route flagged",
                          detail: "Eastern perimeter sector · 5 min ago",
                          tone: "danger",
                        },
                        {
                          title: "Patrol coordination update logged",
                          detail: "Sector B3 command sync · 8 min ago",
                          tone: "neutral",
                        },
                      ].map((item) => (
                        <div
                          className="flex items-start gap-3 rounded-2xl border border-border-subtle/70 bg-surface/60 p-3"
                          key={item.title}
                        >
                          <div
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${
                              item.tone === "danger"
                                ? "bg-status-danger"
                                : item.tone === "success"
                                  ? "bg-status-success"
                                  : "bg-brand-secondary"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {item.title}
                            </p>
                            <p className="text-xs text-text-muted">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 md:py-8">
        <div className="grid gap-3 rounded-[2rem] border border-border-subtle/80 bg-surface/55 p-5 backdrop-blur-sm md:grid-cols-3 md:p-6">
          {proofBand.map((item) => (
            <div
              className="rounded-2xl border border-border-subtle/70 bg-canvas/45 px-4 py-4"
              key={item.label}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                {item.label}
              </p>
              <p className="mt-2 text-base font-semibold text-text-primary">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20" id="product">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
          <SectionHeading
            eyebrow="Why Linfy built RhinoGuardians"
            title="Conservation technology with the operational discipline of a broader platform company."
            description="Linfy Tech Solutions builds RhinoGuardians because wildlife protection deserves the same rigor, reliability, and product maturity expected in security technology and digital platforms. The result is a conservation system that feels mission-driven without feeling experimental."
          />
          <div className="grid gap-4">
            {missionPoints.map((point) => (
              <Card className="border-border-subtle/80 bg-surface/80" key={point}>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10">
                    <ShieldCheck className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <p className="text-sm leading-7 text-text-muted">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div
          className="space-y-10 rounded-[2rem] border border-border-subtle/80 bg-surface/55 p-8 backdrop-blur-sm md:p-10"
          id="ecosystem"
        >
          <SectionHeading
            eyebrow="Linfy ecosystem"
            title="A conservation flagship inside a broader technology ecosystem."
            description="RhinoGuardians sits inside the Linfy Tech Solutions ecosystem, where mission-led software benefits from deeper experience across cybersecurity, digital platforms, and education technology. That broader context strengthens trust without distracting from the conservation mission."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Linfy Tech Solutions",
                description:
                  "Parent brand for security technology, digital platforms, and conservation software delivery.",
                icon: Radar,
              },
              {
                title: "Security and platform discipline",
                description:
                  "Operational rigor shaped by Linfy’s broader work in high-trust software and security-oriented systems.",
                icon: Orbit,
              },
              {
                title: "Education and enablement",
                description:
                  "A wider ecosystem that also includes training and knowledge-led technology initiatives.",
                icon: GraduationCap,
              },
            ].map((item) => (
              <div
                className="rounded-2xl border border-border-subtle/70 bg-canvas/45 p-5"
                key={item.title}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-secondary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-base font-semibold text-text-primary">
                    {item.title}
                  </p>
                  <p className="text-sm leading-7 text-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {trustPoints.map((point) => (
              <Card className="border-border-subtle/80 bg-canvas/55" key={point.title}>
                <CardContent className="space-y-5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-secondary">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-7 text-text-muted">
                      {point.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="space-y-10">
          <SectionHeading
            align="center"
            eyebrow="Core capabilities"
            title="Capability surfaces designed for real conservation operations and stakeholder trust."
            description="RhinoGuardians combines field-ready workflows with reporting-grade visibility so teams can move from signal to action without compromising credibility with leadership, partners, or funders."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((capability) => (
              <MarketingCapabilityCard
                description={capability.description}
                icon={capability.icon}
                key={capability.title}
                title={capability.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20" id="how-it-works">
        <div className="space-y-10">
          <SectionHeading
            eyebrow="How it works"
            title="A disciplined path from signal capture to coordinated action."
            description="The architecture follows the practical flow of conservation intelligence: capture field signals, interpret them with AI, structure them through a trusted data layer, and deliver clear decision support through the platform."
          />
          <div className="relative grid gap-5 xl:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-brand-primary/25 xl:block" />
            {workflowSteps.map((step) => (
              <MarketingStepCard
                description={step.description}
                index={step.index}
                key={step.index}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <SectionHeading
            eyebrow="Platform preview"
            title="A product surface designed for live operations, partner confidence, and executive clarity."
            description="This preview shows how RhinoGuardians presents summary metrics, mapped reserve context, and live activity in a way that supports analysts, field operators, reserve leadership, and institutional stakeholders."
          />
          <Card className="overflow-hidden border-border-subtle/80 bg-surface/85">
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
                      Command summary
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <MarketingMetricChip label="Open alerts" value="05" />
                      <MarketingMetricChip label="Protected zones" value="24" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">Escalation posture</p>
                      <BellRing className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Priority response", "2 active", "bg-status-danger"],
                        ["Analyst review", "3 active", "bg-brand-secondary"],
                        ["Resolved today", "11 logged", "bg-status-success"],
                      ].map(([label, value, tone]) => (
                        <div className="flex items-center justify-between rounded-2xl border border-border-subtle/70 bg-surface/60 px-4 py-3" key={label}>
                          <div className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
                            <span className="text-sm text-text-primary">{label}</span>
                          </div>
                          <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">Protected reserve zones</p>
                      <MapPinned className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        "Low activity",
                        "Patrol route",
                        "Medium risk",
                        "Tracking zone",
                        "Protected herd",
                        "High priority",
                      ].map((zone, index) => (
                        <div
                          className={`rounded-2xl border p-4 text-xs ${
                            index === 5
                              ? "border-status-danger/35 bg-status-danger/10 text-text-primary"
                              : index === 4
                                ? "border-brand-primary/35 bg-brand-primary/10 text-text-primary"
                                : "border-border-subtle/70 bg-surface/60 text-text-muted"
                          }`}
                          key={zone}
                        >
                          {zone}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">Live coordination feed</p>
                      <Waypoints className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        "Thermal camera network heartbeat confirmed in Sector C1",
                        "Field team briefing synced for evening perimeter patrol",
                        "Vehicle alert escalated to reserve operations leadership",
                      ].map((item) => (
                        <div
                          className="rounded-2xl border border-border-subtle/70 bg-surface/60 px-4 py-3 text-sm text-text-muted"
                          key={item}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20" id="impact">
        <div className="space-y-10">
          <SectionHeading
            align="center"
            eyebrow="Proof and outcomes"
            title="The value is not only in detection. It is in trust, coordination, and measurable operational readiness."
            description="RhinoGuardians is designed to help conservation stakeholders move faster, report more clearly, and operate with the confidence expected from a serious platform by Linfy Tech Solutions."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {impactPoints.map((point) => (
              <Card className="border-border-subtle/80 bg-surface/85" key={point.title}>
                <CardContent className="space-y-3 p-6">
                  <p className="text-lg font-semibold text-text-primary">{point.title}</p>
                  <p className="text-sm leading-7 text-text-muted">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-28 md:pt-20">
        <Card className="overflow-hidden border-border-subtle/80 bg-[linear-gradient(135deg,rgba(65,166,112,0.16),rgba(17,30,22,0.1))]">
          <CardContent className="flex flex-col gap-8 p-8 md:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-secondary">
                Launch-ready engagement
              </p>
              <h2 className="font-[var(--font-display)] text-4xl leading-tight text-text-primary">
                Bring reserve intelligence, wildlife protection, and stakeholder
                confidence into one trusted platform.
              </h2>
              <p className="text-base leading-7 text-text-muted md:text-lg">
                RhinoGuardians is built for NGOs, reserve operators, partners,
                investors, and mission-driven stakeholders who need a conservation
                platform that feels premium, credible, and ready for public-facing deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "group gap-2")}
                href={appRoutes.signUp}
              >
                Book partnership demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                className={buttonVariants({ size: "lg", variant: "secondary" })}
                href="#contact"
              >
                Contact Linfy Tech
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
