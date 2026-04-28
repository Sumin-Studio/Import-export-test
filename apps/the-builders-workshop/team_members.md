# Team Members

**Purpose**: Track team member information, responsibilities, access permissions, and change history for The Builders Workshop.

**Last Updated**: 2024-12-19

---

## Team Members

### Jon Bell

**Role**: Frontend Developer

**Contact Information**:
- Email: jon.bell@xero.com (assumed)
- Slack: @jon.bell (assumed)

**Access & Permissions**:
- ✅ GitHub repository access
- ✅ Cursor IDE access
- ✅ Local development environment
- ✅ Supabase database access (via MCP tools/Cursor integration)

**Areas of Expertise**:
- Frontend development (Next.js, React, TypeScript)
- UI/UX implementation
- Component architecture
- Tailwind CSS styling

**Responsibilities**:
- Frontend code development and feature implementation
- Component creation and maintenance
- UI/UX implementation
- Code reviews and quality assurance
- Testing and bug fixes

**Recent Changes** (chronological, most recent first):
- **2024-12-19**: Added new milestones to Getting Started flow (`receiving-cursor-access`, `receiving-admin-access`) in `getting-started-tab.tsx` and updated `seed-milestones.sql` to include these milestones with correct display_order values. Fixed Supabase issue by creating the necessary tables (milestones, milestone_completions) and seeding all 7 milestones directly via Supabase MCP tools.

**Ongoing Tasks/Notes**:
- Working on Getting Started checklist improvements
- Adding new milestone steps to improve onboarding flow

---

### Sid

**Role**: Backend/Database Administrator

**Contact Information**:
- Email: [To be filled in]
- Slack: [To be filled in]

**Access & Permissions**:
- ✅ Supabase database access
- ✅ Database migration and seeding capabilities
- ✅ SQL script execution in Supabase
- ✅ Vercel deployment and infrastructure management
- ✅ Xero Vercel account access

**Areas of Expertise**:
- Database administration
- SQL scripting
- Supabase platform management
- Database migrations and seeding
- Infrastructure and deployment management
- Vercel platform administration

**Responsibilities**:
- Database schema management
- Running seed scripts and migrations in Supabase
- Database maintenance and updates
- Ensuring database sync with application code
- Infrastructure and deployment management
- Vercel project configuration and migration

**Recent Changes** (chronological, most recent first):
- **2024-12-19**: Currently migrating the project from Jon's personal Vercel account to the Xero Vercel account. This is a major infrastructure milestone for the project.

**Ongoing Tasks/Notes**:
- **In Progress**: Migrating deployment from Jon's personal Vercel account to Xero Vercel account. This is a key goal for transitioning the project to official Xero infrastructure.

---

## Change Log

This section tracks updates to this document itself.

- **2024-12-19**: Initial document creation. Documented Jon and Sid's roles, access, and responsibilities. Updated to reflect that Jon fixed the Supabase milestone seeding issue directly using MCP tools. Added Sid's ongoing Vercel migration work.

---

## Notes for Agents

When working on this project, refer to this document to:
- Understand who has access to which systems (especially Supabase)
- Know who to contact for specific tasks (e.g., database changes → Sid)
- Track recent changes made by team members
- Understand current responsibilities and ongoing work

**Important**: Both Jon and Sid can make database changes. Jon has access via Supabase MCP tools through Cursor, while Sid has direct Supabase access. For complex migrations or when unsure, coordinate with Sid who has deeper database administration expertise.

