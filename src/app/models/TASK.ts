import { ICATEGORY } from "./CATEGORY";

export interface ITASK{
    completed: boolean;
    body: string;
    category: ICATEGORY;
}