<template>
  <div class="container mx-auto px-4 py-6 max-w-3xl">
    <div v-if="loading" class="space-y-4">
      <div class="skeleton h-8 w-64"></div>
      <div class="skeleton h-32 w-full rounded-xl"></div>
      <div class="skeleton h-32 w-full rounded-xl"></div>
    </div>

    <div v-else-if="order">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div>
          <NuxtLink to="/orders" class="text-sm link link-hover text-gray-500">&larr; Kembali</NuxtLink>
          <h1 class="text-xl font-bold mt-1">{{ order.order_number }}</h1>
          <p class="text-sm text-gray-300">{{ formatDate(order.created_at) }}</p>
        </div>
        <StatusBadge :status="order.status" type="order" />
      </div>

      <!-- Order Items -->
      <div class="card bg-white border border-base-200/60 shadow-sm mb-4">
        <div class="card-body p-5">
          <h3 class="font-semibold mb-3">Item Pesanan</h3>
          <div class="space-y-3">
            <div v-for="item in order.order_items" :key="item.id" class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                <img :src="item.product_image || ''" alt="" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0 text-sm">
                <p class="font-medium truncate">{{ item.product_name }}</p>
                <p class="text-xs text-gray-300">{{ item.variant_label }} x{{ item.quantity }}</p>
              </div>
              <p class="text-sm font-medium">Rp {{ formatPrice(item.subtotal) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Shipment Tracking -->
      <div v-if="order.shipments?.length" class="card bg-white border border-base-200/60 shadow-sm mb-4">
        <div class="card-body p-5">
          <h3 class="font-semibold mb-3">Pengiriman</h3>
          <div v-for="shipment in order.shipments" :key="shipment.id" class="mb-3">
            <div class="flex items-center justify-between text-sm mb-2">
              <span v-if="shipment.courier_name" class="text-gray-500">{{ shipment.courier_name }}</span>
              <span v-if="shipment.tracking_number" class="font-mono text-xs">{{ shipment.tracking_number }}</span>
            </div>
            <ul class="timeline timeline-vertical timeline-compact">
              <li
                v-for="(log, i) in shipment.shipment_tracking_logs"
                :key="log.id"
                class="timeline-item"
              >
                <div class="timeline-start text-xs text-gray-300">{{ formatDate(log.created_at) }}</div>
                <div class="timeline-middle">
                  <div class="w-3 h-3 rounded-full border-2"
                    :class="i === shipment.shipment_tracking_logs.length - 1 ? 'bg-primary border-primary' : 'bg-base-200 border-base-300'"
                  ></div>
                </div>
                <div class="timeline-end timeline-box text-xs">{{ log.note || getStatusLabel(log.status, 'shipment') }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Payment -->
      <div class="card bg-white border border-base-200/60 shadow-sm">
        <div class="card-body p-5">
          <h3 class="font-semibold mb-3">Pembayaran</h3>
          <div v-if="order.payments?.length">
            <div v-for="payment in order.payments" :key="payment.id" class="text-sm space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-500">Status</span>
                <StatusBadge :status="payment.status" type="payment" />
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Total</span>
                <span class="font-bold">Rp {{ formatPrice(payment.amount) }}</span>
              </div>
              <div v-if="payment.status === 1" class="mt-4">
                <NuxtLink :to="`/payment/${order.id}`" class="btn btn-primary btn-sm">
                  Upload Bukti Bayar
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-gray-400 text-center py-4">
            Menunggu pembayaran
            <div class="mt-3">
              <NuxtLink :to="`/payment/${order.id}`" class="btn btn-primary btn-sm">
                Bayar Sekarang
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="card bg-white border border-base-200/60 shadow-sm mt-4">
        <div class="card-body p-5">
          <h3 class="font-semibold mb-3">Detail Biaya</h3>
          <div class="text-sm space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">Subtotal</span>
              <span>Rp {{ formatPrice(order.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Ongkos Kirim</span>
              <span>Rp {{ formatPrice(order.shipping_cost) }}</span>
            </div>
            <div v-if="order.point_redeemed > 0" class="flex justify-between">
              <span class="text-gray-500">Poin</span>
              <span class="text-success">-Rp {{ formatPrice(order.point_redeemed) }}</span>
            </div>
            <div class="flex justify-between font-bold border-t border-base-200 pt-2 mt-2">
              <span>Total</span>
              <span class="text-black">Rp {{ formatPrice(order.total) }}</span>
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

const route = useRoute()
const loading = ref(true)
const order = ref<any>(null)

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusLabel(status: number, type: string) {
  if (type === 'order') {
    const labels: Record<number, string> = { 1: 'Pending Payment', 2: 'Paid', 3: 'Processing', 4: 'Shipped', 5: 'Delivered', 6: 'Cancelled' }
    return labels[status] || 'Unknown'
  }
  if (type === 'shipment') {
    const labels: Record<number, string> = { 1: 'Pending', 2: 'Picked Up', 3: 'In Transit', 4: 'Out for Delivery', 5: 'Delivered', 6: 'Failed' }
    return labels[status] || 'Unknown'
  }
  return 'Unknown'
}

onMounted(async () => {
  const id = route.params.id
  const { data } = await useApi(`/orders/${id}`)
  order.value = data.value?.order || data.value
  loading.value = false
})
</script>
