"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

/**
 * Leaflet reads `window` at import time, so it must never load on a server.
 *
 * The map components are pulled in at runtime and held in state, NOT as React.lazy
 * components. Lazy children (GeoJSON, ZoomControl) suspend *after* MapContainer has
 * mounted, and the resulting unmount/remount tears down the leaflet instance mid-flight
 * -- "Map container is being reused by another instance". One import, one gate, one mount.
 *
 * Held in state rather than next/dynamic because this component ships to Vite apps too,
 * where next/dynamic does not resolve.
 */
type ReactLeaflet = typeof import("react-leaflet");

function ResizeHandler({ wrapperRef, initialZoom, zoomable }: { wrapperRef: React.RefObject<HTMLDivElement | null>; initialZoom: number; zoomable?: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (zoomable) return;
    if (!wrapperRef.current) return;

    const handleResize = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const width = el.clientWidth;
      let targetZoom = initialZoom;
      if (width < 450) {
        targetZoom = 0;
      } else if (width < 640) {
        targetZoom = 1;
      } else {
        targetZoom = initialZoom;
      }
      map.invalidateSize();
      map.setZoom(targetZoom);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [map, wrapperRef, initialZoom, zoomable]);
  return null;
}

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
  variant?: "fill" | "dots";
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomable?: boolean;
  scrollWheelZoom?: boolean;
  highlightColor?: string;
  defaultColor?: string;
  mapGeoJsonUrl?: string;
  mapId?: string;
}

const alpha3ToAlpha2: Record<string, string> = {"AFG":"AF","ALA":"AX","ALB":"AL","DZA":"DZ","ASM":"AS","AND":"AD","AGO":"AO","AIA":"AI","ATA":"AQ","ATG":"AG","ARG":"AR","ARM":"AM","ABW":"AW","AUS":"AU","AUT":"AT","AZE":"AZ","BHS":"BS","BHR":"BH","BGD":"BD","BRB":"BB","BLR":"BY","BEL":"BE","BLZ":"BZ","BEN":"BJ","BMU":"BM","BTN":"BT","BOL":"BO","BES":"BQ","BIH":"BA","BWA":"BW","BVT":"BV","BRA":"BR","IOT":"IO","BRN":"BN","BGR":"BG","BFA":"BF","BDI":"BI","CPV":"CV","KHM":"KH","CMR":"CM","CAN":"CA","CYM":"KY","CAF":"CF","TCD":"TD","CHL":"CL","CHN":"CN","CXR":"CX","CCK":"CC","COL":"CO","COM":"KM","COG":"CG","COD":"CD","COK":"CK","CRI":"CR","CIV":"CI","HRV":"HR","CUB":"CU","CUW":"CW","CYP":"CY","CZE":"CZ","DNK":"DK","DJI":"DJ","DMA":"DM","DOM":"DO","ECU":"EC","EGY":"EG","SLV":"SV","GNQ":"GQ","ERI":"ER","EST":"EE","SWZ":"SZ","ETH":"ET","FLK":"FK","FRO":"FO","FJI":"FJ","FIN":"FI","FRA":"FR","GUF":"GF","PYF":"PF","ATF":"TF","GAB":"GA","GMB":"GM","GEO":"GE","DEU":"DE","GHA":"GH","GIB":"GI","GRC":"GR","GRL":"GL","GRD":"GD","GLP":"GP","GUM":"GU","GTM":"GT","GGY":"GG","GIN":"GN","GNB":"GW","GUY":"GY","HTI":"HT","HMD":"HM","VAT":"VA","HND":"HN","HKG":"HK","HUN":"HU","ISL":"IS","IND":"IN","IDN":"ID","IRN":"IR","IRQ":"IQ","IRL":"IE","IMN":"IM","ISR":"IL","ITA":"IT","JAM":"JM","JPN":"JP","JEY":"JE","JOR":"JO","KAZ":"KZ","KEN":"KE","KIR":"KI","PRK":"KP","KOR":"KR","KWT":"KW","KGZ":"KG","LAO":"LA","LVA":"LV","LBN":"LB","LSO":"LS","LBR":"LR","LBY":"LY","LIE":"LI","LTU":"LT","LUX":"LU","MAC":"MO","MDG":"MG","MWI":"MW","MYS":"MY","MDV":"MV","MLI":"ML","MLT":"MT","MHL":"MH","MTQ":"MQ","MRT":"MR","MUS":"MU","MYT":"YT","MEX":"MX","FSM":"FM","MDA":"MD","MCO":"MC","MNG":"MN","MNE":"ME","MSR":"MS","MAR":"MA","MOZ":"MZ","MMR":"MM","NAM":"NA","NRU":"NR","NPL":"NP","NLD":"NL","NCL":"NC","NZL":"NZ","NIC":"NI","NER":"NE","NGA":"NG","NIU":"NU","NFK":"NF","MKD":"MK","MNP":"MP","NOR":"NO","OMN":"OM","PAK":"PK","PLW":"PW","PSE":"PS","PAN":"PA","PNG":"PG","PRY":"PY","PER":"PE","PHL":"PH","PCN":"PN","POL":"PL","PRT":"PT","PRI":"PR","QAT":"QA","REU":"RE","ROU":"RO","RUS":"RU","RWA":"RW","BLM":"BL","SHN":"SH","KNA":"KN","LCA":"LC","MAF":"MF","SPM":"PM","VCT":"VC","WSM":"WS","SMR":"SM","STP":"ST","SAU":"SA","SEN":"SN","SRB":"RS","SYC":"SC","SLE":"SL","SGP":"SG","SXM":"SX","SVK":"SK","SVN":"SI","SLB":"SB","SOM":"SO","ZAF":"ZA","SGS":"GS","SSD":"SS","ESP":"ES","LKA":"LK","SDN":"SD","SUR":"SR","SJM":"SJ","SWE":"SE","CHE":"CH","SYR":"SY","TWN":"TW","TJK":"TJ","TZA":"TZ","THA":"TH","TLS":"TL","TGO":"TG","TKL":"TK","TON":"TO","TTO":"TT","TUN":"TN","TUR":"TR","TKM":"TM","TCA":"TC","TUV":"TV","UGA":"UG","UKR":"UA","ARE":"AE","GBR":"GB","USA":"US","UMI":"UM","URY":"UY","UZB":"UZ","VUT":"VU","VEN":"VE","VNM":"VN","VGB":"VG","VIR":"VI","WLF":"WF","ESH":"EH","YEM":"YE","ZMB":"ZM","ZWE":"ZW"};

