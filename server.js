const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ডেমো পেমেন্ট ডাটা (URL-এর id অনুযায়ী)
const paymentData = {
    "9bdf8785-81de-428b-bcf2-155c55abdb68": {
        amount: 2500,
        upiId: "merchant@upi"
    }
};

// ১. পেমেন্ট ডিটেইলস এপিআই
app.get('/api/payment/:id', (req, res) => {
    const data = paymentData[req.params.id];
    if (data) {
        res.json({ success: true, ...data });
    } else {
        res.status(404).json({ success: false, message: "Payment ID not found" });
    }
});

// ২. UTR জমা দেওয়ার এপিআই
app.post('/api/submit-utr', (req, res) => {
    console.log("UTR Received:", req.body);
    res.json({ success: true, message: "UTR Submitted Successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
