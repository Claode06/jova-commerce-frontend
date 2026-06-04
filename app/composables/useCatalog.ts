export const useCatalog = () => {
  const loading = ref(false)

  async function fetchProducts(params?: {
    category?: string
    brand?: string
    gender?: number
    search?: string
    sort?: string
    page?: number
    per_page?: number
  }) {
    loading.value = true
    try {
      const query = new URLSearchParams()
      if (params?.category) query.set('category', params.category)
      if (params?.brand) query.set('brand', params.brand)
      if (params?.gender) query.set('gender', String(params.gender))
      if (params?.search) query.set('search', params.search)
      if (params?.sort) query.set('sort', params.sort)
      if (params?.page) query.set('page', String(params.page))
      if (params?.per_page) query.set('per_page', String(params.per_page))

      const { data } = await useApi<any>(`/products?${query.toString()}`)
      return data.value
    } finally {
      loading.value = false
    }
  }

  async function fetchProduct(slug: string) {
    const { data } = await useApi<any>(`/products/${slug}`)
    return data.value
  }

  async function fetchCategories() {
    const { data } = await useApi<any>('/categories')
    return data.value?.categories || []
  }

  async function fetchBrands() {
    const { data } = await useApi<any>('/brands')
    return data.value?.brands || []
  }

  return { loading, fetchProducts, fetchProduct, fetchCategories, fetchBrands }
}