function getFlagHtml(alpha3: string) {
  const alpha2 = alpha3ToAlpha2[alpha3];
  if (!alpha2) return "";
  return `<img src="https://flagcdn.com/w40/${alpha2.toLowerCase()}.png" width="20" alt="${alpha2}" class="inline-block object-cover rounded-[2px]" />`;
}

/**
 * True only after hydration. useSyncExternalStore reports a different snapshot
 * on the server than on the client, so this needs no state update in an effect.
 */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

export const DataMaps = React.forwardRef<HTMLDivElement, DataMapsProps>(
  (
    {
      dataPoints,
      variant = "fill",
      center = [20, 0],
      zoom = 2,
      minZoom = 1,
      maxZoom = 8,
      zoomable = false,
      scrollWheelZoom = false,
      highlightColor = "var(--primary, #2563eb)",
      defaultColor: _defaultColor = "#cbd5e1",
      mapGeoJsonUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json",
      mapId,
      className,
      ...props
    },
    ref
  ) => {
    const isMounted = useIsMounted();
    const instanceId = React.useId();
    const [geoData, setGeoData] = useState<any>(null);
    const mapRef = useRef<any>(null);
    const mapWrapperRef = useRef<HTMLDivElement>(null);
    const geoJsonRef = useRef<any>(null);
    const markersGroupRef = useRef<any>(null);
    const highlightColorRef = useRef(highlightColor);
    const variantRef = useRef(variant);
    const [leafletLib, setLeafletLib] = useState<any>(null);
    const [rl, setRl] = useState<ReactLeaflet | null>(null);
    const [dotCount, setDotCount] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let cancelled = false;
      Promise.all([import("leaflet"), import("react-leaflet")]).then(([L, RL]) => {
        if (cancelled) return;
        setLeafletLib(L);
        setRl(RL);
      });
      return () => {
        cancelled = true;
      };
    }, []);

    useEffect(() => {
      variantRef.current = variant;
    }, [variant]);

    useEffect(() => {
      const map = mapRef.current;
      if (!map) return;
      
      // Always allow dragging/panning across screen on all variants
      map.dragging?.enable();

      if (zoomable) {
        map.touchZoom?.enable();
        map.doubleClickZoom?.enable();
        if (scrollWheelZoom) map.scrollWheelZoom?.enable();
        else map.scrollWheelZoom?.disable();
        map.boxZoom?.enable();
        map.keyboard?.enable();
      } else {
        map.touchZoom?.disable();
        map.doubleClickZoom?.disable();
        map.scrollWheelZoom?.disable();
        map.boxZoom?.disable();
        map.keyboard?.disable();
      }

      // Reset view position to default center & initial zoom level whenever variant changes or tab switches
      map.setView(center, zoom, { animate: false });
    }, [variant, zoomable, scrollWheelZoom, center, zoom, isMounted, geoData]);

    useEffect(() => {
      highlightColorRef.current = highlightColor;
      
      // Update existing layers dynamically to prevent unmounting React-Leaflet
      if (geoJsonRef.current && leafletLib) {
        const isDots = variant === "dots";
        const map = geoJsonRef.current._map;
        
        if (map && !markersGroupRef.current) {
          markersGroupRef.current = leafletLib.layerGroup().addTo(map);
        }
        
        if (markersGroupRef.current) {
          markersGroupRef.current.clearLayers();
        }

        let currentDotCount = 0;

        geoJsonRef.current.eachLayer((layer: any) => {
          const countryId = layer.feature?.id;
          const dataPoint = dataPoints.find((p) => p.id === countryId);
          
          layer.setStyle({
            fillColor: (dataPoint && !isDots) ? (dataPoint.color || highlightColor) : "var(--map-default-fill)",
          });

          if (isDots && dataPoint && layer.getBounds && markersGroupRef.current && map?.getPanes?.()?.markerPane) {
             currentDotCount++;
             const c = layer.getBounds().getCenter();
             const color = dataPoint.color || highlightColor;
             
             const icon = leafletLib.divIcon({
                className: 'bg-transparent border-none',
                html: `<div class="map-pulse-dot" style="--pulse-color: ${color};"></div>`,
                iconSize: [8, 8],
                iconAnchor: [4, 4]
             });
             
             try {
               leafletLib.marker([c.lat, c.lng], { icon, interactive: false }).addTo(markersGroupRef.current);
             } catch {
               // Silently ignore if map is unmounting during HMR
             }
          }
        });
        
        setDotCount(currentDotCount);
      }
      
      return () => {
         if (markersGroupRef.current) {
             markersGroupRef.current.clearLayers();
         }
      }
    }, [highlightColor, dataPoints, variant, geoData, leafletLib]);

    useEffect(() => {
      fetch(mapGeoJsonUrl)
        .then((res) => res.json())
        .then((data) => setGeoData(data))
        .catch((err) => console.error("Error loading map GeoJSON:", err));
    }, [mapGeoJsonUrl]);

    useEffect(() => {
      return () => {
        if (mapRef.current) {
          try {
            mapRef.current.remove();
          } catch {
            // Ignore
          }
          mapRef.current = null;
        }
        if (mapWrapperRef.current) {
          mapWrapperRef.current.innerHTML = "";
        }
      };
    }, []);

    // Leaflet sizes its canvas once at creation — refit whenever the wrapper
    // resizes (responsive preview, layout changes) so the full map stays visible.
    useEffect(() => {
      const wrapper = mapWrapperRef.current;
      if (!wrapper) return;
      const win = wrapper.ownerDocument.defaultView ?? window;
      const Observer = (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
      const observer = new Observer(() => {
        mapRef.current?.invalidateSize();
      });
      observer.observe(wrapper);
      return () => observer.disconnect();
    }, [isMounted, geoData]);

    if (!isMounted || !geoData) {
      return (
        <div ref={ref} className={cn("w-full h-full min-h-[250px] sm:min-h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-lg animate-pulse flex items-center justify-center", className)} {...props}>
          <p className="text-slate-400 text-sm">Loading Maps...</p>
        </div>
      );
    }

      return (
        <div ref={(node) => { wrapperRef.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }} className={cn("relative w-full h-full min-h-[250px] sm:min-h-[400px] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900/50 map-wrapper", className)} {...props}>
        <style dangerouslySetInnerHTML={{__html: `
          .map-wrapper {
            --map-default-fill: #e2e8f0;
          }
          .dark .map-wrapper {
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
            opacity: 1 !important;
          }
          .custom-leaflet-tooltip::before {
            display: none !important;
          }
          .map-pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            background-color: var(--pulse-color);
          }
          .map-pulse-dot::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            box-shadow: 0 0 0 0 var(--pulse-color);
            animation: map-pulse 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes map-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--pulse-color); opacity: 0.8; }
            70% { transform: scale(1); box-shadow: 0 0 0 20px var(--pulse-color); opacity: 0; }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--pulse-color); opacity: 0; }
          }
        `}} />
        <div ref={mapWrapperRef} className="absolute inset-0 z-0">
          {rl && (
            <rl.MapContainer
              key={mapId ?? `${instanceId}-${variant}-${center.join(",")}-${zoom}`}
              ref={mapRef}
            center={center}
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            style={{ height: "100%", width: "100%", background: "transparent" }}
            scrollWheelZoom={zoomable ? scrollWheelZoom : false}
            doubleClickZoom={zoomable}
            dragging={zoomable}
            touchZoom={zoomable}
            zoomControl={false}
            attributionControl={false}
          >
            <ResizeHandler wrapperRef={wrapperRef} initialZoom={zoom} zoomable={zoomable} />
            {zoomable && <rl.ZoomControl position="bottomright" />}
            <rl.GeoJSON
              ref={geoJsonRef}
              data={geoData}
              style={(feature) => {
                const countryId = feature?.id;
                const dataPoint = dataPoints.find((p) => p.id === countryId);
                const isDots = variant === "dots";
                return {
                  fillColor: (dataPoint && !isDots) ? (dataPoint.color || highlightColor) : "var(--map-default-fill)",
                  className: "map-stroke",
                  weight: 0.5,
                  fillOpacity: 1,
                };
              }}
              onEachFeature={(feature, layer) => {
                const countryId = feature?.id;
                const dataPoint = dataPoints.find((p) => p.id === countryId);
                const flagHtml = countryId ? getFlagHtml(String(countryId)) : "";
                
                if (dataPoint) {
                  const upArrow = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>`;
                  const downArrow = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10"/><path d="M17 7v10H7"/></svg>`;

                  const activeTrendIcon = dataPoint.activeTrend === "up" ? upArrow : (dataPoint.activeTrend === "down" ? downArrow : "");
                  const newTrendIcon = dataPoint.newTrend === "up" ? upArrow : (dataPoint.newTrend === "down" ? downArrow : "");

                  layer.bindTooltip(`
                    <div class="font-sans flex flex-col gap-1.5 min-w-[130px] w-max p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl">
                      <div class="flex items-center gap-2 mb-1 whitespace-nowrap">
                        ${flagHtml}
                        <strong class="text-slate-800 dark:text-slate-100 text-base font-medium pr-1">${dataPoint.name}</strong>
                      </div>
                      ${dataPoint.active !== undefined ? `
                        <div class="flex items-center justify-between text-sm pr-1">
                          <span class="text-slate-500 dark:text-slate-400">Active:</span>
                          <div class="flex items-center gap-1">
                            <span class="font-medium text-slate-700 dark:text-slate-200">${dataPoint.active}</span>
                            ${activeTrendIcon}
                          </div>
                        </div>
                      ` : ""}
                      ${dataPoint.new !== undefined ? `
                        <div class="flex items-center justify-between text-sm pr-1">
                          <span class="text-slate-500 dark:text-slate-400">New:</span>
                          <div class="flex items-center gap-1">
                            <span class="font-medium text-slate-700 dark:text-slate-200">${dataPoint.new}</span>
                            ${newTrendIcon}
                          </div>
                        </div>
                      ` : ""}
                    </div>
                  `, { 
                    sticky: true,
                    className: "custom-leaflet-tooltip" 
                  });
                } else if (feature?.properties?.name) {
                  layer.bindTooltip(`
                    <div class="font-sans flex items-center gap-2 text-sm py-2 px-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-md whitespace-nowrap w-max">
                      ${flagHtml}
                      <span class="text-slate-700 dark:text-slate-300 font-medium pr-1">${feature.properties.name}</span>
                    </div>
                  `, { 
                    sticky: true,
                    className: "custom-leaflet-tooltip" 
                  });
                }

                // Add hover effects using the ref color to prevent closure traps
                layer.on({
                  mouseover: (e) => {
                    const target = e.target;
                    target.setStyle({
                      fillOpacity: 0.7,
                      fillColor: dataPoint ? (dataPoint.color || highlightColorRef.current) : highlightColorRef.current,
                    });
                  },
                  mouseout: (e) => {
                    const target = e.target;
                    const isDots = variantRef.current === "dots";
                    target.setStyle({
                      fillOpacity: 1,
                      fillColor: (dataPoint && !isDots) ? (dataPoint.color || highlightColorRef.current) : "var(--map-default-fill)",
                    });
                  }
                });
              }}
            />
          </rl.MapContainer>
          )}
        </div>
        
        {variant === "dots" && (
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-full shadow-sm z-[400] flex items-center gap-1.5">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={highlightColor} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {dotCount} Locations Selected
            </span>
          </div>
        )}
      </div>
    );
  }
);

DataMaps.displayName = "DataMaps";
