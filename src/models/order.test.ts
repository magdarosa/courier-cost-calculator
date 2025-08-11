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

  describe('getParcelCount', () => {
    it('should return correct parcel count', () => { 
      const order = new Order(sampleParcels);
      expect(order.getParcelCount()).toBe(2);
    });
  });
});