export interface HelpItem {
  question: string;
  answer: string;
  severity: "common" | "occasional";
  relatedLinks?: Array<{ label: string; url: string }>;
}

export interface StepHelpData {
  milestoneKey: string;
  quickTip: string;
  estimatedTime: string;
  helpItems: HelpItem[];
}

export const MILESTONE_KEYS = [
  "install-cursor",
  "receiving-cursor-access",
  "setup-code-folder",
  "first-cursor-query",
  "request-admin-access",
  "receiving-admin-access",
] as const;

export const STEP_TITLES: Record<string, string> = {
  "request-admin-access": "Optional: Request Admin Access",
  "install-cursor": "Get Cursor from Okta",
  "receiving-admin-access": "Optional: Receive Admin Access",
  "receiving-cursor-access": "Open Cursor",
  "setup-code-folder": "Set Up Your Code Folder",
  "first-cursor-query": "First Cursor Query",
};

export const gettingStartedHelpData: StepHelpData[] = [
  {
    milestoneKey: "request-admin-access",
    quickTip: "Treat this as optional unless you hit permission blockers.",
    estimatedTime: "Optional: 5 min to request, days–weeks to receive",
    helpItems: [
      {
        question: "I can't find 'Elevate to Admin' in Self Service",
        answer:
          "The form isn't in Self Service -- it's a separate JIRA Service Desk request. Use the direct link provided in the step above. If the link doesn't work, search for 'local admin' in the Xero service portal.",
        severity: "common",
        relatedLinks: [
          {
            label: "Request form",
            url: "https://xero.atlassian.net/servicedesk/customer/portal/1009/group/1466/create/1078",
          },
        ],
      },
      {
        question: "What should I write in the justification?",
        answer:
          "Use the pre-written message we've provided -- just copy it from the text box above. Only submit this if you need admin rights for a specific blocker.",
        severity: "common",
      },
      {
        question: "How long does admin access take?",
        answer:
          "Typically 1–3 business days, but it can take up to 2 weeks depending on IT workload. If it's been more than a week, ping #builders-workshop and someone can help escalate.",
        severity: "common",
      },
    ],
  },
  {
    milestoneKey: "install-cursor",
    quickTip:
      "Request access in Okta first—install the desktop app after approval (Company Portal / Self Service+). Stuck in the browser? Bottom-left menu → Download Cursor.",
    estimatedTime: "5 min to request; approval often a few days",
    helpItems: [
      {
        question: "Should I use the desktop app or the browser version?",
        answer:
          "Use the desktop app for the Builders Workshop—this program needs local files and the built-in terminal. Request access via Okta, then install from Company Portal (Windows) or Self Service+ → Developer (Mac). If you only have Cursor open in the browser, open the menu at the bottom-left (your profile), choose Download Cursor for your OS, install, and launch the native app. Don’t use personal Cursor accounts with Xero IP.",
        severity: "common",
      },
      {
        question: "The Okta tile opens an Agents page, not the IDE",
        answer:
          "Cursor may open to its Agent dashboard first—that’s expected in the desktop app. From there you can switch to the full IDE. If you’re in a browser tab and never installed the desktop app, use the bottom-left profile menu → Download Cursor, install, then open the desktop app. If something still looks wrong, check the Confluence page linked in this step or ask in #help-cursor.",
        severity: "occasional",
      },
      {
        question: "I only see Cursor in the browser / web app—no desktop install",
        answer:
          "That’s common when you first sign in from the web. The Builders flow needs the desktop app. In Cursor’s web UI, use the bottom-left corner (profile / initials) → Download Cursor (macOS or Windows), run the installer, then open Cursor from Applications (Mac) or Start (Windows). Prefer Company Portal or Self Service+ when you can—same desktop app.",
        severity: "common",
      },
      {
        question: "I got an email about Copilot vs Cursor conflict",
        answer:
          "If you had GitHub Copilot installed, you may get a notice about conflicts. You can safely disable Copilot in favor of Cursor -- they serve the same purpose and Cursor is what we're standardizing on.",
        severity: "occasional",
      },
    ],
  },
  {
    milestoneKey: "receiving-admin-access",
    quickTip: "Skip this unless you requested admin access.",
    estimatedTime: "Optional wait time: days to weeks",
    helpItems: [
      {
        question: "IT keeps remoting in but it's still not working",
        answer:
          "This is a known issue -- sometimes the admin elevation doesn't stick after IT's remote session. Ask them to confirm the change persisted by having you restart your machine and try installing something (like dragging an app to the Applications folder). If it still fails, reply to your service desk ticket.",
        severity: "common",
      },
      {
        question: "It's been weeks -- should I escalate?",
        answer:
          "Yes. If it's been more than 5 business days, post in #builders-workshop with your ticket number. Jon or another lead can help escalate directly with IT. Don't wait in silence -- this is a known bottleneck.",
        severity: "occasional",
        relatedLinks: [
          {
            label: "#builders-workshop",
            url: "https://xero.enterprise.slack.com/archives/C09PVD53RC7",
          },
        ],
      },
    ],
  },
  {
    milestoneKey: "receiving-cursor-access",
    quickTip:
      "Desktop app: Company Portal (Windows) or Self Service+ → Developer (Mac). Web-only? Bottom-left → Download Cursor.",
    estimatedTime: "Install: ~10–20 min once approved",
    helpItems: [
      {
        question: "Where do I install Cursor on Windows vs Mac?",
        answer:
          "Per internal docs: Windows — Company Portal, search “Cursor”. Mac — Self Service+, under Developer. After install, use the Cursor tile in Okta. If you’re only in the browser so far, use the bottom-left profile menu in Cursor’s web UI → Download Cursor for your OS, then use the installed desktop app.",
        severity: "common",
      },
      {
        question: "Self Service install is spinning forever",
        answer:
          "The Self Service app can be slow. Give it 10–15 minutes. If it's still spinning, try quitting Self Service completely and reopening it. If the install keeps failing, try #help-cursor or #builders-workshop.",
        severity: "common",
      },
      {
        question: "Can I use the browser version while waiting?",
        answer:
          "You can poke around in the browser, but the Builders Workshop needs the desktop app (local folders + terminal). If you’re stuck in the web UI, don’t wait—use the bottom-left profile menu → Download Cursor for your OS, install, and continue in the desktop app.",
        severity: "common",
      },
    ],
  },
  {
    milestoneKey: "setup-code-folder",
    quickTip: "Your home directory is the folder with your name under /Users/.",
    estimatedTime: "2–5 min",
    helpItems: [
      {
        question: "Where is my home directory?",
        answer:
          "On a Mac, your home directory is /Users/your.name/ -- for example, /Users/jane.smith/. In Finder, you can get there by pressing Cmd+Shift+H. Create a folder called 'code' right there.",
        severity: "common",
      },
      {
        question: "I'm scared of the terminal",
        answer:
          "That's totally normal! Good news: Cursor has its own built-in terminal, and you can ask Cursor's AI to run commands for you. You don't need to memorize commands -- just describe what you want in plain English and Cursor will suggest the right command. It'll also ask you before running anything.",
        severity: "common",
      },
      {
        question: "Cursor won't open or says it can't find the folder",
        answer:
          "Make sure you created the 'code' folder first (don't just try to open a folder that doesn't exist). If Cursor shows an error, try: File > Open Folder and navigate to /Users/your.name/code/. If the app won't launch at all, you may need admin access first (Step 1).",
        severity: "occasional",
      },
    ],
  },
  {
    milestoneKey: "first-cursor-query",
    quickTip: "Paste the full prompt and let Cursor create your first local files.",
    estimatedTime: "5–10 min",
    helpItems: [
      {
        question: "Cursor says it cannot write files or run a command",
        answer:
          "If you see permission errors, first make sure you opened a writable folder like /Users/your.name/code/. If the issue persists and IT controls are blocking you, then use the optional admin access steps above.",
        severity: "common",
      },
      {
        question: "Do I need Homebrew, Node, or Bun for this step?",
        answer:
          "No. This first query is intentionally lightweight and only requires Cursor access at Xero. You can start building without installing global developer tooling in this step.",
        severity: "common",
      },
      {
        question: "Cursor asks me to approve terminal commands -- is that safe?",
        answer:
          "Yes. Cursor will show the command first and ask for approval. Read commands before approving and decline anything you don't understand. If you're unsure, ask in #builders-workshop.",
        severity: "common",
      },
      {
        question: "How do I know what to put in prompts?",
        answer:
          "Start by describing what you want in plain English -- like you're talking to a coworker. For example: 'Make me a simple webpage with a blue header that says Hello.' You don't need to know code or technical terms. The more specific you are about what you want, the better the result. Try starting with something small and visual!",
        severity: "common",
        relatedLinks: [
          {
            label: "#builders-workshop",
            url: "https://xero.enterprise.slack.com/archives/C09PVD53RC7",
          },
        ],
      },
    ],
  },
];

