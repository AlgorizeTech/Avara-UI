---
title: "Dashboard"
description: "An admin dashboard page: totals, a period switch, an overview chart per metric, an activity feed, traffic sources, visitors by country and top authors."
url: https://avaraui.com/docs/nextjs/dashboard
---

# Dashboard

An admin dashboard home on its own canvas: a greeting with all-time totals, a period switch, an overview chart with a tab per metric, the activity feed, traffic sources, visitors by country and the top authors. Every number arrives through props, so you point it at your API and the layout, the empty states and the narrow-screen stacking take care of themselves.

Three looks read the same props: **classic**, solid panels on a light canvas; **glass**, milky panes over soft colour blobs; and **liquid-glass**, fluid refractive glass powered by `LiquidGlassWrapper`, `LiquidGlassBackground`, and `LiquidGlassSvgFilter`.

## Admin overview

Switch Daily, Weekly and Monthly, open a metric tab, flip the chart between columns and a trend line, filter the activity feed, and hover the gauge, the barcode or a legend row to light up a share.

- Pass `metrics` with one series per period (`day`, `week`, `month`), oldest first — the last point is the current one and wears the accent. Give a metric a `currency` and it formats as money.
- `sources` , `countries` and `authors` are keyed by period too; the panels follow the switch. Leave `sources` or `countries` out and the panel says the data is unavailable.
- `links` give each panel a round open button. Pass `linkComponent={Link}` from `next/link` in a Next.js app.

