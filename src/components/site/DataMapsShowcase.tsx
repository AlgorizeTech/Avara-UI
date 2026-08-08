"use client";

import React from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
	DataMaps,
	type DataPoint,
} from "@/components/custom/blocks/DataMapsBlock";

const DATA_MAPS_TS = `"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

export interface DataPoint {
  id: string; // ISO 3166-1 alpha-3 country code
  name: string; // Name to display on hover
  active?: number; // Active count
  activeTrend?: "up" | "down";
  new?: number; // New count
  newTrend?: "up" | "down";
  color?: string; // Optional custom fill color
  flag?: string; // Optional flag emoji
}

export interface DataMapsProps extends React.HTMLAttributes<HTMLDivElement> {
  dataPoints: DataPoint[];
  center?: [number, number];
  zoom?: number;
  highlightColor?: string;
  defaultColor?: string;
  mapGeoJsonUrl?: string;
}

const alpha3ToAlpha2: Record<string, string> = {"AFG":"AF","ALA":"AX","ALB":"AL","DZA":"DZ","ASM":"AS","AND":"AD","AGO":"AO","AIA":"AI","ATA":"AQ","ATG":"AG","ARG":"AR","ARM":"AM","ABW":"AW","AUS":"AU","AUT":"AT","AZE":"AZ","BHS":"BS","BHR":"BH","BGD":"BD","BRB":"BB","BLR":"BY","BEL":"BE","BLZ":"BZ","BEN":"BJ","BMU":"BM","BTN":"BT","BOL":"BO","BES":"BQ","BIH":"BA","BWA":"BW","BVT":"BV","BRA":"BR","IOT":"IO","BRN":"BN","BGR":"BG","BFA":"BF","BDI":"BI","CPV":"CV","KHM":"KH","CMR":"CM","CAN":"CA","CYM":"KY","CAF":"CF","TCD":"TD","CHL":"CL","CHN":"CN","CXR":"CX","CCK":"CC","COL":"CO","COM":"KM","COG":"CG","COD":"CD","COK":"CK","CRI":"CR","CIV":"CI","HRV":"HR","CUB":"CU","CUW":"CW","CYP":"CY","CZE":"CZ","DNK":"DK","DJI":"DJ","DMA":"DM","DOM":"DO","ECU":"EC","EGY":"EG","SLV":"SV","GNQ":"GQ","ERI":"ER","EST":"EE","SWZ":"SZ","ETH":"ET","FLK":"FK","FRO":"FO","FJI":"FJ","FIN":"FI","FRA":"FR","GUF":"GF","PYF":"PF","ATF":"TF","GAB":"GA","GMB":"GM","GEO":"GE","DEU":"DE","GHA":"GH","GIB":"GI","GRC":"GR","GRL":"GL","GRD":"GD","GLP":"GP","GUM":"GU","GTM":"GT","GGY":"GG","GIN":"GN","GNB":"GW","GUY":"GY","HTI":"HT","HMD":"HM","VAT":"VA","HND":"HN","HKG":"HK","HUN":"HU","ISL":"IS","IND":"IN","IDN":"ID","IRN":"IR","IRQ":"IQ","IRL":"IE","IMN":"IM","ISR":"IL","ITA":"IT","JAM":"JM","JPN":"JP","JEY":"JE","JOR":"JO","KAZ":"KZ","KEN":"KE","KIR":"KI","PRK":"KP","KOR":"KR","KWT":"KW","KGZ":"KG","LAO":"LA","LVA":"LV","LBN":"LB","LSO":"LS","LBR":"LR","LBY":"LY","LIE":"LI","LTU":"LT","LUX":"LU","MAC":"MO","MDG":"MG","MWI":"MW","MYS":"MY","MDV":"MV","MLI":"ML","MLT":"MT","MHL":"MH","MTQ":"MQ","MRT":"MR","MUS":"MU","MYT":"YT","MEX":"MX","FSM":"FM","MDA":"MD","MCO":"MC","MNG":"MN","MNE":"ME","MSR":"MS","MAR":"MA","MOZ":"MZ","MMR":"MM","NAM":"NA","NRU":"NR","NPL":"NP","NLD":"NL","NCL":"NC","NZL":"NZ","NIC":"NI","NER":"NE","NGA":"NG","NIU":"NU","NFK":"NF","MKD":"MK","MNP":"MP","NOR":"NO","OMN":"OM","PAK":"PK","PLW":"PW","PSE":"PS","PAN":"PA","PNG":"PG","PRY":"PY","PER":"PE","PHL":"PH","PCN":"PN","POL":"PL","PRT":"PT","PRI":"PR","QAT":"QA","REU":"RE","ROU":"RO","RUS":"RU","RWA":"RW","BLM":"BL","SHN":"SH","KNA":"KN","LCA":"LC","MAF":"MF","SPM":"PM","VCT":"VC","WSM":"WS","SMR":"SM","STP":"ST","SAU":"SA","SEN":"SN","SRB":"RS","SYC":"SC","SLE":"SL","SGP":"SG","SXM":"SX","SVK":"SK","SVN":"SI","SLB":"SB","SOM":"SO","ZAF":"ZA","SGS":"GS","SSD":"SS","ESP":"ES","LKA":"LK","SDN":"SD","SUR":"SR","SJM":"SJ","SWE":"SE","CHE":"CH","SYR":"SY","TWN":"TW","TJK":"TJ","TZA":"TZ","THA":"TH","TLS":"TL","TGO":"TG","TKL":"TK","TON":"TO","TTO":"TT","TUN":"TN","TUR":"TR","TKM":"TM","TCA":"TC","TUV":"TV","UGA":"UG","UKR":"UA","ARE":"AE","GBR":"GB","USA":"US","UMI":"UM","URY":"UY","UZB":"UZ","VUT":"VU","VEN":"VE","VNM":"VN","VGB":"VG","VIR":"VI","WLF":"WF","ESH":"EH","YEM":"YE","ZMB":"ZM","ZWE":"ZW"};

function getFlagHtml(alpha3: string) {
  const alpha2 = alpha3ToAlpha2[alpha3];
  if (!alpha2) return "";
  return \`<img src="https://flagcdn.com/w40/\${alpha2.toLowerCase()}.png" width="20" alt="\${alpha2}" class="inline-block object-cover rounded-[2px]" />\`;
}

export const DataMaps = React.forwardRef<HTMLDivElement, DataMapsProps>(
  (
    {
      dataPoints,
      center = [20, 0],
      zoom = 2,
      highlightColor = "var(--primary, #2563eb)",
      defaultColor = "#cbd5e1",
      mapGeoJsonUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json",
      className,
      ...props
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
      setIsMounted(true);
      fetch(mapGeoJsonUrl)
        .then((res) => res.json())
        .then((data) => setGeoData(data))
        .catch((err) => console.error("Error loading map GeoJSON:", err));
    }, [mapGeoJsonUrl]);

    if (!isMounted || !geoData) {
      return (
        <div ref={ref} className={cn("w-full h-full min-h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-lg animate-pulse flex items-center justify-center", className)} {...props}>
          <p className="text-slate-400 text-sm">Loading map data...</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("relative w-full h-full min-h-[400px] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900/50 map-wrapper", className)} {...props}>
        <style dangerouslySetInnerHTML={{__html: \\\`
          .map-wrapper {
            --map-default-fill: #e2e8f0;
          }
          :global(.dark) .map-wrapper, .dark .map-wrapper {
            --map-default-fill: #1e293b;
          }
          path.leaflet-interactive:focus {
            outline: none;
          }
          .map-stroke {
            stroke: #ffffff;
            stroke-width: 0.5;
            transition: fill 0.2s ease, fill-opacity 0.2s ease;
          }
          .dark .map-stroke {
            stroke: #0f172a;
          }
          .custom-leaflet-tooltip {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .custom-leaflet-tooltip::before {
            display: none !important;
          }
        \\\`}} />
        <div className="absolute inset-0 z-0">
          <MapContainer 
            center={center} 
            zoom={zoom} 
            style={{ height: "100%", width: "100%", background: "transparent" }} 
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
          >
            <GeoJSON
              data={geoData}
              style={(feature) => {
                const countryId = feature?.id;
                const dataPoint = dataPoints.find((p) => p.id === countryId);
                return {
                  fillColor: dataPoint ? (dataPoint.color || highlightColor) : "var(--map-default-fill)",
                  className: "map-stroke",
                  weight: 0.5,
                  fillOpacity: 1,
                };
              }}
              onEachFeature={(feature, layer) => {
                const countryId = feature?.id;
                const dataPoint = dataPoints.find((p) => p.id === countryId);
                const flagHtml = countryId ? getFlagHtml(countryId) : "";
                
                if (dataPoint) {
                  const upArrow = \\\`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>\\\`;
                  const downArrow = \\\`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10"/><path d="M17 7v10H7"/></svg>\\\`;

                  const activeTrendIcon = dataPoint.activeTrend === "up" ? upArrow : (dataPoint.activeTrend === "down" ? downArrow : "");
                  const newTrendIcon = dataPoint.newTrend === "up" ? upArrow : (dataPoint.newTrend === "down" ? downArrow : "");

                  layer.bindTooltip(\\\`
                    <div class="font-sans flex flex-col gap-1.5 min-w-[130px] w-max p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl">
                      <div class="flex items-center gap-2 mb-1 whitespace-nowrap">
                        \${flagHtml}
                        <strong class="text-slate-800 dark:text-slate-100 text-base font-medium pr-1">\${dataPoint.name}</strong>
                      </div>
                      \${dataPoint.active !== undefined ? \\\`
                        <div class="flex items-center justify-between text-sm pr-1">
                          <span class="text-slate-500 dark:text-slate-400">Active:</span>
                          <div class="flex items-center gap-1">
                            <span class="font-medium text-slate-700 dark:text-slate-200">\${dataPoint.active}</span>
                            \${activeTrendIcon}
                          </div>
                        </div>
                      \\\` : ""}
                      \${dataPoint.new !== undefined ? \\\`
                        <div class="flex items-center justify-between text-sm pr-1">
                          <span class="text-slate-500 dark:text-slate-400">New:</span>
                          <div class="flex items-center gap-1">
                            <span class="font-medium text-slate-700 dark:text-slate-200">\${dataPoint.new}</span>
                            \${newTrendIcon}
                          </div>
                        </div>
                      \\\` : ""}
                    </div>
                  \\\`, { 
                    sticky: true,
                    className: "custom-leaflet-tooltip" 
                  });
                } else if (feature?.properties?.name) {
                  layer.bindTooltip(\\\`
                    <div class="font-sans flex items-center gap-2 text-sm py-2 px-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-md whitespace-nowrap w-max">
                      \${flagHtml}
                      <span class="text-slate-700 dark:text-slate-300 font-medium pr-1">\${feature.properties.name}</span>
                    </div>
                  \\\`, { 
                    sticky: true,
                    className: "custom-leaflet-tooltip" 
                  });
                }

                // Add hover effects
                layer.on({
                  mouseover: (e) => {
                    const target = e.target;
                    target.setStyle({
                      fillOpacity: 0.7,
                      fillColor: dataPoint ? (dataPoint.color || highlightColor) : highlightColor,
                    });
                  },
                  mouseout: (e) => {
                    const target = e.target;
                    target.setStyle({
                      fillOpacity: 1,
                      fillColor: dataPoint ? (dataPoint.color || highlightColor) : "var(--map-default-fill)",
                    });
                  }
                });
              }}
            />
          </MapContainer>
        </div>
      </div>
    );
  }
);

DataMaps.displayName = "DataMaps";
`;

