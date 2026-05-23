"use client";

import { useEffect, useMemo, useState } from "react";

export default function useCountdown(
  initialSeconds = 0,
  autoStart = false
) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggle = () => {
    setIsRunning((prev) => !prev);
  };

  const reset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  const formatted = useMemo(() => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  }, [seconds]);

  return {
    seconds,
    formatted,
    isRunning,
    toggle,
    reset,
  };
}