```tsx
import {
  CreditCard,
  FilePlus2,
  FileText,
  Globe,
  Mail,
  PackagePlus,
  PenLine,
  UserPlus,
  UsersRound,
  Wallet,
} from "lucide-react";
import {
  Dashboard,
  type DashboardActivity,
  type DashboardAuthor,
  type DashboardMetric,
  type DashboardPayment,
  type DashboardPeriod,
  type DashboardPoint,
  type DashboardShare,
  type DashboardShortcut,
  type DashboardTotal,
  type DashboardVariant,
} from "@/components/custom/blocks/DashboardBlock";

// Replace everything below with your API's numbers — the section only reads props.

const DAYS = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
const WEEKS = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

/** One series per period from plain numbers, oldest first. */
const series = (
  day: number[],
  week: number[],
  month: number[],
): Record<DashboardPeriod, DashboardPoint[]> => ({
  day: day.map((value, i) => ({ label: DAYS[i] ?? "", shortLabel: DAYS[i]?.charAt(0), value })),
  week: week.map((value, i) => ({
    label: WEEKS[i] ?? "",
    shortLabel: WEEKS[i]?.split(" ")[1],
    fullLabel: `Week of ${WEEKS[i]}`,
    value,
  })),
  month: month.map((value, i) => ({ label: MONTHS[i] ?? "", shortLabel: MONTHS[i]?.charAt(0), value })),
});

// `metric` and `href` are read by the glass variant: each card reports what
// the current period added and gets a round open button.
const TOTALS: DashboardTotal[] = [
  { label: "Total users", value: 12480, icon: <UsersRound />, metric: "users", href: "#users" },
  { label: "Published posts", value: 1284, icon: <FileText />, metric: "posts", href: "#posts" },
  { label: "Messages received", value: 3906, icon: <Mail />, metric: "messages", href: "#messages" },
  { label: "Completed payments", value: 8215, icon: <CreditCard />, metric: "revenue" },
];

const METRICS: DashboardMetric[] = [
  {
    id: "users",
    label: "New users",
    icon: <UserPlus />,
    noun: ["new user", "new users"],
    series: series(
      [38, 42, 29, 51, 47, 58, 24],
      [212, 248, 231, 265, 96],
      [820, 910, 1040, 980, 1120, 1210, 1185, 1302, 1094],
    ),
    change: { day: 12.5, week: 6.8, month: 9.1 },
  },
  {
    id: "posts",
    label: "Posts",
    icon: <PenLine />,
    noun: ["post", "posts"],
    series: series(
      [6, 9, 4, 7, 8, 11, 3],
      [34, 41, 38, 45, 12],
      [120, 134, 151, 142, 160, 171, 166, 184, 149],
    ),
    change: { day: -4.2, week: 3.1, month: 5.6 },
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail />,
    noun: ["message", "messages"],
    series: series(
      [22, 18, 25, 31, 27, 34, 14],
      [118, 132, 125, 141, 48],
      [480, 512, 560, 535, 590, 624, 610, 655, 571],
    ),
    change: { day: 2.3, week: -1.8, month: 4.4 },
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <Wallet />,
    currency: "USD",
    series: series(
      [3120, 2840, 1960, 4210, 3870, 4520, 1880],
      [18200, 21400, 19800, 23100, 7400],
      [62000, 68500, 74200, 71800, 79400, 84100, 82600, 90300, 76800],
    ),
    change: { day: 6.2, week: 4.9, month: 7.7 },
  },
];

// Times relative to now, so the feed always reads as recent.
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000);

// `person` puts an avatar on the row in the glass variant.
const ACTIVITY: DashboardActivity[] = [
  { id: 1, type: "user", title: "Priya Nair", subtitle: "Signed up on the Pro plan", person: "Priya Nair", date: minutesAgo(4) },
  { id: 2, type: "payment", title: "$249.00 from Daniel Brooks", subtitle: "Team plan, yearly", person: "Daniel Brooks", date: minutesAgo(18) },
  { id: 3, type: "message", title: "Question about invoices", subtitle: "marcus@northwind.io", date: minutesAgo(42) },
  { id: 4, type: "post", title: "Designing calmer dashboards", subtitle: "By Ayesha Rahman", person: "Ayesha Rahman", date: minutesAgo(95) },
  { id: 5, type: "payment", title: "$49.00 from Sofia Alvarez", subtitle: "Pro plan, monthly", status: "pending", person: "Sofia Alvarez", date: minutesAgo(150) },
  { id: 6, type: "user", title: "Liam O'Connor", subtitle: "Invited by Ayesha Rahman", person: "Liam O'Connor", date: minutesAgo(190) },
  { id: 7, type: "message", title: "Partnership enquiry", subtitle: "hello@lumen.studio", date: minutesAgo(26 * 60) },
  { id: 8, type: "post", title: "Release notes: September", subtitle: "By Marcus Chen", person: "Marcus Chen", date: minutesAgo(28 * 60) },
  { id: 9, type: "payment", title: "$129.00 from Hana Kobayashi", subtitle: "Team plan, monthly", status: "failed", person: "Hana Kobayashi", date: minutesAgo(30 * 60) },
  { id: 10, type: "user", title: "Omar Haddad", subtitle: "Signed up on the Free plan", person: "Omar Haddad", date: minutesAgo(50 * 60) },
  { id: 11, type: "post", title: "Building accessible components", subtitle: "By Daniel Brooks", person: "Daniel Brooks", date: minutesAgo(52 * 60) },
  { id: 12, type: "message", title: "Feature request: Custom themes", subtitle: "dev@acme.corp", date: minutesAgo(55 * 60) },
  { id: 13, type: "payment", title: "$399.00 from Acme Corp", subtitle: "Enterprise plan, yearly", date: minutesAgo(58 * 60) },
  { id: 14, type: "post", title: "State management in 2026", subtitle: "By Priya Nair", person: "Priya Nair", date: minutesAgo(65 * 60) },
  { id: 15, type: "message", title: "Webhook integration bug", subtitle: "support@startup.co", date: minutesAgo(70 * 60) },
];

const SOURCES: Record<DashboardPeriod, DashboardShare[]> = {
  day: [
    { id: "google", label: "Google", value: 412 },
    { id: "direct", label: "Direct", value: 268 },
    { id: "linkedin", label: "LinkedIn", value: 131 },
    { id: "newsletter", label: "Newsletter", value: 74 },
    { id: "x", label: "X", value: 38 },
  ],
  week: [
    { id: "google", label: "Google", value: 2680 },
    { id: "direct", label: "Direct", value: 1712 },
    { id: "linkedin", label: "LinkedIn", value: 905 },
    { id: "newsletter", label: "Newsletter", value: 640 },
    { id: "x", label: "X", value: 251 },
  ],
  month: [
    { id: "google", label: "Google", value: 9840 },
    { id: "direct", label: "Direct", value: 6120 },
    { id: "linkedin", label: "LinkedIn", value: 3310 },
    { id: "newsletter", label: "Newsletter", value: 1870 },
    { id: "x", label: "X", value: 700 },
  ],
};

const SIGN_UPS: Record<DashboardPeriod, number> = { day: 24, week: 96, month: 1094 };

const COUNTRIES: Record<DashboardPeriod, DashboardShare[]> = {
  day: [
    { id: "us", code: "US", label: "United States", value: 341 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 162 },
    { id: "de", code: "DE", label: "Germany", value: 118 },
    { id: "in", code: "IN", label: "India", value: 97 },
    { id: "ca", code: "CA", label: "Canada", value: 76 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 59 },
    { id: "au", code: "AU", label: "Australia", value: 70 },
  ],
  week: [
    { id: "us", code: "US", label: "United States", value: 2210 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 1035 },
    { id: "de", code: "DE", label: "Germany", value: 812 },
    { id: "in", code: "IN", label: "India", value: 694 },
    { id: "ca", code: "CA", label: "Canada", value: 503 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 461 },
    { id: "au", code: "AU", label: "Australia", value: 473 },
  ],
  month: [
    { id: "us", code: "US", label: "United States", value: 8120 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 3940 },
    { id: "de", code: "DE", label: "Germany", value: 3010 },
    { id: "in", code: "IN", label: "India", value: 2590 },
    { id: "ca", code: "CA", label: "Canada", value: 1880 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 1610 },
    { id: "au", code: "AU", label: "Australia", value: 690 },
  ],
};

const AUTHORS: Record<DashboardPeriod, DashboardAuthor[]> = {
  day: [
    { name: "Ayesha Rahman", posts: 2 },
    { name: "Daniel Brooks", posts: 1 },
    { name: "Priya Nair", posts: 1 },
    { name: "Marcus Chen", posts: 1 },
    { name: "Sofia Alvarez", posts: 1 },
  ],
  week: [
    { name: "Ayesha Rahman", posts: 6 },
    { name: "Daniel Brooks", posts: 4 },
    { name: "Priya Nair", posts: 3 },
    { name: "Marcus Chen", posts: 3 },
    { name: "Sofia Alvarez", posts: 2 },
  ],
  month: [
    { name: "Ayesha Rahman", posts: 18 },
    { name: "Daniel Brooks", posts: 14 },
    { name: "Priya Nair", posts: 11 },
    { name: "Marcus Chen", posts: 9 },
    { name: "Sofia Alvarez", posts: 7 },
    { name: "Liam O'Connor", posts: 4 },
  ],
};

// The glass variant's payments table and shortcut tiles; the classic look ignores them.
const PAYMENTS: DashboardPayment[] = [
  { id: "pay_1", amount: 249, currency: "USD", method: "Stripe", person: "Daniel Brooks", date: minutesAgo(18) },
  { id: "pay_2", amount: 49, currency: "USD", method: "PayPal", status: "pending", person: "Sofia Alvarez", date: minutesAgo(150) },
  { id: "pay_3", amount: 129, currency: "USD", method: "Stripe", status: "failed", person: "Hana Kobayashi", date: minutesAgo(30 * 60) },
  { id: "pay_4", amount: 399, currency: "USD", method: "Bank transfer", person: "Acme Corp", date: minutesAgo(58 * 60) },
  { id: "pay_5", amount: 19, currency: "USD", method: "Lemon Squeezy", date: minutesAgo(73 * 60) },
  { id: "pay_6", amount: 249, currency: "USD", method: "Stripe", person: "Priya Nair", date: minutesAgo(96 * 60) },
];

const SHORTCUTS: DashboardShortcut[] = [
  { label: "Add a page", href: "#pages/new", icon: <FilePlus2 /> },
  { label: "Add a package", href: "#packages/new", icon: <PackagePlus /> },
  { label: "Users", href: "#users", icon: <UsersRound /> },
  { label: "Messages", href: "#messages", icon: <Mail /> },
  { label: "Visitors", href: "#visitors", icon: <Globe /> },
  { label: "Invitations", href: "#invitations", icon: <UserPlus /> },
];

export default function AdminDashboard({ variant = "classic", bgImage }: { variant?: DashboardVariant; bgImage?: string }) {
  return (
    <Dashboard
      variant={variant}
      bgImage={bgImage}
      userName="Ayesha Rahman"
      totals={TOTALS}
      metrics={METRICS}
      activity={ACTIVITY}
      sources={SOURCES}
      signUps={SIGN_UPS}
      countries={COUNTRIES}
      authors={AUTHORS}
      payments={PAYMENTS}
      shortcuts={SHORTCUTS}
      links={{
        activity: "#activity",
        traffic: "#traffic",
        countries: "#countries",
        authors: "#authors",
        payments: "#payments",
      }}
    />
  );
}
```

