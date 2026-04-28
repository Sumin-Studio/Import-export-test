import { BuilderList } from "@/components/builders/builder-list";
import { Builder } from "@/lib/builders";

interface PipelineTabProps {
    builders: Builder[];
}

export function PipelineTab({ builders }: PipelineTabProps) {
    return (
        <div className="py-8">
            <BuilderList builders={builders} />
        </div>
    );
}
