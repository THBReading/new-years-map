import Fireworks from "@fireworks-js/react";

const Firework = () => {
  return (
    <Fireworks
      options={{
        rocketsPoint: { min: 50, max: 50 },
        particles: 10,
        explosion: 5,
        autoresize: true,
        intensity: 10,
        lineWidth: { explosion: {min: 1, max: 3}, trace: {min: 1, max: 3} },
        traceLength: 1,
        traceSpeed: 1,
      }}
      style={{ width: 200, height: 200, border: "red" }}
    />
  );
};

export default Firework;
