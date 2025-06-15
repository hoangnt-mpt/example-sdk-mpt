<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="tenantId">Tenant ID:</label>
        <input
          type="number"
          id="tenantId"
          v-model="formData.tenantId"
          required
        />
      </div>

      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="formData.username" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
        />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="button-group">
        <button type="submit" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <button type="button" @click="handleSSOLogin" :disabled="loading">
          {{ loading ? "Logging in..." : "SSO Login" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "Login",
  props: {
    sdkService: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formData = reactive({
      tenantId: "",
      username: "",
      password: "",
    });
    const error = ref("");
    const loading = ref(false);

    const handleSubmit = async () => {
      error.value = "";
      loading.value = true;

      try {
        const response = await props.sdkService.login({
          tenantId: parseInt(formData.tenantId),
          username: formData.username,
          password: formData.password,
        });

        if (response.success) {
          console.log("✅ Login successful");
        } else {
          error.value = response.message || "Login failed";
        }
      } catch (err) {
        error.value = err.message || "An error occurred during login";
      } finally {
        loading.value = false;
      }
    };

    const handleSSOLogin = async () => {
      error.value = "";
      loading.value = true;

      try {
        const response = await props.sdkService.login({
          tenantId: 1, // Default tenant ID for SSO
          username: "sso_user",
          password: "sso_password",
        });

        if (response.success) {
          console.log("✅ SSO Login successful");
        } else {
          error.value = response.message || "SSO Login failed";
        }
      } catch (err) {
        error.value = err.message || "An error occurred during SSO login";
      } finally {
        loading.value = false;
      }
    };

    return {
      formData,
      error,
      loading,
      handleSubmit,
      handleSSOLogin,
    };
  },
};
</script>

<style scoped>
.login-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #6f42c1;
  box-shadow: 0 0 0 2px rgba(111, 66, 193, 0.2);
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.button-group button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #6f42c1;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button-group button:hover {
  background: #5a32a3;
}

.button-group button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
