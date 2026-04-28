export interface PrototypeTemplate {
  id: string;
  designer: string;
  templateType: string;
  notes: string;
  url: string;
  blogPostUrl?: string;
}

export const prototypeTemplates: PrototypeTemplate[] = [
  {
    id: "michael-but-xdl-figma",
    designer: "Michael But",
    templateType: "Figma Make Template",
    notes: "XDL template with pre-loaded design theme and working global nav. Great for quickly exploring ideas with XUI-style appearance.",
    url: "https://www.figma.com/make/EGHSptGndOwre6G5S21l4q/XDL-Template--Michael-But-?node-id=0-1&t=v1tryYkslGp0eVn3-1"
  },
  {
    id: "jessica-nicholl-ui-kit-figma",
    designer: "Jessica Nicholl",
    templateType: "Figma Make Template",
    notes: "UI starter kit with dashboard and design system components. Figma Make prototype with better visual renderings.",
    url: "https://www.figma.com/make/65NxlbzjfdLCjz3d6rAdF7/UI-starter-kit---jess?fullscreen=1"
  },
  {
    id: "katrina-li-dashboard-figma",
    designer: "Katrina Li",
    templateType: "Figma Make Template",
    notes: "Starter template with complex dashboard renderings. High styling fidelity with refined appearance.",
    url: "https://www.figma.com/make/A2FplZ4kPjwd6HwfQxMLgb/Starter-template---Katrina-Li?node-id=0-1&t=jaldxjzSQqXUszdU-1"
  },
  {
    id: "angus-tait-global-nav-figma",
    designer: "Angus Tait",
    templateType: "Figma Make Template",
    notes: "SDL global header template. Responsive, XDL-based with working dropdowns. Closer to design accuracy.",
    url: "https://www.figma.com/make/cxHGUFXscJ7v3g06WQBCix/SDL-Global-Header-template?node-id=0-1&t=d0HDHDRHhxgjYw4L-1"
  },
  {
    id: "adam-huskisson-accounting-figma",
    designer: "Adam Huskisson",
    templateType: "Figma Make Template",
    notes: "Full-featured accounting dashboard with Stripe integration, charts, and polished UI components.",
    url: ""
  },
  {
    id: "ben-white-starter-kit-figma",
    designer: "Ben White",
    templateType: "Figma Make Template",
    notes: "Starter kit prototype with Figma Make export. Clean foundation for building Xero-style interfaces.",
    url: ""
  }
];

export function getPrototypeTemplates(): PrototypeTemplate[] {
  return prototypeTemplates;
}

export function getPrototypeTemplateById(id: string): PrototypeTemplate | undefined {
  return prototypeTemplates.find(template => template.id === id);
}

