export const useCart = () => {
  const store = useCartStore()
  return {
    ...storeToRefs(store),
    fetchCart: store.fetchCart,
    addItem: store.addItem,
    updateQuantity: store.updateQuantity,
    removeItem: store.removeItem,
    clearCart: store.clearCart,
  }
}
