import {useState} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import './index.css'

const PaymentPopup = ({cartList}) => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  let total = 0

  cartList.forEach(eachCartItem => {
    total += eachCartItem.price * eachCartItem.quantity
  })

  const onSelectCashOnDelivery = event => {
    setSelectedPayment(event.target.value)
  }

  const onClickConfirmOrder = () => {
    setOrderPlaced(true)
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="checkout-button">
          Checkout
        </button>
      }
    >
      {close => (
        <div className="payment-popup-container">
          {!orderPlaced ? (
            <>
              <h1 className="payment-popup-heading">Payment</h1>

              <div className="payment-methods-container">
                <h2 className="payment-methods-heading">Payment Methods</h2>

                <label className="payment-option">
                  <input type="radio" name="payment" disabled />
                  Card
                </label>

                <label className="payment-option">
                  <input type="radio" name="payment" disabled />
                  Net Banking
                </label>

                <label className="payment-option">
                  <input type="radio" name="payment" disabled />
                  UPI
                </label>

                <label className="payment-option">
                  <input type="radio" name="payment" disabled />
                  Wallet
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={selectedPayment === 'Cash on Delivery'}
                    onChange={onSelectCashOnDelivery}
                  />
                  Cash on Delivery
                </label>
              </div>

              <div className="payment-summary">
                <h2>Order Summary</h2>
                <p>Number of Items: {cartList.length}</p>
                <p>Total Price: Rs {total}/-</p>
              </div>

              <button
                type="button"
                className="confirm-order-button"
                disabled={selectedPayment !== 'Cash on Delivery'}
                onClick={onClickConfirmOrder}
              >
                Confirm Order
              </button>

              <button
                type="button"
                className="close-button"
                onClick={() => {
                  close()
                }}
              >
                Close
              </button>
            </>
          ) : (
            <div className="success-container">
              <h1>Your order has been placed successfully</h1>
              <button
                type="button"
                className="close-button"
                onClick={() => {
                  close()
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </Popup>
  )
}

export default PaymentPopup
