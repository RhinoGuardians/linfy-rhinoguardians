import type { DataSource, MetricTone } from "@/types";

export type ThresholdSensitivity = "low" | "moderate" | "high";
export type ApiConnectionStatus = "connected" | "fallback" | "offline";

export interface OrganizationProfileSettings {
  operatorName: string;
  platformDisplayName: string;
  contactEmail: string;
  supportContact: string;
  operationalNotes: string;
}

export interface ReserveInformationSettings {
  reserveName: string;
  reserveRegion: string;
  monitoredZonesCount: number;
  reserveType: string;
  timezone: string;
}

export interface NotificationPreferencesSettings {
  emailAlertsEnabled: boolean;
  smsAlertsEnabled: boolean;
  criticalOnlyMode: boolean;
  digestNotifications: boolean;
  preferredChannelsSummary: string;
}

export interface AlertThresholdSettings {
  poacherAlertSensitivity: ThresholdSensitivity;
  vehicleAlertSensitivity: ThresholdSensitivity;
  wildlifeConfidenceThreshold: number;
  escalationTimingMinutes: number;
  criticalIncidentThreshold: number;
}

export interface SettingsEditableState {
  organizationProfile: OrganizationProfileSettings;
  reserveInformation: ReserveInformationSettings;
  notificationPreferences: NotificationPreferencesSettings;
  alertThresholds: AlertThresholdSettings;
}

export interface ApiDataSourceSettings {
  mode: "mock" | "api-first";
  connectionStatus: ApiConnectionStatus;
  pollingIntervalMs: number;
  backendUrlDisplay: string;
  fallbackNote: string;
}

export interface AccountSecuritySnapshot {
  authProvider: "Clerk";
  signedInUserLabel: string;
  signedInEmail: string;
  sessionStatus: string;
  mfaStatus: string;
  securityNote: string;
}

export interface SettingsSummaryItem {
  id:
    | "notifications_enabled"
    | "protected_zones"
    | "active_thresholds"
    | "api_mode"
    | "last_updated";
  label: string;
  value: string;
  supportingText: string;
  tone: MetricTone;
}

export interface SettingsWorkspaceData {
  editable: SettingsEditableState;
  defaults: SettingsEditableState;
  summary: SettingsSummaryItem[];
  apiDataSource: ApiDataSourceSettings;
  accountSecurity: AccountSecuritySnapshot;
  updatedAt: string;
}

export interface SettingsLoadState {
  dataSource: DataSource;
  statusMessage: string;
}
