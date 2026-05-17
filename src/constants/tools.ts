import { 
  Merge, 
  Scissors, 
  FileArchive, 
  FileText, 
  Presentation, 
  FileSpreadsheet, 
  FileDigit, 
  Type, 
  Image as ImageIcon, 
  PenTool, 
  RotateCw, 
  ShieldAlert, 
  ShieldCheck, 
  Layout, 
  Settings, 
  Info, 
  Camera, 
  Binary, 
  FileSearch, 
  Eraser, 
  Crop, 
  CheckSquare, 
  Bot, 
  Languages,
  Stamp,
  Unlock,
  Wrench,
  Hash,
  ArrowLeftRight,
  FileCode
} from "lucide-react";

export const PDF_TOOLS = [
  {
    id: "merge",
    name: "Merge PDF",
    description: "Combine PDFs in the order you want with the easiest PDF merger available.",
    icon: Merge,
    color: "bg-red-500",
    api: "/api/merge"
  },
  {
    id: "split",
    name: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: Scissors,
    color: "bg-orange-500",
    api: "/api/split"
  },
  {
    id: "compress",
    name: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: FileArchive,
    color: "bg-blue-500"
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
    icon: FileText,
    color: "bg-blue-600"
  },
  {
    id: "pdf-to-pptx",
    name: "PDF to PowerPoint",
    description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
    icon: Presentation,
    color: "bg-red-600"
  },
  {
    id: "pdf-to-excel",
    name: "PDF to Excel",
    description: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    icon: FileSpreadsheet,
    color: "bg-green-600"
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Make DOC and DOCX files easy to read by converting them to PDF.",
    icon: FileText,
    color: "bg-blue-400"
  },
  {
    id: "pptx-to-pdf",
    name: "PowerPoint to PDF",
    description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
    icon: Presentation,
    color: "bg-red-400"
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    icon: FileSpreadsheet,
    color: "bg-green-400"
  },
  {
    id: "edit",
    name: "Edit PDF",
    description: "Add text, images, shapes or freehand annotations to a PDF document.",
    icon: PenTool,
    color: "bg-purple-500"
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: ImageIcon,
    color: "bg-yellow-500"
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
    icon: ImageIcon,
    color: "bg-yellow-600"
  },
  {
    id: "sign",
    name: "Sign PDF",
    description: "Sign yourself or request electronic signatures from others.",
    icon: PenTool,
    color: "bg-indigo-500"
  },
  {
    id: "watermark",
    name: "Watermark",
    description: "Stamp an image or text over your PDF in seconds.",
    icon: Stamp,
    color: "bg-blue-700"
  },
  {
    id: "rotate",
    name: "Rotate PDF",
    description: "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!",
    icon: RotateCw,
    color: "bg-pink-500"
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    description: "Convert webpages in HTML to PDF. Copy and paste the URL.",
    icon: FileCode,
    color: "bg-gray-700"
  },
  {
    id: "unlock",
    name: "Unlock PDF",
    description: "Remove PDF password security, giving you the freedom to use your PDFs.",
    icon: Unlock,
    color: "bg-orange-600"
  },
  {
    id: "protect",
    name: "Protect PDF",
    description: "Protect PDF files with a password. Encrypt PDF documents.",
    icon: ShieldCheck,
    color: "bg-red-700"
  },
  {
    id: "organize",
    name: "Organize PDF",
    description: "Sort pages of your PDF file however you like. Delete or add pages.",
    icon: Layout,
    color: "bg-blue-800"
  },
  {
    id: "pdf-to-pdfa",
    name: "PDF to PDF/A",
    description: "Transform your PDF to PDF/A for long-term archiving.",
    icon: FileText,
    color: "bg-gray-600"
  },
  {
    id: "repair",
    name: "Repair PDF",
    description: "Repair a damaged PDF and recover data from corrupt PDF.",
    icon: Wrench,
    color: "bg-green-700"
  },
  {
    id: "page-numbers",
    name: "Page numbers",
    description: "Add page numbers into PDFs with ease.",
    icon: Hash,
    color: "bg-blue-500"
  },
  {
    id: "scan-to-pdf",
    name: "Scan to PDF",
    description: "Capture document scans from your mobile device.",
    icon: Camera,
    color: "bg-cyan-600"
  },
  {
    id: "ocr",
    name: "OCR PDF",
    description: "Easily convert scanned PDF into searchable and selectable documents.",
    icon: Binary,
    color: "bg-indigo-600"
  },
  {
    id: "compare",
    name: "Compare PDF",
    description: "Show a side-by-side document comparison and spot changes.",
    icon: ArrowLeftRight,
    color: "bg-gray-500"
  },
  {
    id: "redact",
    name: "Redact PDF",
    description: "Redact text and graphics to permanently remove sensitive information.",
    icon: Eraser,
    color: "bg-red-800"
  },
  {
    id: "crop",
    name: "Crop PDF",
    description: "Crop margins of PDF documents or select specific areas.",
    icon: Crop,
    color: "bg-yellow-700"
  },
  {
    id: "forms",
    name: "PDF Forms",
    description: "Detect form fields automatically, create interactive fillable PDFs.",
    icon: CheckSquare,
    color: "bg-purple-600"
  },
  {
    id: "ai-summarizer",
    name: "AI Summarizer",
    description: "Quickly generate concise summaries from articles using AI.",
    icon: Bot,
    color: "bg-teal-600",
    api: "/api/ai-summarize"
  },
  {
    id: "translate",
    name: "Translate PDF",
    description: "Easily translate PDF files powered by AI.",
    icon: Languages,
    color: "bg-rose-600",
    api: "/api/ai-translate"
  }
];
