<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-gray-400 mb-8">
      <NuxtLink to="/" class="hover:text-black transition-colors">Beranda</NuxtLink>
      <span>/</span>
      <NuxtLink to="/products" class="hover:text-black transition-colors">Produk</NuxtLink>
      <span v-if="product?.category">/</span>
      <NuxtLink v-if="product?.category" :to="`/products?category=${product.category.slug}`" class="hover:text-black transition-colors">{{ product.category.name }}</NuxtLink>
      <span>/</span>
      <span class="text-gray-600">{{ product?.name }}</span>
    </div>

    <div v-if="loading" class="flex flex-col md:flex-row gap-8">
      <div class="skeleton w-full md:w-1/2 h-[500px] rounded-3xl"></div>
      <div class="flex-1 space-y-4">
        <div class="skeleton h-4 w-1/4"></div>
        <div class="skeleton h-10 w-3/4"></div>
        <div class="skeleton h-4 w-1/3"></div>
        <div class="skeleton h-8 w-1/2"></div>
        <div class="skeleton h-12 w-40"></div>
      </div>
    </div>

    <div v-else-if="product" class="flex flex-col md:flex-row gap-8">
      <!-- Images -->
      <div class="w-full md:w-1/2">
        <div class="sticky top-24">
          <div class="rounded-3xl overflow-hidden mb-4">
            <img
              :src="selectedImage || product.file_storage?.link || 'https://placehold.co/600x600?text=No+Image'"
              :alt="product.name"
              class="w-full h-[500px] md:h-[600px] object-cover"
            />
          </div>
          <div v-if="product.product_images?.length" class="flex gap-2 overflow-x-auto">
            <button
              v-for="img in product.product_images"
              :key="img.id"
              class="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0 cursor-pointer"
              :class="{ 'border-accent-400 ring-1 ring-accent-400': selectedImage === getImageUrl(img) }"
              @click="selectedImage = getImageUrl(img)"
            >
              <img :src="getImageUrl(img)" alt="" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1">
        <div class="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-2">
          <NuxtLink :to="`/products?brand=${product.brand?.slug}`" class="hover:text-black transition-colors">{{ product.brand?.name }}</NuxtLink>
          <span>•</span>
          <NuxtLink :to="`/products?category=${product.category?.slug}`" class="hover:text-black transition-colors">{{ product.category?.name }}</NuxtLink>
        </div>

        <h1 class="text-3xl md:text-4xl font-serif font-bold mb-3 leading-tight">{{ product.name }}</h1>

        <div class="flex items-center gap-2 mb-4">
          <span class="text-sm text-accent-400">{{ Number(product.avg_rating || 0).toFixed(1) }} ★ ({{ product.reviews_count || 0 }} ulasan)</span>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <div v-if="selectedVariant">
            <span class="text-2xl font-sans font-semibold text-black">Rp {{ formatPrice(selectedVariant.price) }}</span>
          </div>
          <div v-else-if="product.product_variants?.length">
            <span class="text-2xl font-sans font-semibold text-black">
              Rp {{ formatPrice(Math.min(...product.product_variants.map((v: any) => Number(v.price)))) }}
            </span>
            <span class="text-sm text-gray-300"> - </span>
            <span class="text-2xl font-sans font-semibold text-black">
              Rp {{ formatPrice(Math.max(...product.product_variants.map((v: any) => Number(v.price)))) }}
            </span>
          </div>
        </div>

        <!-- Variants -->
        <div v-if="product.product_variants?.length" class="mb-6">
          <p class="text-sm font-medium text-gray-700 mb-2">Variant:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="v in product.product_variants"
              :key="v.id"
              class="px-4 py-2 text-sm border border-gray-200 rounded-full transition-all"
              :class="selectedVariant?.id === v.id ? 'bg-accent-400 text-white border-accent-400' : 'hover:border-accent-400 text-gray-700'"
              @click="selectVariant(v)"
            >
              {{ v.label }}
              <span v-if="v.is_active === 0" class="ml-1 text-[10px] opacity-60">habis</span>
            </button>
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="flex items-center gap-4 mb-6">
          <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
            <button class="w-10 h-10 flex items-center justify-center text-lg hover:bg-accent-50 transition-colors" :disabled="qty <= 1" @click="qty--">−</button>
            <span class="px-5 text-sm font-medium min-w-[3rem] text-center">{{ qty }}</span>
            <button class="w-10 h-10 flex items-center justify-center text-lg hover:bg-accent-50 transition-colors" @click="qty++">+</button>
          </div>
        </div>

        <button
          class="w-full md:w-auto px-12 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-accent-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!canAddToCart"
          @click="addToCart"
        >
          <Icon name="heroicons:shopping-cart" class="w-5 h-5 inline -mt-0.5 mr-1.5" />
          {{ canAddToCart ? 'Tambah ke Keranjang' : 'Pilih variant terlebih dahulu' }}
        </button>

        <!-- Description -->
        <div class="mt-12 border-t border-gray-100 pt-8">
          <div class="flex gap-8 border-b border-gray-100 pb-4">
            <button class="text-xs uppercase tracking-widest pb-4 border-b-2 transition-colors -mb-[1.1rem]" :class="activeTab === 'desc' ? 'border-accent-400 text-accent-400' : 'border-transparent text-gray-400 hover:text-accent-400'" @click="activeTab = 'desc'">Deskripsi</button>
            <button class="text-xs uppercase tracking-widest pb-4 border-b-2 transition-colors -mb-[1.1rem]" :class="activeTab === 'features' ? 'border-accent-400 text-accent-400' : 'border-transparent text-gray-400 hover:text-accent-400'" @click="activeTab = 'features'">Fitur</button>
            <button class="text-xs uppercase tracking-widest pb-4 border-b-2 transition-colors -mb-[1.1rem]" :class="activeTab === 'reviews' ? 'border-accent-400 text-accent-400' : 'border-transparent text-gray-400 hover:text-accent-400'" @click="activeTab = 'reviews'">Ulasan</button>
          </div>
          <div class="py-6 text-sm text-gray-600 leading-relaxed">
            <div v-if="activeTab === 'desc'">{{ product.description || 'Tidak ada deskripsi' }}</div>
            <div v-else-if="activeTab === 'features'">{{ product.features || 'Tidak ada informasi fitur' }}</div>
            <div v-else>
              <div v-if="reviews.length" class="space-y-4">
                <div v-for="review in reviews" :key="review.id" class="border-b border-gray-100 pb-4">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center">{{ review.user?.name?.[0] || 'U' }}</div>
                    <div>
                      <p class="text-sm font-medium text-gray-700">{{ review.user?.name || 'User' }}</p>
                      <span class="text-xs text-accent-400">{{ review.rating }} ★</span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">{{ review.reason || '—' }}</p>
                </div>
              </div>
              <p v-else class="text-sm text-gray-400 text-center py-8">Belum ada ulasan</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 mx-auto text-accent-200 mb-4" />
      <p class="text-gray-400 mb-4">Produk tidak ditemukan</p>
      <NuxtLink to="/products" class="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-accent-400 transition-colors">Kembali ke Katalog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchProduct } = useCatalog()
