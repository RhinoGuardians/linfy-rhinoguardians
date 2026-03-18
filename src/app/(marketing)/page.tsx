import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  Camera,
  ChartSpline,
  MapPinned,
  ShieldCheck,
  Siren,
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
  "Bring live detections, field reports, and reserve visibility into one trusted operating picture.",
  "Support ranger teams with clearer alerts, faster escalation paths, and stronger coordination in the field.",
  "Give NGOs, reserve operators, and stakeholders a product-ready system for measurable conservation outcomes.",
] as const;

const capabilities = [
  {
    title: "Real-Time AI Detection",
    description:
      "Process live camera and sensor inputs to surface rhinos, people, and vehicles with operational context instead of raw noise.",
    icon: BrainCircuit,
  },
  {
    title: "Geo-Tagged Field Intelligence",
    description:
      "Unify detections, patrol notes, and location-aware events so teams can understand exactly what is happening and where.",
    icon: MapPinned,
  },
  {
    title: "Threat Alerting & Ranger Coordination",
    description:
      "Turn risk signals into routed alerts, status updates, and coordinated response workflows across reserve teams.",
    icon: BellRing,
  },
  {
    title: "Historical Analytics & Reporting",
    description:
      "Review incidents, trends, and protected-area performance over time with clear reporting for operations and funders.",
    icon: ChartSpline,
  },
] as const;

const workflowSteps = [
  {
    index: "01",
    title: "Capture Hardware",
    description:
      "Cameras and edge devices collect live imagery and movement signals across reserve perimeters, routes, and high-risk zones.",
  },
  {
    index: "02",
    title: "Real-Time AI",
    description:
      "Detection models classify rhinos, poachers, and vehicles while preserving the timing and location context teams need to act.",
  },
  {
    index: "03",
    title: "Backend Intelligence Layer",
    description:
      "Events are enriched, structured, and prioritized inside a central intelligence layer designed for enterprise-grade workflows.",
  },
  {
    index: "04",
    title: "Dashboard & Response",
    description:
      "Operations teams review alerts, coordinate field actions, and track outcomes from a clear command-center interface.",
  },
] as const;

const impactPoints = [
  {
    title: "Faster threat response",
    description:
      "Move from scattered signals to prioritized actions quickly enough to matter in live reserve operations.",
  },
  {
    title: "Operational visibility",
    description:
      "See activity across reserves, patrol areas, and monitoring zones without depending on fragmented reporting chains.",
  },
  {
    title: "Conservation credibility",
    description:
      "Support measurable wildlife protection outcomes with a product that feels trustworthy to NGOs, operators, and investors.",
  },
  {
    title: "Clarity for distributed teams",
    description:
      "Give field teams, analysts, and decision-makers a shared operational picture even when they work across distance and shifts.",
  },
] as const;

