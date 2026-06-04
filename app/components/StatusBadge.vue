<template>
  <span class="text-[11px] font-medium uppercase tracking-wider" :class="badgeClass">
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
    1: { label: 'Pending Payment', class: 'text-gray-300' },
    2: { label: 'Paid', class: 'text-black' },
    3: { label: 'Processing', class: 'text-gray-500' },
    4: { label: 'Shipped', class: 'text-black' },
    5: { label: 'Delivered', class: 'text-black' },
    6: { label: 'Cancelled', class: 'text-red-400' },
  },
  payment: {
    1: { label: 'Pending', class: 'text-gray-300' },
    2: { label: 'Paid', class: 'text-black' },
    3: { label: 'Failed', class: 'text-red-400' },
    4: { label: 'Expired', class: 'text-gray-300' },
  },
  shipment: {
    1: { label: 'Pending', class: 'text-gray-300' },
    2: { label: 'Picked Up', class: 'text-gray-500' },
    3: { label: 'In Transit', class: 'text-gray-500' },
    4: { label: 'Out for Delivery', class: 'text-black' },
    5: { label: 'Delivered', class: 'text-black' },
    6: { label: 'Failed', class: 'text-red-400' },
  },
}

const badgeClass = computed(() => statusMap[props.type]?.[props.status]?.class || 'text-gray-300')
const label = computed(() => statusMap[props.type]?.[props.status]?.label || 'Unknown')
</script>
