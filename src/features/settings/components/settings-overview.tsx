"use client";

import { useUser } from "@clerk/nextjs";
import { LoaderCircle, RefreshCcw, Save, ShieldCheck, UserRoundCog } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { DataSourceStatusCard } from "@/components/shared/data-source-status";
import { EmptyState } from "@/components/shared/empty-state";
import { ModuleLoadingState } from "@/components/shared/module-loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchSettingsWorkspace } from "@/features/settings/api";
import {
  SettingsSectionCard,
} from "@/features/settings/components/settings-section-card";
import { SettingsStatusBadge } from "@/features/settings/components/settings-status-badge";
import { SettingsSummaryCard } from "@/features/settings/components/settings-summary-card";
import { SettingsToggleRow } from "@/features/settings/components/settings-toggle-row";
import { ThresholdControl } from "@/features/settings/components/threshold-control";
import {
  buildSettingsSummary,
  cloneEditableState,
} from "@/features/settings/mock/settings-data";
import type {
  AlertThresholdSettings,
  NotificationPreferencesSettings,
  OrganizationProfileSettings,
  ReserveInformationSettings,
  SettingsEditableState,
  SettingsWorkspaceData,
} from "@/features/settings/types";
import type { DataSource } from "@/types";

const sensitivityOptions = ["low", "moderate", "high"] as const;
const reserveTypeOptions = [
  "Private conservation network",
  "National reserve",
  "Community conservancy",
  "Wildlife rehabilitation zone",
] as const;

function formatSavedTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function updateOrganizationField<TKey extends keyof OrganizationProfileSettings>(
  current: SettingsEditableState,
  key: TKey,
  value: OrganizationProfileSettings[TKey],
): SettingsEditableState {
  return {
    ...current,
    organizationProfile: {
      ...current.organizationProfile,
      [key]: value,
    },
  };
}

function updateReserveField<TKey extends keyof ReserveInformationSettings>(
  current: SettingsEditableState,
  key: TKey,
  value: ReserveInformationSettings[TKey],
): SettingsEditableState {
  return {
    ...current,
    reserveInformation: {
      ...current.reserveInformation,
      [key]: value,
    },
  };
}

function updateNotificationField<
  TKey extends keyof NotificationPreferencesSettings,
>(
  current: SettingsEditableState,
  key: TKey,
  value: NotificationPreferencesSettings[TKey],
): SettingsEditableState {
  return {
    ...current,
    notificationPreferences: {
      ...current.notificationPreferences,
      [key]: value,
    },
  };
}

function updateThresholdField<TKey extends keyof AlertThresholdSettings>(
  current: SettingsEditableState,
  key: TKey,
  value: AlertThresholdSettings[TKey],
): SettingsEditableState {
  return {
    ...current,
    alertThresholds: {
      ...current.alertThresholds,
      [key]: value,
    },
  };
}

