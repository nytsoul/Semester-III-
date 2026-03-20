import { useContext } from 'react'
import { StoreProvider, StoreContext } from './StoreContext'
import Products from './Products'
import Cart from './Cart'
import './App.css'

function CartSummary() {
  const store = useContext(StoreContext)
  if (!store) return null

  return (
    <div className="cart-summary">
      <strong>Cart Items:</strong> {store.cart.length}
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <div className="app-layout">
        <header className="app-header">
          <h1>Shopping Web</h1>
          <CartSummary />
        </header>

        <main className="app-main">
          <Products />
          <Cart />
        </main>
      </div>
    </StoreProvider>
  )
}

export default App
