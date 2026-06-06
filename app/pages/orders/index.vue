<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-serif font-bold mb-8">Pesanan Saya</h1>

    <!-- Filter Tabs -->
    <div class="flex gap-6 border-b border-gray-100 pb-4 mb-8 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="text-xs uppercase tracking-widest pb-4 border-b-2 transition-colors whitespace-nowrap -mb-[1.1rem]"
        :class="activeTab === tab.key ? 'border-accent-400 text-accent-400' : 'border-transparent text-gray-400 hover:text-accent-400'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span v-if="tab.count" class="ml-1 text-[10px] text-gray-300">({{ tab.count }})</span>
      </button>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="n in 3" :key="n" class="skeleton h-20 w-full rounded-2xl"></div>
    </div>

    <div v-else-if="!filteredOrders.length" class="text-center py-20">
      <Icon name="heroicons:shopping-bag" class="w-16 h-16 mx-auto text-accent-200 mb-4" />
      <p class="text-gray-400 mb-4 text-sm">
        {{ activeTab === 'all' ? 'Belum ada pesanan' : 'Tidak ada pesanan dengan status ini' }}
      </p>
      <NuxtLink to="/products" class="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-accent-400 transition-colors">Mulai Belanja</NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <NuxtLink
        v-for="order in filteredOrders"
        :key="order.id"
        :to="`/orders/${order.id}`"
        class="block p-5 bg-white border border-gray-100 rounded-3xl hover:border-accent-200 transition-colors"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-mono text-gray-700">{{ order.order_number }}</span>
          <StatusBadge :status="order.status" type="order" />
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">{{ formatDate(order.created_at) }}</span>
          <span class="font-medium text-black">Rp {{ formatPrice(order.total) }}</span>
        </div>
        <p class="text-xs text-gray-300 mt-1">{{ order.items_count || order.order_items?.length || 0 }} item</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const loading = ref(true)
const orders = ref<any[]>([])
const activeTab = ref('all')

const tabs = computed(() => [
  { key: 'all', label: 'Semua', count: orders.value.length },
  { key: 'pending', label: 'Menunggu Bayar', count: orders.value.filter((o: any) => o.status === 1).length },
  { key: 'active', label: 'Diproses', count: orders.value.filter((o: any) => o.status >= 2 && o.status <= 5).length },
  { key: 'done', label: 'Selesai', count: orders.value.filter((o: any) => o.status === 5).length },
  { key: 'cancelled', label: 'Dibatalkan', count: orders.value.filter((o: any) => o.status === 6).length },
])

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  if (activeTab.value === 'pending') return orders.value.filter((o: any) => o.status === 1)
  if (activeTab.value === 'active') return orders.value.filter((o: any) => o.status >= 2 && o.status <= 5)
  if (activeTab.value === 'done') return orders.value.filter((o: any) => o.status === 5)
  if (activeTab.value === 'cancelled') return orders.value.filter((o: any) => o.status === 6)
  return orders.value
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  const { data } = await useApi('/orders')
  orders.value = data.value?.orders || data.value || []

  if (route.query.tab === 'paid') {
    activeTab.value = 'active'
  }

  loading.value = false
})
</script>
