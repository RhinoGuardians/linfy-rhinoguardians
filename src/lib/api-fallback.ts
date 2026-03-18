import axios from "axios";

type BackendAvailabilityScope =
  | "detections"
  | "rangers"
  | "reports"
  | "settings";

const unavailableScopes = new Set<BackendAvailabilityScope>();

function isNetworkFailure(error: unknown) {
  return axios.isAxiosError(error) && !error.response;
}

export function isBackendUnavailable(scope: BackendAvailabilityScope) {
  return unavailableScopes.has(scope);
}

export function markBackendUnavailable(scope: BackendAvailabilityScope) {
  unavailableScopes.add(scope);
}

export function clearBackendUnavailable(scope: BackendAvailabilityScope) {
  unavailableScopes.delete(scope);
}

export function shouldUseFastMockFallback(
  scope: BackendAvailabilityScope,
  error?: unknown,
) {
  if (typeof error === "undefined") {
    return isBackendUnavailable(scope);
  }

  return isNetworkFailure(error);
}
