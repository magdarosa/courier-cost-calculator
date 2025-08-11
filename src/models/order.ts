import { Parcel } from './parcel';

export class Order {
  constructor(public readonly parcels: Parcel[]) {
    this.validateParcels();
  }

  private validateParcels(): void {
    if (!this.parcels || this.parcels.length === 0) {
      throw new Error('Order must contain at least one parcel');
    }
  }

  getParcelCount(): number {
    return this.parcels.length;
  }
}