export default function LandingPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <div className="space-y-8">
            <Badge className="border border-brand-primary/20 bg-brand-primary/10 text-brand-secondary">
              AI-powered conservation intelligence
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl font-[var(--font-display)] text-5xl leading-[1.02] text-text-primary md:text-6xl xl:text-7xl">
                Real-time intelligence for wildlife protection, reserve security,
                and calmer operational decisions.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-text-muted md:text-xl">
                RhinoGuardians helps conservation teams detect rhinos, poachers,
                and vehicles in real time, connect field intelligence to mapped
                context, and coordinate action from one premium command center.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "group gap-2")}
                href={appRoutes.signUp}
              >
                Request demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                className={buttonVariants({ size: "lg", variant: "secondary" })}
                href={appRoutes.dashboard}
              >
                View platform
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MarketingMetricChip label="Detection status" value="Live monitoring" />
              <MarketingMetricChip label="Reserve coverage" value="Zone-based visibility" />
              <MarketingMetricChip label="Response model" value="Alert-driven operations" />
            </div>
          </div>
          <Card className="overflow-hidden border-border-subtle/80 bg-surface/85 shadow-[0_30px_70px_-30px_rgba(8,26,18,0.9)] backdrop-blur">
            <CardContent className="space-y-6 p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                    Live operations preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                    Reserve monitoring at a glance
                  </h2>
                </div>
                <div className="rounded-full border border-status-success/20 bg-status-success/10 px-3 py-1 text-xs font-semibold text-status-success">
                  All systems connected
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
                        Reserve map snapshot
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
                      Corridor camera cluster online
                    </div>
                    <div className="col-span-3 flex items-center gap-2 rounded-2xl border border-status-danger/30 bg-status-danger/10 px-3 py-2 text-xs text-text-primary">
                      <Siren className="h-4 w-4 text-status-danger" />
                      Suspicious vehicle route flagged
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
                        Ranger teams online
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-text-primary">
                        7
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">Live intelligence feed</p>
                      <ShieldCheck className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        {
                          title: "Rhino herd movement verified",
                          detail: "Northern waterline · 2 min ago",
                          tone: "success",
                        },
                        {
                          title: "Possible vehicle detected",
                          detail: "Eastern perimeter · 5 min ago",
                          tone: "danger",
                        },
                        {
                          title: "Patrol waypoint updated",
                          detail: "Sector B3 · 8 min ago",
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

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20" id="product">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
          <SectionHeading
            eyebrow="Mission and value"
            title="Built for the real pressure of wildlife protection, not just the idea of it."
            description="RhinoGuardians is designed for conservation teams that need operational clarity under field conditions. It connects reserve monitoring, AI detections, and response workflows into one platform that feels calm, credible, and immediately usable."
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
        <div className="space-y-10">
          <SectionHeading
            align="center"
            eyebrow="Core capabilities"
            title="A product foundation that supports detection, intelligence, and response."
            description="RhinoGuardians combines field-ready workflows with executive-grade visibility, so teams can move from signal to action without losing trust in the system."
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
            title="A clear system path from capture to operational response."
            description="The platform architecture follows the real flow of conservation intelligence: collect signals, interpret them with AI, structure them in a backend intelligence layer, and deliver clear actions through the dashboard."
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
            title="A dashboard experience that feels like a calm command center."
            description="This preview shows how RhinoGuardians can present summary metrics, live activity, reserve zones, and alert status without overwhelming the teams who rely on it."
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
                      <MarketingMetricChip label="Monitored zones" value="24" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border-subtle/80 bg-canvas/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">Alert statuses</p>
                      <BellRing className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Priority response", "2 active", "bg-status-danger"],
                        ["Under review", "3 active", "bg-brand-secondary"],
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
                      <p className="text-sm font-medium text-text-primary">Reserve zones</p>
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
                      <p className="text-sm font-medium text-text-primary">Live activity feed</p>
                      <Waypoints className="h-4 w-4 text-brand-secondary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        "Thermal camera heartbeat confirmed in Sector C1",
                        "Field team sync completed for evening patrol route",
                        "Vehicle alert escalated to reserve operations lead",
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
            eyebrow="Why RhinoGuardians matters"
            title="A clearer operating picture can change the quality and speed of conservation response."
            description="The value of RhinoGuardians is not just in detection accuracy. It is in helping distributed teams see the same truth sooner, coordinate more effectively, and protect wildlife with stronger operational discipline."
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
                Final call to action
              </p>
              <h2 className="font-[var(--font-display)] text-4xl leading-tight text-text-primary">
                Bring reserve monitoring, live intelligence, and response
                workflows into one trusted platform.
              </h2>
              <p className="text-base leading-7 text-text-muted md:text-lg">
                RhinoGuardians is built to support operators, NGOs, and field
                teams with a conservation-first product that feels premium,
                practical, and ready for serious deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "group gap-2")}
                href={appRoutes.signUp}
              >
                Request demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                className={buttonVariants({ size: "lg", variant: "secondary" })}
                href="#contact"
              >
                Contact Linfy
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
