import { useCallback, useEffect, useRef, useState } from "react";

const tickRate = 100;

interface Timeout {
  pause: () => void;
  resume: () => void;
  remaining: number | null;
  isPaused: boolean;
}

export const useTimeout = (
  callback: () => void,
  delay: number | null,
): Timeout => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [remaining, setRemaining] = useState<number | null>(delay);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clearTimers = () => {
    clearTimeout(timeoutRef.current!);
    clearInterval(intervalRef.current!);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  const startTimers = useCallback((time: number) => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
      clearTimers();
    }, time);

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 0) return 0;
        return Math.max(prev - tickRate, 0);
      });
    }, tickRate);
  }, []);

  const pause = useCallback(() => {
    clearTimers();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (remaining === null || remaining <= 0) return;
    setIsPaused(false);
    startTimers(remaining);
  }, [remaining, startTimers]);

  useEffect(() => {
    if (delay === null) return;

    setRemaining(delay);
    setIsPaused(false);
    startTimers(delay);

    return () => clearTimers();
  }, [delay, startTimers]);

  return { pause, resume, remaining, isPaused };
};
