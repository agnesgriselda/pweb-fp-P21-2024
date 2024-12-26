<template>
    <div>
      <h2>Create Crowdfund</h2>
      <form @submit.prevent="createCrowdfund">
        <label for="name">Name:</label>
        <input id="name" v-model="crowdfund.name" type="text" />
  
        <label for="target">Target:</label>
        <input id="target" v-model="crowdfund.target" type="number" />
        <button type="submit">Submit</button>
      </form>
      <button @click="$router.push('/admin-panel')">Back to Admin Panel</button>
    </div>
  </template>
  
  <script>
  import { createCrowdfund } from "@/services/api";
  
  export default {
    data() {
      return {
        crowdfund: {
          name: "",
          target: 0,
          status: "OPEN",
        },
      };
    },
    methods: {
      async createCrowdfund() {
        try {
          await createCrowdfund(this.crowdfund);
          alert("Crowdfund created successfully.");
          this.$router.push("/admin-panel");
        } catch (error) {
          console.error("Error creating crowdfund:", error);
          alert("Failed to create crowdfund.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
/* Styling untuk halaman utama */
div {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f6f9; /* Warna background lembut */
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Efek bayangan */
  border-radius: 10px; /* Sudut membulat */
  background: white;
}

/* Heading */
h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Form styling */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3498db;
  outline: none;
  background-color: #fff;
}

/* Tombol Submit */
button[type="submit"] {
  background-color: #27ae60; /* Hijau */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #1e8449; /* Warna hover */
}

/* Tombol Back */
button:last-of-type {
  background-color: #3498db; /* Biru */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:last-of-type:hover {
  background-color: #2980b9; /* Warna hover */
}
</style>

  