## Glass

Milky glass panes on a soft canvas. Pick a metric tile to chart it, hover a capsule column, the half ring or a country segment, and follow the activity from a first post to a message. Switch to dark mode to see the glass go smoky.

- Set `variant="glass"` — the same `metrics`, `activity`, `sources`, `countries` and `authors` re-present as glass: the top authors sit in the pane's notch and the activity becomes one card per step.
- Give `totals` a `metric` id and each KPI card says what the current period added ("+1,094 new users this month"); an `href` adds its round open button.
- Pass `payments` for the recent payments table and `shortcuts` for the tiles beside the activity. Leave `payments` out and the countries pane takes the full row.

```tsx
import {
  CreditCard,
  FilePlus2,
  FileText,
  Globe,
  Mail,
  PackagePlus,
  PenLine,
  UserPlus,
  UsersRound,
  Wallet,
} from "lucide-react";
import {
  Dashboard,
  type DashboardActivity,
  type DashboardAuthor,
  type DashboardMetric,
  type DashboardPayment,
  type DashboardPeriod,
  type DashboardPoint,
  type DashboardShare,
  type DashboardShortcut,
  type DashboardTotal,
  type DashboardVariant,
} from "@/components/custom/blocks/DashboardBlock";

// Replace everything below with your API's numbers — the section only reads props.

const DAYS = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
const WEEKS = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

/** One series per period from plain numbers, oldest first. */
const series = (
  day: number[],
  week: number[],
  month: number[],
): Record<DashboardPeriod, DashboardPoint[]> => ({
  day: day.map((value, i) => ({ label: DAYS[i] ?? "", shortLabel: DAYS[i]?.charAt(0), value })),
  week: week.map((value, i) => ({
    label: WEEKS[i] ?? "",
    shortLabel: WEEKS[i]?.split(" ")[1],
    fullLabel: `Week of ${WEEKS[i]}`,
    value,
  })),
  month: month.map((value, i) => ({ label: MONTHS[i] ?? "", shortLabel: MONTHS[i]?.charAt(0), value })),
});

// `metric` and `href` are read by the glass variant: each card reports what
// the current period added and gets a round open button.
const TOTALS: DashboardTotal[] = [
  { label: "Total users", value: 12480, icon: <UsersRound />, metric: "users", href: "#users" },
  { label: "Published posts", value: 1284, icon: <FileText />, metric: "posts", href: "#posts" },
  { label: "Messages received", value: 3906, icon: <Mail />, metric: "messages", href: "#messages" },
  { label: "Completed payments", value: 8215, icon: <CreditCard />, metric: "revenue" },
];

const METRICS: DashboardMetric[] = [
  {
    id: "users",
    label: "New users",
    icon: <UserPlus />,
    noun: ["new user", "new users"],
    series: series(
      [38, 42, 29, 51, 47, 58, 24],
      [212, 248, 231, 265, 96],
      [820, 910, 1040, 980, 1120, 1210, 1185, 1302, 1094],
    ),
    change: { day: 12.5, week: 6.8, month: 9.1 },
  },
  {
    id: "posts",
    label: "Posts",
    icon: <PenLine />,
    noun: ["post", "posts"],
    series: series(
      [6, 9, 4, 7, 8, 11, 3],
      [34, 41, 38, 45, 12],
      [120, 134, 151, 142, 160, 171, 166, 184, 149],
    ),
    change: { day: -4.2, week: 3.1, month: 5.6 },
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail />,
    noun: ["message", "messages"],
    series: series(
      [22, 18, 25, 31, 27, 34, 14],
      [118, 132, 125, 141, 48],
      [480, 512, 560, 535, 590, 624, 610, 655, 571],
    ),
    change: { day: 2.3, week: -1.8, month: 4.4 },
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <Wallet />,
    currency: "USD",
    series: series(
      [3120, 2840, 1960, 4210, 3870, 4520, 1880],
      [18200, 21400, 19800, 23100, 7400],
      [62000, 68500, 74200, 71800, 79400, 84100, 82600, 90300, 76800],
    ),
    change: { day: 6.2, week: 4.9, month: 7.7 },
  },
];

// Times relative to now, so the feed always reads as recent.
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000);

// `person` puts an avatar on the row in the glass variant.
const ACTIVITY: DashboardActivity[] = [
  { id: 1, type: "user", title: "Priya Nair", subtitle: "Signed up on the Pro plan", person: "Priya Nair", date: minutesAgo(4) },
  { id: 2, type: "payment", title: "$249.00 from Daniel Brooks", subtitle: "Team plan, yearly", person: "Daniel Brooks", date: minutesAgo(18) },
  { id: 3, type: "message", title: "Question about invoices", subtitle: "marcus@northwind.io", date: minutesAgo(42) },
  { id: 4, type: "post", title: "Designing calmer dashboards", subtitle: "By Ayesha Rahman", person: "Ayesha Rahman", date: minutesAgo(95) },
  { id: 5, type: "payment", title: "$49.00 from Sofia Alvarez", subtitle: "Pro plan, monthly", status: "pending", person: "Sofia Alvarez", date: minutesAgo(150) },
  { id: 6, type: "user", title: "Liam O'Connor", subtitle: "Invited by Ayesha Rahman", person: "Liam O'Connor", date: minutesAgo(190) },
  { id: 7, type: "message", title: "Partnership enquiry", subtitle: "hello@lumen.studio", date: minutesAgo(26 * 60) },
  { id: 8, type: "post", title: "Release notes: September", subtitle: "By Marcus Chen", person: "Marcus Chen", date: minutesAgo(28 * 60) },
  { id: 9, type: "payment", title: "$129.00 from Hana Kobayashi", subtitle: "Team plan, monthly", status: "failed", person: "Hana Kobayashi", date: minutesAgo(30 * 60) },
  { id: 10, type: "user", title: "Omar Haddad", subtitle: "Signed up on the Free plan", person: "Omar Haddad", date: minutesAgo(50 * 60) },
  { id: 11, type: "post", title: "Building accessible components", subtitle: "By Daniel Brooks", person: "Daniel Brooks", date: minutesAgo(52 * 60) },
  { id: 12, type: "message", title: "Feature request: Custom themes", subtitle: "dev@acme.corp", date: minutesAgo(55 * 60) },
  { id: 13, type: "payment", title: "$399.00 from Acme Corp", subtitle: "Enterprise plan, yearly", date: minutesAgo(58 * 60) },
  { id: 14, type: "post", title: "State management in 2026", subtitle: "By Priya Nair", person: "Priya Nair", date: minutesAgo(65 * 60) },
  { id: 15, type: "message", title: "Webhook integration bug", subtitle: "support@startup.co", date: minutesAgo(70 * 60) },
];

const SOURCES: Record<DashboardPeriod, DashboardShare[]> = {
  day: [
    { id: "google", label: "Google", value: 412 },
    { id: "direct", label: "Direct", value: 268 },
    { id: "linkedin", label: "LinkedIn", value: 131 },
    { id: "newsletter", label: "Newsletter", value: 74 },
    { id: "x", label: "X", value: 38 },
  ],
  week: [
    { id: "google", label: "Google", value: 2680 },
    { id: "direct", label: "Direct", value: 1712 },
    { id: "linkedin", label: "LinkedIn", value: 905 },
    { id: "newsletter", label: "Newsletter", value: 640 },
    { id: "x", label: "X", value: 251 },
  ],
  month: [
    { id: "google", label: "Google", value: 9840 },
    { id: "direct", label: "Direct", value: 6120 },
    { id: "linkedin", label: "LinkedIn", value: 3310 },
    { id: "newsletter", label: "Newsletter", value: 1870 },
    { id: "x", label: "X", value: 700 },
  ],
};

const SIGN_UPS: Record<DashboardPeriod, number> = { day: 24, week: 96, month: 1094 };

const COUNTRIES: Record<DashboardPeriod, DashboardShare[]> = {
  day: [
    { id: "us", code: "US", label: "United States", value: 341 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 162 },
    { id: "de", code: "DE", label: "Germany", value: 118 },
    { id: "in", code: "IN", label: "India", value: 97 },
    { id: "ca", code: "CA", label: "Canada", value: 76 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 59 },
    { id: "au", code: "AU", label: "Australia", value: 70 },
  ],
  week: [
    { id: "us", code: "US", label: "United States", value: 2210 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 1035 },
    { id: "de", code: "DE", label: "Germany", value: 812 },
    { id: "in", code: "IN", label: "India", value: 694 },
    { id: "ca", code: "CA", label: "Canada", value: 503 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 461 },
    { id: "au", code: "AU", label: "Australia", value: 473 },
  ],
  month: [
    { id: "us", code: "US", label: "United States", value: 8120 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 3940 },
    { id: "de", code: "DE", label: "Germany", value: 3010 },
    { id: "in", code: "IN", label: "India", value: 2590 },
    { id: "ca", code: "CA", label: "Canada", value: 1880 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 1610 },
    { id: "au", code: "AU", label: "Australia", value: 690 },
  ],
};

const AUTHORS: Record<DashboardPeriod, DashboardAuthor[]> = {
  day: [
    { name: "Ayesha Rahman", posts: 2 },
    { name: "Daniel Brooks", posts: 1 },
    { name: "Priya Nair", posts: 1 },
    { name: "Marcus Chen", posts: 1 },
    { name: "Sofia Alvarez", posts: 1 },
  ],
  week: [
    { name: "Ayesha Rahman", posts: 6 },
    { name: "Daniel Brooks", posts: 4 },
    { name: "Priya Nair", posts: 3 },
    { name: "Marcus Chen", posts: 3 },
    { name: "Sofia Alvarez", posts: 2 },
  ],
  month: [
    { name: "Ayesha Rahman", posts: 18 },
    { name: "Daniel Brooks", posts: 14 },
    { name: "Priya Nair", posts: 11 },
    { name: "Marcus Chen", posts: 9 },
    { name: "Sofia Alvarez", posts: 7 },
    { name: "Liam O'Connor", posts: 4 },
  ],
};

// The glass variant's payments table and shortcut tiles; the classic look ignores them.
const PAYMENTS: DashboardPayment[] = [
  { id: "pay_1", amount: 249, currency: "USD", method: "Stripe", person: "Daniel Brooks", date: minutesAgo(18) },
  { id: "pay_2", amount: 49, currency: "USD", method: "PayPal", status: "pending", person: "Sofia Alvarez", date: minutesAgo(150) },
  { id: "pay_3", amount: 129, currency: "USD", method: "Stripe", status: "failed", person: "Hana Kobayashi", date: minutesAgo(30 * 60) },
  { id: "pay_4", amount: 399, currency: "USD", method: "Bank transfer", person: "Acme Corp", date: minutesAgo(58 * 60) },
  { id: "pay_5", amount: 19, currency: "USD", method: "Lemon Squeezy", date: minutesAgo(73 * 60) },
  { id: "pay_6", amount: 249, currency: "USD", method: "Stripe", person: "Priya Nair", date: minutesAgo(96 * 60) },
];

const SHORTCUTS: DashboardShortcut[] = [
  { label: "Add a page", href: "#pages/new", icon: <FilePlus2 /> },
  { label: "Add a package", href: "#packages/new", icon: <PackagePlus /> },
  { label: "Users", href: "#users", icon: <UsersRound /> },
  { label: "Messages", href: "#messages", icon: <Mail /> },
  { label: "Visitors", href: "#visitors", icon: <Globe /> },
  { label: "Invitations", href: "#invitations", icon: <UserPlus /> },
];

export default function AdminDashboard({ variant = "glass", bgImage }: { variant?: DashboardVariant; bgImage?: string }) {
  return (
    <Dashboard
      variant={variant}
      bgImage={bgImage}
      userName="Ayesha Rahman"
      totals={TOTALS}
      metrics={METRICS}
      activity={ACTIVITY}
      sources={SOURCES}
      signUps={SIGN_UPS}
      countries={COUNTRIES}
      authors={AUTHORS}
      payments={PAYMENTS}
      shortcuts={SHORTCUTS}
      links={{
        activity: "#activity",
        traffic: "#traffic",
        countries: "#countries",
        authors: "#authors",
        payments: "#payments",
      }}
    />
  );
}
```

