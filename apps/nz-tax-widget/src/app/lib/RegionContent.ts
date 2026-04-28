// Navigation item types
export type NavigationItemType = "link" | "separator" | "title";

export interface BaseNavigationItem {
  id: string;
  type: NavigationItemType;
}

export interface NavigationLinkItem extends BaseNavigationItem {
  type: "link";
  label: string;
  href: string;
  description?: string;
  hasSettingsIcon?: boolean;
  hasExternalLinkIcon?: boolean;
}

export interface NavigationSeparatorItem extends BaseNavigationItem {
  type: "separator";
}

export interface NavigationTitleItem extends BaseNavigationItem {
  type: "title";
  label: string;
  hasStarIcon?: boolean; // For titles that need star icon
}

export type NavigationItem =
  | NavigationLinkItem
  | NavigationSeparatorItem
  | NavigationTitleItem;

export interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

// Type for navigation section overrides - can be null to exclude a section entirely
export type NavigationSectionOverride = NavigationSection | null;

// Region-specific content configuration
export const regionContent = {
  // Text variations by region
  text: {
    loggedIn: {
      UK: "1 hour ago from UK",
      USA: "1 hour ago from USA",
      NZ: "1 hour ago from New Zealand",
      AU: "1 hour ago from Australia",
    },
    timeSummary: {
      AU: {
        weeklyData: [
          {
            day: "Monday",
            billable: 7.2,
            nonBillable: 2,
            capacity: 8,
          },
          { day: "Tuesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Wednesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Thursday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Friday", billable: 0, nonBillable: 0, capacity: 8 },
        ],
        totalBillable: "7h 12m",
        totalNonBillable: "2h",
        utilization: "87.5%",
      },
      NZ: {
        weeklyData: [
          {
            day: "Monday",
            billable: 6.5,
            nonBillable: 1.25,
            capacity: 8,
          },
          { day: "Tuesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Wednesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Thursday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Friday", billable: 0, nonBillable: 0, capacity: 8 },
        ],
        totalBillable: "6h 30m",
        totalNonBillable: "1h 15m",
        utilization: "75%",
      },
      UK: {
        weeklyData: [
          {
            day: "Monday",
            billable: 6.75,
            nonBillable: 1.5,
            capacity: 8,
          },
          { day: "Tuesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Wednesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Thursday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Friday", billable: 0, nonBillable: 0, capacity: 8 },
        ],
        totalBillable: "6h 45m",
        totalNonBillable: "1h 30m",
        utilization: "75%",
      },
      USA: {
        weeklyData: [
          {
            day: "Monday",
            billable: 7.2,
            nonBillable: 2,
            capacity: 8,
          },
          { day: "Tuesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Wednesday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Thursday", billable: 0, nonBillable: 0, capacity: 8 },
          { day: "Friday", billable: 0, nonBillable: 0, capacity: 8 },
        ],
        totalBillable: "7h 12m",
        totalNonBillable: "2h",
        utilization: "87.5%",
      },
    },
    bankReconciliation: {
      AU: {
        items: [
          {
            client: "Erin Predovic",
            unreconciledItems: 86,
            oldestItemDaysFromToday: -158,
          },
          {
            client: "Borer - Smitham",
            unreconciledItems: 71,
            oldestItemDaysFromToday: -100,
          },
          {
            client: "Walsh - Conroy",
            unreconciledItems: 50,
            oldestItemDaysFromToday: -80,
          },
          {
            client: "Funk Group",
            unreconciledItems: 34,
            oldestItemDaysFromToday: -50,
          },
          {
            client: "Harriet Mayert",
            unreconciledItems: 27,
            oldestItemDaysFromToday: -30,
          },
          {
            client: "Graham and Sons",
            unreconciledItems: 12,
            oldestItemDaysFromToday: -20,
          },
          {
            client: "Brendan Zulauf",
            unreconciledItems: 4,
            oldestItemDaysFromToday: -15,
          },
          {
            client: "Roberts, Langworth...",
            unreconciledItems: 2,
            oldestItemDaysFromToday: -8,
          },
          {
            client: "Hector Hamill",
            unreconciledItems: 0,
            oldestItemDaysFromToday: -2,
          },
        ],
        totalUnreconciled: 286,
        oldestDateDaysFromToday: -314,
      },
      NZ: {
        items: [
          {
            client: "Erin Predovic",
            unreconciledItems: 86,
            oldestItemDaysFromToday: -158,
          },
          {
            client: "Borer - Smitham",
            unreconciledItems: 71,
            oldestItemDaysFromToday: -100,
          },
          {
            client: "Walsh - Conroy",
            unreconciledItems: 50,
            oldestItemDaysFromToday: -80,
          },
          {
            client: "Funk Group",
            unreconciledItems: 34,
            oldestItemDaysFromToday: -50,
          },
          {
            client: "Harriet Mayert",
            unreconciledItems: 27,
            oldestItemDaysFromToday: -30,
          },
          {
            client: "Graham and Sons",
            unreconciledItems: 12,
            oldestItemDaysFromToday: -20,
          },
          {
            client: "Brendan Zulauf",
            unreconciledItems: 4,
            oldestItemDaysFromToday: -15,
          },
          {
            client: "Roberts, Langworth...",
            unreconciledItems: 2,
            oldestItemDaysFromToday: -8,
          },
          {
            client: "Hector Hamill",
            unreconciledItems: 0,
            oldestItemDaysFromToday: -2,
          },
        ],
        totalUnreconciled: 286,
        oldestDateDaysFromToday: -314,
      },
      UK: {
        items: [
          {
            client: "Erin Predovic",
            unreconciledItems: 86,
            oldestItemDaysFromToday: -158,
          },
          {
            client: "Borer - Smitham",
            unreconciledItems: 71,
            oldestItemDaysFromToday: -100,
          },
          {
            client: "Walsh - Conroy",
            unreconciledItems: 50,
            oldestItemDaysFromToday: -80,
          },
          {
            client: "Funk Group",
            unreconciledItems: 34,
            oldestItemDaysFromToday: -50,
          },
          {
            client: "Harriet Mayert",
            unreconciledItems: 27,
            oldestItemDaysFromToday: -30,
          },
          {
            client: "Graham and Sons",
            unreconciledItems: 12,
            oldestItemDaysFromToday: -20,
          },
          {
            client: "Brendan Zulauf",
            unreconciledItems: 4,
            oldestItemDaysFromToday: -15,
          },
          {
            client: "Roberts, Langworth...",
            unreconciledItems: 2,
            oldestItemDaysFromToday: -8,
          },
          {
            client: "Hector Hamill",
            unreconciledItems: 0,
            oldestItemDaysFromToday: -2,
          },
        ],
        totalUnreconciled: 286,
        oldestDateDaysFromToday: -314,
      },
      USA: {
        items: [
          {
            client: "Erin Predovic",
            unreconciledItems: 86,
            oldestItemDaysFromToday: -158,
          },
          {
            client: "Borer - Smitham",
            unreconciledItems: 71,
            oldestItemDaysFromToday: -100,
          },
          {
            client: "Walsh - Conroy",
            unreconciledItems: 50,
            oldestItemDaysFromToday: -80,
          },
          {
            client: "Funk Group",
            unreconciledItems: 34,
            oldestItemDaysFromToday: -50,
          },
          {
            client: "Harriet Mayert",
            unreconciledItems: 27,
            oldestItemDaysFromToday: -30,
          },
          {
            client: "Graham and Sons",
            unreconciledItems: 12,
            oldestItemDaysFromToday: -20,
          },
          {
            client: "Brendan Zulauf",
            unreconciledItems: 4,
            oldestItemDaysFromToday: -15,
          },
          {
            client: "Roberts, Langworth...",
            unreconciledItems: 2,
            oldestItemDaysFromToday: -8,
          },
          {
            client: "Hector Hamill",
            unreconciledItems: 0,
            oldestItemDaysFromToday: -2,
          },
        ],
        totalUnreconciled: 286,
        oldestDateDaysFromToday: -314,
      },
    },
    jobs: {
      AU: {
        dueThisWeek: 12,
        items: [
          {
            jobNumber: "J012",
            service: "Advisory Services",
            client: "Kohler Group",
            status: "To be invoiced",
            timeBudget: "89%",
            daysFromToday: -5,
          },
          {
            jobNumber: "J013",
            service: "Bookkeeping",
            client: "Lueilwitz - Abernathy",
            status: "In progress",
            timeBudget: "89%",
            daysFromToday: -2,
          },
          {
            jobNumber: "J014",
            service: "Advisory Services",
            client: "Devin Goyette",
            status: "In progress",
            timeBudget: "86%",
            daysFromToday: 3,
          },
          {
            jobNumber: "J017",
            service: "Advisory Services",
            client: "Gottlieb - Herman",
            status: "In progress",
            timeBudget: "71%",
            daysFromToday: 5,
          },
          {
            jobNumber: "J018",
            service: "Advisory Services",
            client: "Pfeffer, Corkery and Bogan",
            status: "For review",
            timeBudget: "69%",
            daysFromToday: 7,
          },
          {
            jobNumber: "J019",
            service: "Annual Service Agreements",
            client: "Roderick Jerde",
            status: "For review",
            timeBudget: "54%",
            daysFromToday: 10,
          },
          {
            jobNumber: "J020",
            service: "Advisory Services",
            client: "Delia Stroman",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 14,
          },
          {
            jobNumber: "J023",
            service: "Bookkeeping",
            client: "Hauck LLC",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 21,
          },
        ],
      },
      NZ: {
        dueThisWeek: 12,
        items: [
          {
            jobNumber: "J012",
            service: "Advisory Services",
            client: "Kohler Group",
            status: "To be invoiced",
            timeBudget: "89%",
            daysFromToday: -5,
          },
          {
            jobNumber: "J013",
            service: "Bookkeeping",
            client: "Lueilwitz - Abernathy",
            status: "In progress",
            timeBudget: "89%",
            daysFromToday: -2,
          },
          {
            jobNumber: "J014",
            service: "Advisory Services",
            client: "Devin Goyette",
            status: "In progress",
            timeBudget: "86%",
            daysFromToday: 3,
          },
          {
            jobNumber: "J017",
            service: "Advisory Services",
            client: "Gottlieb - Herman",
            status: "In progress",
            timeBudget: "71%",
            daysFromToday: 5,
          },
          {
            jobNumber: "J018",
            service: "Advisory Services",
            client: "Pfeffer, Corkery and Bogan",
            status: "For review",
            timeBudget: "69%",
            daysFromToday: 7,
          },
          {
            jobNumber: "J019",
            service: "Annual Service Agreements",
            client: "Roderick Jerde",
            status: "For review",
            timeBudget: "54%",
            daysFromToday: 10,
          },
          {
            jobNumber: "J020",
            service: "Advisory Services",
            client: "Delia Stroman",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 14,
          },
          {
            jobNumber: "J023",
            service: "Bookkeeping",
            client: "Hauck LLC",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 21,
          },
        ],
      },
      UK: {
        dueThisWeek: 12,
        items: [
          {
            jobNumber: "J012",
            service: "Advisory Services",
            client: "Kohler Group",
            status: "To be invoiced",
            timeBudget: "89%",
            daysFromToday: -5,
          },
          {
            jobNumber: "J013",
            service: "Bookkeeping",
            client: "Lueilwitz - Abernathy",
            status: "In progress",
            timeBudget: "89%",
            daysFromToday: -2,
          },
          {
            jobNumber: "J014",
            service: "Advisory Services",
            client: "Devin Goyette",
            status: "In progress",
            timeBudget: "86%",
            daysFromToday: 3,
          },
          {
            jobNumber: "J017",
            service: "Advisory Services",
            client: "Gottlieb - Herman",
            status: "In progress",
            timeBudget: "71%",
            daysFromToday: 5,
          },
          {
            jobNumber: "J018",
            service: "Advisory Services",
            client: "Pfeffer, Corkery and Bogan",
            status: "For review",
            timeBudget: "69%",
            daysFromToday: 7,
          },
          {
            jobNumber: "J019",
            service: "Annual Service Agreements",
            client: "Roderick Jerde",
            status: "For review",
            timeBudget: "54%",
            daysFromToday: 10,
          },
          {
            jobNumber: "J020",
            service: "Advisory Services",
            client: "Delia Stroman",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 14,
          },
          {
            jobNumber: "J023",
            service: "Bookkeeping",
            client: "Hauck LLC",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 21,
          },
        ],
      },
      USA: {
        dueThisWeek: 12,
        items: [
          {
            jobNumber: "J012",
            service: "Advisory Services",
            client: "Kohler Group",
            status: "To be invoiced",
            timeBudget: "89%",
            daysFromToday: -5,
          },
          {
            jobNumber: "J013",
            service: "Bookkeeping",
            client: "Lueilwitz - Abernathy",
            status: "In progress",
            timeBudget: "89%",
            daysFromToday: -2,
          },
          {
            jobNumber: "J014",
            service: "Advisory Services",
            client: "Devin Goyette",
            status: "In progress",
            timeBudget: "86%",
            daysFromToday: 3,
          },
          {
            jobNumber: "J017",
            service: "Advisory Services",
            client: "Gottlieb - Herman",
            status: "In progress",
            timeBudget: "71%",
            daysFromToday: 5,
          },
          {
            jobNumber: "J018",
            service: "Advisory Services",
            client: "Pfeffer, Corkery and Bogan",
            status: "For review",
            timeBudget: "69%",
            daysFromToday: 7,
          },
          {
            jobNumber: "J019",
            service: "Annual Service Agreements",
            client: "Roderick Jerde",
            status: "For review",
            timeBudget: "54%",
            daysFromToday: 10,
          },
          {
            jobNumber: "J020",
            service: "Advisory Services",
            client: "Delia Stroman",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 14,
          },
          {
            jobNumber: "J023",
            service: "Bookkeeping",
            client: "Hauck LLC",
            status: "Planned",
            timeBudget: "0%",
            daysFromToday: 21,
          },
        ],
      },
    },
    billableHours: {
      AU: {
        today: {
          expectedHours: 7,
          enteredMinutes: 360, // 6h 0m
          utilizationRate: "23%",
          expectedPerWeek: 30,
        },
        week: {
          expectedHours: 6,
          enteredHours: 25,
          utilizationRate: "150%",
          expectedPerWeek: 35,
        },
      },
      NZ: {
        today: {
          expectedHours: 7,
          enteredMinutes: 360, // 6h 0m
          utilizationRate: "23%",
          expectedPerWeek: 30,
        },
        week: {
          expectedHours: 12,
          enteredHours: 25,
          utilizationRate: "150%",
          expectedPerWeek: 35,
        },
      },
      UK: {
        today: {
          expectedHours: 7,
          enteredMinutes: 360, // 6h 0m
          utilizationRate: "23%",
          expectedPerWeek: 30,
        },
        week: {
          expectedHours: 6,
          enteredHours: 25,
          utilizationRate: "150%",
          expectedPerWeek: 35,
        },
      },
      USA: {
        today: {
          expectedHours: 7,
          enteredMinutes: 360, // 6h 0m
          utilizationRate: "23%",
          expectedPerWeek: 30,
        },
        week: {
          expectedHours: 6,
          enteredHours: 25,
          utilizationRate: "150%",
          expectedPerWeek: 35,
        },
      },
    },
    tax: {
      AU: {
        type: "Activity statements",
        due: "16,450.00",
        dueDate: "Due 28 Jul for 30 Jun",
        period: "Running balance for Sep 2024",
        overdue: null,
        previousPeriod: null,
        ammountDue: "100.00",
      },
      NZ: {
        type: "GST Returns",
        due: "16,450.00",
        dueDate: "Due 28 Jul for 30 Jun",
        period: "Running balance for Sep 2024",
        overdue: null,
        previousPeriod: null,
        ammountDue: "100.00",
      },
      UK: {
        type: "VAT Return",
        due: "20 days",
        dueDate: "7 Jul 2025",
        period: "1 Apr - 30 Jun 2025",
        overdue: "Payment due in 20 days",
        previousPeriod: "7 Jul 2025",
        ammountDue: "100.00",
      },
      USA: {
        type: "Sales tax",
        due: "Due tomorrow",
        dueDate: "Due Jun 20",
        period: "California, 1 May - 31 May 2025",
        overdue: null,
        previousPeriod: null,
        ammountDue: null,
      },
    },
    bankFeedAlerts: {
      AU: {
        stats: [
          { value: "2", label: "Major disruptions", color: "text-[#de0e40]" },
          {
            value: "1",
            label: "Upcoming planned outages",
            color: "text-content-secondary",
          },
        ],
        alerts: [
          {
            id: "1",
            title: "Credential errors",
            description: "Major - 3 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "credential" as const,
            clientCount: 3,
            clients: [
              "Incredible Rubber Car",
              "Hoppe Group",
              "Ferry, Kuphal and Schoen",
            ],
            clientDetails: [
              {
                name: "Incredible Rubber Car",
                phone: "09 000 0000",
                email: "contact@incrediblerubbercar.com",
                lastConnectedBy: "Lucy Chen",
              },
              {
                name: "Hoppe Group",
                phone: "09 111 1111",
                email: "info@hoppegroup.com",
                lastConnectedBy: "John Smith",
              },
              {
                name: "Ferry, Kuphal and Schoen",
                phone: "09 222 2222",
                email: "admin@fks.com",
                lastConnectedBy: "Sarah Johnson",
              },
            ],
          },
          {
            id: "2",
            title: "Coles MasterCard (Yodlee)",
            description: "Major - 13 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "major" as const,
            clientCount: 13,
            detailedDescription:
              "There is an issue with Coles MasterCard (Yodlee) bank feeds. We are currently investigating.",
            firstReported: "8/Oct",
          },
          {
            id: "3",
            title: "Maybank",
            description: "Planned: 12/10 14:30 - 8 clients",
            severity: "planned" as const,
            sentimentColor: "bg-[#fa8200]",
            type: "planned" as const,
            clientCount: 8,
            scheduledTime: "12/10 14:30 to 12/10 18:00",
            detailedDescription:
              "Planned maintenance for this bank feed is scheduled from 12/10 14:30 to 12/10 18:00. Transactions may be delayed, and new accounts from this bank feed may not be connected.",
          },
          {
            id: "4",
            title: "ANZ",
            description: "Resolved - 18 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 18,
            detailedDescription:
              "There was an issue with ANZ bank feed which may have stopped ANZ bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "7/Oct",
          },
          {
            id: "5",
            title: "Metro Financial",
            description: "Resolved - 7 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 7,
            detailedDescription:
              "There was an issue with Metro Financial bank feed which may have stopped Metro Financial bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "6/Oct",
          },
        ],
      },
      NZ: {
        stats: [
          { value: "2", label: "Major disruptions", color: "text-[#de0e40]" },
          {
            value: "1",
            label: "Upcoming planned outages",
            color: "text-content-secondary",
          },
        ],
        alerts: [
          {
            id: "1",
            title: "Credential errors",
            description: "Major - 3 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "credential" as const,
            clientCount: 3,
            clients: [
              "Incredible Rubber Car",
              "Hoppe Group",
              "Ferry, Kuphal and Schoen",
            ],
            clientDetails: [
              {
                name: "Incredible Rubber Car",
                phone: "09 000 0000",
                email: "contact@incrediblerubbercar.com",
                lastConnectedBy: "Lucy Chen",
              },
              {
                name: "Hoppe Group",
                phone: "09 111 1111",
                email: "info@hoppegroup.com",
                lastConnectedBy: "John Smith",
              },
              {
                name: "Ferry, Kuphal and Schoen",
                phone: "09 222 2222",
                email: "admin@fks.com",
                lastConnectedBy: "Sarah Johnson",
              },
            ],
          },
          {
            id: "2",
            title: "Westpac MasterCard",
            description: "Major - 13 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "major" as const,
            clientCount: 13,
            detailedDescription:
              "There is an issue with Westpac MasterCard bank feeds. We are currently investigating.",
            firstReported: "8/Oct",
          },
          {
            id: "3",
            title: "Cooperative Bank",
            description: "Planned: 12/12/2025 - 8 clients",
            severity: "planned" as const,
            sentimentColor: "bg-[#fa8200]",
            type: "planned" as const,
            clientCount: 8,
            scheduledTime: "12/12/2025 to 12/12/2025",
            detailedDescription:
              "Planned maintenance for this bank feed is scheduled. Transactions may be delayed, and new accounts from this bank feed may not be connected.",
          },
          {
            id: "4",
            title: "ANZ",
            description: "Resolved - 18 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 18,
            detailedDescription:
              "There was an issue with ANZ bank feed which may have stopped ANZ bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "7/Oct",
          },
          {
            id: "5",
            title: "Kiwibank",
            description: "Resolved - 7 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 7,
            detailedDescription:
              "There was an issue with Kiwibank bank feed which may have stopped Kiwibank bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "6/Oct",
          },
        ],
      },
      UK: {
        stats: [
          { value: "2", label: "Major disruptions", color: "text-[#de0e40]" },
          {
            value: "1",
            label: "Upcoming planned outages",
            color: "text-content-secondary",
          },
        ],
        alerts: [
          {
            id: "1",
            title: "Credential errors",
            description: "Major - 3 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "credential" as const,
            clientCount: 3,
            clients: [
              "Incredible Rubber Car",
              "Hoppe Group",
              "Ferry, Kuphal and Schoen",
            ],
            clientDetails: [
              {
                name: "Incredible Rubber Car",
                phone: "09 000 0000",
                email: "contact@incrediblerubbercar.com",
                lastConnectedBy: "Lucy Chen",
              },
              {
                name: "Hoppe Group",
                phone: "09 111 1111",
                email: "info@hoppegroup.com",
                lastConnectedBy: "John Smith",
              },
              {
                name: "Ferry, Kuphal and Schoen",
                phone: "09 222 2222",
                email: "admin@fks.com",
                lastConnectedBy: "Sarah Johnson",
              },
            ],
          },
          {
            id: "2",
            title: "Barclays MasterCard",
            description: "Major - 13 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "major" as const,
            clientCount: 13,
            detailedDescription:
              "There is an issue with Barclays MasterCard bank feeds. We are currently investigating.",
            firstReported: "8/Oct",
          },
          {
            id: "3",
            title: "HSBC",
            description: "Planned: 12/12/2025 - 8 clients",
            severity: "planned" as const,
            sentimentColor: "bg-[#fa8200]",
            type: "planned" as const,
            clientCount: 8,
            scheduledTime: "12/12/2025 to 12/12/2025",
            detailedDescription:
              "Planned maintenance for this bank feed is scheduled. Transactions may be delayed, and new accounts from this bank feed may not be connected.",
          },
          {
            id: "4",
            title: "Lloyds Bank",
            description: "Resolved - 18 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 18,
            detailedDescription:
              "There was an issue with Lloyds Bank bank feed which may have stopped Lloyds Bank bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "7/Oct",
          },
          {
            id: "5",
            title: "NatWest",
            description: "Resolved - 7 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 7,
            detailedDescription:
              "There was an issue with NatWest bank feed which may have stopped NatWest bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "6/Oct",
          },
        ],
      },
      USA: {
        stats: [
          { value: "2", label: "Major disruptions", color: "text-[#de0e40]" },
          {
            value: "1",
            label: "Upcoming planned outages",
            color: "text-content-secondary",
          },
        ],
        alerts: [
          {
            id: "1",
            title: "Credential errors",
            description: "Major - 3 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "credential" as const,
            clientCount: 3,
            clients: [
              "Incredible Rubber Car",
              "Hoppe Group",
              "Ferry, Kuphal and Schoen",
            ],
            clientDetails: [
              {
                name: "Incredible Rubber Car",
                phone: "09 000 0000",
                email: "contact@incrediblerubbercar.com",
                lastConnectedBy: "Lucy Chen",
              },
              {
                name: "Hoppe Group",
                phone: "09 111 1111",
                email: "info@hoppegroup.com",
                lastConnectedBy: "John Smith",
              },
              {
                name: "Ferry, Kuphal and Schoen",
                phone: "09 222 2222",
                email: "admin@fks.com",
                lastConnectedBy: "Sarah Johnson",
              },
            ],
          },
          {
            id: "2",
            title: "MasterCard (Yodlee)",
            description: "Major - 13 clients",
            severity: "major" as const,
            sentimentColor: "bg-[#de0e40]",
            type: "major" as const,
            clientCount: 13,
            detailedDescription:
              "There is an issue with MasterCard (Yodlee) bank feeds. We are currently investigating.",
            firstReported: "8/Oct",
          },
          {
            id: "3",
            title: "Wise",
            description: "Planned: 12/12/2025 - 8 clients",
            severity: "planned" as const,
            sentimentColor: "bg-[#fa8200]",
            type: "planned" as const,
            clientCount: 8,
            scheduledTime: "12/12/2025 to 12/12/2025",
            detailedDescription:
              "Planned maintenance for this bank feed is scheduled. Transactions may be delayed, and new accounts from this bank feed may not be connected.",
          },
          {
            id: "4",
            title: "HSBC",
            description: "Resolved - 18 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 18,
            detailedDescription:
              "There was an issue with HSBC bank feed which may have stopped HSBC bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "7/Oct",
          },
          {
            id: "5",
            title: "Eastern Financial",
            description: "Resolved - 7 clients",
            severity: "resolved" as const,
            sentimentColor: "bg-[#13a972]",
            type: "resolved" as const,
            clientCount: 7,
            detailedDescription:
              "There was an issue with Eastern Financial bank feed which may have stopped Eastern Financial bank feeds from being set up or receiving new transactions. This has now been resolved. We thank you for your patience during this time.",
            resolvedDate: "6/Oct",
          },
        ],
      },
    },
    watchlistOrganisations: {
      AU: [
        {
          name: "Ms. Ricky Daniel",
          lastStaffAccess: "1 min ago • Nina Batz",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Leslie Johns",
          lastStaffAccess: "3 mins ago • Faye Senger",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Kunde, Wintheiser and Schmitt",
          lastStaffAccess: "5 mins ago • Stephanie Gottlieb",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Luettgen and Sons",
          lastStaffAccess: "9 mins ago • Roman Bode",
          staffAccess: "6 staff",
          subscription: "Standard",
        },
        {
          name: "Kate Deckow",
          lastStaffAccess: "15 mins ago • Faye Senger",
          staffAccess: "2 staff",
          subscription: "Trial (ends in 2 days)",
        },
        {
          name: "Hegmann, McLaughlin and Bailey",
          lastStaffAccess: "47 mins ago • Roman Bode",
          staffAccess: "2 staff",
          subscription: "Starter",
        },
        {
          name: "Spencer, McGlynn and Hansen",
          lastStaffAccess: "1 hour ago • Jesse Kirlin",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Johanna Towne",
          lastStaffAccess: "2 hours ago • Roman Bode",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Sawayn, Schmitt and Zulauf",
          lastStaffAccess: "1 day ago • Nina Batz",
          staffAccess: "4 staff",
          subscription: "Standard",
        },
      ],
      NZ: [
        {
          name: "Ms. Ricky Daniel",
          lastStaffAccess: "1 min ago • Nina Batz",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Leslie Johns",
          lastStaffAccess: "3 mins ago • Faye Senger",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Kunde, Wintheiser and Schmitt",
          lastStaffAccess: "5 mins ago • Stephanie Gottlieb",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Luettgen and Sons",
          lastStaffAccess: "9 mins ago • Roman Bode",
          staffAccess: "6 staff",
          subscription: "Standard",
        },
        {
          name: "Kate Deckow",
          lastStaffAccess: "15 mins ago • Faye Senger",
          staffAccess: "2 staff",
          subscription: "Trial (ends in 2 days)",
        },
        {
          name: "Hegmann, McLaughlin and Bailey",
          lastStaffAccess: "47 mins ago • Roman Bode",
          staffAccess: "2 staff",
          subscription: "Starter",
        },
        {
          name: "Spencer, McGlynn and Hansen",
          lastStaffAccess: "1 hour ago • Jesse Kirlin",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Johanna Towne",
          lastStaffAccess: "2 hours ago • Roman Bode",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Sawayn, Schmitt and Zulauf",
          lastStaffAccess: "1 day ago • Nina Batz",
          staffAccess: "4 staff",
          subscription: "Standard",
        },
      ],
      UK: [
        {
          name: "Ms. Ricky Daniel",
          lastStaffAccess: "1 min ago • Nina Batz",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Leslie Johns",
          lastStaffAccess: "3 mins ago • Faye Senger",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Kunde, Wintheiser and Schmitt",
          lastStaffAccess: "5 mins ago • Stephanie Gottlieb",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Luettgen and Sons",
          lastStaffAccess: "9 mins ago • Roman Bode",
          staffAccess: "6 staff",
          subscription: "Standard",
        },
        {
          name: "Kate Deckow",
          lastStaffAccess: "15 mins ago • Faye Senger",
          staffAccess: "2 staff",
          subscription: "Trial (ends in 2 days)",
        },
        {
          name: "Hegmann, McLaughlin and Bailey",
          lastStaffAccess: "47 mins ago • Roman Bode",
          staffAccess: "2 staff",
          subscription: "Starter",
        },
        {
          name: "Spencer, McGlynn and Hansen",
          lastStaffAccess: "1 hour ago • Jesse Kirlin",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Johanna Towne",
          lastStaffAccess: "2 hours ago • Roman Bode",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Sawayn, Schmitt and Zulauf",
          lastStaffAccess: "1 day ago • Nina Batz",
          staffAccess: "4 staff",
          subscription: "Standard",
        },
      ],
      USA: [
        {
          name: "Ms. Ricky Daniel",
          lastStaffAccess: "1 min ago • Nina Batz",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Leslie Johns",
          lastStaffAccess: "3 mins ago • Faye Senger",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Kunde, Wintheiser and Schmitt",
          lastStaffAccess: "5 mins ago • Stephanie Gottlieb",
          staffAccess: "6 staff",
          subscription: "Premium",
        },
        {
          name: "Luettgen and Sons",
          lastStaffAccess: "9 mins ago • Roman Bode",
          staffAccess: "6 staff",
          subscription: "Standard",
        },
        {
          name: "Kate Deckow",
          lastStaffAccess: "15 mins ago • Faye Senger",
          staffAccess: "2 staff",
          subscription: "Trial (ends in 2 days)",
        },
        {
          name: "Hegmann, McLaughlin and Bailey",
          lastStaffAccess: "47 mins ago • Roman Bode",
          staffAccess: "2 staff",
          subscription: "Starter",
        },
        {
          name: "Spencer, McGlynn and Hansen",
          lastStaffAccess: "1 hour ago • Jesse Kirlin",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Johanna Towne",
          lastStaffAccess: "2 hours ago • Roman Bode",
          staffAccess: "4 staff",
          subscription: "Starter",
        },
        {
          name: "Sawayn, Schmitt and Zulauf",
          lastStaffAccess: "1 day ago • Nina Batz",
          staffAccess: "4 staff",
          subscription: "Standard",
        },
      ],
    },
    watchlistClients: {
      AU: [
        {
          name: "Wayne Enterprises",
          email: "contact@wayneenterprises.com",
          phone: "02 1234 5678",
          businessNumber: "ABN 12 345 678 901",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Premium",
          bankFeedExpiry: "22 Nov 2025",
          bankFeedDeprecation: "29 Nov 2025",
        },
        {
          name: "Stark Industries",
          email: "info@starkindustries.com",
          phone: "02 2345 6789",
          businessNumber: "ABN 23 456 789 012",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Standard",
          bankFeedExpiry: "01 Dec 2025",
          bankFeedDeprecation: "14 Dec 2025",
        },
        {
          name: "Gekko & Co",
          email: "support@geckoco.com",
          phone: "02 3456 7890",
          businessNumber: "ABN 34 567 890 123",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Basic",
          bankFeedExpiry: "19 Dec 2025",
          bankFeedDeprecation: "28 Dec 2025",
        },
        {
          name: "Dunder Mifflin",
          email: "hello@dundermifflin.com",
          phone: "02 4567 8901",
          businessNumber: "ABN 45 678 901 234",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Premium",
          bankFeedExpiry: "03 Jan 2026",
          bankFeedDeprecation: "11 Jan 2026",
        },
        {
          name: "Globex Corporation",
          email: "contact@globex.com",
          phone: "02 5678 9012",
          businessNumber: "ABN 56 789 012 345",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Standard",
          bankFeedExpiry: "21 Jan 2026",
          bankFeedDeprecation: "25 Jan 2026",
        },
        {
          name: "Initech",
          email: "support@initech.com",
          phone: "02 6789 0123",
          businessNumber: "ABN 67 890 123 456",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Basic",
          bankFeedExpiry: "14 Feb 2026",
          bankFeedDeprecation: "08 Feb 2026",
        },
        {
          name: "Cheers",
          email: "info@cheers.com",
          phone: "02 7890 1234",
          businessNumber: "ABN 78 901 234 567",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Premium",
          bankFeedExpiry: "28 Feb 2026",
          bankFeedDeprecation: "22 Feb 2026",
        },
        {
          name: "Krusty Krab",
          email: "hello@krustykrab.com",
          phone: "02 8901 2345",
          businessNumber: "ABN 89 012 345 678",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Standard",
          bankFeedExpiry: "10 Mar 2026",
          bankFeedDeprecation: "08 Mar 2026",
        },
        {
          name: "Los Pollos Hermanos",
          email: "contact@lospollos.com",
          phone: "02 9012 3456",
          businessNumber: "ABN 90 123 456 789",
          businessStructure: "Pty Ltd",
          financialYear: "1 Jul - 30 Jun",
          subscriptionType: "Basic",
          bankFeedExpiry: "22 Mar 2026",
          bankFeedDeprecation: "22 Mar 2026",
        },
      ],
      NZ: [
        {
          name: "Wayne Enterprises",
          email: "contact@wayneenterprises.com",
          phone: "09 1234 5678",
          businessNumber: "IRD 12-345-678",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Premium",
          bankFeedExpiry: "22 Nov 2025",
          bankFeedDeprecation: "29 Nov 2025",
        },
        {
          name: "Stark Industries",
          email: "info@starkindustries.com",
          phone: "09 2345 6789",
          businessNumber: "IRD 23-456-789",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Standard",
          bankFeedExpiry: "01 Dec 2025",
          bankFeedDeprecation: "14 Dec 2025",
        },
        {
          name: "Gekko & Co",
          email: "support@geckoco.com",
          phone: "09 3456 7890",
          businessNumber: "IRD 34-567-890",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Basic",
          bankFeedExpiry: "19 Dec 2025",
          bankFeedDeprecation: "28 Dec 2025",
        },
        {
          name: "Dunder Mifflin",
          email: "hello@dundermifflin.com",
          phone: "09 4567 8901",
          businessNumber: "IRD 45-678-901",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Premium",
          bankFeedExpiry: "03 Jan 2026",
          bankFeedDeprecation: "11 Jan 2026",
        },
        {
          name: "Globex Corporation",
          email: "contact@globex.com",
          phone: "09 5678 9012",
          businessNumber: "IRD 56-789-012",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Standard",
          bankFeedExpiry: "21 Jan 2026",
          bankFeedDeprecation: "25 Jan 2026",
        },
        {
          name: "Initech",
          email: "support@initech.com",
          phone: "09 6789 0123",
          businessNumber: "IRD 67-890-123",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Basic",
          bankFeedExpiry: "14 Feb 2026",
          bankFeedDeprecation: "08 Feb 2026",
        },
        {
          name: "Cheers",
          email: "info@cheers.com",
          phone: "09 7890 1234",
          businessNumber: "IRD 78-901-234",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Premium",
          bankFeedExpiry: "28 Feb 2026",
          bankFeedDeprecation: "22 Feb 2026",
        },
        {
          name: "Krusty Krab",
          email: "hello@krustykrab.com",
          phone: "09 8901 2345",
          businessNumber: "IRD 89-012-345",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Standard",
          bankFeedExpiry: "10 Mar 2026",
          bankFeedDeprecation: "08 Mar 2026",
        },
        {
          name: "Los Pollos Hermanos",
          email: "contact@lospollos.com",
          phone: "09 9012 3456",
          businessNumber: "IRD 90-123-456",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Basic",
          bankFeedExpiry: "22 Mar 2026",
          bankFeedDeprecation: "22 Mar 2026",
        },
      ],
      UK: [
        {
          name: "Wayne Enterprises",
          email: "contact@wayneenterprises.com",
          phone: "020 1234 5678",
          businessNumber: "12 345 678",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Premium",
          bankFeedExpiry: "22 Nov 2025",
          bankFeedDeprecation: "29 Nov 2025",
        },
        {
          name: "Stark Industries",
          email: "info@starkindustries.com",
          phone: "020 2345 6789",
          businessNumber: "23 456 789",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Standard",
          bankFeedExpiry: "01 Dec 2025",
          bankFeedDeprecation: "14 Dec 2025",
        },
        {
          name: "Gekko & Co",
          email: "support@geckoco.com",
          phone: "020 3456 7890",
          businessNumber: "34 567 890",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Basic",
          bankFeedExpiry: "19 Dec 2025",
          bankFeedDeprecation: "28 Dec 2025",
        },
        {
          name: "Dunder Mifflin",
          email: "hello@dundermifflin.com",
          phone: "020 4567 8901",
          businessNumber: "45 678 901",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Premium",
          bankFeedExpiry: "03 Jan 2026",
          bankFeedDeprecation: "11 Jan 2026",
        },
        {
          name: "Globex Corporation",
          email: "contact@globex.com",
          phone: "020 5678 9012",
          businessNumber: "56 789 012",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Standard",
          bankFeedExpiry: "21 Jan 2026",
          bankFeedDeprecation: "25 Jan 2026",
        },
        {
          name: "Initech",
          email: "support@initech.com",
          phone: "020 6789 0123",
          businessNumber: "67 890 123",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Basic",
          bankFeedExpiry: "14 Feb 2026",
          bankFeedDeprecation: "08 Feb 2026",
        },
        {
          name: "Cheers",
          email: "info@cheers.com",
          phone: "020 7890 1234",
          businessNumber: "78 901 234",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Premium",
          bankFeedExpiry: "28 Feb 2026",
          bankFeedDeprecation: "22 Feb 2026",
        },
        {
          name: "Krusty Krab",
          email: "hello@krustykrab.com",
          phone: "020 8901 2345",
          businessNumber: "89 012 345",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Standard",
          bankFeedExpiry: "10 Mar 2026",
          bankFeedDeprecation: "08 Mar 2026",
        },
        {
          name: "Los Pollos Hermanos",
          email: "contact@lospollos.com",
          phone: "020 9012 3456",
          businessNumber: "90 123 456",
          businessStructure: "Limited",
          financialYear: "1 Apr - 31 Mar",
          subscriptionType: "Basic",
          bankFeedExpiry: "22 Mar 2026",
          bankFeedDeprecation: "22 Mar 2026",
        },
      ],
      USA: [
        {
          name: "Wayne Enterprises",
          email: "contact@wayneenterprises.com",
          phone: "(202) 123-4567",
          businessNumber: "EIN 12-3456789",
          businessStructure: "Corporation",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Premium",
          bankFeedExpiry: "22 Nov 2025",
          bankFeedDeprecation: "29 Nov 2025",
        },
        {
          name: "Stark Industries",
          email: "info@starkindustries.com",
          phone: "(202) 234-5678",
          businessNumber: "EIN 23-4567890",
          businessStructure: "Corporation",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Standard",
          bankFeedExpiry: "01 Dec 2025",
          bankFeedDeprecation: "14 Dec 2025",
        },
        {
          name: "Gekko & Co",
          email: "support@geckoco.com",
          phone: "(202) 345-6789",
          businessNumber: "EIN 34-5678901",
          businessStructure: "LLC",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Basic",
          bankFeedExpiry: "19 Dec 2025",
          bankFeedDeprecation: "28 Dec 2025",
        },
        {
          name: "Dunder Mifflin",
          email: "hello@dundermifflin.com",
          phone: "(202) 456-7890",
          businessNumber: "EIN 45-6789012",
          businessStructure: "Corporation",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Premium",
          bankFeedExpiry: "03 Jan 2026",
          bankFeedDeprecation: "11 Jan 2026",
        },
        {
          name: "Globex Corporation",
          email: "contact@globex.com",
          phone: "(202) 567-8901",
          businessNumber: "EIN 56-7890123",
          businessStructure: "Corporation",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Standard",
          bankFeedExpiry: "21 Jan 2026",
          bankFeedDeprecation: "25 Jan 2026",
        },
        {
          name: "Initech",
          email: "support@initech.com",
          phone: "(202) 678-9012",
          businessNumber: "EIN 67-8901234",
          businessStructure: "LLC",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Basic",
          bankFeedExpiry: "14 Feb 2026",
          bankFeedDeprecation: "08 Feb 2026",
        },
        {
          name: "Cheers",
          email: "info@cheers.com",
          phone: "(202) 789-0123",
          businessNumber: "EIN 78-9012345",
          businessStructure: "Corporation",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Premium",
          bankFeedExpiry: "28 Feb 2026",
          bankFeedDeprecation: "22 Feb 2026",
        },
        {
          name: "Krusty Krab",
          email: "hello@krustykrab.com",
          phone: "(202) 890-1234",
          businessNumber: "EIN 89-0123456",
          businessStructure: "LLC",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Standard",
          bankFeedExpiry: "10 Mar 2026",
          bankFeedDeprecation: "08 Mar 2026",
        },
        {
          name: "Los Pollos Hermanos",
          email: "contact@lospollos.com",
          phone: "(202) 901-2345",
          businessNumber: "EIN 90-1234567",
          businessStructure: "LLC",
          financialYear: "1 Jan - 31 Dec",
          subscriptionType: "Basic",
          bankFeedExpiry: "22 Mar 2026",
          bankFeedDeprecation: "22 Mar 2026",
        },
      ],
    },
    xeroUpdates: {
      UK: [
        {
          title: "Introducing Just Ask Xero",
          dateDaysFromToday: -2,
          description:
            "Your AI business companion that does your busywork, freeing you to do what you do best.",
        },
        {
          title: "Xero Payroll Manager",
          dateDaysFromToday: -1,
          description:
            "Easier, faster, smarter - all your Xero clients' payroll all in one place",
        },
      ],
      USA: [
        {
          title: "Xero Payroll Manager",
          dateDaysFromToday: -2,
          description:
            "Easier, faster, smarter - all your Xero clients' payroll all in one place",
        },
      ],
      NZ: [
        {
          title: "Xero Payroll Manager",
          dateDaysFromToday: -2,
          description:
            "Easier, faster, smarter - all your Xero clients' payroll all in one place",
        },
      ],
      AU: [
        {
          title: "Xero Payroll Manager",
          dateDaysFromToday: -2,
          description:
            "Easier, faster, smarter - all your Xero clients' payroll all in one place",
        },
      ],
    },
  },

  // Navigation structure with region-specific variations
  navigation: {
    // Define the base navigation structure that applies to all regions
    base: {
      clients: {
        label: "Clients",
      },
      insights: {
        label: "Insights",
      },
      jobs: {
        label: "Jobs",
        items: [
          {
            id: "job-manager",
            type: "link",
            label: "Job manager",
          },
          {
            id: "tasks",
            type: "link",
            label: "Tasks",
          },
          {
            id: "collaboration-manager",
            type: "link",
            label: "Collaboration manager",
          },
          {
            id: "job-schedule",
            type: "link",
            label: "Job schedule",
          },
          {
            id: "staff-schedule",
            type: "link",
            label: "Staff schedule",
          },
        ],
      },
      workpapers: {
        label: "Workpapers",
        href: "/workpapers",
      },
      tax: {
        label: "Tax",
      },
      practice: {
        label: "Practice",
        items: [
          {
            id: "staff",
            type: "link",
            label: "Staff",
          },
          {
            id: "timesheets",
            type: "link",
            label: "Timesheets",
          },
          { id: "separator-1", type: "separator" },
          {
            id: "queries",
            type: "link",
            label: "Queries",
          },
          {
            id: "document-packs",
            type: "link",
            label: "Document packs",
          },
          { id: "separator-2", type: "separator" },
          {
            id: "quotes",
            type: "link",
            label: "Quotes",
          },
          {
            id: "invoices",
            type: "link",
            label: "Invoices",
          },
          {
            id: "work-in-progress",
            type: "link",
            label: "Work in progress",
          },
          { id: "separator-3", type: "separator" },
          {
            id: "chart-of-accounts-templates",
            type: "link",
            label: "Chart of accounts templates",
          },
          {
            id: "client-report-templates",
            type: "link",
            label: "Client report templates",
          },
        ],
      },
      reports: {
        label: "Reports",
        items: [
          {
            id: "practice-reports",
            type: "link",
            label: "Practice reports",
            href: "#",
          },
          {
            id: "report-builder",
            type: "link",
            label: "Report builder",
            href: "/reports/report-builder",
          },
        ],
      },
    },

    // Region-specific overrides
    overrides: {
      // UK-specific navigation changes
      UK: {
        payroll: {
          label: "Payroll",
        },
        tax: {
          label: "Tax",
          items: [
            {
              id: "tax-manager",
              type: "link",
              label: "Tax manager",
            },
            { id: "separator-3", type: "separator" },
            {
              id: "company-accounts-and-tax",
              type: "link",
              label: "Company accounts and tax",
            },
            {
              id: "sole-trader-accounts",
              type: "link",
              label: "Sole trader accounts",
            },
            {
              id: "sole-trader-accounts",
              type: "link",
              label: "Partnership tax",
            },
            {
              id: "personal-tax",
              type: "link",
              label: "Personal tax",
            },
            {
              id: "vat",
              type: "link",
              label: "VAT",
            },
            {
              id: "separator-4",
              type: "separator",
            },
            {
              id: "government-gateway-ids",
              type: "link",
              label: "Government Gateway IDs",
            },
          ],
        },
      },

      // USA-specific navigation changes
      USA: {
        // Explicitly exclude sections that should not appear in USA
        tax: null,
      },

      // New Zealand-specific navigation changes
      NZ: {
        tax: {
          label: "Tax",
          items: [
            {
              id: "returns",
              type: "link",
              label: "Returns",
              href: "/tax/all-returns",
            },
            {
              id: "statements",
              type: "link",
              label: "Statements",
              href: "/tax/statements",
            },
            {
              id: "payments",
              type: "link",
              label: "Payments",
              href: "#",
            },
          ],
        },
      },
    },
  },
};

