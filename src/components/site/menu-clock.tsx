"use client";

import { useEffect, useState } from "react";

/**
 * Windhoek time, kept in the menu meta. The server renders nothing, so
 * there is no hydration mismatch and nothing announced twice: the place
 * line beside it already carries the city. With JavaScript off the
 * clock simply does not appear.
 */
export function MenuClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: "Africa/Windhoek",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <p className="menu-clock">
      Windhoek · <span className="tnum">{time}</span>
    </p>
  );
}
