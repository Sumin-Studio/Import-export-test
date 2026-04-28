import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "@/pages";
import globalConfig from "@/config/global.json";

export function App() {
  // Set document title from global config
  useEffect(() => {
    if (globalConfig.appTitle) {
      document.title = globalConfig.appTitle;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
