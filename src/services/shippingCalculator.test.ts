import { ShippingCalculator } from './shippingCalculator';
import { ParcelSizingService } from './parcelSizingService';
import { Order } from '../models/order';
import { Parcel } from '../models/parcel';


describe('ShippingCalculator', () => {
  let calculator: ShippingCalculator;
  let sizingService: ParcelSizingService;

  beforeEach(() => {
    sizingService = new ParcelSizingService();
    calculator = new ShippingCalculator(sizingService);
  });

  describe('Size-based pricing', () => {
    it('should calculate cost for SMALL parcel', () => {
      const parcel = new Parcel('P1', { length: 5, width: 3, height: 2 });
      const order = new Order([parcel]);
      
      const result = calculator.calculateOrder(order);
      
      expect(result.totalCost).toBe(3);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        type: 'Small',
        cost: 3
      });
    });
    
    it('should calculate total cost for mixed parcel sizes', () => {
      const parcels = [
        new Parcel('P1', { length: 5, width: 3, height: 2 }), // SMALL: $3
        new Parcel('P2', { length: 30, width: 20, height: 15 }), // MEDIUM: $8
        new Parcel('P3', { length: 70, width: 40, height: 30 }), // LARGE: $15
        new Parcel('P4', { length: 150, width: 50, height: 30 }), // XL: $25
      ];
      const order = new Order(parcels);
      
      const result = calculator.calculateOrder(order);
      
      expect(result.totalCost).toBe(51); // 3 + 8 + 15 + 25
      expect(result.items).toHaveLength(4);
    });
  });
});