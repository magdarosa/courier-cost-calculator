import { Order } from './order';
import { Parcel } from './parcel';

describe('Order', () => {
  let sampleParcels: Parcel[];

  beforeEach(() => {
    sampleParcels = [
      new Parcel('P1', { length: 5, width: 3, height: 2 }),
      new Parcel('P2', { length: 30, width: 20, height: 15 }),
    ];
  });

  describe('constructor', () => {
    it('should create an order with parcels', () => {
      const order = new Order(sampleParcels);
      
      expect(order.parcels).toEqual(sampleParcels);
    });

    it('should throw error for empty parcel array', () => {
      expect(() => {
        new Order([]);
      }).toThrow('Order must contain at least one parcel');
    });
  });

  describe('getParcelCount', () => {
    it('should return correct parcel count', () => { 
      const order = new Order(sampleParcels);
      expect(order.getParcelCount()).toBe(2);
    });
  });

  describe('hasSpeedyShipping', () => {
    it('should create an order with speedy shipping option', () => {
      const order = new Order(sampleParcels, { speedyShipping: true });
      
      expect(order.hasSpeedyShipping()).toBe(true);
      expect(order.parcels).toEqual(sampleParcels);
    });

    it('should return true when speedy shipping explicitly enabled', () => {
      const order = new Order(sampleParcels, { speedyShipping: true });
      expect(order.hasSpeedyShipping()).toBe(true);
    });

    it('should return false when speedy shipping explicitly disabled', () => {
      const order = new Order(sampleParcels, { speedyShipping: false });
      expect(order.hasSpeedyShipping()).toBe(false);
    });

    it('should return false when speedy shipping not specified', () => {
      const order = new Order(sampleParcels);
      expect(order.hasSpeedyShipping()).toBe(false);
    });
  });
});