import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LucideIcon } from "lucide-react"

interface ListBoxProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    date?: Date;
    isUpperCase?: boolean;
}

export const ListBox = ({icon: Icon, title, description, date, isUpperCase}:ListBoxProps) => {
    return (
        <div className="flex gap-x-4">
            <div className="bg-violet-400 flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0">
                <Icon className="text-white" />
            </div>
            <div className="space-y-1">
                <h4 className="font-semibold">{title}</h4>
                <p className={cn("text-muted-foreground break-words leading-4", isUpperCase && "uppercase")}>
                    {date ? format(date, "dd MMM yyyy") : description}
                </p>
            </div>
        </div>
    )
}