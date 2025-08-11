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
});