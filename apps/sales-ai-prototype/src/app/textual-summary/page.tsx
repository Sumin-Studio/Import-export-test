import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Textual summary",
  description:
    "Consolidated checklist of David's discussion topics, latest direction, and clear agent descriptions.",
};

export default function TextualSummaryPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-cyan-500"
          >
            ← Home
          </Link>
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Bill AI Automation
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            David&apos;s Discussion Topics & Agent Directions
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Consolidated checklist of everything David said we should discuss or do,
            plus the latest direction and clear agent descriptions. Sources: 23 Feb
            (elevator pitches, delivery), 24 Feb (action items), 25 Feb (review &
            reframe).
          </p>
        </div>

        <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:mt-12 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h3:mt-8 prose-h4:mt-6 prose-p:leading-relaxed prose-ul:list-disc prose-li:my-1">
          <h2>Part 1: David&apos;s Discussion Topics (Consolidated Checklist)</h2>

          <h3>For Diya / Executive Review</h3>
          <ul>
            <li>
              <strong>What we&apos;re proposing:</strong> The eval is the *what*, not
              the *how we got there* — Locked in three concepts
            </li>
            <li>
              <strong>Why it matters:</strong> Make sure the *why* is clear — In
              elevator pitches and agent descriptions
            </li>
            <li>
              <strong>XUI fidelity:</strong> Don&apos;t stress XUI at this point —
              directional UI is fine — Acknowledged
            </li>
            <li>
              <strong>CPO appetite:</strong> &quot;My read is that our CPO will want
              even more AI (but the focus on agents)&quot; — Note for deck tone
            </li>
          </ul>

          <h3>Delivery & Presentation</h3>
          <ul>
            <li>
              <strong>Delivery interface:</strong> Don&apos;t put everything in a side
              panel. Vary by use case: embedded in workflow, alternative channels
              (WhatsApp, push), larger JAX, or 2–3 click and done — Per-concept
              delivery defined
            </li>
            <li>
              <strong>Hollywood slide:</strong> Circus tent: banner (3 hero moments)
              hooks them; main event is use cases and mechanics. Both in tandem
            </li>
            <li>
              <strong>Friday visuals:</strong> Don&apos;t need full UI — a window
              (couple of components) per concept to indicate what each agent is
            </li>
            <li>
              <strong>Story structure:</strong> One slide, three images. Intent, not
              mechanics. Candy first, vegetables second
            </li>
          </ul>

          <h3>Actions & Follow-through</h3>
          <ul>
            <li>
              <strong>Checkpoint:</strong> Review checkpoint with David before Diya —
              Done (25 Feb)
            </li>
            <li>
              <strong>Che visibility:</strong> Send to Che for visibility (not a
              pre-check) — Open
            </li>
            <li>
              <strong>Map to known insights:</strong> David dumping cashflow/AP
              research from NotebookLM as &quot;Validation Engine&quot; — Open
            </li>
            <li>
              <strong>Identify segments:</strong> Who: larger SBs, high volume bills,
              goods vs service. Even gut-vibe helps ground the value — Open
            </li>
            <li>
              <strong>SBG/Charlene homepage UI:</strong> David asked if it&apos;s from
              that space — Clarify if needed
            </li>
            <li>
              <strong>Keep pushing:</strong> Jon&apos;s call on how deep to go —
              Ongoing
            </li>
          </ul>

          <h3>Strategic Reframe (25 Feb)</h3>
          <ul>
            <li>
              <strong>&quot;Is this even good?&quot;</strong> Pressing the pay button
              is the easiest part. We had an agent doing the easiest bit. The real
              toil is upstream. Reframe all concepts around upstream toil.
            </li>
            <li>
              <strong>Real agent opportunities:</strong> Auto-coding at bill entry,
              approval workflow automation, fraud/anomaly flagging, policy-based
              decisions within limits. Target v2: bill entry, coding, exception
              handling.
            </li>
            <li>
              <strong>Small business reality:</strong> Supplier relationships in
              WhatsApp, barbecue conversations. Margin pressures = zero tolerance for
              errors. Knowledge graph won&apos;t capture nuances. Ground in real SMB
              behavior.
            </li>
          </ul>

          <h2>Part 2: Latest Direction (25 Feb Reframe)</h2>

          <blockquote className="border-l-4 border-cyan-400 bg-slate-50 py-2 pl-4 text-slate-700">
            &quot;We&apos;re not grappling with feasibility vs ambition anymore,
            it&apos;s actually more &apos;is this even good?&apos; Like... pressing
            the pay button is the easiest part of this whole process. We have an
            agent doing the easiest bit. Versus all the teeth gnashing and toil
            leading up until that moment.&quot;
          </blockquote>

          <h3>Where the Real Toil Is</h3>
          <ul>
            <li>
              <strong>Bill entry:</strong> Uploading bills, checking details,
              matching to the right contact
            </li>
            <li>
              <strong>Account coding:</strong> Getting the right account codes,
              splitting line items
            </li>
            <li>
              <strong>Approval workflows:</strong> Chasing approvers, waiting for
              sign-off, managing exceptions
            </li>
            <li>
              <strong>Context sorting:</strong> Figuring out what&apos;s urgent, what
              can wait, what&apos;s an anomaly
            </li>
          </ul>

          <p>
            An agent that presses &quot;pay&quot; on three ready-to-go bills =
            chatbot wearing an agent costume. An agent that{" "}
            <strong>makes sense of the million steps of a bill</strong> — dragging
            and dropping tons of context into a window and having it sorted out —
            that is a real user need.
          </p>

          <h3>v2 Targets</h3>
          <ul>
            <li>Bill entry / coding assistance</li>
            <li>Approval optimization</li>
            <li>Exception handling</li>
          </ul>

          <h2>Part 3: What Each Agent Does (Clear Descriptions)</h2>

          <h3>Agent 1: Bill Payment Planner</h3>
          <p>
            <strong>What it does:</strong> The agent gathers all unpaid bills, cash
            position, supplier criticality, and delivery times. It applies a
            strategy (Conservative / Standard / Growth) and generates a
            recommendation: which bills to pay this week, when, and in what order.
            It surfaces anomalies before you approve. You see the plan, tap to accept
            or tweak, then batch for payment. When you trust it: three clicks. When
            you don&apos;t: drill into plan mode, anomaly checks, and cash impact.
          </p>
          <p>
            <strong>Where it lives:</strong> Dashboard and bills view (inline, not
            side panel). Optional chat for &quot;show your work&quot; or deeper
            planning.
          </p>
          <p>
            <strong>Upstream toil it tackles:</strong> Today this is manual
            spreadsheet work or gut instinct — &quot;which bills, when, in what
            order?&quot; The planner replaces that cognitive load with a
            recommendation you approve.
          </p>
          <p>
            <strong>Job step (JTBD):</strong> Prepare bills to pay + Decide when to
            pay (into Schedule).
          </p>

          <h3>Agent 2: Intelligent Bill Approval</h3>
          <p>
            <strong>What it does:</strong> The agent monitors bills that need
            approval. It detects risks: duplicates, bank detail changes, unusual
            amounts, policy violations. It routes a summary to the right approver
            via WhatsApp (or email): &quot;Here are 5 items; 4 look good, 1 needs a
            look.&quot; The approver taps to approve the clean ones and gets a link
            to Xero for the exception. No login required. The agent chases approvers
            so the requester doesn&apos;t have to.
          </p>
          <p>
            <strong>Where it lives:</strong> Requester may use in-product
            (bills/chat). Approver experience is <strong>alternative channel</strong>{" "}
            (WhatsApp/email) — not in Xero.
          </p>
          <p>
            <strong>Upstream toil it tackles:</strong> Today approvers are chased via
            email, Slack, or in person. Bills sit in limbo. The agent flags
            anomalies, routes with a GenAI summary, and lets the approver act in 30
            seconds without opening Xero.
          </p>
          <p>
            <strong>Job step (JTBD):</strong> Get approval.
          </p>

          <h3>Agent 3: Just Pay</h3>
          <p>
            <strong>What it does:</strong> The agent lets you pay someone without
            creating a bill first. You say it — in Xero or in an external agent
            (e.g. ChatGPT): &quot;Pay Joel $500.&quot; The agent confirms the
            contact, checks cash flow, creates the bill record, and runs the
            payment. You review and confirm. Done. For recurring or one-off: &quot;Pay
            Joel $500 every month&quot; — agent sets it up. The wow is the agent
            compressing or skipping the full receive-prepare-approve flow.
          </p>
          <p>
            <strong>Where it lives:</strong> In-product (Just Pay entry point) or{" "}
            <strong>in an agent</strong> (ChatGPT, voice). Confirmation can go to
            WhatsApp.
          </p>
          <p>
            <strong>Upstream toil it tackles:</strong> Only 10% of Xero users use
            bills. Meaningful SMB spend is ad-hoc — contractors, reimbursements,
            subscriptions. The full AP process is overkill for &quot;just pay Joe
            $500.&quot; The agent skips or compresses those steps.
          </p>
          <p>
            <strong>Job step (JTBD):</strong> Shortcut into Make payment (often
            skipping Receive → Prepare → Decide → Approve).
          </p>

          <h2>One-Liner Summary (for David / Diya)</h2>
          <blockquote className="border-l-4 border-cyan-400 bg-slate-50 py-2 pl-4 text-slate-700">
            Three agents: (1) <strong>Bill Payment Planner</strong> — we recommend
            which bills to pay this week and when; you approve in 3 clicks. (2){" "}
            <strong>Intelligent Bill Approval</strong> — we flag risk and send
            approval to the right person in WhatsApp; they tap, done. (3){" "}
            <strong>Just Pay</strong> — you say it (in Xero or in your agent), we
            create the bill and pay; no forms. Delivery varies: dashboard for 1,
            WhatsApp for 2, agent or in-product for 3 — not everything in a side
            panel.
          </blockquote>
        </article>
      </main>
    </div>
  );
}
