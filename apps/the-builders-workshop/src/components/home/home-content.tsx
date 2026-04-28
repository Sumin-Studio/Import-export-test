"use client";

import { useState, useCallback } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { TabNavigation } from "@/components/home/tab-navigation";
import { GettingStartedTab } from "@/components/home/getting-started-tab";
import { MakingStuffTab } from "@/components/home/making-stuff-tab";
import { ConnectingToGitHubTab } from "@/components/home/connecting-to-github-tab";
import { PromptGuideTab } from "@/components/home/prompt-guide-tab";
import { PipelineTab } from "@/components/home/pipeline-tab";
import { PrototypePlaygroundTab } from "@/components/home/prototype-playground-tab";
import { FluencyStatusTab } from "@/components/home/fluency-status-tab";
import { GetInspiredTab } from "@/components/home/get-inspired-tab";

import { StepHelpSidebar } from "@/components/help/step-help-sidebar";
import { MobileProgressBar } from "@/components/help/mobile-progress-bar";
import {
  MILESTONE_KEYS,
  STEP_TITLES,
  GITHUB_MILESTONE_KEYS,
  GITHUB_STEP_TITLES,
  MAKING_STUFF_MILESTONE_KEYS,
  MAKING_STUFF_STEP_TITLES,
} from "@/components/help/getting-started-help-data";
import { Builder } from "@/lib/builders";
import { BUILDERS_WORKSHOP_SLACK } from "@/lib/builders-workshop-slack";

type MainTab =
  | "Install the tools"
  | "Build your first projects"
  | "Collaborate with your team"
  | "Get Inspired";
type MenuTab =
  | "Fluency Status"
  | "Pipeline"
  | "Showcase"
  | "Prompt Guide"
  | "Prototype Playground";
type AllTabs = MainTab | MenuTab;

interface HomeContentProps {
  builders: Builder[];
  activeTab: AllTabs;
  showTabs?: boolean;
}

export function HomeContent({ builders, activeTab, showTabs = true }: HomeContentProps) {
  const mainTabs: MainTab[] = [
    "Install the tools",
    "Build your first projects",
    "Collaborate with your team",
    "Get Inspired",
  ];

  const [gsActiveStep, setGsActiveStep] = useState<string>(MILESTONE_KEYS[0]);
  const [gsCompletions, setGsCompletions] = useState<Record<string, string>>({});

  const [ghActiveStep, setGhActiveStep] = useState<string>(GITHUB_MILESTONE_KEYS[0]);
  const [ghCompletions, setGhCompletions] = useState<Record<string, string>>({});

  const [msActiveStep, setMsActiveStep] = useState<string>(MAKING_STUFF_MILESTONE_KEYS[0]);
  const [msCompletions, setMsCompletions] = useState<Record<string, string>>({});

  const handleGsActiveStepChange = useCallback((key: string) => {
    setGsActiveStep(key);
  }, []);
  const handleGsCompletionsChange = useCallback((c: Record<string, string>) => {
    setGsCompletions(c);
  }, []);

  const handleGhActiveStepChange = useCallback((key: string) => {
    setGhActiveStep(key);
  }, []);
  const handleGhCompletionsChange = useCallback((c: Record<string, string>) => {
    setGhCompletions(c);
  }, []);

  const handleMsActiveStepChange = useCallback((key: string) => {
    setMsActiveStep(key);
  }, []);
  const handleMsCompletionsChange = useCallback((c: Record<string, string>) => {
    setMsCompletions(c);
  }, []);

  const GITHUB_RESOURCES = [
    BUILDERS_WORKSHOP_SLACK,
    {
      label: "GitHub Enterprise Docs",
      url: "https://paas.xero.dev/docs/github/github-cloud",
    },
  ];

  return (
    <SiteLayout>
      <div className="space-y-8">
        <div id="tabs" className="scroll-mt-8">
          {showTabs && <TabNavigation tabs={mainTabs} activeTab={activeTab} />}

          <div className={showTabs ? "mt-2" : ""}>
            {activeTab === "Install the tools" && (
              <div className="flex gap-8 pt-8">
                <div className="min-w-0 flex-1">
                  <MobileProgressBar
                    milestoneKeys={MILESTONE_KEYS}
                    completions={gsCompletions}
                    activeStepKey={gsActiveStep}
                  />
                  <GettingStartedTab
                    onActiveStepChange={handleGsActiveStepChange}
                    onCompletionsChange={handleGsCompletionsChange}
                  />
                </div>
                <StepHelpSidebar
                  milestoneKeys={MILESTONE_KEYS}
                  stepTitles={STEP_TITLES}
                  completions={gsCompletions}
                  activeStepKey={gsActiveStep}
                />
              </div>
            )}
            {activeTab === "Build your first projects" && (
              <div className="flex gap-8 pt-8">
                <div className="min-w-0 flex-1">
                  <MobileProgressBar
                    milestoneKeys={MAKING_STUFF_MILESTONE_KEYS}
                    completions={msCompletions}
                    activeStepKey={msActiveStep}
                  />
                  <MakingStuffTab
                    onActiveStepChange={handleMsActiveStepChange}
                    onCompletionsChange={handleMsCompletionsChange}
                  />
                </div>
                <StepHelpSidebar
                  milestoneKeys={MAKING_STUFF_MILESTONE_KEYS}
                  stepTitles={MAKING_STUFF_STEP_TITLES}
                  completions={msCompletions}
                  activeStepKey={msActiveStep}
                />
              </div>
            )}
            {activeTab === "Collaborate with your team" && (
              <div className="flex gap-8 pt-8">
                <div className="min-w-0 flex-1">
                  <MobileProgressBar
                    milestoneKeys={GITHUB_MILESTONE_KEYS}
                    completions={ghCompletions}
                    activeStepKey={ghActiveStep}
                  />
                  <ConnectingToGitHubTab
                    onActiveStepChange={handleGhActiveStepChange}
                    onCompletionsChange={handleGhCompletionsChange}
                  />
                </div>
                <StepHelpSidebar
                  milestoneKeys={GITHUB_MILESTONE_KEYS}
                  stepTitles={GITHUB_STEP_TITLES}
                  completions={ghCompletions}
                  activeStepKey={ghActiveStep}
                  resources={GITHUB_RESOURCES}
                />
              </div>
            )}
            {activeTab === "Get Inspired" && <GetInspiredTab />}
            {(activeTab === "Showcase" || activeTab === "Prototype Playground") && (
              <div className="pt-8">
                <PrototypePlaygroundTab />
              </div>
            )}
            {activeTab === "Prompt Guide" && <PromptGuideTab />}
            {activeTab === "Pipeline" && <PipelineTab builders={builders} />}
            {activeTab === "Fluency Status" && <FluencyStatusTab />}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
