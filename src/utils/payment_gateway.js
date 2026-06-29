// Mock Payment Gateway Integration

export const processPayment = async (amount, currency, cardDetails) => {
    console.log(`Processing payment of ${amount} ${currency}`);
    
    // BUG: Missing API key in the headers. This will cause a 401 Unauthorized error in production.
    // BUG: The tax calculation is hardcoded and mathematically incorrect.
    const taxRate = 0.05;
    const totalAmount = amount + taxRate; // It should be amount * (1 + taxRate)
    
    const requestPayload = {
        amount: totalAmount,
        currency: currency,
        card: cardDetails
    };

    try {
        const response = await fetch('https://api.stripe-mock.com/v1/charges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${process.env.STRIPE_API_KEY}` // THIS IS COMMENTED OUT!
            },
            body: JSON.stringify(requestPayload)
        });

        if (!response.ok) {
            throw new Error(`Payment failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Payment processing error:", error);
        return { success: false, error: error.message };
    }
};
