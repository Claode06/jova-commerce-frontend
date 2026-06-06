<template>
  <NuxtLink v-if="product.slug" :to="`/products/${product.slug}`" class="block group">
    <div class="relative overflow-hidden rounded-2xl bg-gray-50 aspect-square ring-1 ring-accent-200/0 group-hover:ring-accent-200 transition-all duration-500">
      <img
        :src="thumbnail"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div v-if="discountPercent" class="absolute top-3 left-3 bg-accent-400 text-white text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full">
        -{{ discountPercent }}%
      </div>
    </div>
    <div class="mt-3 px-1">
      <p class="text-[11px] text-gray-400 uppercase tracking-widest">{{ product.brand?.name }}</p>
      <h3 class="text-sm font-medium text-black mt-0.5 leading-snug line-clamp-2">{{ product.name }}</h3>
      <div class="flex items-center gap-2 mt-1">
        <span class="text-sm font-medium text-black">Rp {{ formatPrice(minPrice) }}</span>
        <span v-if="product.avg_rating" class="text-[11px] text-accent-400">{{ Number(product.avg_rating).toFixed(1) }} ★</span>
      </div>
    </div>
  </NuxtLink>
  <div v-else class="opacity-30">
    <div class="rounded-2xl bg-gray-100 aspect-square flex items-center justify-center">
      <p class="text-xs text-gray-400">Tidak tersedia</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
}>()

const thumbnail = computed(() => {
  return props.product.file_storage?.link
    || 'https://placehold.co/400x400?text=No+Image'
})

const minPrice = computed(() => {
  const variants = props.product.product_variants
  if (variants?.length) {
    return Math.min(...variants.map((v: any) => Number(v.price)))
  }
  return Number(props.product.starting_price) || 0
})

const discountPercent = computed(() => {
  return props.product.discount_percent || 0
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}
</script>