const DATA_MAPS_JS = DATA_MAPS_TS.replace(/export interface [^}]+}/g, "")
	.replace(/: [A-Za-z\[\]]+/g, "")
	.replace(/<HTMLDivElement, DataMapsProps>/g, ""); // A basic clean for JS

const FILL_USAGE_CODE = `import { DataMaps } from "@/components/custom/blocks/DataMapsBlock";

const sampleData = [
  { id: "CHN", name: "China", flag: "🇨🇳", active: 13.7, activeTrend: "up", new: 0.1, newTrend: "down" },
  { id: "IND", name: "India", flag: "🇮🇳", active: 8.4, activeTrend: "up", new: 0.3, newTrend: "up" },
  { id: "USA", name: "United States", flag: "🇺🇸", active: 11.2, activeTrend: "down", new: 0.5, newTrend: "down" },
  { id: "BRA", name: "Brazil", flag: "🇧🇷", active: 5.1, activeTrend: "up", new: 0.2, newTrend: "down" },
  { id: "GBR", name: "United Kingdom", flag: "🇬🇧", active: 2.8, activeTrend: "down", new: 0.05, newTrend: "up" },
  { id: "DEU", name: "Germany", flag: "🇩🇪", active: 3.4, activeTrend: "up", new: 0.1, newTrend: "up" },
];

export default function App() {
  return (
    <div className="h-[500px] w-full bg-white dark:bg-black rounded-lg">
      <DataMaps dataPoints={sampleData} variant="fill" />
    </div>
  );
}
`;

