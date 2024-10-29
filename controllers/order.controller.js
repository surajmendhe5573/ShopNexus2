const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');

// Place Order
exports.placeOrder = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find cart for the user
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((total, item) => {
            const itemPrice = item.variantDetails.productPrice || 0; // Use variant price or default
            return total + itemPrice * item.quantity;
        }, 0);

        // Create the order
        const order = new Order({
            userId,
            items: cart.items,
            totalAmount,
        });

        await order.save();

        // Clear the cart after placing the order
        await Cart.deleteOne({ userId });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Retrieve Order History
exports.getOrderHistory = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from route parameters

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find orders for the user
        const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // Sort by most recent first

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ message: 'Order history retrieved successfully', orders });
    } catch (error) {
        console.error('Error retrieving order history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update order status and set cancellation date
        order.status = 'Cancelled';
        order.cancellationDate = new Date();

        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Track Order
exports.trackOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order tracking details retrieved successfully', trackingStatus: order.shippingStatus, trackingNumber: order.trackingNumber });
    } catch (error) {
        console.error('Error tracking order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

