<template>
  <div class="auth-container">
    <h1 class="auth-title">{{ title }}</h1>
    <div class="auth-card">
      <h2>{{ subtitle }}</h2>
      <form @submit.prevent="onSubmit" class="auth-form">
        <div v-for="field in fields" :key="field.id" class="form-group">
          <v-text-field
            :id="field.id"
            class="auth-form-input"
            v-model="formData[field.name]"
            :label="field.label"
            :type="field.type"
            required
            filled 
            dense 
            solo
            :style="{ marginTop: field.id !== 'register-username' ? '-20px' : '' }"
          ></v-text-field>
        </div>
        <slot name="extra-fields"></slot>
        <button type="submit" :id="submitButtonId" class="auth-button">{{ submitButtonText }}</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="auth-link">
        {{ linkText }}
        <router-link :to="linkRoute" class="text-primary text-decoration-none">
          {{ linkActionText }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    fields: Array,
    submitButtonId: String,
    submitButtonText: String,
    linkText: String,
    linkRoute: String,
    linkActionText: String,
    error: String,
  },
  data() {
    return {
      formData: {},
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.formData)
    },
  },
}
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
  color: #fff;
}

.auth-title {
  margin-bottom: 20px;
font-size: 24px;
font-weight: 400;
}
.auth-container h2{
    font-size: 18px;
    font-weight: 300;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column; 
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.auth-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.auth-button:hover {
  background-color: #2563eb;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.auth-link {
  margin-top: 20px;
  font-size: 14px;
}

.auth-form-input {
}
</style>