const DOTS_USAGE_CODE = `import { DataMaps } from "@/components/custom/blocks/DataMapsBlock";

const sampleData = [
  { id: "CHN", name: "China", flag: "🇨🇳", active: 13.7, activeTrend: "up", new: 0.1, newTrend: "down" },
  { id: "IND", name: "India", flag: "🇮🇳", active: 8.4, activeTrend: "up", new: 0.3, newTrend: "up" },
  { id: "USA", name: "United States", flag: "🇺🇸", active: 11.2, activeTrend: "down", new: 0.5, newTrend: "down" },
  { id: "BRA", name: "Brazil", flag: "🇧🇷", active: 5.1, activeTrend: "up", new: 0.2, newTrend: "down" },
  { id: "GBR", name: "United Kingdom", flag: "🇬🇧", active: 2.8, activeTrend: "down", new: 0.05, newTrend: "up" },
  { id: "DEU", name: "Germany", flag: "🇩🇪", active: 3.4, activeTrend: "up", new: 0.1, newTrend: "up" },
];

export default function App() {
  return (
    <div className="h-[500px] w-full bg-white dark:bg-black rounded-lg">
      <DataMaps dataPoints={sampleData} variant="dots" />
    </div>
  );
}
`;

const SAMPLE_DATA: DataPoint[] = [
	{
		id: "CHN",
		name: "China",
		flag: "🇨🇳",
		active: 13.7,
		activeTrend: "up",
		new: 0.1,
		newTrend: "down",
	},
	{
		id: "IND",
		name: "India",
		flag: "🇮🇳",
		active: 8.4,
		activeTrend: "up",
		new: 0.3,
		newTrend: "up",
	},
	{
		id: "USA",
		name: "United States",
		flag: "🇺🇸",
		active: 11.2,
		activeTrend: "down",
		new: 0.5,
		newTrend: "down",
	},
	{
		id: "BRA",
		name: "Brazil",
		flag: "🇧🇷",
		active: 5.1,
		activeTrend: "up",
		new: 0.2,
		newTrend: "down",
	},
	{
		id: "GBR",
		name: "United Kingdom",
		flag: "🇬🇧",
		active: 2.8,
		activeTrend: "down",
		new: 0.05,
		newTrend: "up",
	},
	{
		id: "DEU",
		name: "Germany",
		flag: "🇩🇪",
		active: 3.4,
		activeTrend: "up",
		new: 0.1,
		newTrend: "up",
	},
];

