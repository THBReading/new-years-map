import useClockTick from "@/hooks/use-clock-tick";
import {
  getCityTime,
  isFireworksTime,
  timeTillMidnight,
} from "@/utils/get-timezone-time";
import Fireworks from "./Fireworks";
import { cn } from "@/utils/cn";

export default function CityMarker({ feature }: { feature: GeoJSON.Feature<GeoJSON.Geometry, { city: string; timezone: string }> }) {
  const { city, timezone } = feature.properties;

  useClockTick();

  const timeParts = getCityTime(timezone);
  const fireworks = isFireworksTime(timezone);
  const { minutes, seconds } = timeTillMidnight(timezone);
  const upcomingMidnight = minutes >= 0 && minutes < 15;
  const showCountdown = minutes < 1;

  return (
    <div
      className="absolute"
      style={{
        pointerEvents: "none",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -100%)",
      }}
    >
      {(fireworks || upcomingMidnight) && (
        <div
          className={cn(
            "absolute bottom-2 left-0 right-0 flex flex-col items-center text-xs",
            fireworks || showCountdown || upcomingMidnight
              ? "text-white"
              : "text-white/20"
          )}
        >
          <div>{city}</div>
          {!fireworks && !showCountdown && (
            <div>{timeParts.map((p) => p.value)}</div>
          )}
          {!fireworks && showCountdown && (
            <div className="text-xl">{seconds}</div>
          )}
          <div
            style={{
              bottom: "-50%",
              transform: "translateY(-50%)",
            }}
            className={cn(
              "absolute size-1 rounded-full",
              fireworks || showCountdown || upcomingMidnight
                ? "bg-white"
                : "bg-white/20"
            )}
          />
        </div>
      )}
      {fireworks && <Fireworks />}
    </div>
  );
}