## Liquid Glass

Fluid refractive glass effect powered by SVG displacement noise filters. Wraps the dashboard with dynamic liquid glass backdrops, specular highlights, and ambient illumination using LiquidGlassWrapper, LiquidGlassBackground, and LiquidGlassSvgFilter.

- Set `variant="liquid-glass"` — applies fluid SVG distortion filters, specular highlights, and refractive backdrop glass layers built with LiquidGlassWrapper, LiquidGlassBackground, and LiquidGlassSvgFilter.

```tsx
import {
  CreditCard,
  FilePlus2,
  FileText,
  Globe,
  Mail,
  PackagePlus,
  PenLine,
  UserPlus,
  UsersRound,
  Wallet,
} from "lucide-react";
import {
  Dashboard,
  type DashboardActivity,
  type DashboardAuthor,
  type DashboardMetric,
  type DashboardPayment,
  type DashboardPeriod,
  type DashboardPoint,
  type DashboardShare,
  type DashboardShortcut,
  type DashboardTotal,
  type DashboardVariant,
} from "@/components/custom/blocks/DashboardBlock";

// Replace everything below with your API's numbers — the section only reads props.

const DAYS = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
const WEEKS = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

/** One series per period from plain numbers, oldest first. */
const series = (
  day: number[],
  week: number[],
  month: number[],
): Record<DashboardPeriod, DashboardPoint[]> => ({
  day: day.map((value, i) => ({ label: DAYS[i] ?? "", shortLabel: DAYS[i]?.charAt(0), value })),
  week: week.map((value, i) => ({
    label: WEEKS[i] ?? "",
    shortLabel: WEEKS[i]?.split(" ")[1],
    fullLabel: `Week of ${WEEKS[i]}`,
    value,
  })),
  month: month.map((value, i) => ({ label: MONTHS[i] ?? "", shortLabel: MONTHS[i]?.charAt(0), value })),
});

// `metric` and `href` are read by the glass variant: each card reports what
// the current period added and gets a round open button.
const TOTALS: DashboardTotal[] = [
  { label: "Total users", value: 12480, icon: <UsersRound />, metric: "users", href: "#users" },
  { label: "Published posts", value: 1284, icon: <FileText />, metric: "posts", href: "#posts" },
  { label: "Messages received", value: 3906, icon: <Mail />, metric: "messages", href: "#messages" },
  { label: "Completed payments", value: 8215, icon: <CreditCard />, metric: "revenue" },
];

const METRICS: DashboardMetric[] = [
  {
    id: "users",
    label: "New users",
    icon: <UserPlus />,
    noun: ["new user", "new users"],
    series: series(
      [38, 42, 29, 51, 47, 58, 24],
      [212, 248, 231, 265, 96],
      [820, 910, 1040, 980, 1120, 1210, 1185, 1302, 1094],
    ),
    change: { day: 12.5, week: 6.8, month: 9.1 },
  },
  {
    id: "posts",
    label: "Posts",
    icon: <PenLine />,
    noun: ["post", "posts"],
    series: series(
      [6, 9, 4, 7, 8, 11, 3],
      [34, 41, 38, 45, 12],
      [120, 134, 151, 142, 160, 171, 166, 184, 149],
    ),
    change: { day: -4.2, week: 3.1, month: 5.6 },
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail />,
    noun: ["message", "messages"],
    series: series(
      [22, 18, 25, 31, 27, 34, 14],
      [118, 132, 125, 141, 48],
      [480, 512, 560, 535, 590, 624, 610, 655, 571],
    ),
    change: { day: 2.3, week: -1.8, month: 4.4 },
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <Wallet />,
    currency: "USD",
    series: series(
      [3120, 2840, 1960, 4210, 3870, 4520, 1880],
      [18200, 21400, 19800, 23100, 7400],
      [62000, 68500, 74200, 71800, 79400, 84100, 82600, 90300, 76800],
    ),
    change: { day: 6.2, week: 4.9, month: 7.7 },
  },
];

// Times relative to now, so the feed always reads as recent.
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000);

// `person` puts an avatar on the row in the glass variant.
const ACTIVITY: DashboardActivity[] = [
  { id: 1, type: "user", title: "Priya Nair", subtitle: "Signed up on the Pro plan", person: "Priya Nair", date: minutesAgo(4) },
  { id: 2, type: "payment", title: "$249.00 from Daniel Brooks", subtitle: "Team plan, yearly", person: "Daniel Brooks", date: minutesAgo(18) },
  { id: 3, type: "message", title: "Question about invoices", subtitle: "marcus@northwind.io", date: minutesAgo(42) },
  { id: 4, type: "post", title: "Designing calmer dashboards", subtitle: "By Ayesha Rahman", person: "Ayesha Rahman", date: minutesAgo(95) },
  { id: 5, type: "payment", title: "$49.00 from Sofia Alvarez", subtitle: "Pro plan, monthly", status: "pending", person: "Sofia Alvarez", date: minutesAgo(150) },
  { id: 6, type: "user", title: "Liam O'Connor", subtitle: "Invited by Ayesha Rahman", person: "Liam O'Connor", date: minutesAgo(190) },
  { id: 7, type: "message", title: "Partnership enquiry", subtitle: "hello@lumen.studio", date: minutesAgo(26 * 60) },
  { id: 8, type: "post", title: "Release notes: September", subtitle: "By Marcus Chen", person: "Marcus Chen", date: minutesAgo(28 * 60) },
  { id: 9, type: "payment", title: "$129.00 from Hana Kobayashi", subtitle: "Team plan, monthly", status: "failed", person: "Hana Kobayashi", date: minutesAgo(30 * 60) },
  { id: 10, type: "user", title: "Omar Haddad", subtitle: "Signed up on the Free plan", person: "Omar Haddad", date: minutesAgo(50 * 60) },
  { id: 11, type: "post", title: "Building accessible components", subtitle: "By Daniel Brooks", person: "Daniel Brooks", date: minutesAgo(52 * 60) },
  { id: 12, type: "message", title: "Feature request: Custom themes", subtitle: "dev@acme.corp", date: minutesAgo(55 * 60) },
  { id: 13, type: "payment", title: "$399.00 from Acme Corp", subtitle: "Enterprise plan, yearly", date: minutesAgo(58 * 60) },
  { id: 14, type: "post", title: "State management in 2026", subtitle: "By Priya Nair", person: "Priya Nair", date: minutesAgo(65 * 60) },
  { id: 15, type: "message", title: "Webhook integration bug", subtitle: "support@startup.co", date: minutesAgo(70 * 60) },
];

const SOURCES: Record<DashboardPeriod, DashboardShare[]> = {
  day: [
    { id: "google", label: "Google", value: 412 },
    { id: "direct", label: "Direct", value: 268 },
    { id: "linkedin", label: "LinkedIn", value: 131 },
    { id: "newsletter", label: "Newsletter", value: 74 },
    { id: "x", label: "X", value: 38 },
  ],
  week: [
    { id: "google", label: "Google", value: 2680 },
    { id: "direct", label: "Direct", value: 1712 },
    { id: "linkedin", label: "LinkedIn", value: 905 },
    { id: "newsletter", label: "Newsletter", value: 640 },
    { id: "x", label: "X", value: 251 },
  ],
  month: [
    { id: "google", label: "Google", value: 9840 },
    { id: "direct", label: "Direct", value: 6120 },
    { id: "linkedin", label: "LinkedIn", value: 3310 },
    { id: "newsletter", label: "Newsletter", value: 1870 },
    { id: "x", label: "X", value: 700 },
  ],
};

const SIGN_UPS: Record<DashboardPeriod, number> = { day: 24, week: 96, month: 1094 };

const COUNTRIES: Record<DashboardPeriod, DashboardShare[]> = {
  day: [
    { id: "us", code: "US", label: "United States", value: 341 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 162 },
    { id: "de", code: "DE", label: "Germany", value: 118 },
    { id: "in", code: "IN", label: "India", value: 97 },
    { id: "ca", code: "CA", label: "Canada", value: 76 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 59 },
    { id: "au", code: "AU", label: "Australia", value: 70 },
  ],
  week: [
    { id: "us", code: "US", label: "United States", value: 2210 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 1035 },
    { id: "de", code: "DE", label: "Germany", value: 812 },
    { id: "in", code: "IN", label: "India", value: 694 },
    { id: "ca", code: "CA", label: "Canada", value: 503 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 461 },
    { id: "au", code: "AU", label: "Australia", value: 473 },
  ],
  month: [
    { id: "us", code: "US", label: "United States", value: 8120 },
    { id: "gb", code: "GB", label: "United Kingdom", value: 3940 },
    { id: "de", code: "DE", label: "Germany", value: 3010 },
    { id: "in", code: "IN", label: "India", value: 2590 },
    { id: "ca", code: "CA", label: "Canada", value: 1880 },
    { id: "bd", code: "BD", label: "Bangladesh", value: 1610 },
    { id: "au", code: "AU", label: "Australia", value: 690 },
  ],
};

const AUTHORS: Record<DashboardPeriod, DashboardAuthor[]> = {
  day: [
    { name: "Ayesha Rahman", posts: 2 },
    { name: "Daniel Brooks", posts: 1 },
    { name: "Priya Nair", posts: 1 },
    { name: "Marcus Chen", posts: 1 },
    { name: "Sofia Alvarez", posts: 1 },
  ],
  week: [
    { name: "Ayesha Rahman", posts: 6 },
    { name: "Daniel Brooks", posts: 4 },
    { name: "Priya Nair", posts: 3 },
    { name: "Marcus Chen", posts: 3 },
    { name: "Sofia Alvarez", posts: 2 },
  ],
  month: [
    { name: "Ayesha Rahman", posts: 18 },
    { name: "Daniel Brooks", posts: 14 },
    { name: "Priya Nair", posts: 11 },
    { name: "Marcus Chen", posts: 9 },
    { name: "Sofia Alvarez", posts: 7 },
    { name: "Liam O'Connor", posts: 4 },
  ],
};

// The glass variant's payments table and shortcut tiles; the classic look ignores them.
const PAYMENTS: DashboardPayment[] = [
  { id: "pay_1", amount: 249, currency: "USD", method: "Stripe", person: "Daniel Brooks", date: minutesAgo(18) },
  { id: "pay_2", amount: 49, currency: "USD", method: "PayPal", status: "pending", person: "Sofia Alvarez", date: minutesAgo(150) },
  { id: "pay_3", amount: 129, currency: "USD", method: "Stripe", status: "failed", person: "Hana Kobayashi", date: minutesAgo(30 * 60) },
  { id: "pay_4", amount: 399, currency: "USD", method: "Bank transfer", person: "Acme Corp", date: minutesAgo(58 * 60) },
  { id: "pay_5", amount: 19, currency: "USD", method: "Lemon Squeezy", date: minutesAgo(73 * 60) },
  { id: "pay_6", amount: 249, currency: "USD", method: "Stripe", person: "Priya Nair", date: minutesAgo(96 * 60) },
];

const SHORTCUTS: DashboardShortcut[] = [
  { label: "Add a page", href: "#pages/new", icon: <FilePlus2 /> },
  { label: "Add a package", href: "#packages/new", icon: <PackagePlus /> },
  { label: "Users", href: "#users", icon: <UsersRound /> },
  { label: "Messages", href: "#messages", icon: <Mail /> },
  { label: "Visitors", href: "#visitors", icon: <Globe /> },
  { label: "Invitations", href: "#invitations", icon: <UserPlus /> },
];

export default function AdminDashboard({ variant = "liquid-glass", bgImage }: { variant?: DashboardVariant; bgImage?: string }) {
  return (
    <Dashboard
      variant={variant}
      bgImage={bgImage}
      userName="Ayesha Rahman"
      totals={TOTALS}
      metrics={METRICS}
      activity={ACTIVITY}
      sources={SOURCES}
      signUps={SIGN_UPS}
      countries={COUNTRIES}
      authors={AUTHORS}
      payments={PAYMENTS}
      shortcuts={SHORTCUTS}
      links={{
        activity: "#activity",
        traffic: "#traffic",
        countries: "#countries",
        authors: "#authors",
        payments: "#payments",
      }}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/dashboard.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/dashboard
```

