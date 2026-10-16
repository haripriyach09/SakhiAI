interface OverviewCardProps {
  title: string;
  value: string;
  description: string;
  className?: string;
}

export function OverviewCard({
  title,
  value,
  description,
  className = "",
}: OverviewCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/80 p-5 shadow-sm ${className}`}
    >
      <p className="text-sm font-medium text-[#76566f]">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[#332532]">
        {value}
      </h2>

      <p className="mt-2 text-sm text-[#8b7285]">
        {description}
      </p>
    </div>
  );
}