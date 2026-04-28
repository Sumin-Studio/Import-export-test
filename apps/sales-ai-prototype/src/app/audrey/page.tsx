import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audrey",
};

export default function AudreyPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Hi Audrey</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Your team and what they&apos;re working on (via Glean)
      </p>

      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Team</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "3rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333", textAlign: "left" }}>
            <th style={{ padding: "0.75rem 1rem" }}>Name</th>
            <th style={{ padding: "0.75rem 1rem" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Audrey Chen", role: "Product Design Director (Lead)" },
            { name: "Robb Schiller", role: "Lead Product Designer" },
            { name: "Maarten Idema", role: "Lead Product Designer" },
            { name: "Alana Edwards", role: "Senior Product Designer" },
            { name: "Eliza Newman-Saul", role: "Senior Product Designer" },
            { name: "Vivian Ngai", role: "Senior Product Designer" },
            { name: "Mona Yang", role: "Product Designer" },
          ].map((person) => (
            <tr key={person.name} style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "0.75rem 1rem" }}>{person.name}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Current Projects & Priorities</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333", textAlign: "left" }}>
            <th style={{ padding: "0.75rem 1rem" }}>Project</th>
            <th style={{ padding: "0.75rem 1rem" }}>Description</th>
            <th style={{ padding: "0.75rem 1rem" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              project: "Information Architecture (IA)",
              description: "\"IA resurrection\" initiative - follow-up conversations and LT review",
              status: "Active",
            },
            {
              project: "US Strategy",
              description: "Cashflow as Hook, Xero Coach, and related US market initiatives",
              status: "Active",
            },
            {
              project: "Melio Integration",
              description: "Design for Melio/Xero integration - early stages of team setup and process definition",
              status: "Early stages",
            },
            {
              project: "AP Foundations (Bill Payments)",
              description: "Unified experiences in bill payments to reduce eng overhead and improve speed to market",
              status: "Active",
            },
            {
              project: "Payments IA",
              description: "Aligning payments IA with broader Xero IA, improving discoverability and UX",
              status: "Active",
            },
            {
              project: "Segmentation & Personas",
              description: "Persona work for payments, Voice of Customer research with Courtney and team",
              status: "In progress",
            },
            {
              project: "Design Reviews & Critiques",
              description: "Ongoing design reviews focused on alignment and ownership within the team",
              status: "Ongoing",
            },
            {
              project: "Quarterly Roadmap Planning",
              description: "Payments Q Plan - rollouts, experimentation, and long-term planning",
              status: "Ongoing",
            },
          ].map((item) => (
            <tr key={item.project} style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "0.75rem 1rem", fontWeight: 500 }}>{item.project}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{item.description}</td>
              <td style={{ padding: "0.75rem 1rem" }}>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.85rem",
                    backgroundColor:
                      item.status === "Active"
                        ? "#dbeafe"
                        : item.status === "Early stages"
                        ? "#fef3c7"
                        : item.status === "In progress"
                        ? "#d1fae5"
                        : "#f3f4f6",
                    color:
                      item.status === "Active"
                        ? "#1e40af"
                        : item.status === "Early stages"
                        ? "#92400e"
                        : item.status === "In progress"
                        ? "#065f46"
                        : "#374151",
                  }}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
