import * as React from "react"; import {cn} from "@/lib/utils";
export const Card=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn("rounded-xl border bg-white text-slate-950 shadow-sm",className)} {...p}/>;
export const CardHeader=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn("flex flex-col space-y-1.5 p-6",className)} {...p}/>;
export const CardTitle=({className,...p}:React.HTMLAttributes<HTMLHeadingElement>)=><h3 className={cn("font-semibold leading-none tracking-tight",className)} {...p}/>;
export const CardDescription=({className,...p}:React.HTMLAttributes<HTMLParagraphElement>)=><p className={cn("text-sm text-slate-500",className)} {...p}/>;
export const CardContent=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn("p-6 pt-0",className)} {...p}/>;
