/**
 * Role-specific templates for the optional "Request Admin Access" step (Getting Started).
 * Users pick a function so the paste-into-IT message matches how they work.
 */

export type AdminAccessRole = "design" | "product" | "marketing" | "sales" | "general";

export const ADMIN_ACCESS_ROLES: { id: AdminAccessRole; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "general", label: "General" },
];

export function getAdminAccessRequestCopy(role: AdminAccessRole): string {
  const bodies: Record<AdminAccessRole, string> = {
    design: `I'm a designer requesting local admin access. Our team regularly needs to install and update tools that require admin rights, including:

- Image and video editing tools (batch processing, format conversion, compression for assets)
- Prototyping and development tools for building working prototypes and utility apps
- Package managers and CLI tools that streamline our design-to-development workflow
- Font management and color calibration utilities

These tools are essential for our day-to-day productivity and help us ship higher-quality work faster. Admin access lets us stay unblocked and self-sufficient rather than filing IT tickets for routine tool installs.`,

    product: `I'm on the product team requesting local admin access. We regularly need to install and update tools that require admin rights, including:

- Workshop and collaboration utilities (whiteboarding, screen recording, customer journey and flow tools)
- Analytics, research, and lightweight data helpers for discovery
- Prototyping and no-code/low-code tools to validate ideas before engineering
- Package managers and CLI tools that speed up local workflows

These tools help us test assumptions and ship better product decisions. Admin access keeps us unblocked for routine installs instead of waiting on IT for every update.`,

    marketing: `I'm on the marketing team requesting local admin access. We regularly need tools that require admin rights, including:

- Creative and campaign production software (including updates and plugins)
- Video, image, and web asset tooling
- Analytics, experimentation, and landing-page or lightweight web utilities
- Automation and productivity tools used across campaigns

Admin access helps us ship creative work and campaigns without unnecessary delays for standard installs and updates.`,

    sales: `I'm on the sales team requesting local admin access. I need to install and maintain tools that often require admin rights, including:

- Presentation and demo software
- Screen sharing and recording tools
- CRM-connected or approved productivity utilities
- Lightweight web or prototyping tools used in customer conversations

Local admin helps me stay effective with customers and internal teams without filing IT tickets for routine installs.`,

    general: `I'm requesting local admin access for my role at Xero. I regularly need to install and update tools that require admin rights for productivity and collaboration—examples may include creative software, development or prototyping tools, package managers, browser or system utilities, and other role-specific apps.

Admin access lets me stay self-sufficient and avoid unnecessary IT tickets for routine, approved installs.`,
  };

  return bodies[role];
}
