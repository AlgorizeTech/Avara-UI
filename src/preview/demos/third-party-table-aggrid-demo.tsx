"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Badge } from "@/components/custom/ui/badge";
import Button from "@/components/custom/blocks/Button";
import { useChartTokens } from "@/lib/chart-tokens";

/**
 * AG Grid v33+ is modular: register once, at module scope. `AllCommunityModule`
 * is the batteries-included option — swap it for the individual modules you
 * use when bundle size matters.
 */
ModuleRegistry.registerModules([AllCommunityModule]);

type Item = {
  sku: string;
  product: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  status: "in-stock" | "low" | "backorder";
};

const inventory: Item[] = [
  { sku: "AZ-1001", product: "Aurora Desk Lamp", warehouse: "Rotterdam", onHand: 412, reserved: 38, status: "in-stock" },
  { sku: "AZ-1002", product: "Vector Mechanical Keyboard", warehouse: "Austin", onHand: 96, reserved: 74, status: "low" },
  { sku: "AZ-1003", product: "Halo Monitor Arm", warehouse: "Rotterdam", onHand: 0, reserved: 120, status: "backorder" },
  { sku: "AZ-1004", product: "Drift Office Chair", warehouse: "Osaka", onHand: 233, reserved: 12, status: "in-stock" },
  { sku: "AZ-1005", product: "Nimbus Standing Desk", warehouse: "Austin", onHand: 54, reserved: 41, status: "low" },
  { sku: "AZ-1006", product: "Pulse Webcam 4K", warehouse: "Osaka", onHand: 611, reserved: 87, status: "in-stock" },
  { sku: "AZ-1007", product: "Cobalt USB-C Hub", warehouse: "Rotterdam", onHand: 0, reserved: 64, status: "backorder" },
];

const STATUS_VARIANT = {
  "in-stock": "default",
  low: "secondary",
  backorder: "destructive",
} as const;

/**
 * The Theming API takes plain values, so a `Badge` cell renderer and a themed
 * grid can share one design language. Cell renderers are ordinary React
 * components — this is where your own components go into someone else's grid.
 */
const StatusCell = ({ value }: { value: Item["status"] }) => (
  <Badge variant={STATUS_VARIANT[value]}>{value.replace("-", " ")}</Badge>
);

export default function AgGridInventory() {
  const [quickFilter, setQuickFilter] = useState("");
  const tokens = useChartTokens();

  const columnDefs = useMemo<ColDef<Item>[]>(
    () => [
      { field: "sku", headerName: "SKU", width: 120, pinned: "left" },
      { field: "product", headerName: "Product", flex: 2, minWidth: 200 },
      { field: "warehouse", headerName: "Warehouse", flex: 1, minWidth: 130 },
      { field: "onHand", headerName: "On hand", type: "numericColumn", width: 120 },
      { field: "reserved", headerName: "Reserved", type: "numericColumn", width: 120 },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        cellRenderer: StatusCell,
        filter: true,
      },
    ],
    [],
  );

  /**
   * v33+ replaced the CSS-file themes (`ag-theme-alpine`) with a theme object.
   * Nothing to import in globals.css — and every value here can come straight
   * from your token scale.
   */
  const theme = useMemo(
    () =>
      themeQuartz.withParams({
        accentColor: tokens.series[0],
        backgroundColor: tokens.card,
        foregroundColor: tokens.foreground,
        borderColor: tokens.border,
        chromeBackgroundColor: tokens.card,
        headerTextColor: tokens.muted,
        headerFontWeight: 600,
        fontFamily: "inherit",
        borderRadius: 8,
        wrapperBorderRadius: 12,
        spacing: 8,
      }),
    [tokens],
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>AG Grid Community, themed with the Theming API</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={quickFilter}
              onChange={(event) => setQuickFilter(event.target.value)}
              placeholder="Quick filter…"
              className="h-9 w-48 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button size="sm" variant="ghost" onClick={() => setQuickFilter("")}>
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div style={{ height: 360 }}>
          <AgGridReact<Item>
            theme={theme}
            rowData={inventory}
            columnDefs={columnDefs}
            quickFilterText={quickFilter}
            defaultColDef={{ sortable: true, resizable: true }}
            pagination
            paginationPageSize={5}
            paginationPageSizeSelector={[5, 10, 20]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
