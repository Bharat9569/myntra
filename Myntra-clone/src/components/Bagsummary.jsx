import { useSelector } from "react-redux";

const Bagsummary = () => {
  const bagitemid = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);

  const finalitem = items.filter((item) => bagitemid.includes(item.id));

  let totalItem = bagitemid.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalitem.forEach((item) => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + 99;

  //  Razorpay handler
  const handlePayment = async () => {
    const amountInRupees = finalPayment; // Final payment in rupees
    const amountInPaise = amountInRupees * 100;
    
    const res = await fetch("http://localhost:8080/api/m1/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount:amountInPaise  }),
    });

    const order = await res.json();
   

    const options = {
      key: "rzp_test_Xi2ECCopU2ajwC", // replace with your real Razorpay KEY_ID
      amount: order.amount,
      currency: order.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        //  You can POST this to backend for payment verification
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} Items)</div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">₹{totalDiscount}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order" onClick={handlePayment}>
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default Bagsummary;
