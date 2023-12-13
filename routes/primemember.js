const express = require('express');
const router = express.Router();
const { isloggedin } = require('../middlewares');
const Razorpay = require('razorpay');
const { validatePaymentVerification, validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const RAZORPAY_KEY_ID = 'rzp_test_vqrrjdC0QSAdBt';
const RAZORPAY_SECRET_KEY = 'MSujedHCRpyiYPmBkAlUcMaJ';

router.get('/primemember', (req, res) => {
  res.render('./dishes/prime');
})

validateWebhookSignature


router.post('/order', isloggedin, async (req, res) => {
  try {
    const instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_SECRET_KEY });

    const { amount } = req.body;
    // console.log(amount);

    const options = {
      amount: parseInt(amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.json({
      sucess: true,
      order
    })
  }
  catch (e) {
    console.log(e);
  }
})

router.post('/payment-verify', (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const isvalid = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, RAZORPAY_SECRET_KEY);

  if (isvalid) {
    return res.json({
      success: true,
      msg: 'Payment Successful'
    })
  }
  res.json({
    success: false,
    msg: 'Payment Unsuccessful'
  })
})


router.get('/username', (req, res) => {
  if (req.user) {
    res.json({
      name: req.user.username
    })
  }
  else {
    res.json({
      name: 'Anonymus'
    })
  }
})

module.exports = router;