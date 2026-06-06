export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const loading = ref(false)

  const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.product_variant.price * item.quantity, 0),
  )

  async function fetchCart() {
    loading.value = true
    try {
      const { data } = await useApi<any>('/cart')
      cart.value = data.value?.carts || data.value || []
    } finally {
      loading.value = false
    }
  }

  async function addItem(productVariantId: number, quantity: number) {
    await useApi('/cart', {
      method: 'POST',
      body: { product_variant_id: productVariantId, quantity },
    })
    await fetchCart()
  }

  async function updateQuantity(cartId: number, quantity: number) {
    await useApi(`/cart/${cartId}`, {
      method: 'PUT',
      body: { quantity },
    })
    await fetchCart()
  }

  async function removeItem(cartId: number) {
    await useApi(`/cart/${cartId}`, { method: 'DELETE' })
    await fetchCart()
  }

  function clearCart() {
    cart.value = []
  }

  return { cart, loading, totalItems, subtotal, fetchCart, addItem, updateQuantity, removeItem, clearCart }
})

interface CartItem {
  id: number
  user_id: number
  product_variant_id: number
  quantity: number
  product_variant: {
    id: number
    label: string
    price: number
    product: {
      id: number
      name: string
      slug: string
      thumbnail_url?: string
    }
  }
  warehouse_id: number
  warehouse: {
    id: number
    name: string
    city: string
  }
}
