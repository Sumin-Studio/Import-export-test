# JAX cashflow chat from Spotlight

**Overview:** When the user clicks "Discuss with JAX" on the cashflow suggestion, open the JAX panel in a chat view that shows an initial conversation about their cashflow position (8 days runway), with a proper chat UI. Messages persist across panel close/open and (via localStorage) across page refresh.

## Current state (before implementation)

- **Spotlight** (`prototypes/payments-agents/src/app/components/widgets/Spotlight.tsx`): "Discuss with JAX" called `openPanel("jax")` with no context.
- **NavigationContext** (`prototypes/payments-agents/src/app/contexts/NavigationContext.tsx`): `openPanel(panel, subPanel?, isDirect?)` already supports an optional `subPanel` (e.g. `"cashflow"`).
- **JaxPanel** (`prototypes/payments-agents/src/app/components/panels/JaxPanel.tsx`): No chat UI. It showed a static hero ("What business task can I help with today?"), quick-action buttons, and a single input. No message list or conversation thread.

## Approach

Use the existing `subPanel` parameter to pass entry context: when opening from the cashflow suggestion, call `openPanel("jax", "cashflow", true)`. JaxPanel reads `activeSubPanel === "cashflow"` and renders a chat view with an initial assistant message that presents the user's cashflow position, then allows back-and-forth in a chat UI. Messages are stored in **JaxChatContext** keyed by entry point and persisted to localStorage.

## Implementation (done)

### 1. Spotlight: open JAX with cashflow context

In Spotlight, the "Discuss with JAX" button handler calls `openPanel("jax", "cashflow", true)` when the current suggestion is the cashflow one (`current?.id === "cashflow-low"`); otherwise `openPanel("jax")`.

### 2. JaxChatContext

New context `src/app/contexts/JaxChatContext.tsx`:

- Provider holds messages keyed by entry point (e.g. `"cashflow"`).
- API: `getMessages(entry)`, `appendMessage(entry, msg)`, `seedIfEmpty(entry, msg)`.
- Persistence: messages are written to `localStorage` (`jax-chat-messages`) so the thread survives page refresh. On hydration, stored threads are merged with any in-memory state so a just-seeded thread is not overwritten.
- Provider is wired in `src/app/layout.tsx` inside `NavigationProvider`.

### 3. JaxPanel: chat UI and cashflow entry mode

- When `activeSubPanel === "cashflow"`, JaxPanel seeds the thread with one assistant message if empty: "Based on your cashflow projections, you have 8 days of cash on hand starting next week. I can help you make a plan to smooth this out. What would you like to do first?"
- **Cashflow chat mode** (`activeSubPanel === "cashflow"` and `messages.length > 0`): The hero and quick-action block are replaced by a scrollable message list (user messages right-aligned, assistant left-aligned). The sticky bottom area (input, send button, disclaimer) is unchanged. On submit, the user message and a mock assistant reply are appended via context.
- **Default mode**: When not in cashflow mode or when there are no messages, the original hero, quick-action buttons, and input are shown.
- Send: Enter or send button appends user message and a placeholder assistant reply (prototype-only; no backend).

### 4. Files changed

| File | Change |
|------|--------|
| `prototypes/payments-agents/src/app/components/widgets/Spotlight.tsx` | "Discuss with JAX" calls `openPanel("jax", "cashflow", true)` when `current?.id === "cashflow-low"`, else `openPanel("jax")`. |
| `prototypes/payments-agents/src/app/components/panels/JaxPanel.tsx` | Uses JaxChatContext; when `activeSubPanel === "cashflow"` seeds one assistant message if thread empty; scrollable chat view and send handler; messages persist via context and localStorage. |
| `prototypes/payments-agents/src/app/contexts/JaxChatContext.tsx` | New: provider with `getMessages`, `appendMessage`, `seedIfEmpty`; localStorage read/write with merge on hydration. |
| `prototypes/payments-agents/src/app/layout.tsx` | Wraps content in `JaxChatProvider` inside `NavigationProvider`. |

## Out of scope (prototype)

- Real AI or API calls.
- Other entry points (e.g. "Discuss with JAX" from other suggestions) — they continue to open JAX in the default empty state.
