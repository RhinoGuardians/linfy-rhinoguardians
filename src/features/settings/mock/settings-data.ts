import { apiConfig } from "@/config/api";
import type {
  AccountSecuritySnapshot,
  AlertThresholdSettings,
  ApiConnectionStatus,
  ApiDataSourceSettings,
  NotificationPreferencesSettings,
  OrganizationProfileSettings,
  ReserveInformationSettings,
  SettingsEditableState,
  SettingsSummaryItem,
  SettingsWorkspaceData,
} from "@/features/settings/types";

function getUpdatedAt() {
  return new Date().toISOString();
}

function formatBackendUrlDisplay(url: string) {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
  } catch {
    return url;
  }
}

export function cloneOrganizationProfile(
  value: OrganizationProfileSettings,
): OrganizationProfileSettings {
  return { ...value };
}

export function cloneReserveInformation(
  value: ReserveInformationSettings,
): ReserveInformationSettings {
  return { ...value };
}

export function cloneNotificationPreferences(
  value: NotificationPreferencesSettings,
): NotificationPreferencesSettings {
  return { ...value };
}

export function cloneAlertThresholds(
  value: AlertThresholdSettings,
): AlertThresholdSettings {
  return { ...value };
}

export function cloneEditableState(
  value: SettingsEditableState,
): SettingsEditableState {
  return {
    organizationProfile: cloneOrganizationProfile(value.organizationProfile),
    reserveInformation: cloneReserveInformation(value.reserveInformation),
    notificationPreferences: cloneNotificationPreferences(
      value.notificationPreferences,
    ),
    alertThresholds: cloneAlertThresholds(value.alertThresholds),
  };
}

export function buildSettingsSummary(
  editable: SettingsEditableState,
  apiDataSource: ApiDataSourceSettings,
  updatedAt: string,
): SettingsSummaryItem[] {
  const notificationsEnabled = [
    editable.notificationPreferences.emailAlertsEnabled,
    editable.notificationPreferences.smsAlertsEnabled,
    editable.notificationPreferences.digestNotifications,
  ].filter(Boolean).length;

  const activeThresholds = [
    editable.alertThresholds.poacherAlertSensitivity,
    editable.alertThresholds.vehicleAlertSensitivity,
    editable.alertThresholds.wildlifeConfidenceThreshold,
    editable.alertThresholds.escalationTimingMinutes,
    editable.alertThresholds.criticalIncidentThreshold,
  ].length;

  const formattedUpdatedAt = new Intl.DateTimeFormat("en-ZA", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(updatedAt));

  return [
    {
      id: "notifications_enabled",
      label: "Notifications enabled",
      value: `${notificationsEnabled}/3`,
      supportingText: "Alert and digest channels currently active for operators.",
      tone: notificationsEnabled >= 2 ? "safe" : "warning",
    },
    {
      id: "protected_zones",
      label: "Protected zones configured",
      value: String(editable.reserveInformation.monitoredZonesCount),
      supportingText: "Reserve sectors configured for monitoring and reporting.",
      tone: "neutral",
    },
    {
      id: "active_thresholds",
      label: "Active alert thresholds",
      value: String(activeThresholds),
      supportingText: "Operational trigger controls currently defined for alerts.",
      tone: "warning",
    },
    {
      id: "api_mode",
      label: "API connection mode",
      value: apiDataSource.mode === "api-first" ? "API-first" : "Mock",
      supportingText: "Current frontend strategy for loading operational data.",
      tone: apiDataSource.mode === "api-first" ? "safe" : "neutral",
    },
    {
      id: "last_updated",
      label: "Last updated",
      value: formattedUpdatedAt,
      supportingText: "Most recent configuration snapshot applied in this workspace.",
      tone: "neutral",
    },
  ];
}

function buildApiDataSource(connectionStatus: ApiConnectionStatus): ApiDataSourceSettings {
  return {
    mode: apiConfig.dataSourceMode === "mock" ? "mock" : "api-first",
    connectionStatus,
    pollingIntervalMs: apiConfig.pollingIntervalMs,
    backendUrlDisplay: formatBackendUrlDisplay(apiConfig.baseUrl),
    fallbackNote:
      apiConfig.dataSourceMode === "mock"
        ? "Live API mode is disabled. RhinoGuardians is running on the local mock configuration."
        : "If the backend becomes unavailable, RhinoGuardians falls back to local mock datasets for non-polled admin surfaces.",
  };
}

const editableSettingsDefaults: SettingsEditableState = {
  organizationProfile: {
    operatorName: "Linfy Conservation Operations",
    platformDisplayName: "RhinoGuardians Command Workspace",
    contactEmail: "ops@linfytech.co.za",
    supportContact: "+27 11 555 0142",
    operationalNotes:
      "Coordinate field reporting, reserve oversight, and stakeholder communications from one controlled enterprise workspace.",
  },
  reserveInformation: {
    reserveName: "Greater Limpopo Rhino Reserve",
    reserveRegion: "Limpopo, South Africa",
    monitoredZonesCount: 12,
    reserveType: "Private conservation network",
    timezone: "Africa/Johannesburg",
  },
  notificationPreferences: {
    emailAlertsEnabled: true,
    smsAlertsEnabled: true,
    criticalOnlyMode: false,
    digestNotifications: true,
    preferredChannelsSummary: "Email for digests, SMS for critical threat alerts.",
  },
  alertThresholds: {
    poacherAlertSensitivity: "high",
    vehicleAlertSensitivity: "moderate",
    wildlifeConfidenceThreshold: 82,
    escalationTimingMinutes: 8,
    criticalIncidentThreshold: 3,
  },
};

const accountSecuritySnapshot: AccountSecuritySnapshot = {
  authProvider: "Clerk",
  signedInUserLabel: "Operations administrator",
  signedInEmail: "admin@rhinoguardians.ai",
  sessionStatus: "Protected dashboard session active",
  mfaStatus: "MFA status managed through Clerk",
  securityNote:
    "Account lifecycle, password controls, and MFA enrollment remain managed through Clerk-hosted security workflows.",
};

export function createSettingsWorkspaceData(
  overrides?: Partial<Pick<SettingsWorkspaceData, "editable" | "updatedAt">> & {
    connectionStatus?: ApiConnectionStatus;
  },
): SettingsWorkspaceData {
  const editable = cloneEditableState(
    overrides?.editable ?? editableSettingsDefaults,
  );
  const defaults = cloneEditableState(editableSettingsDefaults);
  const updatedAt = overrides?.updatedAt ?? getUpdatedAt();
  const apiDataSource = buildApiDataSource(
    overrides?.connectionStatus ??
      (apiConfig.dataSourceMode === "mock" ? "fallback" : "offline"),
  );

  return {
    editable,
    defaults,
    summary: buildSettingsSummary(editable, apiDataSource, updatedAt),
    apiDataSource,
    accountSecurity: { ...accountSecuritySnapshot },
    updatedAt,
  };
}

export const settingsWorkspaceMockData = createSettingsWorkspaceData();
