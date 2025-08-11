import { Parcel } from "./parcel";
import { ParcelSize } from "../types";

describe('Parcel', () => {
    describe('constructor', () => {
      it('should create a parcel with valid dimensions', () => {
        const parcel = new Parcel('P1', { length: 5, width: 3, height: 2 });
        
        expect(parcel.id).toBe('P1');
        expect(parcel.dimensions).toEqual({ length: 5, width: 3, height: 2 });
      });
  
      it('should throw error for zero dimensions', () => {
        expect(() => {
          new Parcel('P1', { length: 0, width: 3, height: 2 });
        }).toThrow('All dimensions must be positive numbers');
      });
  
      it('should throw error for negative dimensions', () => {
        expect(() => {
          new Parcel('P1', { length: -5, width: 3, height: 2 });
        }).toThrow('All dimensions must be positive numbers');
      });
    });
  
    describe('getSize', () => {
      it('should classify as SMALL when all dimensions < 10cm', () => {
        const parcel = new Parcel('P1', { length: 9, width: 8, height: 7 });
        expect(parcel.getSize()).toBe(ParcelSize.SMALL);
      });
  
      it('should classify as MEDIUM when all dimensions < 50cm but not all < 10cm', () => {
        const parcel = new Parcel('P1', { length: 49, width: 30, height: 15 });
        expect(parcel.getSize()).toBe(ParcelSize.MEDIUM);
      });
  
      it('should classify as LARGE when all dimensions < 100cm but not all < 50cm', () => {
        const parcel = new Parcel('P1', { length: 99, width: 60, height: 40 });
        expect(parcel.getSize()).toBe(ParcelSize.LARGE);
      });
  
      it('should classify as XL when any dimension >= 100cm', () => {
        const parcel = new Parcel('P1', { length: 100, width: 30, height: 20 });
        expect(parcel.getSize()).toBe(ParcelSize.XL);
      });

      // Boundaries  
      it('should classify as MEDIUM when longest side is exactly 10cm', () => {
        const parcel = new Parcel('P1', { length: 10, width: 5, height: 3 });
        expect(parcel.getSize()).toBe(ParcelSize.MEDIUM);
      });

      it('should classify as LARGE when longest side is exactly 50cm', () => {
        const parcel = new Parcel('P1', { length: 50, width: 30, height: 20 });
        expect(parcel.getSize()).toBe(ParcelSize.LARGE);
      });

      it('should classify as XL when longest side is exactly 100cm', () => {
        const parcel = new Parcel('P1', { length: 100, width: 30, height: 20 });
          expect(parcel.getSize()).toBe(ParcelSize.XL);
       });
    });
  });