<script setup lang="ts">
import { ref } from 'vue'
import { Head } from '@inertiajs/vue3'

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: ''
})

// Form state
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  message.value = ''

  try {
    const response = await fetch('/api/property-agents/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      message.value = 'Property agent saved successfully!'
      messageType.value = 'success'
      resetForm()
      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        message.value = ''
      }, 5000)
    } else {
      const errorData = await response.json().catch(() => ({}))
      message.value = errorData.message || 'Failed to save property agent. Please check your input.'
      messageType.value = 'error'
      console.error('API Error:', errorData)
    }
  } catch (error) {
    message.value = 'An unexpected error occurred.'
    messageType.value = 'error'
    console.error('Network Error:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Form validation
const validateForm = () => {
  if (!form.value.firstName.trim()) {
    message.value = 'First name is required'
    messageType.value = 'error'
    return false
  }
  if (!form.value.lastName.trim()) {
    message.value = 'Last name is required'
    messageType.value = 'error'
    return false
  }
  if (!form.value.email.trim()) {
    message.value = 'Email is required'
    messageType.value = 'error'
    return false
  }
  if (!isValidEmail(form.value.email)) {
    message.value = 'Please enter a valid email address'
    messageType.value = 'error'
    return false
  }
  if (!form.value.mobileNumber.trim()) {
    message.value = 'Mobile number is required'
    messageType.value = 'error'
    return false
  }
  return true
}

// Email validation
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Reset form
const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: ''
  }
}
</script>

<template>

  <Head title="Property Agent Management" />

  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Property Agent Form
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Add or update property agent information
        </p>
      </div>

      <!-- Flash Message Display -->
      <div v-if="message" class="mt-6">
        <div :class="[
          'p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ease-in-out',
          messageType === 'success'
            ? 'bg-green-50 border-l-green-400 border border-green-200 text-green-800'
            : 'bg-red-50 border-l-red-400 border border-red-200 text-red-800'
        ]">
          <div class="flex items-center">
            <!-- Success Icon -->
            <svg v-if="messageType === 'success'" class="h-5 w-5 mr-2 text-green-400" fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <!-- Error Icon -->
            <svg v-else class="h-5 w-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ message }}</span>
            <!-- Close Button -->
            <button @click="message = ''"
              class="ml-auto text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="firstName" class="block text-sm/6 font-medium text-gray-900">First Name</label>
            <input type="text" v-model="form.firstName" required id="firstName" placeholder="Enter first name"
              class="block w-full rounded-md bg-white px-3 py-1.5 border text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div>
            <label for="lastName" class="block text-sm/6 font-medium text-gray-900">Last Name</label>
            <input type="text" v-model="form.lastName" required id="lastName" placeholder="Enter last name"
              class="block w-full rounded-md bg-white px-3 py-1.5 border text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
            <input type="email" v-model="form.email" required id="email" placeholder="Enter email"
              class="block w-full rounded-md bg-white px-3 py-1.5 border text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div>
            <label for="mobileNumber" class="block text-sm/6 font-medium text-gray-900">Mobile Number</label>
            <input type="text" v-model="form.mobileNumber" required id="mobileNumber" placeholder="Enter mobile number"
              class="block w-full rounded-md bg-white px-3 py-1.5 border text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit" :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Saving...
            </span>
            <span v-else>Save Property Agent</span>
          </button>
        </div>

        <!-- Reset Button -->
        <div>
          <button type="button" @click="resetForm"
            class="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reset Form
          </button>
        </div>
      </form>
    </div>
  </div>
</template>