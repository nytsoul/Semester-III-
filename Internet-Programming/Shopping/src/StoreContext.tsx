import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export interface Product {
  id: number
  title: string
  price: number
  image: string
}

export interface StoreContextType {
  products: Product[]
  cart: Product[]
  addToCart: (product: Product) => void
}

export const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const resp = await fetch('https://fakestoreapi.com/products')
        const data = await resp.json()
        const mapped: Product[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
        }))
        setProducts(mapped)
      } catch (error) {
        console.error('Failed to fetch products', error)
      }
    }

    fetchProducts()
  }, [])

  function addToCart(product: Product) {
    setCart((prev) => [...prev, product])
  }

  return (
    <StoreContext.Provider value={{ products, cart, addToCart }}>
      {children}
    </StoreContext.Provider>
  )
}
