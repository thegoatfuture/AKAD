import { reactive } from 'vue'

const profileState = reactive({
  name: '',
  email: '',
  phone: '',
  country: '',
  address: '',
  zip: '',
  bio: '',
})

export function useProfileState() {
  return profileState
}