// --- Connecting to GitHub ---

export const GITHUB_MILESTONE_KEYS = [
  "github-request-access",
  "github-setup-account",
  "github-install-git",
  "github-create-repository",
] as const;

export const GITHUB_STEP_TITLES: Record<string, string> = {
  "github-request-access": "Request GitHub Access",
  "github-setup-account": "Set Up Your Account",
  "github-install-git": "Install Git",
  "github-create-repository": "Create Your First Repo",
};

export const githubHelpData: StepHelpData[] = [
  {
    milestoneKey: "github-request-access",
    quickTip: "Search for 'Github' in Okta Access Requests, not Self Service.",
    estimatedTime: "5 min to request, 1–3 days to receive",
    helpItems: [
      {
        question: "I can't find the GitHub tile in Okta",
        answer:
          "You need to request access first. Click the 'Okta Access Requests' tile in your Okta dashboard, then search for 'Github' and submit a request. The 'GitHub Enterprise Cloud' tile will appear after your request is approved.",
        severity: "common",
      },
      {
        question: "What's the difference between GitHub and GitHub Enterprise?",
        answer:
          "GitHub Enterprise Cloud is Xero's company-managed version of GitHub. It's the same GitHub you may have heard of, but managed by Xero with SSO login. You should use this one, not a personal github.com account.",
        severity: "common",
      },
    ],
  },
  {
    milestoneKey: "github-setup-account",
    quickTip: "Use the Okta tile to sign in -- don't create a new GitHub account.",
    estimatedTime: "5–10 min",
    helpItems: [
      {
        question: "It's asking me to create a new GitHub account",
        answer:
          "Don't create a new account. Sign in through the Okta tile -- it uses your Xero SSO. If you see a signup page, you may have navigated to github.com directly instead of going through Okta.",
        severity: "common",
      },
      {
        question: "I already have a personal GitHub account -- will it conflict?",
        answer:
          "No, your Xero GitHub Enterprise account is separate from any personal GitHub account. You'll be signed in via Okta SSO. Just make sure you're using the Enterprise tile when working on Xero projects.",
        severity: "common",
      },
    ],
  },
  {
    milestoneKey: "github-install-git",
    quickTip: "Running 'git -v' in Terminal will trigger the install prompt.",
    estimatedTime: "5–15 min",
    helpItems: [
      {
        question: "What's the difference between git and GitHub?",
        answer:
          "Git is a tool that runs on your computer to track changes in your code -- like version history for files. GitHub is a website where you can store and share those tracked changes with others. You need git installed locally to push code to GitHub.",
        severity: "common",
      },
      {
        question: "The command line tools install is taking forever",
        answer:
          "The Xcode Command Line Tools install can take 10–20 minutes depending on your connection. Let it finish. If it fails, you may need admin access (Step 1 in Getting Started). Try restarting and running 'git -v' again.",
        severity: "common",
      },
    ],
  },
  {
    milestoneKey: "github-create-repository",
    quickTip: "Name it something descriptive like 'prototype-payments-flow'.",
    estimatedTime: "5 min",
    helpItems: [
      {
        question: "What should I name my repository?",
        answer:
          "Use a clear, descriptive name like 'prototype-payments-flow' or 'design-spike-onboarding'. Avoid generic names like 'test' or 'my-project'. The name helps others (and future you) understand what it's for.",
        severity: "common",
      },
      {
        question: "How do I clone it into my code folder?",
        answer:
          "After creating the repo on GitHub, click the green 'Code' button and copy the URL. Then in Cursor's terminal, run: git clone <that-url>. Or even easier -- just tell Cursor's AI: 'Clone this repo into my code folder' and paste the URL.",
        severity: "common",
      },
    ],
  },
];

