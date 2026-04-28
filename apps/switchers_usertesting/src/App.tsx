import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ModeratorControls } from './components/moderator/ModeratorControls';
import { ScenarioUrlSync } from './components/moderator/ScenarioUrlSync';
import { ExpertChatDrawer } from './components/expert/ExpertChatDrawer';
import { usePrototypeStore } from './store/prototypeStore';
import { OverviewPage } from './pages/OverviewPage';
import { ConnectPage } from './pages/ConnectPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ReviewPage } from './pages/ReviewPage';
import { FinalPage } from './pages/FinalPage';
import { DonePage } from './pages/DonePage';
import { CompareOptionsPage } from './pages/CompareOptionsPage';
import { PricingPage } from './pages/PricingPage';
import { SummaryPage } from './pages/SummaryPage';

function OptionalRoute({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  if (!enabled) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const enableCompare = usePrototypeStore((s) => s.enableCompareRoute);
  const enablePricing = usePrototypeStore((s) => s.enablePricingRoute);

  return (
    <>
      <ScenarioUrlSync />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/confirm" element={<FinalPage />} />
        <Route path="/done" element={<DonePage />} />
        <Route path="/final" element={<Navigate to="/confirm" replace />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route
          path="/compare-options"
          element={
            <OptionalRoute enabled={enableCompare}>
              <CompareOptionsPage />
            </OptionalRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <OptionalRoute enabled={enablePricing}>
              <PricingPage />
            </OptionalRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ModeratorControls />
      <ExpertChatDrawer />
    </>
  );
}
