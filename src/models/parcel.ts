import { Dimensions, Parcel as IParcel, ParcelSize } from '../types';

export class Parcel implements IParcel {
  constructor(
    public readonly id: string,
    public readonly dimensions: Dimensions
  ) {
    this.validateDimensions();
  }

  private validateDimensions(): void {
    const { length, width, height } = this.dimensions;
    if (length <= 0 || width <= 0 || height <= 0) {
      throw new Error('All dimensions must be positive numbers');
    }
  }

  getSize(): ParcelSize {
    const { length, width, height } = this.dimensions;
    const maxDimension = Math.max(length, width, height);
    
    // XL parcel: any dimension >= 100cm
    if (maxDimension >= 100) {
      return ParcelSize.XL;
    }
    
    // Small parcel: all dimensions < 10cm
    if (this.allDimensionsLessThan(10)) {
      return ParcelSize.SMALL;
    }
    
    // Medium parcel: all dimensions < 50cm
    if (this.allDimensionsLessThan(50)) {
      return ParcelSize.MEDIUM;
    }
    
    // Large parcel: all dimensions < 100cm
    return ParcelSize.LARGE;
  }

  private allDimensionsLessThan(threshold: number): boolean {
    const { length, width, height } = this.dimensions;
    return length < threshold && width < threshold && height < threshold;
  }
}