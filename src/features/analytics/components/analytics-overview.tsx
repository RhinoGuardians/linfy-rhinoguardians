"use client";

import { useEffect, useRef, useState } from "react";
import { Download, TimerReset } from "lucide-react";

import { DataSourceBadge } from "@/components/shared/data-source-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchAnalyticsSummary } from "@/features/analytics/api";
import { ChartPanel } from "@/features/analytics/components/chart-panel";
import { AnalyticsKpiCard } from "@/features/analytics/components/analytics-kpi-card";
import { InsightStat } from "@/features/analytics/components/insight-stat";
import { ZoneActivityCard } from "@/features/analytics/components/zone-activity-card";
import { analyticsPageData } from "@/features/analytics/mock/analytics-data";
import type { AnalyticsPageData } from "@/features/analytics/types";
import { getThreatToneClasses } from "@/features/analytics/utils/analytics-styles";
import type { DataSource } from "@/types";

export function AnalyticsOverview() {
  const [pageData, setPageData] = useState<AnalyticsPageData>(analyticsPageData);
  const [dataSource, setDataSource] = useState<DataSource>("mock");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Using local analytics dataset.",
  );
  const hasRequestedData = useRef(false);

  useEffect(() => {
    let isActive = true;

    if (!hasRequestedData.current) {
      hasRequestedData.current = true;

      void fetchAnalyticsSummary().then((result) => {
        if (!isActive) {
          return;
        }

        setPageData(result.data);
        setDataSource(result.source);
        setStatusMessage(
          result.source === "api"
            ? "Live analytics API connected."
            : (result.message ?? "Using local analytics dataset."),
        );
      });
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-border-subtle/80 bg-surface/88">
        <CardContent className="flex flex-col gap-6 p-5 sm:p-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Intelligence workspace
            </p>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
                Conservation intelligence and operational analytics
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-text-muted">
                A reporting-grade view of detection volume, threat concentration,
                response performance, and reserve-level activity across the
                RhinoGuardians network.
              </p>
              <DataSourceBadge className="w-fit" source={dataSource} />
              <p className="text-sm text-text-muted">{statusMessage}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
              <TimerReset className="h-4 w-4 text-brand-secondary" />
              Reporting period: Last 30 days
            </div>
            <Button
              aria-label="Export analytics report"
              size="sm"
              type="button"
              variant="secondary"
            >
              <Download className="mr-2 h-4 w-4" />
              Export report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-5">
        {pageData.metrics.map((metric) => (
          <AnalyticsKpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {pageData.trendSeries.map((series) => (
          <ChartPanel key={series.id} series={series} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Threat activity breakdown
              </p>
              <h3 className="text-xl font-semibold text-text-primary">
                Risk distribution across alerts and monitored zones
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {pageData.threatBreakdown.map((item) => (
                <div
                  className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4"
                  key={item.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-text-primary">
                      {item.label}
                    </p>
                    <span className="text-sm font-semibold text-text-primary">
                      {item.value}
                    </span>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-surface-elevated/80">
                    <div
                      className={getThreatToneClasses(item.tone)}
                      style={{ width: `${item.share}%`, height: "100%" }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-text-muted">
                    {item.share}% of monitored threat activity
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Response performance
              </p>
              <h3 className="text-xl font-semibold text-text-primary">
                Operational effectiveness snapshot
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {pageData.responsePerformance.map((item) => (
                <InsightStat
                  key={item.id}
                  label={item.label}
                  supportingText={item.supportingText}
                  value={item.value}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Geographic and reserve summary
              </p>
              <h3 className="text-xl font-semibold text-text-primary">
                Zone-level intelligence and patrol coverage
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {pageData.zoneActivity.map((zone) => (
                <ZoneActivityCard key={zone.id} zone={zone} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-border-subtle/80 bg-surface/88">
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                  Most active zones
                </p>
                <h3 className="text-xl font-semibold text-text-primary">
                  Highest operational intensity
                </h3>
              </div>
              <div className="space-y-3">
                {pageData.mostActiveZones.map((zone) => (
                  <InsightStat
                    badge={zone.status}
                    badgeClassName="border-amber-400/20 bg-amber-400/10 text-amber-300"
                    key={zone.id}
                    label={zone.zone}
                    supportingText={zone.patrolCoverage}
                    value={zone.wildlifeDensity}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-subtle/80 bg-surface/88">
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                  Safest zones
                </p>
                <h3 className="text-xl font-semibold text-text-primary">
                  Stable wildlife protection corridors
                </h3>
              </div>
              <div className="space-y-3">
                {pageData.safestZones.map((zone) => (
                  <InsightStat
                    badge={zone.status}
                    badgeClassName="border-status-success/20 bg-status-success/10 text-status-success"
                    key={zone.id}
                    label={zone.zone}
                    supportingText={zone.patrolCoverage}
                    value={zone.wildlifeDensity}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
