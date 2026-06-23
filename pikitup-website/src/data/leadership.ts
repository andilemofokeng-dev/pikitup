/**
 * CMS-EDITABLE: Update this file to change leadership page content.
 * Source: https://pikitup.co.za/management/
 */

export interface Executive {
  id: string;
  name: string;
  title: string;
  abbreviation: string;
  department: string;
  bio: string;
  imageUrl: string | null;
  email?: string;
  order: number;
}

export interface GeneralManager {
  id: string;
  name: string;
  cluster: string;
  order: number;
}

export interface DepotManager {
  id: string;
  name: string;
  depot: string;
  role: "Regional Manager" | "Operations Manager";
  order: number;
}

// ─── Executive Committee ────────────────────────────────────────────────────

export const EXECUTIVES: Executive[] = [
  {
    id: "md",
    name: "Ms Bukelwa Njingolo",
    title: "Managing Director",
    abbreviation: "MD",
    department: "Office of the Managing Director",
    bio: "Leading Pikitup Johannesburg as Managing Director, steering the company's integrated waste management mandate across all seven regions of Greater Johannesburg. Responsible for strategic direction, stakeholder engagement, and operational performance for over 1.2 million households.",
    imageUrl: null,
    email: "md@pikitup.co.za",
    order: 1,
  },
  {
    id: "cfo",
    name: "Mr Litshani Matsila",
    title: "Chief Finance Officer",
    abbreviation: "CFO",
    department: "Finance & Revenue",
    bio: "Overseeing Pikitup's financial management, budget planning, and compliance with municipal finance legislation. Responsible for financial reporting, revenue management, and ensuring the entity's long-term fiscal sustainability.",
    imageUrl: null,
    email: "cfo@pikitup.co.za",
    order: 2,
  },
];

// ─── General Managers ───────────────────────────────────────────────────────

export const GENERAL_MANAGERS: GeneralManager[] = [
  { id: "gm-1", name: "Nompumelelo Mthethwa",  cluster: "Central Cluster", order: 1 },
  { id: "gm-2", name: "Aluoneswi Mafunzwaini", cluster: "Central Cluster", order: 2 },
  { id: "gm-3", name: "Angel Masia",            cluster: "North Cluster",   order: 3 },
];

// ─── Regional & Operations Managers ────────────────────────────────────────

export const DEPOT_MANAGERS: DepotManager[] = [
  // Avalon Depot
  { id: "rm-avalon-1",   name: "Busi Mmutle",             depot: "Avalon Depot",           role: "Regional Manager",   order: 10 },
  { id: "om-avalon-1",   name: "Kefiloenyane Motaung",    depot: "Avalon Depot",           role: "Operations Manager", order: 11 },

  // Central Camp Depot
  { id: "rm-central-1",  name: "Michael Titus",           depot: "Central Camp Depot",     role: "Regional Manager",   order: 20 },
  { id: "om-central-1",  name: "Jeffrey Mahlangu",        depot: "Central Camp Depot",     role: "Operations Manager", order: 21 },

  // Landfill (Robinson / Gerhard)
  { id: "om-landfill-1", name: "Eric Sadiki",             depot: "Robinson Landfill",      role: "Operations Manager", order: 30 },
  { id: "om-landfill-2", name: "Gerhard Loggenberg",      depot: "Landfill Depot",         role: "Operations Manager", order: 31 },
  { id: "om-landfill-3", name: "Sabona Malete",           depot: "Landfill Depot",         role: "Operations Manager", order: 32 },

  // Marlboro Depot
  { id: "rm-marlboro-1", name: "Mlawuli Dlamini",         depot: "Marlboro Depot",         role: "Regional Manager",   order: 40 },
  { id: "om-marlboro-1", name: "Esther Mtatyana",         depot: "Marlboro Depot",         role: "Operations Manager", order: 41 },

  // Midrand Depot
  { id: "om-midrand-1",  name: "Cynthia Mphahlele",       depot: "Midrand Depot",          role: "Operations Manager", order: 50 },
  { id: "om-midrand-2",  name: "Ettienne Maluleke",       depot: "Midrand Depot",          role: "Operations Manager", order: 51 },
  { id: "om-midrand-3",  name: "Farida Abrahams",         depot: "Midrand Depot",          role: "Operations Manager", order: 52 },

  // Norwood Depot
  { id: "rm-norwood-1",  name: "Mukhethwa Mudau",         depot: "Norwood Depot",          role: "Regional Manager",   order: 60 },
  { id: "om-norwood-1",  name: "Alex Isaacs",             depot: "Norwood Depot",          role: "Operations Manager", order: 61 },
  { id: "om-norwood-2",  name: "Philemon Mkhari",         depot: "Norwood Depot",          role: "Operations Manager", order: 62 },

  // Randburg Depot
  { id: "om-randburg-1", name: "Jeffrey Moloro",          depot: "Randburg Depot",         role: "Operations Manager", order: 70 },
  { id: "om-randburg-2", name: "Edith Ndlovu",            depot: "Randburg Depot",         role: "Operations Manager", order: 71 },
  { id: "om-randburg-3", name: "Welcome Nkosi",           depot: "Randburg Depot",         role: "Operations Manager", order: 72 },

  // Roodepoort Depot
  { id: "rm-roodepoort-1",name: "Mapitso Makwea",         depot: "Roodepoort Depot",       role: "Regional Manager",   order: 80 },

  // Selby Depot
  { id: "rm-selby-1",    name: "Eddy Makhubela",          depot: "Selby Depot",            role: "Regional Manager",   order: 90 },
  { id: "rm-selby-2",    name: "David Mahlangu",          depot: "Selby Depot",            role: "Regional Manager",   order: 91 },
  { id: "om-selby-1",    name: "Ernest Mbanu",            depot: "Selby Depot",            role: "Operations Manager", order: 92 },
  { id: "om-selby-2",    name: "Zachariah Dzoye",         depot: "Selby Depot",            role: "Operations Manager", order: 93 },

  // Southdale Depot
  { id: "rm-southdale-1",name: "Selinah Tshabalala",      depot: "Southdale Depot",        role: "Regional Manager",   order: 100 },
  { id: "om-southdale-1",name: "Mimi Kobuoe",             depot: "Southdale Depot",        role: "Operations Manager", order: 101 },
  { id: "om-southdale-2",name: "Lucia Moeketsi",          depot: "Southdale Depot",        role: "Operations Manager", order: 102 },

  // Waterval Depot
  { id: "rm-waterval-1", name: "Debbie Du Preez",         depot: "Waterval Depot",         role: "Regional Manager",   order: 110 },
  { id: "om-waterval-1", name: "Henry Lloyd",             depot: "Waterval Depot",         role: "Operations Manager", order: 111 },

  // Zondi Depot
  { id: "rm-zondi-1",    name: "Sesi Moloi",              depot: "Zondi Depot",            role: "Regional Manager",   order: 120 },

  // Unassigned
  { id: "rm-unassigned-1",name: "Stella Wilson",          depot: "—",                      role: "Regional Manager",   order: 130 },
];

/** All unique depots in display order */
export const DEPOTS = [
  "Avalon Depot",
  "Central Camp Depot",
  "Marlboro Depot",
  "Midrand Depot",
  "Norwood Depot",
  "Randburg Depot",
  "Roodepoort Depot",
  "Selby Depot",
  "Southdale Depot",
  "Waterval Depot",
  "Zondi Depot",
  "Robinson Landfill",
  "Landfill Depot",
] as const;
