"use client";

import { useEffect, useRef } from "react";

interface UsePollingOptions {
  enabled?: boolean;
  intervalMs?: number;
}

export function usePolling(
  callback: () => void | Promise<void>,
  options: UsePollingOptions,
) {
  const { enabled = true, intervalMs } = options;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || !intervalMs || intervalMs <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void callbackRef.current();
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled, intervalMs]);
}
