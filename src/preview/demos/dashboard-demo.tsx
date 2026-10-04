"use client";

import {
  CreditCard,
  FileText,
  Mail,
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
  type DashboardPeriod,
  type DashboardPoint,
  type DashboardShare,
  type DashboardTotal,
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

const TOTALS: DashboardTotal[] = [
  { label: "Total users", value: 12480, icon: <UsersRound /> },
  { label: "Published posts", value: 1284, icon: <FileText /> },
  { label: "Messages received", value: 3906, icon: <Mail /> },
  { label: "Completed payments", value: 8215, icon: <CreditCard /> },
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

const ACTIVITY: DashboardActivity[] = [
  { id: 1, type: "user", title: "Priya Nair", subtitle: "Signed up on the Pro plan", date: minutesAgo(4) },
  { id: 2, type: "payment", title: "$249.00 from Daniel Brooks", subtitle: "Team plan, yearly", date: minutesAgo(18) },
  { id: 3, type: "message", title: "Question about invoices", subtitle: "marcus@northwind.io", date: minutesAgo(42) },
  { id: 4, type: "post", title: "Designing calmer dashboards", subtitle: "By Ayesha Rahman", date: minutesAgo(95) },
  { id: 5, type: "payment", title: "$49.00 from Sofia Alvarez", subtitle: "Pro plan, monthly", status: "pending", date: minutesAgo(150) },
  { id: 6, type: "user", title: "Liam O'Connor", subtitle: "Invited by Ayesha Rahman", date: minutesAgo(190) },
  { id: 7, type: "message", title: "Partnership enquiry", subtitle: "hello@lumen.studio", date: minutesAgo(26 * 60) },
  { id: 8, type: "post", title: "Release notes: September", subtitle: "By Marcus Chen", date: minutesAgo(28 * 60) },
  { id: 9, type: "payment", title: "$129.00 from Hana Kobayashi", subtitle: "Team plan, monthly", status: "failed", date: minutesAgo(30 * 60) },
  { id: 10, type: "user", title: "Omar Haddad", subtitle: "Signed up on the Free plan", date: minutesAgo(50 * 60) },
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

export default function AdminDashboard() {
  return (
    <Dashboard
      userName="Ayesha Rahman"
      totals={TOTALS}
      metrics={METRICS}
      activity={ACTIVITY}
      sources={SOURCES}
      signUps={SIGN_UPS}
      countries={COUNTRIES}
      authors={AUTHORS}
      links={{ activity: "#activity", traffic: "#traffic", countries: "#countries", authors: "#authors" }}
    />
  );
}
