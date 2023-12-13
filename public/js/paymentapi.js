async function paymentkrdo(amount) {
    // console.log(amount);
    try {
        const resp = await axios({
            method: 'post',
            data: { amount },
            url: '/order',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        console.log(resp.data.order.amount);

        const options = {
            "key": 'rzp_test_vqrrjdC0QSAdBt',
            "amount": resp.data.order.amount,
            "currency": "INR",
            "name": "CookingMadeEasy",
            "description": "Test Transaction",
            "image": "https://images.unsplash.com/photo-1625631976982-c6df1654a6ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            "order_id": resp.data.order.id,
            "callback_url": 'http://localhost:3000/payment-verify',
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#D1E7DD"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    catch (e) {
        window.location.replace('/login')
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('membershipbuy')) {
        if (e.target.classList.contains('min')) {
            const amount = e.target.getAttribute('amount');
            // console.log(amount);
            paymentkrdo(amount)
        }
        else if (e.target.classList.contains('min')) {
            const amount = e.target.getAttribute('amount');
            paymentkrdo(amount)
        }
        else {
            const amount = e.target.getAttribute('amount');
            paymentkrdo(amount)
        }
    }
})