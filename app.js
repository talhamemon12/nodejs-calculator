const express = require('express');
const app = express();
const port = 3000;

// Simple calculator route: /calc?num1=5&num2=3&op=+
app.get('/calc', (req, res) => {
  const { num1, num2, op } = req.query;

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('Error: num1 and num2 must be valid numbers.');
  }

  let result;

  switch (op) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b !== 0 ? a / b : 'Error: Division by zero';
      break;
    default:
      return res.status(400).send('Error: Invalid operation. Use +, -, *, or /.');
  }

  res.send(`Result: ${result}`);
});

app.listen(port, () => {
  console.log(`Calculator app running at http://localhost:${port}`);
});
