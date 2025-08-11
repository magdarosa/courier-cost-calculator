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
      expect(result.items).toEqual([
        { type: 'Small', cost: 3 },
        { type: 'Medium', cost: 8 },
        { type: 'Large', cost: 15 },
        { type: 'XL', cost: 25 }
      ]);
    });
  });

  describe('Size-based pricing with speedy shipping', () => {
    it('should double the cost when speedy shipping is enabled', () => {
      const parcel = new Parcel('P1', { length: 5, width: 3, height: 2 });
      const order = new Order([parcel], { speedyShipping: true });
      
      const result = calculator.calculateOrder(order);
      
      expect(result.totalCost).toBe(6); // 3 + 3 (speedy)
      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toEqual({
        type: 'Small',
        cost: 3
      });
      expect(result.items[1]).toEqual({
        type: 'speedy-shipping',
        cost: 3
      });
    });

    it('should not affect individual parcel costs in output', () => {
      const parcels = [
        new Parcel('P1', { length: 5, width: 3, height: 2 }), // $3
        new Parcel('P2', { length: 30, width: 20, height: 15 }), // $8
      ];
      const order = new Order(parcels, { speedyShipping: true });
      
      const result = calculator.calculateOrder(order);
      
      expect(result.totalCost).toBe(22); // (3 + 8) + (3 + 8) speedy
      expect(result.items).toHaveLength(3);
      expect(result.items[0].cost).toBe(3); // Original parcel cost unchanged
      expect(result.items[1].cost).toBe(8); // Original parcel cost unchanged
      expect(result.items[2]).toEqual({
        type: 'speedy-shipping',
        cost: 11 // Same as subtotal
      });
    });

    it('should not add speedy shipping when not requested', () => {
      const parcel = new Parcel('P1', { length: 5, width: 3, height: 2 });
      const order = new Order([parcel], { speedyShipping: false });
      
      const result = calculator.calculateOrder(order);
      
      expect(result.totalCost).toBe(3);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        type: 'Small',
        cost: 3
      });
    });
  });
});