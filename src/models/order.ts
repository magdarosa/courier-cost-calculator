import { Parcel } from './parcel';
import { OrderOptions } from '../types';

export class Order {
  constructor(
    public readonly parcels: Parcel[],
    public readonly options: OrderOptions = {}
  ) {
    this.validateParcels();
  }

  private validateParcels(): void {
    if (!this.parcels || this.parcels.length === 0) {
      throw new Error('Order must contain at least one parcel');
    }
  }

  hasSpeedyShipping(): boolean {
    return this.options.speedyShipping === true;
  }

  getParcelCount(): number {
    return this.parcels.length;
  }
}