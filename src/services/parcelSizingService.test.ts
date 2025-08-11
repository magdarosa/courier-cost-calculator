import { ParcelSizingService } from './parcelSizingService';
import { ParcelSize } from '../types';

describe('ParcelSizingService', () => {
  let sizingService: ParcelSizingService;

  beforeEach(() => {
    sizingService = new ParcelSizingService();
  });

  describe('getBaseCost', () => {
    it('should return correct base costs for all parcel sizes', () => {
      expect(sizingService.getBaseCost(ParcelSize.SMALL)).toBe(3);
      expect(sizingService.getBaseCost(ParcelSize.MEDIUM)).toBe(8);
      expect(sizingService.getBaseCost(ParcelSize.LARGE)).toBe(15);
      expect(sizingService.getBaseCost(ParcelSize.XL)).toBe(25);
    });
  });
});