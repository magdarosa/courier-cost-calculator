export interface Dimensions {
    length: number;
    width: number;
    height: number;
}

export enum ParcelSize {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
    XL = 'XL',
}

export interface Parcel {
    readonly id: string;
    readonly dimensions: Dimensions;
}

export interface OrderOptions {
    speedyShipping?: boolean;
}   

export interface CostItem {
    readonly type: string;
    readonly cost: number;
}

export interface OrderCalculation {
    readonly items: CostItem[];
    readonly totalCost: number;
}