import { useState, useEffect } from "react";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { cn } from "@/lib/utils";

export function DataMapsShowcase() {
	const [color, setColor] = useState("primary");
	const [variant, setVariant] = useState<"fill" | "dots" | "zoomable-dots">("fill");

	const handleColorChange = (newColor: string) => {
		setColor(newColor);
	};

	// Convert semantic color to actual hex for the map highlight if needed
	const getHexForColor = (c: string) => {
		if (c.startsWith("#")) return c;
		const colors: Record<string, string> = {
			primary: "var(--primary)",
			default: "var(--primary)",
			blue: "#2563eb",
			emerald: "#10b981",
			rose: "#e11d48",
			violet: "#7c3aed",
		};
		return colors[c] || "var(--primary)";
	};

	const actualVariant = (variant as string) === "zoom" ? "dots" : variant;
	const isZoomable = (variant as string) === "zoom";

	return (
		<div className="w-full flex flex-col gap-0 not-prose">
			{/* --- CONTROL PANEL --- */}
			<ShowcaseControlPanel className="flex flex-row gap-6 p-5 rounded-xl border-blue-600">
				<VariantTabs
					label="Map Variant"
					variants={["fill", "dots", "zoom"]}
					defaultValue="fill"
					onValueChange={(v) => setVariant(v as "fill" | "dots" | "zoomable-dots")}
				/>
				<ThemeColorPicker
					color={color}
					onChange={handleColorChange}
					label="Accent Color"
				/>
			</ShowcaseControlPanel>

			{/* --- PREVIEW WINDOW --- */}
			<ComponentPreview
				name="DataMaps"
				tsCode={DATA_MAPS_TS}
				jsCode={DATA_MAPS_JS}
				usageCode={variant === "fill" ? FILL_USAGE_CODE : DOTS_USAGE_CODE}
				jsUsageCode={variant === "fill" ? FILL_USAGE_CODE : DOTS_USAGE_CODE}
				sandbox="data-maps"
				sandboxProps={{ variant: actualVariant, color, zoomable: isZoomable }}
				>
				<div className="w-full min-h-[280px] sm:min-h-[500px] bg-white dark:bg-black rounded-2xl border border-slate-100 dark:border-slate-800/50 relative flex flex-col overflow-hidden">
					<DataMaps
						variant={actualVariant}
						zoomable={isZoomable}
						scrollWheelZoom={isZoomable}
						dataPoints={SAMPLE_DATA}
						zoom={2}
						center={[30, 0]}
						className="flex-1"
						highlightColor={getHexForColor(color)}
					/>
				</div>
			</ComponentPreview>
		</div>
	);
}