export function SettingsOverview() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [workspace, setWorkspace] = useState<SettingsWorkspaceData | null>(null);
  const [editableState, setEditableState] = useState<SettingsEditableState | null>(
    null,
  );
  const [savedBaseline, setSavedBaseline] = useState<SettingsEditableState | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource>("mock");
  const [statusMessage, setStatusMessage] = useState(
    "Loading administration workspace...",
  );
  const [localNotice, setLocalNotice] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const hasRequestedWorkspace = useRef(false);

  useEffect(() => {
    let isActive = true;

    if (!hasRequestedWorkspace.current) {
      hasRequestedWorkspace.current = true;

      void fetchSettingsWorkspace().then((result) => {
        if (!isActive) {
          return;
        }

        setWorkspace(result.data);
        setEditableState(cloneEditableState(result.data.editable));
        setSavedBaseline(cloneEditableState(result.data.editable));
        setDataSource(result.source);
        setLastSavedAt(result.data.updatedAt);
        setStatusMessage(
          result.source === "api"
            ? "Live administration workspace connected."
            : (result.message ??
                "Using local settings and administration dataset."),
        );
        setIsLoading(false);
      });
    }

    return () => {
      isActive = false;
    };
  }, []);

  const hasUnsavedChanges = useMemo(() => {
    if (!editableState || !savedBaseline) {
      return false;
    }

    return JSON.stringify(editableState) !== JSON.stringify(savedBaseline);
  }, [editableState, savedBaseline]);

  const derivedSummary = useMemo(() => {
    if (!workspace || !editableState) {
      return [];
    }

    return buildSettingsSummary(
      editableState,
      workspace.apiDataSource,
      lastSavedAt ?? workspace.updatedAt,
    );
  }, [editableState, lastSavedAt, workspace]);

  const combinedStatusMessage = useMemo(() => {
    return localNotice ? `${statusMessage} ${localNotice}` : statusMessage;
  }, [localNotice, statusMessage]);

  const signedInUserLabel = useMemo(() => {
    if (isLoaded && isSignedIn && user) {
      return user.fullName ?? user.firstName ?? workspace?.accountSecurity.signedInUserLabel ?? "Signed-in operator";
    }

    return workspace?.accountSecurity.signedInUserLabel ?? "Signed-in operator";
  }, [isLoaded, isSignedIn, user, workspace]);

  const signedInEmail = useMemo(() => {
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      return user.primaryEmailAddress.emailAddress;
    }

    return workspace?.accountSecurity.signedInEmail ?? "Not available";
  }, [isLoaded, isSignedIn, user, workspace]);

  async function handleSaveChanges() {
    if (!editableState || !workspace || !hasUnsavedChanges) {
      return;
    }

    setIsSaving(true);

    await new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 500);
    });

    const nextUpdatedAt = new Date().toISOString();
    setSavedBaseline(cloneEditableState(editableState));
    setWorkspace({
      ...workspace,
      editable: cloneEditableState(editableState),
      summary: buildSettingsSummary(
        editableState,
        workspace.apiDataSource,
        nextUpdatedAt,
      ),
      updatedAt: nextUpdatedAt,
    });
    setLastSavedAt(nextUpdatedAt);
    setLocalNotice(
      "Configuration changes saved locally. Backend persistence will be introduced in a later phase.",
    );
    setIsSaving(false);
  }

  function handleResetDefaults() {
    if (!workspace) {
      return;
    }

    setEditableState(cloneEditableState(workspace.defaults));
    setLocalNotice(
      "Default settings restored locally. Save changes to apply this configuration snapshot.",
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          description="Manage platform configuration, reserve setup, operational thresholds, and security context from one administration workspace."
          eyebrow="Workspace administration"
          title="Settings"
        />
        <ModuleLoadingState
          description="Preparing the settings workspace, configuration defaults, and account security context."
          title="Preparing administration workspace"
        />
      </div>
    );
  }

  if (!workspace || !editableState) {
    return (
      <EmptyState
        description="Settings data is not available yet. Retry once the administration feed is ready."
        title="Administration workspace unavailable"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        action={
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button
              aria-label="Reset settings to defaults"
              onClick={handleResetDefaults}
              size="sm"
              type="button"
              variant="secondary"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset defaults
            </Button>
            <Button
              aria-label="Save settings changes"
              disabled={!hasUnsavedChanges || isSaving}
              onClick={() => void handleSaveChanges()}
              size="sm"
              type="button"
              variant="primary"
            >
              {isSaving ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save changes
            </Button>
          </div>
        }
        description="Manage platform configuration, reserve setup, notifications, alert thresholds, and account security posture from one enterprise administration workspace."
        eyebrow="Workspace administration"
        title="Settings"
      />

      <DataSourceStatusCard
        message={combinedStatusMessage}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <SettingsStatusBadge
              kind="unsaved"
              value={hasUnsavedChanges ? "unsaved" : "saved"}
            />
            <span>Last saved: {formatSavedTimestamp(lastSavedAt ?? workspace.updatedAt)}</span>
          </div>
        }
        source={dataSource}
      />

      <div className="grid gap-4 xl:grid-cols-5">
        {derivedSummary.map((item) => (
          <SettingsSummaryCard item={item} key={item.id} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.18fr)_420px]">
        <div className="space-y-4">
          <SettingsSectionCard
            description="Configure the operating entity, platform naming, and primary administrative contact details shown across RhinoGuardians."
            eyebrow="Organization profile"
            title="Organization and operator identity"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Operator name
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateOrganizationField(
                            current,
                            "operatorName",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.organizationProfile.operatorName}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Platform display name
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateOrganizationField(
                            current,
                            "platformDisplayName",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.organizationProfile.platformDisplayName}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Contact email
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateOrganizationField(
                            current,
                            "contactEmail",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="email"
                  value={editableState.organizationProfile.contactEmail}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Support contact
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateOrganizationField(
                            current,
                            "supportContact",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.organizationProfile.supportContact}
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Operational notes
                </span>
                <textarea
                  className="dashboard-filter-input min-h-[120px] resize-none py-3"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateOrganizationField(
                            current,
                            "operationalNotes",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  value={editableState.organizationProfile.operationalNotes}
                />
              </label>
            </div>
          </SettingsSectionCard>

          <SettingsSectionCard
            description="Maintain reserve identity, operating region, coverage footprint, and local time context for the RhinoGuardians network."
            eyebrow="Reserve information"
            title="Reserve setup and operational classification"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Reserve name
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateReserveField(
                            current,
                            "reserveName",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.reserveInformation.reserveName}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Reserve region
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateReserveField(
                            current,
                            "reserveRegion",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.reserveInformation.reserveRegion}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Monitored zones count
                </span>
                <input
                  className="dashboard-filter-input"
                  min={1}
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateReserveField(
                            current,
                            "monitoredZonesCount",
                            Number(event.target.value) || 0,
                          )
                        : current,
                    )
                  }
                  type="number"
                  value={editableState.reserveInformation.monitoredZonesCount}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Reserve type
                </span>
                <select
                  className="dashboard-filter-select"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateReserveField(
                            current,
                            "reserveType",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  value={editableState.reserveInformation.reserveType}
                >
                  {reserveTypeOptions.map((option) => (
                    <option className="bg-[#0c1714]" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Timezone
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateReserveField(
                            current,
                            "timezone",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.reserveInformation.timezone}
                />
              </label>
            </div>
          </SettingsSectionCard>

          <SettingsSectionCard
            description="Control how RhinoGuardians routes alerts, digests, and critical field notifications across operator channels."
            eyebrow="Notification preferences"
            title="Alerting and reporting delivery"
          >
            <div className="space-y-3">
              <SettingsToggleRow
                checked={editableState.notificationPreferences.emailAlertsEnabled}
                description="Send operational alerts and reporting updates to the configured administration email addresses."
                label="Email alerts"
                onCheckedChange={(checked) =>
                  setEditableState((current) =>
                    current
                      ? updateNotificationField(
                          current,
                          "emailAlertsEnabled",
                          checked,
                        )
                      : current,
                  )
                }
              />
              <SettingsToggleRow
                checked={editableState.notificationPreferences.smsAlertsEnabled}
                description="Route critical field alerts to mobile operators and reserve leadership through SMS."
                label="SMS alerts"
                onCheckedChange={(checked) =>
                  setEditableState((current) =>
                    current
                      ? updateNotificationField(
                          current,
                          "smsAlertsEnabled",
                          checked,
                        )
                      : current,
                  )
                }
              />
              <SettingsToggleRow
                checked={editableState.notificationPreferences.criticalOnlyMode}
                description="Reduce alert noise by routing only critical threat and escalation events to the primary channels."
                label="Critical-only alert mode"
                onCheckedChange={(checked) =>
                  setEditableState((current) =>
                    current
                      ? updateNotificationField(
                          current,
                          "criticalOnlyMode",
                          checked,
                        )
                      : current,
                  )
                }
              />
              <SettingsToggleRow
                checked={editableState.notificationPreferences.digestNotifications}
                description="Deliver stakeholder and operational digest notifications on a scheduled reporting cadence."
                label="Digest and report notifications"
                onCheckedChange={(checked) =>
                  setEditableState((current) =>
                    current
                      ? updateNotificationField(
                          current,
                          "digestNotifications",
                          checked,
                        )
                      : current,
                  )
                }
              />
              <label className="space-y-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Preferred alert channels
                </span>
                <input
                  className="dashboard-filter-input"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateNotificationField(
                            current,
                            "preferredChannelsSummary",
                            event.target.value,
                          )
                        : current,
                    )
                  }
                  type="text"
                  value={editableState.notificationPreferences.preferredChannelsSummary}
                />
              </label>
            </div>
          </SettingsSectionCard>

          <SettingsSectionCard
            description="Tune alert sensitivity, wildlife confidence requirements, and escalation timing to match reserve operating posture."
            eyebrow="Alert thresholds"
            title="Operational threshold controls"
          >
            <div className="space-y-4">
              <ThresholdControl
                description="Adjust the sensitivity applied to intrusion and poacher-related detections."
                label="Poacher alert sensitivity"
                valueLabel={editableState.alertThresholds.poacherAlertSensitivity}
              >
                <select
                  className="dashboard-filter-select"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateThresholdField(
                            current,
                            "poacherAlertSensitivity",
                            event.target.value as AlertThresholdSettings["poacherAlertSensitivity"],
                          )
                        : current,
                    )
                  }
                  value={editableState.alertThresholds.poacherAlertSensitivity}
                >
                  {sensitivityOptions.map((option) => (
                    <option className="bg-[#0c1714]" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </ThresholdControl>

              <ThresholdControl
                description="Define how aggressively vehicle presence should escalate into monitored warning signals."
                label="Vehicle alert sensitivity"
                valueLabel={editableState.alertThresholds.vehicleAlertSensitivity}
              >
                <select
                  className="dashboard-filter-select"
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateThresholdField(
                            current,
                            "vehicleAlertSensitivity",
                            event.target.value as AlertThresholdSettings["vehicleAlertSensitivity"],
                          )
                        : current,
                    )
                  }
                  value={editableState.alertThresholds.vehicleAlertSensitivity}
                >
                  {sensitivityOptions.map((option) => (
                    <option className="bg-[#0c1714]" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </ThresholdControl>

              <ThresholdControl
                description="Set the minimum wildlife confidence score required before a signal enters operational review."
                label="Wildlife confidence threshold"
                valueLabel={`${editableState.alertThresholds.wildlifeConfidenceThreshold}%`}
              >
                <input
                  className="w-full accent-[hsl(var(--brand-primary))]"
                  max={100}
                  min={50}
                  onChange={(event) =>
                    setEditableState((current) =>
                      current
                        ? updateThresholdField(
                            current,
                            "wildlifeConfidenceThreshold",
                            Number(event.target.value),
                          )
                        : current,
                    )
                  }
                  type="range"
                  value={editableState.alertThresholds.wildlifeConfidenceThreshold}
                />
              </ThresholdControl>

              <div className="grid gap-4 md:grid-cols-2">
                <ThresholdControl
                  description="Define how quickly unresolved warning events should escalate into ranger or operations review."
                  label="Escalation timing"
                  valueLabel={`${editableState.alertThresholds.escalationTimingMinutes} min`}
                >
                  <input
                    className="dashboard-filter-input"
                    min={1}
                    onChange={(event) =>
                      setEditableState((current) =>
                        current
                          ? updateThresholdField(
                              current,
                              "escalationTimingMinutes",
                              Number(event.target.value) || 0,
                            )
                          : current,
                      )
                    }
                    type="number"
                    value={editableState.alertThresholds.escalationTimingMinutes}
                  />
                </ThresholdControl>
                <ThresholdControl
                  description="Number of critical incidents that should trigger heightened executive or reserve leadership attention."
                  label="Critical incident threshold"
                  valueLabel={String(editableState.alertThresholds.criticalIncidentThreshold)}
                >
                  <input
                    className="dashboard-filter-input"
                    min={1}
                    onChange={(event) =>
                      setEditableState((current) =>
                        current
                          ? updateThresholdField(
                              current,
                              "criticalIncidentThreshold",
                              Number(event.target.value) || 0,
                            )
                          : current,
                      )
                    }
                    type="number"
                    value={editableState.alertThresholds.criticalIncidentThreshold}
                  />
                </ThresholdControl>
              </div>
            </div>
          </SettingsSectionCard>
        </div>

        <div className="space-y-4">
          <SettingsSectionCard
            action={
              <div className="flex flex-wrap gap-2">
                <SettingsStatusBadge
                  kind="mode"
                  value={workspace.apiDataSource.mode}
                />
                <SettingsStatusBadge
                  kind="connection"
                  value={workspace.apiDataSource.connectionStatus}
                />
              </div>
            }
            description="Review the current frontend data strategy, backend reachability, polling interval, and graceful fallback posture."
            eyebrow="API and data source"
            title="Runtime configuration status"
          >
            <div className="grid gap-3">
              <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Current mode
                </p>
                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {workspace.apiDataSource.mode === "api-first"
                    ? "API-first with mock fallback"
                    : "Mock-only operation"}
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Backend host
                </p>
                <p className="mt-2 text-sm text-text-primary">
                  {workspace.apiDataSource.backendUrlDisplay}
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Polling interval
                </p>
                <p className="mt-2 text-sm text-text-primary">
                  {workspace.apiDataSource.pollingIntervalMs} ms
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Fallback behavior
                </p>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {workspace.apiDataSource.fallbackNote}
                </p>
              </div>
            </div>
          </SettingsSectionCard>

          <SettingsSectionCard
            action={
              <div className="flex flex-wrap gap-2">
                <SettingsStatusBadge kind="security" value="protected" />
                <SettingsStatusBadge kind="security" value="managed" />
              </div>
            }
            description="Review current sign-in context, Clerk-managed security posture, and enterprise account controls."
            eyebrow="Account and security"
            title="Identity and session protection"
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <UserRoundCog className="h-4 w-4 text-brand-secondary" />
                    Signed-in operator
                  </div>
                  <p className="mt-2 text-lg font-semibold text-text-primary">
                    {signedInUserLabel}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">{signedInEmail}</p>
                </div>
                <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <ShieldCheck className="h-4 w-4 text-brand-secondary" />
                    Security posture
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-text-muted">
                    <p>{workspace.accountSecurity.sessionStatus}</p>
                    <p>{workspace.accountSecurity.mfaStatus}</p>
                    <p>{workspace.accountSecurity.securityNote}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  aria-label="Manage account settings"
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  Manage account
                </Button>
                <Button
                  aria-label="Review security settings"
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  Review security
                </Button>
              </div>
            </div>
          </SettingsSectionCard>
        </div>
      </div>
    </div>
  );
}
