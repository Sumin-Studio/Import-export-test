import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseScenarioQueryParam } from '../../data/scenarios';
import { usePrototypeStore } from '../../store/prototypeStore';

/** Applies `?scenario=` from the URL across the prototype (moderator links). */
export function ScenarioUrlSync() {
  const [searchParams] = useSearchParams();
  const scenario = usePrototypeStore((s) => s.scenario);
  const setScenario = usePrototypeStore((s) => s.setScenario);

  useEffect(() => {
    const parsed = parseScenarioQueryParam(searchParams.get('scenario'));
    if (parsed && parsed !== scenario) setScenario(parsed);
  }, [searchParams, scenario, setScenario]);

  return null;
}
