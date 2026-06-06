<template>
  <span class="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full" :class="badgeClass">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: number
  type: 'order' | 'payment' | 'shipment'
}>()

const statusMap: Record<string, Record<number, { label: string; class: string }>> = {
  order: {
    1: { label: 'Pending Payment', class: 'bg-accent-50 text-accent-600' },
    2: { label: 'Paid', class: 'bg-accent-100 text-accent-600' },
    3: { label: 'Processing', class: 'bg-gray-100 text-gray-600' },
    4: { label: 'Shipped', class: 'bg-accent-100 text-accent-600' },
    5: { label: 'Delivered', class: 'bg-accent-50 text-accent-600' },
    6: { label: 'Cancelled', class: 'bg-red-50 text-red-600' },
  },
  payment: {
    1: { label: 'Pending', class: 'bg-accent-50 text-accent-600' },
    2: { label: 'Paid', class: 'bg-accent-100 text-accent-600' },
    3: { label: 'Failed', class: 'bg-red-50 text-red-600' },
    4: { label: 'Expired', class: 'bg-gray-50 text-gray-400' },
  },
  shipment: {
    1: { label: 'Pending', class: 'bg-accent-50 text-accent-600' },
    2: { label: 'Picked Up', class: 'bg-gray-100 text-gray-600' },
    3: { label: 'In Transit', class: 'bg-gray-100 text-gray-600' },
    4: { label: 'Out for Delivery', class: 'bg-accent-50 text-accent-600' },
    5: { label: 'Delivered', class: 'bg-accent-100 text-accent-600' },
    6: { label: 'Failed', class: 'bg-red-50 text-red-600' },
  },
}

const badgeClass = computed(() => statusMap[props.type]?.[props.status]?.class || 'bg-gray-50 text-gray-400')
const label = computed(() => statusMap[props.type]?.[props.status]?.label || 'Unknown')
</script>
