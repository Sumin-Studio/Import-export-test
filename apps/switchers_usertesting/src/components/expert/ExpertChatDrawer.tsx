import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { usePrototypeStore } from '../../store/prototypeStore';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import './expertChatDrawer.css';

const INTRO_ASSISTANT =
  "Hi — I'm here to help with your payroll switch from QuickBooks. Ask me simple questions about the review steps, import tags (Looks consistent, Quick review, Needs review), or what happens next. " +
  "If you need someone to validate your transfer end-to-end, use a quick option below or tell me what you need.";

const PRESETS: { id: string; label: string }[] = [
  { id: 'transfer', label: 'Review my QuickBooks transfer for me' },
  { id: 'correct', label: 'How do I know my import is correct?' },
  { id: 'timeline', label: 'What happens after I confirm?' },
];

const REPLY_CORRECT =
  "We tag rows so you can focus on Quick review or Needs review first. On the confirm step you'll see the full picture — company, employees, earnings, YTD, and tax — so you can sanity-check against how you run payroll.";

const REPLY_TIMELINE =
  "After you finish review and confirm, you'll wrap up in Xero Payroll. If you request specialist help, our team follows up with next steps — you're not on your own.";

const SPECIALIST_PROMPT =
  "A transfer specialist can review your QuickBooks mappings and payroll setup with you before you finalize. Would you like to connect with a transfer specialist?";

const AFTER_SPECIALIST_YES =
  "You're set — we'll have a transfer specialist reach out with next steps. You can keep working through your review in the meantime.";

const AFTER_SPECIALIST_NO =
  "No problem. I'm still here if you want to walk through anything else or change your mind later.";

const FREE_TEXT_REPLY =
  "Thanks for asking. For steps and tags on this screen I can point you in the right direction. For anything specific to your books or taxes, a transfer specialist can go deeper — tap “Review my QuickBooks transfer for me” above anytime.";

type ChatMessage =
  | {
      id: string;
      role: 'assistant';
      text: string;
      specialistPrompt?: boolean;
    }
  | { id: string; role: 'user'; text: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ExpertChatDrawer() {
  const open = usePrototypeStore((s) => s.expertHelpOpen);
  const setOpen = usePrototypeStore((s) => s.setExpertHelpOpen);
  const setExpertReviewChoice = usePrototypeStore((s) => s.setExpertReviewChoice);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [transferPresetUsed, setTransferPresetUsed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    setMessages([{ id: uid(), role: 'assistant', text: INTRO_ASSISTANT }]);
    setInput('');
    setTransferPresetUsed(false);
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const pushUser = (text: string) => {
    setMessages((m) => [...m, { id: uid(), role: 'user', text }]);
  };

  const pushAssistant = (text: string, specialistPrompt?: boolean) => {
    setMessages((m) => [...m, { id: uid(), role: 'assistant', text, specialistPrompt }]);
  };

  const onPreset = (id: string, label: string) => {
    pushUser(label);
    if (id === 'transfer') {
      setTransferPresetUsed(true);
      pushAssistant(SPECIALIST_PROMPT, true);
      return;
    }
    if (id === 'correct') {
      pushAssistant(REPLY_CORRECT);
      return;
    }
    if (id === 'timeline') {
      pushAssistant(REPLY_TIMELINE);
    }
  };

  const confirmSpecialist = () => {
    setExpertReviewChoice('requested');
    setMessages((m) => {
      const cleared = m.map((x) =>
        x.role === 'assistant' && x.specialistPrompt ? { ...x, specialistPrompt: false } : x,
      );
      return [...cleared, { id: uid(), role: 'assistant', text: AFTER_SPECIALIST_YES }];
    });
    scrollToBottom();
  };

  const declineSpecialist = () => {
    setMessages((m) => {
      const cleared = m.map((x) =>
        x.role === 'assistant' && x.specialistPrompt ? { ...x, specialistPrompt: false } : x,
      );
      return [...cleared, { id: uid(), role: 'assistant', text: AFTER_SPECIALIST_NO }];
    });
    scrollToBottom();
  };

  const onSubmitFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    pushUser(t);
    setInput('');
    pushAssistant(FREE_TEXT_REPLY);
  };

  const pendingSpecialistPrompt = messages.some(
    (m) => m.role === 'assistant' && m.specialistPrompt === true,
  );

  return (
    <Drawer
      open={open}
      title="Payroll switching help"
      onClose={() => setOpen(false)}
      bodyClassName="x-drawer__body--flush"
    >
      <div className="x-expert-chat">
        <div className="x-expert-chat__messages" ref={listRef}>
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === 'user' ? (
                <div className="x-expert-chat__bubble x-expert-chat__bubble--user">{msg.text}</div>
              ) : (
                <div className="x-expert-chat__bubble x-expert-chat__bubble--assistant">
                  {msg.text}
                  {msg.specialistPrompt ? (
                    <div className="x-expert-chat__bubble-actions">
                      <Button type="button" variant="primary" size="md" onClick={confirmSpecialist}>
                        Yes, connect me with a specialist
                      </Button>
                      <Button type="button" variant="secondary" size="md" onClick={declineSpecialist}>
                        Not right now
                      </Button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="x-expert-chat__composer-wrap">
          <div className="x-expert-chat__presets-label">Suggestions</div>
          <div className="x-expert-chat__presets" role="group" aria-label="Suggested prompts">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="x-expert-chat__preset"
                disabled={
                  (p.id === 'transfer' && transferPresetUsed) ||
                  (p.id === 'transfer' && pendingSpecialistPrompt)
                }
                onClick={() => onPreset(p.id, p.label)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <form className="x-expert-chat__form" onSubmit={onSubmitFreeText}>
            <label htmlFor={inputId} className="x-visually-hidden">
              Your question
            </label>
            <input
              id={inputId}
              type="text"
              className="x-expert-chat__input"
              placeholder="Ask a simple question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <Button type="submit" variant="secondary" size="md" className="x-expert-chat__send">
              Send
            </Button>
          </form>
        </div>
      </div>

    </Drawer>
  );
}
