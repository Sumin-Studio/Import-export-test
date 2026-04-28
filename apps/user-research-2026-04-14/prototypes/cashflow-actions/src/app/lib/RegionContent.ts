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

// Region-specific content configuration
export const regionContent = {
  // Text variations by region
  text: {
    loggedIn: {
      UK: "1 hour ago from UK",
      USA: "1 hour ago from USA",
      CA: "1 hour ago from Canada",
      NZ: "1 hour ago from New Zealand",
      AU: "1 hour ago from Australia",
    },
    netProfitLoss: {
      AU: {
        netProfitLoss: "800,000.00",
        income: "1,640,000.00",
        thisFinancialYear: "1 Jul 2024 - 17 May 2025",
        lastFinancialYear: "1 Jul 2023 - 17 May 2024",
        expense: "840,000.00",
      },
      NZ: {
        netProfitLoss: "200,000.00",
        income: "410,000.00",
        thisFinancialYear: "1 Apr 2024 - 17 Jun 2025",
        lastFinancialYear: "1 Apr 2023 - 17 Jun 2024",
        expense: "210,000.00",
      },
      CA: {
        netProfitLoss: "400,000.00",
        income: "820,000.00",
        thisFinancialYear: "1 Jan 2024 - 17 Jun 2025",
        lastFinancialYear: "1 Jan 2023 - 17 Jun 2024",
        expense: "420,000.00",
      },
      UK: {
        netProfitLoss: "200,000.00",
        income: "410,000.00",
        thisFinancialYear: "1 Apr 2024 - 17 Jun 2025",
        lastFinancialYear: "1 Apr 2023 - 17 Jun 2024",
        expense: "210,000.00",
      },
      USA: {
        netProfitLoss: "400,000.00",
        income: "820,000.00",
        thisFinancialYear: "1 Jan 2024 - 17 Jun 2025",
        lastFinancialYear: "1 Jan 2023 - 17 Jun 2024",
        expense: "420,000.00",
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
      CA: {
        type: "Sales tax",
        due: "Due tomorrow",
        dueDate: "Due Jun 20",
        period: "California, 1 May - 31 May 2025",
        overdue: null,
        previousPeriod: null,
        ammountDue: null,
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
  },

  chartOfAccounts: {
    sales: {
      UK: {
        accountNumber: null,
        budget: "20,000.00",
        thisMonth: "19,000.00",
        ytd: "406,235.00",
      },
      USA: {
        accountNumber: "400",
        budget: "30,000.00",
        thisMonth: "42,000.00",
        ytd: "812,470.00",
      },
      CA: {
        accountNumber: "200",
        budget: "30,000.00",
        thisMonth: "42,000.00",
        ytd: "812,470.00",
      },
      NZ: {
        accountNumber: null,
        budget: "20,000.00",
        thisMonth: "19,000.00",
        ytd: "406,235.00",
      },
      AU: {
        accountNumber: "200",
        budget: "30,000.00",
        thisMonth: "42,000.00",
        ytd: "1,624,940.00",
      },
    },
    other: {
      UK: {
        accountNumber: "260",
        budget: "1,000.00",
        thisMonth: "1,500.00",
        ytd: "3,750.00",
      },
      USA: {
        accountNumber: "460",
        budget: "1,000.00",
        thisMonth: "1,500.00",
        ytd: "7,500.00",
      },
      CA: {
        accountNumber: "260",
        budget: "1,000.00",
        thisMonth: "1,500.00",
        ytd: "7,500.00",
      },
      NZ: {
        accountNumber: "260",
        budget: "1,000.00",
        thisMonth: "1,500.00",
        ytd: "3,750.00",
      },
      AU: {
        accountNumber: "260",
        budget: "1,000.00",
        thisMonth: "1,500.00",
        ytd: "15,000.00",
      },
    },
    interest: {
      UK: {
        accountNumber: "270",
        budget: "5.00",
        thisMonth: "5.50",
        ytd: "15.00",
      },
      USA: {
        accountNumber: "470",
        budget: "5.00",
        thisMonth: "5.50",
        ytd: "30.00",
      },
      CA: {
        accountNumber: "270",
        budget: "5.00",
        thisMonth: "5.50",
        ytd: "30.00",
      },
      NZ: {
        accountNumber: "270",
        budget: "5.00",
        thisMonth: "5.50",
        ytd: "15.00",
      },
      AU: {
        accountNumber: "270",
        budget: "5.00",
        thisMonth: "5.50",
        ytd: "60.00",
      },
    },
    purchases: {
      UK: {
        accountNumber: "300",
        budget: "75,000.00",
        thisMonth: "30,090.00",
        ytd: "90,270.00",
      },
      USA: {
        accountNumber: "330",
        budget: "75,000.00",
        thisMonth: "30,090.00",
        ytd: "180,540.00",
      },
      CA: {
        accountNumber: "300",
        budget: "75,000.00",
        thisMonth: "30,090.00",
        ytd: "180,540.00",
      },
      NZ: {
        accountNumber: "300",
        budget: "75,000.00",
        thisMonth: "30,090.00",
        ytd: "90,270.00",
      },
      AU: {
        accountNumber: "300",
        budget: "75,000.00",
        thisMonth: "30,090.00",
        ytd: "361,080.00",
      },
    },
    consulting: {
      UK: {
        accountNumber: "412",
        budget: "400.00",
        thisMonth: "400.00",
        ytd: "2,400.00",
      },
      USA: {
        accountNumber: "612",
        budget: "400.00",
        thisMonth: "400.00",
        ytd: "2,400.00",
      },
      CA: {
        accountNumber: "412",
        budget: "400.00",
        thisMonth: "400.00",
        ytd: "1,200.00",
      },
      NZ: {
        accountNumber: "412",
        budget: "400.00",
        thisMonth: "400.00",
        ytd: "1,200.00",
      },
      AU: {
        accountNumber: "412",
        budget: "400.00",
        thisMonth: "400.00",
        ytd: "4,800.00",
      },
    },
    depreciation: {
      UK: {
        accountNumber: "416",
        budget: "1,200.00",
        thisMonth: "1,100.00",
        ytd: "3,300.00",
      },
      USA: {
        accountNumber: "700",
        budget: "1,200.00",
        thisMonth: "1,100.00",
        ytd: "6,600.00",
      },
      CA: {
        accountNumber: "416",
        budget: "1,200.00",
        thisMonth: "1,100.00",
        ytd: "6,600.00",
      },
      NZ: {
        accountNumber: "416",
        budget: "1,200.00",
        thisMonth: "1,100.00",
        ytd: "3,300.00",
      },
      AU: {
        accountNumber: "416",
        budget: "1,200.00",
        thisMonth: "1,100.00",
        ytd: "13,200.00",
      },
    },
    office: {
      UK: {
        accountNumber: "453",
        budget: "450.00",
        thisMonth: "400.00",
        ytd: "1,200.00",
      },
      USA: {
        accountNumber: "652",
        budget: "450.00",
        thisMonth: "400.00",
        ytd: "2,400.00",
      },
      CA: {
        accountNumber: "453",
        budget: "450.00",
        thisMonth: "400.00",
        ytd: "2,400.00",
      },
      NZ: {
        accountNumber: "453",
        budget: "450.00",
        thisMonth: "400.00",
        ytd: "1,200.00",
      },
      AU: {
        accountNumber: "453",
        budget: "450.00",
        thisMonth: "400.00",
        ytd: "4,800.00",
      },
    },
    bank: {
      UK: {
        accountNumber: "416",
        budget: "10.00",
        thisMonth: "10.00",
        ytd: "30.00",
      },
      USA: {
        accountNumber: "604",
        budget: "10.00",
        thisMonth: "10.00",
        ytd: "60.00",
      },
      CA: {
        accountNumber: "416",
        budget: "10.00",
        thisMonth: "10.00",
        ytd: "60.00",
      },
      NZ: {
        accountNumber: "416",
        budget: "10.00",
        thisMonth: "10.00",
        ytd: "30.00",
      },
      AU: {
        accountNumber: "416",
        budget: "10.00",
        thisMonth: "10.00",
        ytd: "120.00",
      },
    },
    inventory: {
      UK: {
        accountNumber: "510",
        budget: "40,000.00",
        thisMonth: "38,000.00",
        ytd: "114,000.00",
      },
      USA: {
        accountNumber: "140",
        budget: "40,000.00",
        thisMonth: "38,000.00",
        ytd: "228,000.00",
      },
      CA: {
        accountNumber: "510",
        budget: "40,000.00",
        thisMonth: "38,000.00",
        ytd: "228,000.00",
      },
      NZ: {
        accountNumber: "510",
        budget: "40,000.00",
        thisMonth: "38,000.00",
        ytd: "114,000.00",
      },
      AU: {
        accountNumber: "510",
        budget: "40,000.00",
        thisMonth: "38,000.00",
        ytd: "456,000.00",
      },
    },
    expensesToReview: {
      UK: {
        totalToReview: "23,769.57",
        countToReview: "24",
        totalToPay: "19,449.01",
        countToPay: "21",
        expenses: [
          {
            initials: "JV",
            color: "#80BCE4",
            name: "Jai Vishal",
            expenses: "4",
            amount: "12,541.89",
          },
          {
            initials: "SZ",
            color: "#E5A853",
            name: "Samuel Zanokuhle",
            expenses: "3",
            amount: "876.32",
          },
          {
            initials: "SS",
            color: "#F4B8D4",
            name: "Stella Svenja",
            expenses: "5",
            amount: "3,105.67",
          },
          {
            initials: "DC",
            color: "#F5D76E",
            name: "Dylan Cooper",
            expenses: "2",
            amount: "1,235.56",
          },
          {
            initials: "EM",
            color: "#C89BD9",
            name: "Elisa Mendez",
            expenses: "4",
            amount: "4,568.23",
          },
          {
            initials: "SR",
            color: "#B894D1",
            name: "Stephanie Roberts",
            expenses: "2",
            amount: "789.45",
          },
        ],
        othersCount: "4",
        othersExpenses: "4",
        othersAmount: "652.45",
      },
      USA: {
        totalToReview: "27,535.14",
        countToReview: "48",
        totalToPay: "38,898.02",
        countToPay: "42",
        expenses: [
          {
            initials: "JV",
            color: "#80BCE4",
            name: "Jai Vishal",
            expenses: "8",
            amount: "25,083.78",
          },
          {
            initials: "SZ",
            color: "#E5A853",
            name: "Samuel Zanokuhle",
            expenses: "6",
            amount: "1,752.64",
          },
          {
            initials: "SS",
            color: "#F4B8D4",
            name: "Stella Svenja",
            expenses: "10",
            amount: "6,211.34",
          },
          {
            initials: "DC",
            color: "#F5D76E",
            name: "Dylan Cooper",
            expenses: "4",
            amount: "2,471.12",
          },
          {
            initials: "EM",
            color: "#C89BD9",
            name: "Elisa Mendez",
            expenses: "8",
            amount: "9,136.46",
          },
          {
            initials: "SR",
            color: "#B894D1",
            name: "Stephanie Roberts",
            expenses: "4",
            amount: "1,578.90",
          },
        ],
        othersCount: "8",
        othersExpenses: "8",
        othersAmount: "1,304.90",
      },
      CA: {
        totalToReview: "20,651.36",
        countToReview: "36",
        totalToPay: "29,173.51",
        countToPay: "32",
        expenses: [
          {
            initials: "JV",
            color: "#80BCE4",
            name: "Jai Vishal",
            expenses: "6",
            amount: "18,812.84",
          },
          {
            initials: "SZ",
            color: "#E5A853",
            name: "Samuel Zanokuhle",
            expenses: "5",
            amount: "1,314.48",
          },
          {
            initials: "SS",
            color: "#F4B8D4",
            name: "Stella Svenja",
            expenses: "8",
            amount: "4,658.51",
          },
          {
            initials: "DC",
            color: "#F5D76E",
            name: "Dylan Cooper",
            expenses: "3",
            amount: "1,853.34",
          },
          {
            initials: "EM",
            color: "#C89BD9",
            name: "Elisa Mendez",
            expenses: "6",
            amount: "6,852.35",
          },
          {
            initials: "SR",
            color: "#B894D1",
            name: "Stephanie Roberts",
            expenses: "3",
            amount: "1,184.18",
          },
        ],
        othersCount: "6",
        othersExpenses: "6",
        othersAmount: "978.68",
      },
      NZ: {
        totalToReview: "13,767.57",
        countToReview: "24",
        totalToPay: "19,449.01",
        countToPay: "21",
        expenses: [
          {
            initials: "JV",
            color: "#80BCE4",
            name: "Jai Vishal",
            expenses: "4",
            amount: "12,541.89",
          },
          {
            initials: "SZ",
            color: "#E5A853",
            name: "Samuel Zanokuhle",
            expenses: "3",
            amount: "876.32",
          },
          {
            initials: "SS",
            color: "#F4B8D4",
            name: "Stella Svenja",
            expenses: "5",
            amount: "3,105.67",
          },
          {
            initials: "DC",
            color: "#F5D76E",
            name: "Dylan Cooper",
            expenses: "2",
            amount: "1,235.56",
          },
          {
            initials: "EM",
            color: "#C89BD9",
            name: "Elisa Mendez",
            expenses: "4",
            amount: "4,568.23",
          },
          {
            initials: "SR",
            color: "#B894D1",
            name: "Stephanie Roberts",
            expenses: "2",
            amount: "789.45",
          },
        ],
        othersCount: "4",
        othersExpenses: "4",
        othersAmount: "652.45",
      },
      AU: {
        totalToReview: "55,070.28",
        countToReview: "96",
        totalToPay: "77,796.04",
        countToPay: "84",
        expenses: [
          {
            initials: "JV",
            color: "#80BCE4",
            name: "Jai Vishal",
            expenses: "16",
            amount: "50,167.56",
          },
          {
            initials: "SZ",
            color: "#E5A853",
            name: "Samuel Zanokuhle",
            expenses: "12",
            amount: "3,505.28",
          },
          {
            initials: "SS",
            color: "#F4B8D4",
            name: "Stella Svenja",
            expenses: "20",
            amount: "12,422.68",
          },
          {
            initials: "DC",
            color: "#F5D76E",
            name: "Dylan Cooper",
            expenses: "8",
            amount: "4,942.24",
          },
          {
            initials: "EM",
            color: "#C89BD9",
            name: "Elisa Mendez",
            expenses: "16",
            amount: "18,272.92",
          },
          {
            initials: "SR",
            color: "#B894D1",
            name: "Stephanie Roberts",
            expenses: "8",
            amount: "3,157.80",
          },
        ],
        othersCount: "16",
        othersExpenses: "16",
        othersAmount: "2,609.80",
      },
    },
  },

  // Bank account data by region
  bankAccounts: {
    everydaySavings: {
      UK: {
        accountName: "Barclays Everyday Savings",
        accountNumber: "123456-12345678",
        balanceInXero: "14,763.22",
        items: "20",
        mismatch: "623.11",
        statementBalance: "14,140.11",
        statementBalanceDate: "17 Jun",
      },
      USA: {
        accountName: "Chase Bank Everyday Savings",
        accountNumber: "123456789-0123456789",
        balanceInXero: "14,763.22",
        items: "20",
        mismatch: "623.11",
        statementBalance: "14,140.11",
        statementBalanceDate: "17 Jun",
      },
      CA: {
        accountName: "Chase Bank Everyday Savings",
        accountNumber: "123456789-0123456789",
        balanceInXero: "14,763.22",
        items: "20",
        mismatch: "623.11",
        statementBalance: "14,140.11",
        statementBalanceDate: "17 Jun",
      },
      NZ: {
        accountName: "ANZ Everyday Savings",
        accountNumber: "123456-12345678",
        balanceInXero: "14,763.22",
        items: "20",
        mismatch: "623.11",
        statementBalance: "14,140.11",
        statementBalanceDate: "17 Jun",
      },
      AU: {
        accountName: "ANZ Everyday Savings",
        accountNumber: "123456-12345678",
        balanceInXero: "14,763.22",
        items: "20",
        mismatch: "623.11",
        statementBalance: "14,140.11",
        statementBalanceDate: "17 Jun",
      },
    },
    businessTransaction: {
      UK: {
        accountName: "Business Transaction",
        accountNumber: "20-12-34-87654321",
        balanceInXero: "1,241.32",
        items: "0",
        mismatch: "0.00",
        statementBalance: "1,241.32",
        statementBalanceDate: "17 Jun",
      },
      USA: {
        accountName: "Business Transaction",
        accountNumber: "01-7061-6666412-01",
        balanceInXero: "1,241.32",
        items: "0",
        mismatch: "0.00",
        statementBalance: "1,241.32",
        statementBalanceDate: "17 Jun",
      },
      CA: {
        accountName: "Business Transaction",
        accountNumber: "987-65432-10",
        balanceInXero: "1,241.32",
        items: "0",
        mismatch: "0.00",
        statementBalance: "1,241.32",
        statementBalanceDate: "17 Jun",
      },
      NZ: {
        accountName: "Business Transaction",
        accountNumber: "01-7061-6666412-01",
        balanceInXero: "1,241.32",
        items: "0",
        mismatch: "0.00",
        statementBalance: "1,241.32",
        statementBalanceDate: "17 Jun",
      },
      AU: {
        accountName: "Business Transaction",
        accountNumber: "01-7061-6666412-01",
        balanceInXero: "1,241.32",
        items: "0",
        mismatch: "0.00",
        statementBalance: "1,241.32",
        statementBalanceDate: "17 Jun",
      },
    },
    xeroCard: {
      UK: {
        accountName: "Xero Card",
        accountNumber: "**** 4728",
        balanceInXero: "847.29",
        items: "0",
        mismatch: "0.00",
        statementBalance: "847.29",
        statementBalanceDate: "17 Jun",
      },
      USA: {
        accountName: "Xero Card",
        accountNumber: "**** 4728",
        balanceInXero: "847.29",
        items: "0",
        mismatch: "0.00",
        statementBalance: "847.29",
        statementBalanceDate: "17 Jun",
      },
      CA: {
        accountName: "Xero Card",
        accountNumber: "**** 4728",
        balanceInXero: "847.29",
        items: "0",
        mismatch: "0.00",
        statementBalance: "847.29",
        statementBalanceDate: "17 Jun",
      },
      NZ: {
        accountName: "Xero Card",
        accountNumber: "**** 4728",
        balanceInXero: "847.29",
        items: "0",
        mismatch: "0.00",
        statementBalance: "847.29",
        statementBalanceDate: "17 Jun",
      },
      AU: {
        accountName: "Xero Card",
        accountNumber: "**** 4728",
        balanceInXero: "847.29",
        items: "0",
        mismatch: "0.00",
        statementBalance: "847.29",
        statementBalanceDate: "17 Jun",
      },
    },
  },

  // Navigation structure with region-specific variations
  navigation: {
    // Define the base navigation structure that applies to all regions
    base: {
      sales: {
        label: "Sales",
        items: [
          {
            id: "sales-overview",
            type: "link",
            label: "Sales overview",
          },
          {
            id: "invoices",
            type: "link",
            label: "Invoices",
          },
          {
            id: "progress-payments",
            type: "link",
            label: "Progress payments",
          },
          {
            id: "payment-links",
            type: "link",
            label: "Payment links",
          },
          {
            id: "online-payments",
            type: "link",
            label: "Online payments",
          },
          {
            id: "quotes",
            type: "link",
            label: "Quotes",
          },
          {
            id: "products-and-services",
            type: "link",
            label: "Products and services",
          },
          {
            id: "customers",
            type: "link",
            label: "Customers",
          },
          { id: "separator-2", type: "separator" },
          {
            id: "sales-settings",
            type: "link",
            label: "Sales settings",
            hasSettingsIcon: true,
          },
        ],
      },
      purchases: {
        label: "Purchases",
        items: [
          {
            id: "purchases-overview",
            type: "link",
            label: "Purchases overview",
            href: "/purchases-overview",
          },
          {
            id: "bills",
            type: "link",
            label: "Bills",
            href: "/bills",
          },
          {
            id: "cards",
            type: "link",
            label: "Cards",
            href: "/accounts",
          },
          {
            id: "purchase-orders",
            type: "link",
            label: "Purchase orders",
          },
          {
            id: "expenses",
            type: "link",
            label: "Expenses",
            href: "/purchases/expenses",
          },
          {
            id: "suppliers",
            type: "link",
            label: "Suppliers",
          },
          { id: "separator-3", type: "separator" },
          {
            id: "purchases-settings",
            type: "link",
            label: "Purchases settings",
            hasSettingsIcon: true,
          },
        ],
      },
      reporting: {
        label: "Reporting",
        items: [
          {
            id: "all-reports",
            type: "link",
            label: "All reports",
          },
          { id: "separator-498", type: "separator" },
          {
            id: "analytics-by-syft",
            type: "title",
            label: "Analytics powered by Syft",
          },
          {
            id: "visualisations",
            type: "link",
            label: "Visualisations",
            hasExternalLinkIcon: true,
          },
          {
            id: "dashboards",
            type: "link",
            label: "Dashboards",
            hasExternalLinkIcon: true,
          },
          {
            id: "cash-flow-manager",
            type: "link",
            label: "Cash flow manager",
            hasExternalLinkIcon: true,
          },
          { id: "separator-4", type: "separator" },
          {
            id: "analytics",
            type: "title",
            label: "Analytics",
          },
          {
            id: "short-term-cash-flow",
            type: "link",
            label: "Short-term cash flow",
          },
          {
            id: "business-snapshot",
            type: "link",
            label: "Business snapshot",
          },
          { id: "separator-5", type: "separator" },
          {
            id: "favourite-reports",
            type: "title",
            label: "Favourite reports",
            hasStarIcon: true,
          },
          {
            id: "account-transactions",
            type: "link",
            label: "Account Transactions",
          },
          {
            id: "aged-payables-summary",
            type: "link",
            label: "Aged Payables Summary",
          },
          {
            id: "aged-receivables-summary",
            type: "link",
            label: "Aged Receivables Summary",
          },
          {
            id: "balance-sheet",
            type: "link",
            label: "Balance Sheet",
          },
          {
            id: "profit-and-loss",
            type: "link",
            label: "Profit and Loss",
          },
          { id: "separator-6", type: "separator" },
          {
            id: "reporting-settings",
            type: "link",
            label: "Reporting settings",
            hasSettingsIcon: true,
          },
        ],
      },
      payroll: {
        label: "Payroll",
        items: [
          {
            id: "payroll-overview",
            type: "link",
            label: "Payroll overview",
          },
          { id: "separator-7", type: "separator" },
          {
            id: "employee-management",
            type: "title",
            label: "Employee management",
          },
          {
            id: "employees",
            type: "link",
            label: "Employees",
          },
          {
            id: "leave",
            type: "link",
            label: "Leave",
          },
          {
            id: "timesheets",
            type: "link",
            label: "Timesheets",
          },
          {
            id: "rostering",
            type: "link",
            label: "Rostering",
          },
          { id: "separator-8", type: "separator" },
          {
            id: "payroll-processing",
            type: "title",
            label: "Payroll processing",
          },
          {
            id: "pay-employees",
            type: "link",
            label: "Pay employees",
          },
          {
            id: "superannuation",
            type: "link",
            label: "Superannuation",
          },
          {
            id: "single-touch-payroll",
            type: "link",
            label: "Single Touch Payroll",
          },
          { id: "separator-82", type: "separator" },
          {
            id: "administration",
            type: "title",
            label: "Administration",
          },
          {
            id: "payroll-history",
            type: "link",
            label: "Payroll history",
          },
          { id: "separator-9", type: "separator" },
          {
            id: "payroll-settings",
            type: "link",
            label: "Payroll settings",
            hasSettingsIcon: true,
          },
        ],
      },
      accounting: {
        label: "Accounting",
        items: [
          {
            id: "banking",
            type: "title",
            label: "Banking",
          },
          {
            id: "bank-accounts",
            type: "link",
            label: "Bank accounts",
          },
          {
            id: "bank-rules",
            type: "link",
            label: "Bank rules",
          },
          { id: "separator-10", type: "separator" },
          {
            id: "accounting-tools",
            type: "title",
            label: "Accounting Tools",
          },
          {
            id: "chart-of-accounts",
            type: "link",
            label: "Chart of accounts",
          },
          {
            id: "fixed-assets",
            type: "link",
            label: "Fixed assets",
          },
          {
            id: "manual-journals",
            type: "link",
            label: "Manual journals",
          },
          {
            id: "find-and-recode",
            type: "link",
            label: "Find and recode",
          },
          {
            id: "assurance-dashboard",
            type: "link",
            label: "Assurance dashboard",
          },
          {
            id: "history-and-notes",
            type: "link",
            label: "History and notes",
          },
          { id: "separator-11", type: "separator" },
          {
            id: "accounting-settings",
            type: "link",
            label: "Accounting settings",
            hasSettingsIcon: true,
          },
        ],
      },
      tax: {
        label: "Tax",
        items: [
          {
            id: "activity-statements",
            type: "link",
            label: "Activity Statements",
          },
          {
            id: "taxable-payments-annual-report",
            type: "link",
            label: "Taxable Payments Annual Report",
          },
          { id: "separator-12", type: "separator" },
          {
            id: "tax-settings",
            type: "link",
            label: "Tax settings",
            hasSettingsIcon: true,
          },
        ],
      },
      contacts: {
        label: "Contacts",
        items: [
          {
            id: "all-contacts",
            type: "link",
            label: "All contacts",
          },
          {
            id: "customers",
            type: "link",
            label: "Customers",
          },
          {
            id: "suppliers",
            type: "link",
            label: "Suppliers",
          },
          { id: "separator-13", type: "separator" },
          {
            id: "groups",
            type: "title",
            label: "Groups",
          },
          {
            id: "training-customers",
            type: "link",
            label: "Training customers",
          },
          {
            id: "top-customers",
            type: "link",
            label: "Top customers",
          },
          { id: "separator-14", type: "separator" },
          {
            id: "contacts-settings",
            type: "link",
            label: "Contacts settings",
            hasSettingsIcon: true,
          },
        ],
      },
      projects: {
        label: "Projects",
        items: [
          {
            id: "all-projects",
            type: "link",
            label: "All projects",
          },
          {
            id: "time-entries",
            type: "link",
            label: "Time entries",
          },
          {
            id: "staff-time-overview",
            type: "link",
            label: "Staff time overview",
          },
          { id: "separator-22", type: "separator" },
          {
            id: "projects-settings",
            type: "link",
            label: "Projects settings",
            hasSettingsIcon: true,
          },
        ],
      },
    },

    // Region-specific overrides
    overrides: {
      // UK-specific navigation changes
      UK: {
        purchases: {
          label: "Purchases",
          items: [
            {
              id: "purchases-overview",
              type: "link",
              label: "Purchases overview",
              href: "/purchases-overview",
            },
            {
              id: "bills",
              type: "link",
              label: "Bills",
              href: "/bills",
            },
            {
              id: "cards",
              type: "link",
              label: "Cards",
              href: "/accounts",
            },
            {
              id: "online-bill-payments",
              type: "link",
              label: "Online bill payments",
            },
            {
              id: "purchase-orders",
              type: "link",
              label: "Purchase orders",
            },
            {
              id: "expenses",
              type: "link",
              label: "Expenses",
            },
            {
              id: "suppliers",
              type: "link",
              label: "Suppliers",
            },
            { id: "separator-3", type: "separator" },
            {
              id: "purchases-settings",
              type: "link",
              label: "Purchases settings",
              hasSettingsIcon: true,
            },
          ],
        },
        payroll: {
          label: "Payroll",
          items: [
            {
              id: "payroll-overview",
              type: "link",
              label: "Payroll overview",
            },
            { id: "separator-7", type: "separator" },
            {
              id: "employee-management",
              type: "title",
              label: "Employee management",
            },
            {
              id: "employees",
              type: "link",
              label: "Employees",
            },
            {
              id: "leave",
              type: "link",
              label: "Leave",
            },
            {
              id: "timesheets",
              type: "link",
              label: "Timesheets",
            },
            {
              id: "rota",
              type: "link",
              label: "Rota, time, attendance (Planday)",
              hasExternalLinkIcon: true,
            },
            { id: "separator-8", type: "separator" },
            {
              id: "payroll-processing",
              type: "title",
              label: "Payroll processing",
            },
            {
              id: "pay-employees",
              type: "link",
              label: "Pay employees",
            },
            {
              id: "pension-filings",
              type: "link",
              label: "Pension filings",
            },
            {
              id: "rti-filings",
              type: "link",
              label: "RTI filings",
            },
            {
              id: "taxes-and-filings",
              type: "link",
              label: "Taxes and filings",
            },
            { id: "separator-9", type: "separator" },
            {
              id: "payroll-settings",
              type: "link",
              label: "Payroll settings",
              hasSettingsIcon: true,
            },
          ],
        },
        tax: {
          label: "Tax",
          items: [
            {
              id: "vat-returns",
              type: "link",
              label: "VAT Returns",
            },
            {
              id: "cis-contractor",
              type: "link",
              label: "CIS Contractor",
            },
            {
              id: "cis-subcontractor",
              type: "link",
              label: "CIS Subcontractor",
            },
            { id: "separator-3", type: "separator" },
            {
              id: "tax-settings",
              type: "link",
              label: "Tax settings",
              hasSettingsIcon: true,
            },
          ],
        },
      },

      // USA-specific navigation changes
      USA: {
        sales: {
          label: "Sales",
          items: [
            {
              id: "sales-overview",
              type: "link",
              label: "Sales overview",
            },
            {
              id: "invoices",
              type: "link",
              label: "Invoices",
            },
            {
              id: "progress-payments",
              type: "link",
              label: "Progress payments",
            },
            {
              id: "payment-links",
              type: "link",
              label: "Payment links",
            },
            {
              id: "online-payments",
              type: "link",
              label: "Online payments",
            },
            {
              id: "quotes",
              type: "link",
              label: "Quotes",
            },
            {
              id: "products-and-services",
              type: "link",
              label: "Products and services",
            },
            {
              id: "inventory-plus",
              type: "link",
              label: "Inventory plus",
              hasExternalLinkIcon: true,
            },
            {
              id: "customers",
              type: "link",
              label: "Customers",
            },
            { id: "separator-2", type: "separator" },
            {
              id: "sales-settings",
              type: "link",
              label: "Sales settings",
              hasSettingsIcon: true,
            },
          ],
        },
        purchases: {
          label: "Purchases",
          items: [
            {
              id: "purchases-overview",
              type: "link",
              label: "Purchases overview",
              href: "/purchases-overview",
            },
            {
              id: "bills",
              type: "link",
              label: "Bills",
              href: "/bills",
            },
            {
              id: "online-bill-payments",
              type: "link",
              label: "Online bill payments",
            },
            {
              id: "cards",
              type: "link",
              label: "Spend cards",
              href: "/accounts",
            },
            {
              id: "expenses",
              type: "link",
              label: "Expense claims",
            },
            {
              id: "purchase-orders",
              type: "link",
              label: "Purchase orders",
            },
            {
              id: "checks",
              type: "link",
              label: "Checks",
            },
            {
              id: "suppliers",
              type: "link",
              label: "Suppliers",
            },
            { id: "separator-3", type: "separator" },
            {
              id: "purchases-settings",
              type: "link",
              label: "Purchases settings",
              hasSettingsIcon: true,
            },
          ],
        },
        reporting: {
          label: "Reporting",
          items: [
            {
              id: "all-reports",
              type: "link",
              label: "All reports",
            },
            { id: "separator-4982", type: "separator" },
            {
              id: "analytics-by-syft",
              type: "title",
              label: "Analytics powered by Syft",
            },
            {
              id: "vizualisations",
              type: "link",
              label: "Vizualisations",
              hasExternalLinkIcon: true,
            },
            {
              id: "dashboards",
              type: "link",
              label: "Dashboards",
              hasExternalLinkIcon: true,
            },
            {
              id: "cash-flow-manager",
              type: "link",
              label: "Cash flow manager",
              hasExternalLinkIcon: true,
            },
            { id: "separator-4", type: "separator" },
            {
              id: "analytics",
              type: "title",
              label: "Analytics",
            },
            {
              id: "short-term-cash-flow",
              type: "link",
              label: "Short-term cash flow",
            },
            {
              id: "business-snapshot",
              type: "link",
              label: "Business snapshot",
            },
            { id: "separator-5", type: "separator" },
            {
              id: "favorite-reports",
              type: "title",
              label: "Favorite reports",
              hasStarIcon: true,
            },
            {
              id: "accounts-payable-aging-summary",
              type: "link",
              label: "Accounts Payable Aging Summary",
            },
            {
              id: "accounts-receivable-aging-summary",
              type: "link",
              label: "Accounts Receivable Aging Summary",
            },
            {
              id: "balance-sheet",
              type: "link",
              label: "Balance Sheet",
            },
            {
              id: "profit-and-loss",
              type: "link",
              label: "Income Statement (Profit and Loss)",
            },
            {
              id: "sales-tax-report",
              type: "link",
              label: "Sales Tax Report",
            },
            { id: "separator-6", type: "separator" },
            {
              id: "reporting-settings",
              type: "link",
              label: "Reporting settings",
              hasSettingsIcon: true,
            },
          ],
        },
        payroll: {
          label: "Payroll",
          items: [
            {
              id: "gusto",
              type: "title",
              label: "Gusto",
            },
            {
              id: "dashboard",
              type: "link",
              label: "Dashboard",
              hasExternalLinkIcon: true,
            },
            {
              id: "run-payroll",
              type: "link",
              label: "Run payroll",
              hasExternalLinkIcon: true,
            },
            {
              id: "time-off",
              type: "link",
              label: "Time off",
              hasExternalLinkIcon: true,
            },
            {
              id: "reports",
              type: "link",
              label: "Reports",
              hasExternalLinkIcon: true,
            },
            {
              id: "integration-settings",
              type: "link",
              label: "Integration settings",
              hasExternalLinkIcon: true,
            },
          ],
        },
        tax: {
          label: "Tax",
          items: [
            {
              id: "sales-tax",
              type: "link",
              label: "Sales tax",
            },
            {
              id: "1099",
              type: "link",
              label: "1099",
            },
            { id: "separator-12", type: "separator" },
            {
              id: "tax-settings",
              type: "link",
              label: "Tax settings",
              hasSettingsIcon: true,
            },
          ],
        },
        contacts: {
          label: "Contacts",
          items: [
            {
              id: "all-contacts",
              type: "link",
              label: "All contacts",
            },
            {
              id: "customers",
              type: "link",
              label: "Customers",
            },
            {
              id: "suppliers",
              type: "link",
              label: "Suppliers",
            },
            { id: "separator-13", type: "separator" },
            {
              id: "groups",
              type: "title",
              label: "Groups",
            },
            {
              id: "1099-contacts",
              type: "link",
              label: "1099 contacts",
            },
            {
              id: "top-customers",
              type: "link",
              label: "Top customers",
            },
            { id: "separator-14", type: "separator" },
            {
              id: "contacts-settings",
              type: "link",
              label: "Contacts settings",
              hasSettingsIcon: true,
            },
          ],
        },
      },

      // Canada-specific navigation changes
      CA: {
        purchases: {
          label: "Purchases",
          items: [
            {
              id: "purchases-overview",
              type: "link",
              label: "Purchases overview",
              href: "/purchases-overview",
            },
            {
              id: "bills",
              type: "link",
              label: "Bills",
              href: "/bills",
            },
            {
              id: "cards",
              type: "link",
              label: "Cards",
              href: "/accounts",
            },
            {
              id: "purchase-orders",
              type: "link",
              label: "Purchase orders",
            },
            {
              id: "cheques",
              type: "link",
              label: "Cheques",
            },
            {
              id: "expenses",
              type: "link",
              label: "Expenses",
            },
            {
              id: "suppliers",
              type: "link",
              label: "Suppliers",
            },
            { id: "separator-39", type: "separator" },
            {
              id: "purchases-settings",
              type: "link",
              label: "Purchases settings",
              hasSettingsIcon: true,
            },
          ],
        },
        reporting: {
          label: "Reporting",
          items: [
            {
              id: "all-reports",
              type: "link",
              label: "All reports",
            },
            { id: "separator-498", type: "separator" },
            {
              id: "analytics-by-syft",
              type: "title",
              label: "Analytics powered by Syft",
            },
            {
              id: "visualisations",
              type: "link",
              label: "Visualisations",
              hasExternalLinkIcon: true,
            },
            {
              id: "dashboards",
              type: "link",
              label: "Dashboards",
              hasExternalLinkIcon: true,
            },
            {
              id: "cash-flow-manager",
              type: "link",
              label: "Cash flow manager",
              hasExternalLinkIcon: true,
            },
            { id: "separator-4", type: "separator" },
            {
              id: "analytics",
              type: "title",
              label: "Analytics",
            },
            {
              id: "short-term-cash-flow",
              type: "link",
              label: "Short-term cash flow",
            },
            {
              id: "business-snapshot",
              type: "link",
              label: "Business snapshot",
            },
            { id: "separator-5", type: "separator" },
            {
              id: "favorite-reports",
              type: "title",
              label: "Favorite reports",
              hasStarIcon: true,
            },
            {
              id: "account-transactions",
              type: "link",
              label: "Account Transactions",
            },
            {
              id: "aged-payables-summary",
              type: "link",
              label: "Aged Payables Summary",
            },
            {
              id: "aged-receivables-summary",
              type: "link",
              label: "Aged Receivables Summary",
            },
            {
              id: "balance-sheet",
              type: "link",
              label: "Balance Sheet",
            },
            {
              id: "profit-and-loss",
              type: "link",
              label: "Profit and Loss",
            },
            { id: "separator-6", type: "separator" },
            {
              id: "reporting-settings",
              type: "link",
              label: "Reporting settings",
              hasSettingsIcon: true,
            },
          ],
        },
        payroll: {
          label: "Payroll",
          items: [
            {
              id: "pay-run",
              type: "link",
              label: "Pay run",
            },
            {
              id: "employees",
              type: "link",
              label: "Employees",
            },
            { id: "separator-9", type: "separator" },
            {
              id: "payroll-settings",
              type: "link",
              label: "Pay run settings",
              hasSettingsIcon: true,
            },
          ],
        },
        tax: {
          label: "Tax",
          items: [
            {
              id: "b-c-pst-returns",
              type: "link",
              label: "British Columbia PST Returns",
            },
            {
              id: "gst-hst-returns",
              type: "link",
              label: "GST/HST Returns",
            },
            {
              id: "manitoba-rst-returns",
              type: "link",
              label: "Manitoba RST Returns",
            },
            {
              id: "quebec-qst-returns",
              type: "link",
              label: "Québec QST Returns",
            },
            {
              id: "quebec-gst-hst-qst-returns",
              type: "link",
              label: "Québec GST/HST and QST Returns",
            },
            {
              id: "saskatchewan-pst-returns",
              type: "link",
              label: "Saskatchewan PST Returns",
            },
            { id: "separator-9", type: "separator" },
            {
              id: "tax-settings",
              type: "link",
              label: "Tax settings",
              hasSettingsIcon: true,
            },
          ],
        },
      },

      // New Zealand-specific navigation changes
      NZ: {
        payroll: {
          label: "Payroll",
          items: [
            {
              id: "payroll-overview",
              type: "link",
              label: "Payroll overview",
            },
            { id: "separator-7", type: "separator" },
            {
              id: "employee-management",
              type: "title",
              label: "Employee management",
            },
            {
              id: "employees",
              type: "link",
              label: "Employees",
            },
            {
              id: "leave",
              type: "link",
              label: "Leave",
            },
            {
              id: "timesheets",
              type: "link",
              label: "Timesheets",
            },
            { id: "separator-8", type: "separator" },
            {
              id: "payroll-processing",
              type: "title",
              label: "Payroll processing",
            },
            {
              id: "pay-employees",
              type: "link",
              label: "Pay employees",
            },
            {
              id: "taxes-and-filings",
              type: "link",
              label: "Taxes and filings",
            },
            { id: "separator-9", type: "separator" },
            {
              id: "payroll-settings",
              type: "link",
              label: "Payroll settings",
              hasSettingsIcon: true,
            },
          ],
        },
        tax: {
          label: "Tax",
          items: [
            {
              id: "returns",
              type: "link",
              label: "GST Returns",
            },
            { id: "separator-1", type: "separator" },
            {
              id: "tax-settings",
              type: "link",
              label: "Tax settings",
              hasSettingsIcon: true,
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
    if (!mergedNavigation[sectionKey as keyof typeof mergedNavigation]) {
      (mergedNavigation as Record<string, unknown>)[sectionKey] = (
        regionOverrides as Record<string, unknown>
      )[sectionKey];
    } else {
      // Merge section properties
      (mergedNavigation as Record<string, unknown>)[sectionKey] = {
        ...mergedNavigation[sectionKey as keyof typeof mergedNavigation],
        ...regionOverrides[sectionKey as keyof typeof regionOverrides],
      };

      // If there are item overrides, handle them specially
      if (regionOverrides[sectionKey as keyof typeof regionOverrides].items) {
        const baseItems =
          mergedNavigation[sectionKey as keyof typeof mergedNavigation].items ||
          [];
        const overrideItems =
          regionOverrides[sectionKey as keyof typeof regionOverrides].items;

        // For each override item, either add it or replace an existing one
        overrideItems.forEach((overrideItem) => {
          const existingItemIndex = baseItems.findIndex(
            (item) => item.id === overrideItem.id
          );

          if (existingItemIndex >= 0) {
            // Replace existing item
            baseItems[existingItemIndex] = overrideItem;
          } else {
            // Add new item
            baseItems.push(overrideItem);
          }
        });

        mergedNavigation[sectionKey as keyof typeof mergedNavigation].items =
          baseItems;
      }
    }
  });

  return mergedNavigation;
}