const { addItem } = useCart()
const auth = useAuth()
const { show: showToast } = useToast()

const loading = ref(true)
const product = ref<any>(null)
const reviews = ref<any[]>([])
const selectedVariant = ref<any>(null)
const selectedImage = ref<string | null>(null)
const qty = ref(1)
const activeTab = ref('desc')

const canAddToCart = computed(() => {
  if (!product.value?.product_variants?.length) return false
  if (!selectedVariant.value) return false
  return selectedVariant.value.is_active === 1
})

function selectVariant(v: any) {
  selectedVariant.value = v
}

async function addToCart() {
  if (!selectedVariant.value) return
  if (!auth.isLoggedIn.value) {
    navigateTo('/login')
    return
  }

  await addItem(selectedVariant.value.id, qty.value)
  showToast('Ditambahkan ke keranjang')
  navigateTo('/cart')
}

function getImageUrl(img: any): string {
  return img.file_storage?.link || img.url || ''
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    const res = await fetchProduct(slug)
    product.value = res?.product || res

    if (product.value?.product_variants?.length) {
      const active = product.value.product_variants.find((v: any) => v.is_active === 1)
      if (active) selectedVariant.value = active
    }

    if (product.value?.product_images?.length) {
      selectedImage.value = getImageUrl(product.value.product_images[0])
    }

    if (product.value?.id) {
      const revRes = await useApi(`/products/${product.value.id}/reviews`)
      reviews.value = revRes.data.value?.reviews || []
    }
  } catch (e) {
    console.error('Failed to load product:', e)
  } finally {
    loading.value = false
  }
})
</script>
