import ToolCard from "./ToolCard";
import { PDF_TOOLS } from "../constants/tools";

export default function ToolGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {PDF_TOOLS.map((tool) => (
        <ToolCard 
          key={tool.id}
          id={tool.id}
          name={tool.name}
          description={tool.description}
          icon={tool.icon}
          color={tool.color}
        />
      ))}
    </div>
  );
}

