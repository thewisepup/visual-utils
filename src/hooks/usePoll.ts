import { useEffect, useRef, useState } from 'react';

type UsePollOptions = {
  getPollingState: () => Promise<boolean>;
  shouldPoll: boolean;
  interval: number;
};

export function usePoll({
  getPollingState,
  shouldPoll,
  interval,
}: UsePollOptions) {
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!shouldPoll) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      setIsPolling(false);
      return;
    }

    setIsPolling(true);

    intervalIdRef.current = setInterval(async () => {
      const isPollingComplete = await getPollingState();
      if (isPollingComplete) {
        setIsPolling(false);
        clearInterval(intervalIdRef.current!);
        intervalIdRef.current = null;
      }
    }, interval);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [interval, getPollingState, shouldPoll]);

  return { isPolling };
}