// --- Build your first projects (Making Stuff) ---

export const MAKING_STUFF_MILESTONE_KEYS = [
  "create-first-html-file",
  "create-first-web-app",
  "connect-figma-mcp",
  "connect-glean-mcp",
] as const;

export const MAKING_STUFF_STEP_TITLES: Record<string, string> = {
  "create-first-html-file": "Create your first HTML file",
  "create-first-web-app": "Create your first web app",
  "connect-figma-mcp": "Connect Figma MCP",
  "connect-glean-mcp": "Connect Glean MCP",
};

export const makingStuffHelpData: StepHelpData[] = [
  {
    milestoneKey: "create-first-html-file",
    quickTip:
      "Use a dedicated folder, open it in Cursor, then paste the prompt. Double-click index.html in Finder to preview.",
    estimatedTime: "15–30 min",
    helpItems: [],
  },
  {
    milestoneKey: "create-first-web-app",
    quickTip:
      "Empty folder + Cursor first; let the agent pick package manager and tell you the local URL when the dev server is up.",
    estimatedTime: "30–60 min",
    helpItems: [],
  },
  {
    milestoneKey: "connect-figma-mcp",
    quickTip:
      "Figma Desktop must be running with MCP enabled; merge into ~/.cursor/mcp.json and restart Cursor.",
    estimatedTime: "10–20 min",
    helpItems: [],
  },
  {
    milestoneKey: "connect-glean-mcp",
    quickTip:
      "Merge the Glean server into mcp.json, restart Cursor, then complete SSO under Tools & MCP if prompted.",
    estimatedTime: "10–20 min",
    helpItems: [],
  },
];

// --- Lookup helpers ---

const allHelpData = [...gettingStartedHelpData, ...githubHelpData, ...makingStuffHelpData];

export function getHelpDataForStep(milestoneKey: string): StepHelpData | undefined {
  return allHelpData.find((d) => d.milestoneKey === milestoneKey);
}
