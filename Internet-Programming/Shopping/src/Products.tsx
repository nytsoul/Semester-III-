import { useContext } from 'react'
import { StoreContext } from './StoreContext'
import './App.css'

export default function Products() {
  const store = useContext(StoreContext)
  if (!store) return <p>Store not initialized.</p>

  const { products, addToCart } = store

  if (products.length === 0) {
    return <p>Loading products...</p>
  }

  return (
    <section className="products-section">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </article>
        ))}
      </div>
    </section>
  )
}
