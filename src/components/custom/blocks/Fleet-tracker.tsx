"use client";

import { Car, ChevronRight, Menu, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export type Vehicle = {
  id: string;
  location: string;
  lat: number;
  lng: number;
};

type MapProps = {
  fleetData: Vehicle[];
  activeVehicle: Vehicle;
  setActiveVehicle: (vehicle: Vehicle) => void;
};

// Dynamically import the map file we just created!
const DynamicMap = dynamic<MapProps>(() => import("./Fleet-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function FleetTracker({
  fleetData = [],
}: {
  fleetData: Vehicle[];
}) {
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(
    fleetData[0] || null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!activeVehicle && fleetData.length > 0) setActiveVehicle(fleetData[0]);
  }, [fleetData, activeVehicle]);

  const filteredFleet = fleetData.filter(
    (vehicle) =>
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleVehicleClick = (vehicle: Vehicle) => {
    setActiveVehicle(vehicle);
    if (typeof window !== "undefined" && window.innerWidth < 768)
      setIsSidebarOpen(false);
  };

  if (!activeVehicle && fleetData.length === 0) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
        Loading fleet data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-full h-[600px] sm:h-[700px] bg-white dark:bg-[#09090b] rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex overflow-hidden relative font-sans box-border">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} absolute md:relative z-30 w-80 lg:w-96 flex-shrink-0 h-full bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl flex flex-col border-r border-zinc-200 dark:border-zinc-800 shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 md:p-8 pb-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Fleet Status
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-zinc-200 transition-all cursor-text placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredFleet.length > 0 ? (
            <div className="p-2 space-y-1">
              {filteredFleet.map((vehicle) => {
                const isActive = activeVehicle?.id === vehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    onClick={() => handleVehicleClick(vehicle)}
                    className={`flex items-center justify-between p-3 md:px-4 rounded-xl cursor-pointer transition-all group ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 shadow-sm border border-indigo-100 dark:border-indigo-500/20" : "border border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/30"}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-sm ${isActive ? "bg-indigo-500 text-white" : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-500 group-hover:border-indigo-200 dark:group-hover:border-indigo-900"}`}
                      >
                        <Car className="w-5 h-5 cursor-pointer" />
                      </div>
                      <div className="cursor-pointer min-w-0">
                        <h3
                          className={`text-sm font-bold truncate ${isActive ? "text-indigo-900 dark:text-indigo-100" : "text-zinc-900 dark:text-zinc-100"}`}
                        >
                          {vehicle.id}
                        </h3>
                        <p
                          className={`text-xs truncate mt-0.5 ${isActive ? "text-indigo-600 dark:text-indigo-300" : "text-zinc-500 dark:text-zinc-400"}`}
                        >
                          {vehicle.location}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "text-indigo-500 translate-x-1" : "text-zinc-300 dark:text-zinc-600"}`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No vehicles found.
            </div>
          )}
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 md:hidden cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Map Area */}
      <main className="flex-1 relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden min-h-[400px] z-10 rounded-r-2xl">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-[1000] md:hidden bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 cursor-pointer" />
        </button>

        {activeVehicle && (
          <DynamicMap
            fleetData={filteredFleet}
            activeVehicle={activeVehicle}
            setActiveVehicle={setActiveVehicle}
          />
        )}
      </main>
    </div>
  );
}
