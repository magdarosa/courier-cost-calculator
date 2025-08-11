# 📦 Courier Cost Calculator Library

Hey there! 👋 Welcome! This is a TypeScript library that calculates shipping costs for courier parcels. 

## 🚀 What This Library Does

1. **Calculates parcel costs** based on dimensions (Step 1) 📏
2. **Supports speedy shipping** that doubles your order cost (Step 2) ⚡

## 📚 Library Features

### Step 1: Size-Based Pricing 📦

**Parcel Categories:**
- **Small parcel**: all dimensions < 10cm → **$3** 
- **Medium parcel**: all dimensions < 50cm → **$8**
- **Large parcel**: all dimensions < 100cm → **$15**
- **XL parcel**: any dimension ≥ 100cm → **$25**

### Step 2: Speedy Shipping ⚡
- **Doubles the entire order cost**
- **Appears as separate line item** in the output
- **Individual parcel costs remain unchanged** in display

## 🎯 Usage Examples

### Basic Single Parcel
```typescript
const parcel = new Parcel('P1', { length: 5, width: 3, height: 2 }, 0.5);
const order = new Order([parcel]);
const result = calculator.calculateOrder(order);

// Result:
{
  "items": [
    {
      "type": "Small",
      "cost": 3
    }
  ],
  "totalCost": 3
}
```

### Multiple Parcels with Speedy Shipping
```typescript
const parcels = [
  new Parcel('P1', { length: 5, width: 3, height: 2 }, 0.5),     // Small: $3
  new Parcel('P2', { length: 30, width: 20, height: 15 }, 2)     // Medium: $8
];
const order = new Order(parcels, { speedyShipping: true });
const result = calculator.calculateOrder(order);

// Result:
{
  "items": [
    {
      "type": "Small", 
      "cost": 3
    },
    {
      "type": "Medium",
      "cost": 8
    },
    {
      "type": "speedy-shipping",
      "cost": 11
    }
  ],
  "totalCost": 22
}
```

## 🏃‍♂️ Let's Get You Started!


### Option 1: Docker 🐳 (Easy start - No Node.js Required!)

**Prerequisites:**
- Docker only

**Quick Start:**
```bash
# Build the image
docker build -t courier-calculator .

# Run tests
docker run --rm courier-calculator npm test

# Try the calculator (example with speedy shipping)
docker run --rm courier-calculator -e "
const { ShippingCalculator, ParcelSizingService, Parcel, Order } = require('./dist/index.js');
const sizingService = new ParcelSizingService();
const calculator = new ShippingCalculator(sizingService);
const parcel = new Parcel('P1', { length: 5, width: 3, height: 2 }, 0.5);
const order = new Order([parcel], { speedyShipping: true });
console.log(JSON.stringify(calculator.calculateOrder(order), null, 2));
"
```

### Option 2: Local Development 💻

**Prerequisites:**
- Node.js 14+
- npm

**Installation & Running:**
```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Run specific tests
npm test shippingCalculator.test.ts
```

## 🧪 Testing

### Docker Testing 🐳
```bash
# Run all tests
docker run --rm courier-calculator npm test

# Build and run specific test
docker run --rm courier-calculator npm test -- shippingCalculator.test.ts

```

### Local Testing 💻
```bash
# Run all tests
npm test

# Run specific test file
npm test Parcel.test.ts

# Coverage report
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

## 💡 Technical Decisions - Why I Made These Choices

### Node.js with TypeScript & Docker 🛠️ 
For this technical test, I used Node.js with TypeScript since it’s what I’m most familiar with, so I could make the most of the 2 hours. 📚 
I also added Docker to make it easier for reviewers to run the project without worrying about local environment setup. ✨

---
---

👩‍💻 **Built by**: Magda  
📦 **For**: First AML - Courier Company Technical Test  
🏗️ **Steps Completed**: 1 (Size-based pricing) + 2 (Speedy shipping)