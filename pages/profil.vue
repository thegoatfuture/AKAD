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
  <div class="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Animated gradient orbs -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/3 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/3 rounded-full blur-2xl animate-float-fast"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-[0.01]"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto p-6">
      <!-- Success/Error Messages -->
      <div class="mb-6 space-y-4">
        <div
          v-if="successMessage"
          class="bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl backdrop-blur-sm animate-slide-down"
        >
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            {{ successMessage }}
          </div>
        </div>
        <div
          v-if="errorMessage"
          class="bg-red-500/20 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm animate-slide-down"
        >
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01"/>
            </svg>
            {{ errorMessage }}
          </div>
        </div>
      </div>

      <!-- Profile Header -->
      <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Profile Picture -->
          <div class="relative group">
            <div class="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-full flex items-center justify-center border-4 border-zinc-800/50 group-hover:border-yellow-400/30 transition-all duration-300">
              <UserIcon class="w-16 h-16 text-yellow-400/70" />
            </div>
            <button 
              @click="showImageUpload = true"
              class="absolute bottom-2 right-2 w-10 h-10 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <CameraIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Profile Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold mb-2">{{ profile.name || 'Nom non défini' }}</h1>
            <p class="text-zinc-400 mb-4">{{ profile.email || 'Email non défini' }}</p>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400">156</div>
                <div class="text-sm text-zinc-400">Jours actifs</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-400">+12.5%</div>
                <div class="text-sm text-zinc-400">Performance</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">Gold</div>
                <div class="text-sm text-zinc-400">Niveau</div>
              </div>
            </div>
          </div>

          <!-- Edit Button -->
          <div class="flex gap-3">
            <button
              v-if="!isEditing"
              @click="toggleEdit"
              class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <EditIcon class="w-5 h-5" />
              Modifier le profil
            </button>
            <div v-else class="flex gap-3">
              <button
                @click="updateProfile"
                class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <SaveIcon class="w-5 h-5" />
                Sauvegarder
              </button>
              <button
                @click="toggleEdit"
                class="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 mb-8">
        <div class="flex overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center gap-3 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap',
              activeTab === tab.id
                ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-400/5'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
            ]"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Personal Information Tab -->
        <div v-if="activeTab === 'personal'" class="space-y-8">
          <!-- Basic Information -->
          <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <UserIcon class="w-6 h-6 text-yellow-400" />
              Informations personnelles
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Nom complet</label>
                <div class="relative">
                  <UserIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    v-model="profile.name"
                    :disabled="!isEditing"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Votre nom complet"
                  />
                </div>
                <p v-if="errors.name" class="text-red-400 text-sm">{{ errors.name }}</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Email</label>
                <div class="relative">
                  <MailIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    v-model="profile.email"
                    :disabled="!isEditing"
                    type="email"
                    class="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="votre@email.com"
                  />
                </div>
                <p v-if="errors.email" class="text-red-400 text-sm">{{ errors.email }}</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Téléphone</label>
                <div class="relative">
                  <PhoneIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    v-model="profile.phone"
                    :disabled="!isEditing"
                    type="tel"
                    class="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Pays</label>
                <div class="relative">
                  <MapPinIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <select
                    v-model="profile.country"
                    :disabled="!isEditing"
                    class="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Sélectionner un pays</option>
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <HomeIcon class="w-6 h-6 text-yellow-400" />
              Adresse
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2 space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Adresse complète</label>
                <textarea
                  v-model="profile.address"
                  :disabled="!isEditing"
                  rows="3"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  placeholder="123 Rue de la Paix, Appartement 4B"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Code postal</label>
                <input
                  v-model="profile.zip"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="75001"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Ville</label>
                <input
                  v-model="profile.city"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Paris"
                />
              </div>
            </div>
          </div>

          <!-- Bio Section -->
          <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8">
            <h2 class="text-2xl font-bold mb-6">À propos de vous</h2>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-zinc-400">Biographie</label>
              <textarea
                v-model="profile.bio"
                :disabled="!isEditing"
                rows="4"
                class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                placeholder="Parlez-nous de votre parcours en trading, vos objectifs, votre expérience..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="space-y-8">
          <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheckIcon class="w-6 h-6 text-yellow-400" />
              Paramètres de sécurité
            </h2>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Authentification à deux facteurs</h3>
                  <p class="text-sm text-zinc-400">Ajoutez une couche de sécurité supplémentaire</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="securitySettings.twoFactorEnabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Alertes de connexion</h3>
                  <p class="text-sm text-zinc-400">Recevez un email lors de nouvelles connexions</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="securitySettings.loginAlerts" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Délai d'expiration de session (minutes)</label>
                <select
                  v-model="securitySettings.sessionTimeout"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="120">2 heures</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Tab -->
        <div v-if="activeTab === 'notifications'" class="space-y-8">
          <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <BellIcon class="w-6 h-6 text-yellow-400" />
              Préférences de notifications
            </h2>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Notifications par email</h3>
                  <p class="text-sm text-zinc-400">Recevez des mises à jour par email</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.emailNotifications" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Notifications push</h3>
                  <p class="text-sm text-zinc-400">Notifications en temps réel sur votre navigateur</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.pushNotifications" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Alertes de trading</h3>
                  <p class="text-sm text-zinc-400">Notifications sur vos positions et performances</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.tradingAlerts" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Actualités du marché</h3>
                  <p class="text-sm text-zinc-400">Analyses et nouvelles du marché</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.marketNews" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <h3 class="font-semibold">Rapports hebdomadaires</h3>
                  <p class="text-sm text-zinc-400">Résumé de vos performances chaque semaine</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.weeklyReports" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Tab -->
        <div v-if="activeTab === 'preferences'" class="space-y-8">
          <div class="bg-zinc-900/30 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <PaletteIcon class="w-6 h-6 text-yellow-400" />
              Préférences d'affichage
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Thème</label>
                <select
                  v-model="preferences.theme"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="dark">Sombre</option>
                  <option value="light">Clair</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Langue</label>
                <select
                  v-model="preferences.language"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Fuseau horaire</label>
                <select
                  v-model="preferences.timezone"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Devise par défaut</label>
                <select
                  v-model="preferences.currency"
                  class="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Upload Modal -->
    <div v-if="showImageUpload"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-zinc-800/50">
        <button @click="showImageUpload = false" 
                class="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <div class="text-center">
          <CameraIcon class="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 class="text-2xl font-bold mb-4">Changer la photo de profil</h3>
          <p class="text-zinc-400 mb-6">
            Sélectionnez une nouvelle photo pour votre profil
          </p>
          <input 
            type="file" 
            accept="image/*" 
            @change="handleImageUpload"
            class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-semibold hover:file:bg-yellow-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Floating animations */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(1deg); }
  66% { transform: translate(-20px, 20px) rotate(-1deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-25px, -25px) rotate(2deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -10px) rotate(-1deg); }
  75% { transform: translate(-15px, 15px) rotate(1deg); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

/* Slide down animation for messages */
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

/* Backdrop blur support */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(250, 204, 21, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(250, 204, 21, 0.7);
}

/* Enhanced focus states */
input:focus, select:focus, textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(250, 204, 21, 0.15);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Toggle switch animations */
.peer:checked + div {
  background-color: rgb(250 204 21);
}

.peer:checked + div:after {
  transform: translateX(100%);
  border-color: white;
}

/* File input styling */
input[type="file"]::file-selector-button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: rgb(250 204 21);
  color: black;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="file"]::file-selector-button:hover {
  background-color: rgb(245 158 11);
}
</style>