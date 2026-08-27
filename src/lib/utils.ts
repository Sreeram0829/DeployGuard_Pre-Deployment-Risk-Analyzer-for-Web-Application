export function cn(...classes:Array<string|false|null|undefined>){return classes.filter(Boolean).join(" ");}
export function clamp(value:number,min:number,max:number){return Math.min(max,Math.max(min,value));}
