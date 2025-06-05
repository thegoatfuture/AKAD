<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <img src="/images/logo-pf-nofond.svg" alt="Logo" class="h-16 mx-auto mb-8" />
      
      <div class="bg-zinc-900/50 backdrop-blur rounded-2xl p-8 border border-zinc-800">
        <h2 class="text-2xl font-bold text-yellow-400 mb-4">Vérifiez votre email</h2>
        
        <div class="bg-yellow-400/10 rounded-lg p-4 mb-6">
          <p class="text-white">
            Un email de confirmation a été envoyé à <strong>{{ email }}</strong>
          </p>
        </div>

        <p class="text-gray-400 mb-6">
          Cliquez sur le lien dans l'email pour activer votre compte. Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
        </p>

        <div class="space-y-4">
          <button
            @click="resendEmail"
            :disabled="loading"
            class="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? "Envoi en cours..." : "Renvoyer l'email" }}
          </button>

          <NuxtLink
            to="/login"
            class="block w-full bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Retour à la connexion
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '@/composables/useSupabase'

const loading = ref(false)
const email = ref(localStorage.getItem('pendingEmail') || '')

const { supabase } = useSupabase()

async function resendEmail() {
  if (!email.value) return
  
  loading.value = true
  
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.value
    })
    
    if (error) throw error
    
    alert('Email de confirmation renvoyé avec succès')
  } catch (error) {
    alert("Erreur lors de l'envoi de l'email")
  } finally {
    loading.value = false
  }
}

// Clean up email from localStorage when component is unmounted
onUnmounted(() => {
  localStorage.removeItem('pendingEmail')
})
</script>