import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import Products from '../models/Products.js';



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
});

describe('Products API CRUD Tests', () => {
  it('should create a new product', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Paracetamol',
      price: 20,
      stock: 100,
      expiryDate: '2026-12-31',
      company: 'ABC Pharma'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Paracetamol');
  });

  it('should return all products', async () => {
    await Products.create({
      name: 'Ibuprofen',
      price: 30,
      stock: 200,
      expiryDate: '2025-11-11',
      company: 'XYZ Pharma'
    });

    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should get a products by ID', async () => {
    const product = await Products.create({
      name: 'Amoxicillin',
      price: 50,
      stock: 150,
      expiryDate: '2026-06-01',
      company: 'MedLife'
    });

    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Amoxicillin');
  });

  it('should update a product', async () => {
    const product = await Products.create({
      name: 'Cetirizine',
      price: 10,
      stock: 50,
      expiryDate: '2024-10-10',
      company: 'Z Pharma'
    });

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .send({ price: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(15);
  });

  it('should delete a product', async () => {
    const product = await Products.create({
      name: 'Loratadine',
      price: 25,
      stock: 80,
      expiryDate: '2026-03-15',
      company: 'HealthCorp'
    });

    const res = await request(app).delete(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('product deleted successfully');
  });
});