// Helper function to get bank account data for a specific region
export function getBankAccountData(accountKey: string, region: string) {
  return getRegionContent("bankAccounts", accountKey, region);
}

export function getChartOfAccountsData(accountKey: string, region: string) {
  return getRegionContent("chartOfAccounts", accountKey, region);
}

// Helper function to get content for a specific region
export function getRegionContent(key: string, subKey: string, region: string) {
  // @ts-expect-error - Dynamic access
  const content = regionContent[key]?.[subKey];
  if (!content) return null;

  return content[region] || content.USA; // Fallback to USA if region not found
}

// Helper function to check if a feature is enabled for a region
export function isFeatureEnabled(featureName: string, region: string) {
  return !!getRegionContent("features", featureName, region);
}

// Helper function to get navigation for a specific region
export function getRegionNavigation(region: string) {
  const baseNavigation = regionContent.navigation.base;
  const regionOverrides =
    regionContent.navigation.overrides[
      region as keyof typeof regionContent.navigation.overrides
    ] || {};

  // Deep merge the base navigation with region-specific overrides
  const mergedNavigation = { ...baseNavigation };

  // Apply region-specific overrides
  Object.keys(regionOverrides).forEach((sectionKey) => {
    const overrideValue = (regionOverrides as Record<string, unknown>)[
      sectionKey
    ];

    // If override value is null, remove the section entirely
    if (overrideValue === null) {
      delete (mergedNavigation as Record<string, unknown>)[sectionKey];
      return;
    }

    if (!mergedNavigation[sectionKey as keyof typeof mergedNavigation]) {
      (mergedNavigation as Record<string, unknown>)[sectionKey] = overrideValue;
    } else {
      // Merge section properties
      (mergedNavigation as Record<string, unknown>)[sectionKey] = {
        ...mergedNavigation[sectionKey as keyof typeof mergedNavigation],
        ...regionOverrides[sectionKey as keyof typeof regionOverrides],
      };

      // If there are item overrides, handle them specially
      const sectionOverride =
        regionOverrides[sectionKey as keyof typeof regionOverrides];
      if (
        sectionOverride &&
        typeof sectionOverride === "object" &&
        "items" in sectionOverride
      ) {
        const currentSection =
          mergedNavigation[sectionKey as keyof typeof mergedNavigation];
        // Get existing items or empty array, then cast to any[] to allow dynamic merging
        const baseItems = ((currentSection && "items" in currentSection
          ? currentSection.items
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            []) || []) as any[];
        const overrideItems = sectionOverride.items;

        // For each override item, either add it or replace an existing one
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        overrideItems.forEach((overrideItem: any) => {
          const existingItemIndex = baseItems.findIndex(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => item.id === overrideItem.id
          );

          if (existingItemIndex >= 0) {
            // Replace existing item
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            baseItems[existingItemIndex] = overrideItem as any;
          } else {
            // Add new item
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            baseItems.push(overrideItem as any);
          }
        });

        // Update the section with the merged items
        (mergedNavigation as Record<string, unknown>)[sectionKey] = {
          ...mergedNavigation[sectionKey as keyof typeof mergedNavigation],
          items: baseItems,
        };
      }
    }
  });

  // Define the desired section order for each region
  const sectionOrder: Record<string, string[]> = {
    UK: [
      "clients",
      "insights",
      "jobs",
      "workpapers",
      "tax",
      "payroll",
      "reports",
      "practice",
    ],
    USA: [
      "clients",
      "insights",
      "jobs",
      "workpapers",
      "tax",
      "reports",
      "practice",
    ],
    NZ: [
      "clients",
      "insights",
      "jobs",
      "workpapers",
      "tax",
      "reports",
      "practice",
    ],
    AU: [
      "clients",
      "insights",
      "jobs",
      "workpapers",
      "tax",
      "reports",
      "practice",
    ],
  };

  // Get the order for this region, fallback to default order
  const order = sectionOrder[region] || [
    "clients",
    "insights",
    "jobs",
    "workpapers",
    "tax",
    "reports",
    "practice",
  ];

  // Reorder the merged navigation according to the defined order
  const orderedNavigation: Record<
    string,
    (typeof mergedNavigation)[keyof typeof mergedNavigation]
  > = {};

  order.forEach((key) => {
    const section = mergedNavigation[key as keyof typeof mergedNavigation];
    if (section) {
      orderedNavigation[key] = section;
    }
  });

  // Add any sections that weren't in the order list (shouldn't happen, but safety measure)
  Object.keys(mergedNavigation).forEach((key) => {
    if (!orderedNavigation[key]) {
      const section = mergedNavigation[key as keyof typeof mergedNavigation];
      if (section) {
        orderedNavigation[key] = section;
      }
    }
  });

  return orderedNavigation;
}
