import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import Products from '../models/Products.js';
import Sale from '../models/Sales.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Products.deleteMany();
  await Sale.deleteMany();
});

describe('Sale API CRUD Tests', () => {
  it('should create a sale and update product stock', async () => {
    const product = await Products.create({
      name: 'TestMed',
      price: 100,
      stock: 50,
      expiryDate: '2026-12-31',
      company: 'TestCo'
    });

    const saleRes = await request(app).post('/api/sales').send({
      product: product._id,
      quantity: 5,
      totalPrice: 500
    });

    expect(saleRes.statusCode).toBe(201);
    expect(saleRes.body.sale.quantity).toBe(5);
    expect(saleRes.body.sale.totalPrice).toBe(500);

    const updatedMedicine = await Products.findById(product._id);
    expect(updatedMedicine.stock).toBe(45); // stock should reduce
  });

  it('should not allow sale if stock is insufficient', async () => {
    const product = await Products.create({
      name: 'LowStockMed',
      price: 50,
      stock: 2,
      expiryDate: '2026-12-31',
      company: 'TestCo'
    });

    const res = await request(app).post('/api/sales').send({
      product: product._id,
      quantity: 5,
      totalPrice: 250
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Insufficient stock');
  });

  it('should fetch all sales', async () => {
    const product = await Products.create({
      name: 'MultiSaleMed',
      price: 100,
      stock: 100,
      expiryDate: '2026-12-31',
      company: 'TestCo'
    });

    await Sale.create({
      product: product._id,
      quantity: 10,
      totalPrice: 1000
    });

    const res = await request(app).get('/api/sales');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].quantity).toBe(10);
  });

  it('should fetch a single sale by ID', async () => {
    const product = await Products.create({
      name: 'SingleSaleMed',
      price: 100,
      stock: 100,
      expiryDate: '2026-12-31',
      company: 'TestCo'
    });

    const sale = await Sale.create({
      product: product._id,
      quantity: 3,
      totalPrice: 300
    });

    const res = await request(app).get(`/api/sales/${sale._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(3);
  });

 

  it('should delete a sale', async () => {
    const product = await Products.create({
      name: 'DeleteMed',
      price: 100,
      stock: 100,
      expiryDate: '2026-12-31',
      company: 'TestCo'
    });

    const sale = await Sale.create({
      product: product._id,
      quantity: 5,
      totalPrice: 500
    });

    const res = await request(app).delete(`/api/sales/${sale._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Sale deleted successfully');

    const deleted = await Sale.findById(sale._id);
    expect(deleted).toBeNull();
  });
});
