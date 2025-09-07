"use client";

export default function TableCard({ title, data, columns, statusStyles }) {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-20 border border-gray-100 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="w-30 h-30 flex-shrink-0">
              <img
                src={item.image}
                alt={item.product}
                className="w-full h-full object-cover rounded-md bg-gray-100"
              />
            </div>

            {/* ✅ Right Section: Details */}
            <div className="flex-1 w-full space-y-2 text-center sm:text-left">
              {columns.map((col) => {
                if (col.type === "status") {
                  return (
                    <div key={col.key}>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[item[col.key]]}`}
                      >
                        {item[col.key]}
                      </span>
                    </div>
                  );
                } else if (col.type === "action") {
                  return (
                    <div key={col.key}>
                      <button
                        onClick={() => col.onClick(item)}
                        className="px-4 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition"
                      >
                        {col.label || "Action"}
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <p
                      key={col.key}
                      className={`text-sm text-gray-700 ${col.className || ""}`}
                    >
                      <span className="font-medium capitalize">{col.key}: </span>
                      {item[col.key]}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
