<template>
  <div>
    <!-- Hero -->
    <section class="relative w-full h-[85vh] md:h-screen bg-black overflow-hidden">
      <div class="absolute inset-0">
        <div class="w-full h-full flex items-center justify-center">
          <Icon name="heroicons:sparkles" class="w-40 h-40 text-white/10" />
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-accent-600/15 via-transparent to-black pointer-events-none"></div>
      <div class="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16">
        <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none max-w-2xl text-balance">
          Fashion & Beauty
        </h1>
        <p class="text-white/60 text-base md:text-lg mt-4 max-w-md font-light leading-relaxed">
          Temukan gaya terbaik Anda dengan koleksi fashion dan kecantikan eksklusif
        </p>
        <NuxtLink to="/products" class="inline-block mt-8 text-sm font-medium text-white border border-accent-400/50 rounded-full px-8 py-3 hover:bg-accent-400 hover:text-white hover:border-accent-400 transition-all duration-500">
          Belanja Sekarang
        </NuxtLink>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 md:py-24">
      <div class="px-6 md:px-12">
        <div class="flex items-end justify-between mb-10">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-balance">Kategori</h2>
          <NuxtLink to="/products" class="hidden md:block text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-accent-400 transition-colors">
            Lihat Semua
          </NuxtLink>
        </div>
        <div class="flex gap-4 md:gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.id"
            :to="`/products?category=${cat.slug}`"
            class="relative min-w-[240px] md:min-w-[300px] snap-start group rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0"
          >
            <div class="w-full h-72 md:h-96 bg-gray-50 flex items-center justify-center">
              <img v-if="cat.file_storage?.link || cat.image_url" :src="cat.file_storage?.link || cat.image_url" :alt="cat.name" class="w-full h-full object-cover" />
              <Icon v-else name="heroicons:tag" class="w-12 h-12 md:w-16 md:h-16 text-gray-200" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-accent-600/10 to-transparent group-hover:from-black/50 transition-colors duration-500"></div>
            <div class="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p class="text-white text-base md:text-lg font-serif font-bold">{{ cat.name }}</p>
              <p class="text-white/60 text-xs md:text-sm mt-1">{{ cat.products_count || 0 }} produk</p>
            </div>
          </NuxtLink>
        </div>
        <div class="mt-8 text-center md:hidden">
          <NuxtLink to="/products" class="text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-accent-400 transition-colors">
            Lihat Semua
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 md:py-24 bg-gray-50/50">
      <div class="px-6 md:px-12">
        <div class="flex items-end justify-between mb-10">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-balance">Produk Terbaru</h2>
          <NuxtLink to="/products" class="hidden md:block text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-accent-400 transition-colors">
            Lihat Semua
          </NuxtLink>
        </div>

        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="rounded-3xl overflow-hidden bg-white">
            <div class="skeleton w-full aspect-square rounded-none"></div>
            <div class="p-4 space-y-2">
              <div class="skeleton h-3 w-16"></div>
              <div class="skeleton h-4 w-3/4"></div>
              <div class="skeleton h-4 w-1/3"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/products" class="inline-block text-sm font-medium text-black border border-gray-300 rounded-full px-8 py-3 hover:bg-black hover:text-white hover:border-black transition-all">
            Lihat Semua Produk
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { fetchProducts, fetchCategories } = useCatalog()
const loading = ref(true)

const products = ref<any[]>([])
const categories = ref<any[]>([])

onMounted(async () => {
  const [prodRes, cats] = await Promise.all([
    fetchProducts({ per_page: 6, sort: 'newest' }),
    fetchCategories(),
  ])
  products.value = prodRes?.data || []
  categories.value = cats || []
  loading.value = false
})
</script>
