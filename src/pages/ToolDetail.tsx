import { useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PDF_TOOLS } from "../constants/tools";
import { Helmet } from "react-helmet-async";
import { Upload, File, CheckCircle, AlertCircle, Loader2, Download, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = PDF_TOOLS.find((t) => t.id === id);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiData, setAiData] = useState<any>(null);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setError(null);
      setResult(null);
      setAiData(null);
    }
  };

  const processFile = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    if (files.length === 1) formData.append("file", files[0]);

    try {
      const response = await fetch(tool.api || "/api/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Processing failed");
      }

      if (id?.includes("ai")) {
        const data = await response.json();
        setAiData(data);
      } else {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setResult(url);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Helmet>
        <title>{tool.name} - PDFMaster</title>
        <meta name="description" content={tool.description} />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className={cn(
            "inline-flex p-5 rounded-2xl text-white mb-6 shadow-lg",
            isSpecial ? "bg-blue-600" : tool.color
          )}>
            <tool.icon size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{tool.name}</h1>
          <p className="text-xl text-slate-600 font-medium">{tool.description}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8">
            {!result && !aiData && !isProcessing && (
              <div 
                className="border-2 border-dashed border-slate-200 rounded-xl py-20 px-4 text-center hover:border-blue-500 transition-colors cursor-pointer group"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 transition-colors">
                  <Upload className="text-slate-400 group-hover:text-blue-500 transition-colors" size={32} />
                </div>
                <p className="text-lg font-bold text-slate-900 mb-2">Select PDF files</p>
                <p className="text-slate-500">or drop PDFs here</p>
                <input 
                  id="file-input"
                  type="file" 
                  multiple 
                  className="hidden" 
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {files.length > 0 && !result && !aiData && !isProcessing && (
              <div className="mt-8">
                <div className="space-y-3 mb-8">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <File className="text-blue-600" />
                      <span className="font-medium text-slate-700 truncate flex-1">{f.name}</span>
                      <span className="text-sm text-slate-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={processFile}
                  className={cn(
                    "w-full py-5 rounded-xl font-bold text-xl transition-all shadow-sm active:scale-[0.98] text-white",
                    isSpecial ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                  )}
                >
                  Process Now
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="py-20 text-center">
                <Loader2 className="animate-spin text-blue-600 mx-auto mb-6" size={64} />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Processing your {files.length > 1 ? "files" : "file"}</h3>
                <p className="text-slate-500">This will only take a few seconds...</p>
              </div>
            )}

            {result && (
              <div className="py-12 text-center">
                <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-emerald-500" size={40} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Success!</h3>
                <a 
                  href={result}
                  download={`processed-${id}.pdf`}
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
                >
                  <Download /> Download file
                </a>
                <button 
                  onClick={() => {setResult(null); setFiles([]);}}
                  className="block mx-auto mt-8 text-slate-500 font-bold hover:text-slate-700"
                >
                  Process another file
                </button>
              </div>
            )}

            {aiData && (
              <div className="py-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Bot className="text-blue-600" /> 
                  AI Analysis Result:
                </h3>
                <div className="prose prose-blue max-w-none bg-slate-50 p-8 rounded-xl border border-slate-100 font-medium leading-relaxed">
                  {aiData.summary || aiData.translation}
                </div>
                <button 
                  onClick={() => {setAiData(null); setFiles([]);}}
                  className="block mx-auto mt-8 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Try another
                </button>
              </div>
            )}

            {error && (
              <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-xl flex gap-4 items-start">
                <AlertCircle className="text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-rose-900">Error processing file</h4>
                  <p className="text-rose-700">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
