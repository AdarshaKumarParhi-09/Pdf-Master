import ToolGrid from "../components/ToolGrid";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-8 space-y-8 overflow-hidden bg-slate-50">
      <Helmet>
        <title>PDFMaster - Every PDF tool at your fingertips</title>
        <meta name="description" content="The most efficient document engine for splitting, merging, and converting PDFs with integrated AI power." />
      </Helmet>

      <section className="text-center max-w-2xl shrink-0">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Every PDF tool at your fingertips
        </h1>
        <p className="text-lg text-slate-600">
          The most efficient document engine for splitting, merging, and converting PDFs with integrated AI power.
        </p>
      </section>

      <main className="w-full max-w-6xl mx-auto">
        <ToolGrid />
      </main>

      <section className="mt-auto pb-4 w-full max-w-6xl flex items-center justify-between border-t border-slate-200 pt-6 px-4">
        <div className="flex items-center gap-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline">
            Trusted by 5M+ Teams
          </span>
          <div className="flex gap-4 opacity-40 grayscale items-center">
            <div className="font-bold text-sm italic tracking-tighter">GLOBALTECH</div>
            <div className="font-bold text-sm italic tracking-tighter">NEXUS CORP</div>
            <div className="font-bold text-sm italic tracking-tighter">SKYLINE IND.</div>
          </div>
        </div>
        <div className="text-xs text-slate-400 text-right">
          © 2026 PDFMaster Engine • SEO Optimized • ISO 27001 Certified
        </div>
      </section>
    </div>
  );
}
