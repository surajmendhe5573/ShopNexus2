const nodemailer = require('nodemailer');
const Contact = require('../models/contactMail.model');
const config = require('../config/keys');

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailCredentials.EMAIL_USER,
    pass: config.emailCredentials.EMAIL_PASS,
  },
});

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Save the contact form data to MongoDB
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Email options for the site admin
    const adminMailOptions = {
      from: email,
      to: config.emailCredentials.EMAIL_USER,
      subject: 'PRUTHATEK: New Contact Form Submission',
      text: `New contact form submission on PRUTHATEK's website.\n\nDetails:\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n`,
    };

    // Email options for the client confirmation
    const clientMailOptions = {
      from: config.emailCredentials.EMAIL_USER,
      to: email,
      subject: 'PRUTHATEK: Contact Form Submission Received',
      text: `Hi ${name},\n\nThank you for reaching out to PRUTHATEK! We have received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\nThe PRUTHATEK Team\n\nPRUTHATEK | Web & App Development Services\nEmail: ${config.emailCredentials.EMAIL_USER}`,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    console.log('Emails sent successfully');
    res.status(200).json({ message: 'Email sent successfully and data stored in MongoDB' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store data in MongoDB or send email' });
  }
};
