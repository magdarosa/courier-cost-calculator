import { Order } from '../models/order';
import { ParcelSizingService } from './parcelSizingService';
import { CostItem, OrderCalculation } from '../types';


export class ShippingCalculator {
  constructor(private readonly sizingService: ParcelSizingService) {}

  calculateOrder(order: Order): OrderCalculation {
    const items: CostItem[] = [];
    
    // Calculate individual parcel costs based on size
    for (const parcel of order.parcels) {
      const size = parcel.getSize();
      const cost = this.sizingService.getBaseCost(size);
      
      items.push({
        type: size,
        cost
      });
    }

    const totalCost = items.reduce((sum, item) => sum + item.cost, 0);

    return {
      items,
      totalCost
    };
  }
}