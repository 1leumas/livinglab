import { dateFormatter } from "./helpers";

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ name: string; value: string }>;
  label?: string;
};

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold">{dateFormatter(label)}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-lg font-semibold">
            {`${p.name}: ${p.value} ${p.name === "Temperatura" ? "°C" : ""}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
