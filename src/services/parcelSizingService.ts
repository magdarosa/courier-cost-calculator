import { ParcelSize } from '../types';

export class ParcelSizingService {
  private readonly baseCosts: Record<ParcelSize, number> = {
    [ParcelSize.SMALL]: 3,
    [ParcelSize.MEDIUM]: 8,
    [ParcelSize.LARGE]: 15,
    [ParcelSize.XL]: 25,
  };

  getBaseCost(size: ParcelSize): number {
    return this.baseCosts[size];
  }
}