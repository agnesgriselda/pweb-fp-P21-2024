<template>
  <div class="login-container">
    <form @submit.prevent="loginUser" class="login-form">
      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="login.email" required placeholder="Enter your email" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="login.password" required placeholder="Enter your password" />

      <button type="submit">Login</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import { loginUser } from '../services/api';

export default {
  name: 'LoginFormComponent',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = '';
      this.successMessage = '';
      try {
        const response = await loginUser(this.login);
        const { token, role } = response.data;

        localStorage.setItem('token', token);
        this.successMessage = 'Login successful!';

        // Redirect based on user role
        if (role === 'admin') {
          this.$router.push('/admin-panel');
        } else {
          this.$router.push('/user-dashboard');
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || 'Login failed! Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-form h2 {
  margin: 0 0 10px;
  text-align: center;
  color: #333;
}

.login-form label {
  font-weight: bold;
  color: #555;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.login-form input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
}

.success {
  color: green;
  font-size: 14px;
  text-align: center;
}
</style>
