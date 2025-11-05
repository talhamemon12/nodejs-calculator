const request = require('supertest');
const app = require('../app');

describe('Calculator API', () => {
  // ✅ Test addition (use URL-encoded + → %2B)
  test('adds two numbers', async () => {
    const res = await request(app).get('/calc?num1=2&num2=3&op=%2B');
    expect(res.text).toBe('Result: 5');
  });

  // ✅ Test division by zero
  test('handles division by zero', async () => {
    const res = await request(app).get('/calc?num1=5&num2=0&op=/');
    expect(res.text).toBe('Result: Error: Division by zero');
  });

  // ✅ Test invalid operator
  test('rejects invalid operation', async () => {
    const res = await request(app).get('/calc?num1=4&num2=2&op=%');
    expect(res.statusCode).toBe(400);
  });
});

// ✅ Ensure Express server closes properly after tests
afterAll(() => {
  if (app && app.close) {
    app.close();
  }
});
