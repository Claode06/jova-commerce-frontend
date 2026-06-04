<template>
  <div class="container mx-auto px-4 py-6 max-w-xl">
    <h1 class="text-xl font-bold mb-6">Pembayaran</h1>

    <div v-if="loading" class="space-y-4">
      <div class="skeleton h-48 w-full rounded-xl"></div>
      <div class="skeleton h-24 w-full rounded-xl"></div>
    </div>

    <template v-else>
      <!-- Order Info -->
      <div class="card bg-white border border-gray-200/60 shadow-sm mb-4">
        <div class="card-body p-5">
          <p class="text-sm text-gray-400">Pesanan</p>
          <p class="font-bold font-mono">{{ order?.order_number }}</p>
          <p class="text-2xl font-bold text-primary mt-2">Rp {{ formatPrice(order?.total || 0) }}</p>
        </div>
      </div>

      <!-- Payment Accounts -->
      <div class="card bg-white border border-gray-200/60 shadow-sm mb-4">
        <div class="card-body p-5">
          <h3 class="font-semibold mb-3">Transfer ke:</h3>
          <div class="space-y-3">
            <label
              v-for="acc in paymentAccounts"
              :key="acc.id"
              class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
              :class="selectedAccount === acc.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-base-300'"
            >
              <input
                type="radio"
                name="payment_account"
                :value="acc.id"
                v-model="selectedAccount"
                class="radio radio-primary radio-sm"
              />
              <div>
                <p class="text-sm font-medium">{{ acc.bank_name }}</p>
                <p class="text-xs text-gray-400">{{ acc.account_number }} <span class="text-base-content/50">a.n.</span> {{ acc.account_name }}</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Upload Proof -->
      <div class="card bg-white border border-gray-200/60 shadow-sm">
        <div class="card-body p-5">
          <h3 class="font-semibold mb-3">Upload Bukti Bayar</h3>
          <div
            class="border-2 border-dashed border-base-300/60 rounded-2xl p-6 text-center cursor-pointer hover:border-secondary/40 transition-colors"
            @click="fileInput?.click()"
          >
            <Icon name="heroicons:cloud-arrow-up" class="w-12 h-12 mx-auto text-gray-200 mb-2" />
            <p class="text-sm text-gray-300">Klik untuk upload bukti transfer</p>
            <p class="text-xs text-base-content/30 mt-1">PNG, JPG (max 5MB)</p>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFile"
            />
          </div>

          <div v-if="previewUrl" class="mt-3">
            <img :src="previewUrl" alt="Preview" class="w-full h-48 object-cover rounded-xl" />
          </div>

          <div v-if="error" class="alert alert-error text-sm p-3 mt-4">
            <Icon name="heroicons:exclamation-circle" class="w-5 h-5 shrink-0" />
            <span>{{ error }}</span>
          </div>

          <button
            class="btn btn-soft btn-primary w-full mt-4 rounded-full"
            :disabled="!selectedAccount || !proofFile || submitting"
            @click="submitPayment"
          >
            <span v-if="submitting" class="loading loading-spinner loading-sm"></span>
            <span v-else>Kirim Pembayaran</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const submitting = ref(false)
const error = ref<string | null>(null)
const order = ref<any>(null)
const paymentAccounts = ref<any[]>([])
const selectedAccount = ref<number | null>(null)
const proofFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function handleFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  proofFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

async function submitPayment() {
  if (!selectedAccount.value || !proofFile.value) return
  error.value = null
  submitting.value = true

  try {
    const uploadForm = new FormData()
    uploadForm.append('file', proofFile.value)

    const { data: uploadRes, error: uploadErr } = await useApi('/upload', {
      method: 'POST',
      body: uploadForm,
    })

    if (uploadErr.value) throw new Error(uploadErr.value.data?.message || 'Upload file gagal')

    const fileId = uploadRes.value?.file?.id || uploadRes.value?.id

    const payForm = new FormData()
    payForm.append('order_id', String(route.params.orderId))
    payForm.append('payment_account_id', String(selectedAccount.value))
    payForm.append('proof_path', String(fileId))
    payForm.append('amount', String(order.value?.total || 0))

    const { error: payErr } = await useApi('/payments', {
      method: 'POST',
      body: payForm,
    })

    if (payErr.value) throw new Error(payErr.value.data?.message || 'Pembayaran gagal')

    router.push(`/orders/${route.params.orderId}`)
  } catch (e: any) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const [ordRes, accRes] = await Promise.all([
    useApi(`/orders/${route.params.orderId}`),
    useApi('/payment-accounts'),
  ])

  order.value = ordRes.data.value?.order || ordRes.data.value
  paymentAccounts.value = accRes.data.value?.accounts || accRes.data.value || []
  loading.value = false
})
</script>
