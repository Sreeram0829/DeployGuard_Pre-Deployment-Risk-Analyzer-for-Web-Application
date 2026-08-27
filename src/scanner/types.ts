import type {Finding} from "@/types/finding";
export interface ScannedFile{relativePath:string;absolutePath:string;size:number;content?:string;}
export interface ScannerContext{rootDir:string;files:ScannedFile[];packageJson?:Record<string,unknown>;}
export type ScannerRule=(context:ScannerContext)=>Promise<Finding[]>|Finding[];
