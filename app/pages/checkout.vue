<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-serif font-bold mb-12">Checkout</h1>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Form -->
      <div class="flex-1">
        <form @submit.prevent="placeOrder" class="p-8 bg-white border border-gray-100 rounded-3xl space-y-6">
          <h3 class="text-lg font-serif font-semibold">Informasi Pengiriman</h3>

          <div>
            <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Alamat Lengkap</label>
            <div class="relative">
              <span class="absolute top-3 left-4 pointer-events-none text-gray-300 z-[1]">
                <Icon name="heroicons:map-pin" class="w-4 h-4" />
              </span>
              <textarea v-model="form.shipping_address" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors resize-none pl-11" rows="3" required></textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Kota/Kabupaten</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300 z-[1]">
                  <Icon name="heroicons:building-storefront" class="w-4 h-4" />
                </span>
                <select v-model="form.warehouse_id" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors appearance-none pl-11 bg-white" required>
                  <option value="" disabled>Pilih wilayah</option>
                  <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }} - {{ w.city }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Catatan Pengiriman (opsional)</label>
              <div class="relative">
                <span class="absolute top-3 left-4 pointer-events-none text-gray-300 z-[1]">
                  <Icon name="heroicons:pencil" class="w-4 h-4" />
                </span>
                <textarea v-model="form.shipping_note" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors resize-none pl-11" rows="2"></textarea>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Catatan Pesanan (opsional)</label>
            <div class="relative">
              <span class="absolute top-3 left-4 pointer-events-none text-gray-300 z-[1]">
                <Icon name="heroicons:pencil-square" class="w-4 h-4" />
              </span>
              <textarea v-model="form.note" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors resize-none pl-11" rows="2"></textarea>
            </div>
          </div>

          <!-- Point Redeem -->
          <div v-if="userPoint && userPoint.balance > 0" class="border-t border-gray-100 pt-6">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="redeemPoints" class="w-4 h-4 border border-gray-300 rounded accent-black" />
              <span class="text-sm text-gray-700">Tukarkan poin ({{ userPoint.balance }} poin = Rp {{ formatPrice(userPoint.balance) }})</span>
            </label>
          </div>

          <div v-if="error" class="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100 flex items-center gap-2">
            <Icon name="heroicons:exclamation-circle" class="w-5 h-5 shrink-0" />
            <span>{{ error }}</span>
          </div>

          <button type="submit" class="w-full py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50" :disabled="submitting">
            <span v-if="submitting" class="loading loading-spinner loading-sm"></span>
            <span v-else>Buat Pesanan</span>
          </button>
        </form>
      </div>

      <!-- Order Summary Sidebar -->
      <div class="w-full lg:w-80">
        <div class="p-6 bg-gray-50 rounded-3xl sticky top-24">
          <h3 class="text-sm font-sans font-semibold text-black mb-6">Ringkasan Pesanan</h3>
          <div class="space-y-4">
            <div v-for="item in cart" :key="item.id" class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img :src="item.product_variant?.product?.thumbnail_url || ''" alt="" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0 text-xs">
                <p class="text-gray-700 truncate">{{ item.product_variant?.product?.name }}</p>
                <p class="text-gray-400">{{ item.product_variant?.label }} x{{ item.quantity }}</p>
              </div>
              <p class="text-xs font-medium text-gray-700">Rp {{ formatPrice((item.product_variant?.price || 0) * item.quantity) }}</p>
            </div>
          </div>

          <div class="border-t border-gray-200 mt-6 pt-6 space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Subtotal</span>
              <span class="text-gray-700 font-medium">Rp {{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between" v-if="redeemPoints && userPoint">
              <span class="text-gray-500">Poin Digunakan</span>
              <span class="text-gray-400">-Rp {{ formatPrice(userPoint.balance) }}</span>
            </div>
            <div class="flex justify-between font-semibold border-t border-gray-200 pt-4 mt-4">
              <span class="text-black">Total</span>
              <span class="text-black">Rp {{ formatPrice(finalTotal) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const { cart, subtotal, fetchCart, clearCart } = useCart()

const warehouses = ref<any[]>([])
const userPoint = ref<any>(null)
const redeemPoints = ref(false)
const error = ref<string | null>(null)
const submitting = ref(false)

const form = reactive({
  shipping_address: '',
  shipping_note: '',
  note: '',
  warehouse_id: '',
})

const finalTotal = computed(() => {
  let total = subtotal.value
  if (redeemPoints.value && userPoint.value) {
    total = Math.max(0, total - userPoint.value.balance)
  }
  return total
})

async function placeOrder() {
  error.value = null
  submitting.value = true
  try {
    const body: any = {
      shipping_address: form.shipping_address,
      shipping_note: form.shipping_note || undefined,
      note: form.note || undefined,
      warehouse_id: Number(form.warehouse_id),
      point_redeemed: redeemPoints.value && userPoint.value ? userPoint.value.balance : 0,
    }

    const { data, error: fetchError } = await useApi('/checkout', {
      method: 'POST',
      body,
    })

    if (fetchError.value) throw new Error(fetchError.value.data?.message || 'Checkout gagal')

    clearCart()
    await fetchCart()
    router.push(`/orders/${data.value.order.id}`)
  } catch (e: any) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

onMounted(async () => {
  await fetchCart()

  if (!cart.value.length) {
    router.push('/cart')
    return
  }

  const [whRes, ptRes] = await Promise.all([
    useApi('/warehouses'),
    useApi('/points').catch(() => ({ data: { value: null } })),
  ])

  warehouses.value = whRes.data.value?.warehouses || whRes.data.value || []

  const pointsRaw = ptRes.data.value
  userPoint.value = pointsRaw?.balance ? { balance: pointsRaw.balance } : null
})
</script>