## Features

### Built from the library

The period, chart-style and activity switches are the segmented [Toggle Group](https://avaraui.com/docs/reactjs/toggle-group), the trend line is the [Chart](https://avaraui.com/docs/reactjs/chart), and the rate explainer is a [Popover](https://avaraui.com/docs/reactjs/popover) — installing the section pulls those in.

### Every value is text too

The gauge and barcode are backed by legend rows with the number and share, the chart has a screen-reader table, and the arrow keys read each column.

### Follows your theme

The canvas glow, the current column, the tab indicator and the bars are mixed from `--primary`, so a theme preset repaints the whole section in light and dark.

### Glass without the lag

The glass variant gets its depth from a sheen, a light rim and colour blobs on the canvas, not from `backdrop-filter`, so it scrolls as smoothly as the classic look. With reduced transparency turned on, the panes go solid.

### Sizes to its container

The glass layout uses container queries, so it stacks, pairs up and spreads out by the width it is given — a sidebar layout and a full-width page both get the right grid.

### No hydration surprises

The greeting, the date and the "4m ago" times read the visitor's clock after mount, so a server-rendered page and the browser agree. Pass `now` to pin them.

## Best Practices & Guidelines

### Send the change with the series

The badges show `change[period]` as given — compute it on your side the way your business reads it (raw totals, or the current period's pace against the last). Leave it out for a period and the tab shows no badge.

### Keep the series the same length

The built-in Export writes one CSV row per point with a column per metric, so give every metric the same buckets for a period. Pass `onExport` to produce your own report instead.

### It sizes to its container

Panels stack on phones, pair up on tablets and settle into the 8 + 4 / 4 + 4 + 4 grid from 1280px. Inside an app shell with a sidebar, give the section the content column and override its radius with `className` if it should sit flush.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"classic" \| "glass" \| "liquid-glass"` | `"classic"` | The look. All variants read the same props. `liquid-glass` wraps the dashboard in fluid SVG displacement filters, specular highlights, and refractive glass backdrops using `LiquidGlassWrapper`, `LiquidGlassBackground`, and `LiquidGlassSvgFilter`. |
| `userName` | `string` | — | The greeting uses the first name: “Good afternoon, Ayesha”. |
| `summary` | `ReactNode` | built from today | The line under the greeting. By default it reads the last `day` point of each metric: “So far today: 24 new users…”. |
| `totals` | `DashboardTotal[]` | `[]` | All-time counts beside the greeting — `{ label, value, icon?, metric?, href? }`. The period switch never changes them. In glass, `metric` (a metric id) adds what the current period brought and `href` adds an open button. |
| `metrics` | `DashboardMetric[]` | `[]` | The overview tabs. See the shape below. |
| `activity` | `DashboardActivity[]` | `[]` | The feed, newest shown first, six per filter — `{ id, type: "user" \| "post" \| "payment" \| "message", title, subtitle?, status?, date, href?, person?, avatar? }`. Glass groups it by type into four steps, three rows each, with an avatar when `person` is set. |
| `sources` | `Partial<Record<DashboardPeriod, DashboardShare[]>>` | — | Visits by source — `{ id, label, value }`. The top three get their own colour; the rest fold into “Other”. |
| `signUps` | `Partial<Record<DashboardPeriod, number>>` | — | Sign-ups per period, for the visit-to-sign-up rate under the sources. Omit it to hide the rate. |
| `countries` | `Partial<Record<DashboardPeriod, DashboardShare[]>>` | — | Visits by country; add `code` (e.g. `"US"`) for the small badge. |
| `authors` | `Partial<Record<DashboardPeriod, DashboardAuthor[]>>` | — | Posts per author — `{ name, posts, avatar? }`. The top five are ranked against the leader; glass shows the top eight in the activity pane's notch. |
| `payments` | `DashboardPayment[]` | — | Glass only: the recent payments table, newest six — `{ id, amount, currency, method, status?, person?, avatar?, date }`. Leave it out to hide the pane. |
| `shortcuts` | `DashboardShortcut[]` | `[]` | Glass only: tiles beside the activity steps — `{ label, href, icon? }`. The first takes the brand fill. |
| `defaultPeriod` | `"day" \| "week" \| "month"` | `"month"` | The period selected on first render. |
| `onExport` | `(period: DashboardPeriod) => void` | CSV download | Replaces the built-in CSV of the overview series for the selected period. |
| `links` | `{ activity?, traffic?, countries?, authors?, payments? }` | `{}` | Where each panel's round open button goes. A panel without a link shows none. |
| `linkComponent` | `ElementType` | `"a"` | Renders the panel links and activity titles — pass `next/link` in a Next.js app. |
| `now` | `Date` | the visitor's clock | Pins “now” for the greeting, the date and the activity times. |

### DashboardMetric

| Field | Type | Description |
| --- | --- | --- |
| `id` / `label` | `string` | A stable key and the tab label. |
| `icon` | `ReactNode` | Shown beside the label from the `sm` breakpoint. |
| `noun` | `[string, string]` | Singular and plural for the summary line, e.g. `["new user", "new users"]`. |
| `currency` | `string` | An ISO code such as `"USD"`; the metric then formats as money. |
| `series` | `Record<"day" \| "week" \| "month", { label, shortLabel?, fullLabel?, value }[]>` | Oldest first. `shortLabel` is used on phones, `fullLabel` in the tooltip and for screen readers. |
| `change` | `Partial<Record<DashboardPeriod, number \| null>>` | Percent change of the current point against the one before (`12.5` is +12.5%). |

---

Live previews and every example: https://avaraui.com/docs/nextjs/dashboard
