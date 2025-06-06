Here's the fixed version with all missing closing brackets added:

<script setup>
import { ref, reactive } from 'vue'
import { useProfileState } from '@/composables/useProfile'
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, HomeIcon, EditIcon, SaveIcon, CameraIcon, ShieldCheckIcon, BellIcon, PaletteIcon } from 'lucide-vue-next'

// Force le layout personnalisé
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const profile = useProfileState()

const successMessage = ref('')
const errorMessage = ref('')
const isEditing = ref(false)
const activeTab = ref('personal')
const showImageUpload = ref(false)

const errors = reactive({
  name: '',
  email: '',
})

const tabs = [
  { id: 'personal', name: 'Informations personnelles', icon: UserIcon },
  { id: 'security', name: 'Sécurité', icon: ShieldCheckIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'preferences', name: 'Préférences', icon: PaletteIcon }
]

const notificationSettings = reactive({
  emailNotifications: true,
  pushNotifications: false,
  tradingAlerts: true,
  marketNews: false,
  weeklyReports: true
})

const securitySettings = reactive({
  twoFactorEnabled: false,
  loginAlerts: true,
  sessionTimeout: '30'
})

const preferences = reactive({
  theme: 'dark',
  language: 'fr',
  timezone: 'Europe/Paris',
  currency: 'EUR'
})

async function updateProfile() {
  successMessage.value = ''
  errorMessage.value = ''
  errors.name = ''
  errors.email = ''

  if (!profile.name) {
    errors.name = 'Nom requis'
  }
  if (!profile.email) {
    errors.email = 'Email requis'
  } else if (!/.+@.+\..+/.test(profile.email)) {
    errors.email = "Format d'email invalide"
  }

  if (errors.name || errors.email) {
    return
  }

  try {
    const { data, error } = await $fetch('/api/profile', {
      method: 'POST',
      body: profile,
    })

    if (error) {
      errorMessage.value = error.message || 'Erreur lors de la mise à jour du profil'
      return
    }

    successMessage.value = 'Profil mis à jour avec succès'
    isEditing.value = false
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour du profil'
  }
}

function toggleEdit() {
  isEditing.value = !isEditing.value
  if (!isEditing.value) {
    // Reset errors when canceling edit
    errors.name = ''
    errors.email = ''
  }
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Here you would typically upload the file to your server
    // For now, we'll just show a success message
    successMessage.value = 'Photo de profil mise à jour avec succès'
    showImageUpload.value = false
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}
</script>

<template>
  <!-- Template content remains unchanged -->
</template>

<style scoped>
/* Style content remains unchanged */
</style>