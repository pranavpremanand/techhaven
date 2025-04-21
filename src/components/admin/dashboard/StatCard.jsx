const StatCard = ({
  icon,
  title,
  value,
  change,
  comparison = "vs previous period",
}) => {
  // Handle cases where change might be undefined or null
  const hasChange = typeof change === "number";

  // Format the change percentage with + sign for positive values
  const formattedChange = hasChange
    ? `${change > 0 ? "+" : ""}${change.toFixed(1)}%`
    : null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-primary">{icon}</div>
        <div>
          <h3 className="text-sm font-light text-gray-500">{title}</h3>
          <p className="text-2xl font-medium text-gray-800">{value}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center">
        {hasChange ? (
          <>
            <span
              className={`text-sm font-medium ${
                change > 0
                  ? "text-green-500"
                  : change < 0
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {formattedChange} {change > 0 ? "↑" : change < 0 ? "↓" : "→"}
            </span>
            <span className="text-xs text-gray-500 ml-2">{comparison}</span>
          </>
        ) : (
          <span className="text-xs text-gray-500">No comparison data</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
