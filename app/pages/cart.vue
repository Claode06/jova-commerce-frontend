<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <h1 class="text-3xl md:text-4xl font-serif font-bold mb-12">Keranjang Belanja</h1>

    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="skeleton h-24 w-full rounded-2xl"></div>
    </div>

    <div v-else-if="!cart.length" class="text-center py-20">
      <Icon name="heroicons:shopping-cart" class="w-16 h-16 mx-auto text-gray-200 mb-4" />
      <p class="text-gray-400 mb-4 text-sm">Keranjang masih kosong</p>
      <NuxtLink to="/products" class="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">Mulai Belanja</NuxtLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items -->
      <div class="flex-1 space-y-4">
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-3xl"
        >
          <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-50">
            <img
              :src="item.product_variant?.product?.thumbnail_url || 'https://placehold.co/80x80?text=N'"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-black truncate">{{ item.product_variant?.product?.name }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ item.product_variant?.label }}</p>
            <p class="text-sm font-medium text-black mt-1">Rp {{ formatPrice(item.product_variant?.price || 0) }}</p>
          </div>

          <!-- Quantity -->
          <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
            <button class="w-9 h-9 flex items-center justify-center text-base hover:bg-gray-50 transition-colors" @click="updateQty(item.id, item.quantity - 1)">−</button>
            <span class="px-4 text-sm font-medium">{{ item.quantity }}</span>
            <button class="w-9 h-9 flex items-center justify-center text-base hover:bg-gray-50 transition-colors" @click="updateQty(item.id, item.quantity + 1)">+</button>
          </div>

          <div class="text-right">
            <p class="text-sm font-medium text-black">Rp {{ formatPrice((item.product_variant?.price || 0) * item.quantity) }}</p>
            <button class="text-[11px] text-gray-400 hover:text-black transition-colors mt-1" @click="remove(item.id)">Hapus</button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="w-full lg:w-80">
        <div class="p-6 bg-gray-50 rounded-3xl sticky top-24">
          <h3 class="text-sm font-sans font-semibold text-black mb-6">Ringkasan Belanja</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Subtotal ({{ totalItems }} item)</span>
              <span class="text-black font-medium">Rp {{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Ongkos Kirim</span>
              <span class="text-gray-300">Dihitung saat checkout</span>
            </div>
          </div>
          <NuxtLink to="/checkout" class="block w-full mt-6 py-3.5 bg-black text-white text-sm font-medium text-center rounded-full hover:bg-gray-800 transition-colors">
            Lanjut Checkout
          </NuxtLink>
          <NuxtLink to="/products" class="block w-full text-center mt-3 text-xs text-gray-400 hover:text-black transition-colors">
            Lanjut Belanja
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { cart, loading, totalItems, subtotal, fetchCart, updateQuantity, removeItem } = useCart()

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

async function updateQty(id: number, qty: number) {
  if (qty < 1) return
  await updateQuantity(id, qty)
}

async function remove(id: number) {
  if (!confirm('Hapus item ini dari keranjang?')) return
  await removeItem(id)
}

onMounted(() => fetchCart())
</script>
