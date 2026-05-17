/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ToolDetail from "./pages/ToolDetail";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tool/:id" element={<ToolDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

