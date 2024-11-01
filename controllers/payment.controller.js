// controller.js
const paypal = require('@paypal/checkout-server-sdk');
const { savePaymentData } = require('../models/transaction.model');
const Order = require('../models/order.model');
require('dotenv').config();

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

exports.initiatePayment = async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { value: order.totalAmount.toString(), currency_code: 'USD' } }],
    application_context: {
      return_url: "http://localhost:8000/api/paypal/success",
      cancel_url: "http://localhost:8000/api/paypal/cancel",
    },
  });

  try {
    const paypalOrder = await client.execute(request);
    const approvalLink = paypalOrder.result.links.find(link => link.rel === 'approve');
    res.json({
      id: paypalOrder.result.id,
      approvalUrl: approvalLink.href
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.capturePayment = async (req, res) => {
  const orderId = req.params.orderId;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    if (capture.result.status === "COMPLETED") {
      const paymentData = {
        orderId,
        status: capture.result.status,
        amount: capture.result.purchase_units[0].payments.captures[0].amount.value,
        currency: capture.result.purchase_units[0].payments.captures[0].amount.currency_code,
        payer: {
          firstName: capture.result.payer.name.given_name,
          lastName: capture.result.payer.name.surname,
          email: capture.result.payer.email_address
        }
      };

      await savePaymentData(paymentData);
      res.json({ status: "Payment captured and stored successfully", capture });
    } else {
      res.json({ status: "Payment capture failed", capture });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyPayment = async (req, res) => {
  const orderId = req.params.orderId;
  const request = new paypal.orders.OrdersGetRequest(orderId);
  try {
    const order = await client.execute(request);
    if (order.result.status === "COMPLETED") {
      res.json({ status: "Payment successful" });
    } else {
      res.json({ status: "Payment not completed" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.successPayment = async (req, res) => {
  const { token } = req.query;
  const request = new paypal.orders.OrdersCaptureRequest(token);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    if (capture.result.status === "COMPLETED") {
      const paymentData = {
        orderId: capture.result.id,
        status: capture.result.status,
        amount: capture.result.purchase_units[0].payments.captures[0].amount.value,
        currency: capture.result.purchase_units[0].payments.captures[0].amount.currency_code,
        payer: {
          firstName: capture.result.payer.name.given_name,
          lastName: capture.result.payer.name.surname,
          email: capture.result.payer.email_address
        }
      };

      await savePaymentData(paymentData);

      res.send(`
        <h1>Payment Successful!</h1>
        <p>Transaction ID: ${capture.result.id}</p>
        <p>Amount: ${capture.result.purchase_units[0].payments.captures[0].amount.value} ${capture.result.purchase_units[0].payments.captures[0].amount.currency_code}</p>
        <p>Payer: ${capture.result.payer.name.given_name} ${capture.result.payer.name.surname}</p>
      `);
    } else {
      res.send("Payment not completed.");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.cancelPayment = (req, res) => {
  res.send("<h3>Payment was canceled.</h3>");
};
