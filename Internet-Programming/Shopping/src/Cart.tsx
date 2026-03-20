import { useContext } from 'react'
import { StoreContext } from './StoreContext'

export default function Cart() {
  const store = useContext(StoreContext)
  if (!store) return <p>Store not initialized.</p>

  const { cart } = store
  const totalItems = cart.length
  const totalAmount = cart.reduce((sum, product) => sum + product.price, 0)

  return (
    <section className="cart-section">
      <h2>Cart</h2>
      <p>Total items: {totalItems}</p>
      <p>Total amount: ${totalAmount.toFixed(2)}</p>

      {totalItems === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={`${item.id}-${index}`} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div>
                <p>{item.title}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
