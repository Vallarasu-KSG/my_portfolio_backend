const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 5000;

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
const mailOptions = {
    from: name,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `Name: ${name}\n\nEmail: (${email}\n\n Message: ${message} )`,
    replyTo: email  // ✅ This lets you reply to the sender directly
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error sending message', error: err });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
