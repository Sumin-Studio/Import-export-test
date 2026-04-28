import { create } from 'zustand';
import type {
  FinalVariant,
  IssueAdjustmentRecord,
  ProgressVariant,
  ReviewScenario,
} from '../types/domain';

export interface PrototypeState {
  scenario: ReviewScenario;
  progressVariant: ProgressVariant;
  showTimeEstimate: boolean;
  moderatorPanelOpen: boolean;
  expertHelpOpen: boolean;
  expertReviewChoice: 'none' | 'requested' | 'declined';
  finalVariant: FinalVariant;
  resolvedIssueIds: Record<string, boolean>;
  /** Per-issue adjustments applied before marking resolved */
  issueAdjustments: Record<string, IssueAdjustmentRecord>;
  issueSeverityFilter: 'all' | 'critical' | 'recommended' | 'optional';
  /** Moderator toggles for optional screens */
  enablePricingRoute: boolean;
  enableCompareRoute: boolean;
  /** Simulated UI state */
  connectComplete: boolean;

  setScenario: (s: ReviewScenario) => void;
  setProgressVariant: (v: ProgressVariant) => void;
  setShowTimeEstimate: (v: boolean) => void;
  setModeratorPanelOpen: (v: boolean) => void;
  setExpertHelpOpen: (v: boolean) => void;
  setExpertReviewChoice: (c: 'none' | 'requested' | 'declined') => void;
  setFinalVariant: (v: FinalVariant) => void;
  resolveIssue: (id: string, resolved: boolean) => void;
  setIssueAdjustment: (id: string, adjustment: IssueAdjustmentRecord | null) => void;
  setIssueSeverityFilter: (f: PrototypeState['issueSeverityFilter']) => void;
  setEnablePricingRoute: (v: boolean) => void;
  setEnableCompareRoute: (v: boolean) => void;
  setConnectComplete: (v: boolean) => void;
  resetFlow: () => void;
}

const initial: Pick<
  PrototypeState,
  | 'scenario'
  | 'progressVariant'
  | 'showTimeEstimate'
  | 'moderatorPanelOpen'
  | 'expertHelpOpen'
  | 'expertReviewChoice'
  | 'finalVariant'
  | 'resolvedIssueIds'
  | 'issueAdjustments'
  | 'issueSeverityFilter'
  | 'enablePricingRoute'
  | 'enableCompareRoute'
  | 'connectComplete'
> = {
  scenario: 'smooth',
  progressVariant: 'clean',
  showTimeEstimate: true,
  moderatorPanelOpen: false,
  expertHelpOpen: false,
  expertReviewChoice: 'none',
  finalVariant: 'ready',
  resolvedIssueIds: {},
  issueAdjustments: {},
  issueSeverityFilter: 'all',
  enablePricingRoute: true,
  enableCompareRoute: true,
  connectComplete: false,
};

export const usePrototypeStore = create<PrototypeState>((set) => ({
  ...initial,

  setScenario: (scenario) =>
    set({
      scenario,
      resolvedIssueIds: {},
      issueAdjustments: {},
    }),
  setProgressVariant: (progressVariant) => set({ progressVariant }),
  setShowTimeEstimate: (showTimeEstimate) => set({ showTimeEstimate }),
  setModeratorPanelOpen: (moderatorPanelOpen) => set({ moderatorPanelOpen }),
  setExpertHelpOpen: (expertHelpOpen) => set({ expertHelpOpen }),
  setExpertReviewChoice: (expertReviewChoice) => set({ expertReviewChoice }),
  setFinalVariant: (finalVariant) => set({ finalVariant }),
  resolveIssue: (id, resolved) =>
    set((s) => {
      const nextAdj = { ...s.issueAdjustments };
      if (!resolved) delete nextAdj[id];
      return {
        resolvedIssueIds: { ...s.resolvedIssueIds, [id]: resolved },
        issueAdjustments: nextAdj,
      };
    }),
  setIssueAdjustment: (id, adjustment) =>
    set((s) => {
      const next = { ...s.issueAdjustments };
      if (adjustment === null) delete next[id];
      else next[id] = adjustment;
      return { issueAdjustments: next };
    }),
  setIssueSeverityFilter: (issueSeverityFilter) => set({ issueSeverityFilter }),
  setEnablePricingRoute: (enablePricingRoute) => set({ enablePricingRoute }),
  setEnableCompareRoute: (enableCompareRoute) => set({ enableCompareRoute }),
  setConnectComplete: (connectComplete) => set({ connectComplete }),
  resetFlow: () =>
    set({
      ...initial,
      resolvedIssueIds: {},
      issueAdjustments: {},
    }),
}));
