import { cn, formattedStr } from "@/lib/utils";
import { format } from "date-fns";
import { LucideIcon } from "lucide-react"
import { Badge } from "./ui/badge";

interface ListBoxProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    date?: Date;
    isUpperCase?: boolean;
    badge?: string[];
    isFormatedStr?: boolean;
}

export const ListBox = ({ icon: Icon, title, description, date, isUpperCase, badge = [], isFormatedStr }: ListBoxProps) => {
    console.log(badge)
    return (
        <div className="flex gap-x-4">
            <div className="bg-slate-500 flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0">
                <Icon className="text-white" />
            </div>
            <div className="space-y-1">
                <h4 className="font-semibold">{title}</h4>
                {badge?.length > 1 ? (
                    <div className="flex items-center gap-x-1">
                        {badge.map((v, i) => (
                            <Badge key={i}>{formattedStr(v)}</Badge>
                        ))}
                    </div>
                ) : null}
                <p className={cn("text-muted-foreground break-words leading-4", isUpperCase && "uppercase")}>
                    {date ? format(date, "dd MMM yyyy") : isFormatedStr ? formattedStr(description || "") : description}
                </p>
            </div>
        </div>
    )
}