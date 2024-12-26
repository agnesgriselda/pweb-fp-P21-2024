<template>
  <div>
    <h1>Admin Dashboard</h1>
    <button @click="$router.push('/admin/create')">Create Crowdfund</button>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Target</th>
          <th>Current Donation</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(crowdfund, index) in crowdfunds" :key="crowdfund._id">
          <td>{{ index + 1 }}</td>
          <td>{{ crowdfund.name }}</td>
          <td>{{ crowdfund.target }}</td>
          <td>{{ crowdfund.current_donation }}</td>
          <td>{{ crowdfund.status }}</td>
          <td>
            <button @click="viewCrowdfund(crowdfund._id)">Detail</button>
            <button @click="editCrowdfund(crowdfund._id)">Edit</button>
            <button @click="deleteCrowdfund(crowdfund._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { getAllCrowdfunds, deleteCrowdfund } from "@/services/api";

export default {
  name: "AdminPanel",
  data() {
    return {
      crowdfunds: [],
    };
  },
  methods: {
  // Fetch all crowdfunds from the API
  async fetchCrowdfunds() {
    try {
      const response = await getAllCrowdfunds(); // Call the API to get all crowdfunds
      this.crowdfunds = response.data; // Store the response data in the 'crowdfunds' variable
    } catch (error) {
      console.error("Error fetching crowdfunds:", error);
      alert("Failed to load crowdfund data. Please try again later.");
    }
  },

  // Navigate to the detail view of a specific crowdfund
  viewCrowdfund(id) {
    console.log("Navigating to detail page with ID:", id); // Log ID untuk memastikan ID benar
    this.$router.push(`/admin/${id}`); // Navigasi ke rute detail dengan ID
  },


  // Navigate to the edit page of a specific crowdfund
  editCrowdfund(id) {
    console.log("Navigating to edit page with ID:", id); // Log ID untuk debugging
    this.$router.push(`/admin/${id}/edit`); // Pastikan ID diteruskan ke URL
  },

  // Delete a specific crowdfund and refresh the list
  async deleteCrowdfund(id) {
    try {
      const confirmDelete = confirm("Are you sure you want to delete this crowdfund?");
      if (confirmDelete) {
        await deleteCrowdfund(id); // Call the API to delete the crowdfund
        alert("Crowdfund deleted successfully.");
        this.fetchCrowdfunds(); // Refresh the list of crowdfunds
      }
    } catch (error) {
      console.error("Error deleting crowdfund:", error);
      alert("Failed to delete crowdfund. Please try again later.");
    }
    
    },
  },
  mounted() {
    this.fetchCrowdfunds();
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
}

/* Heading */
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Tombol Create Crowdfund */
button {
  background-color: #3498db; /* Biru */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9; /* Warna hover */
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Efek bayangan */
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
}

/* Header tabel */
thead {
  background-color: #2c3e50;
  color: white;
}

thead th {
  padding: 12px 15px;
  text-align: left;
  font-size: 16px;
}

/* Baris dan kolom tabel */
tbody tr:nth-child(odd) {
  background-color: #f9f9f9; /* Warna abu terang */
}

tbody tr:nth-child(even) {
  background-color: #ffffff; /* Warna putih */
}

tbody td {
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
}

/* Tombol di dalam tabel */
tbody td button {
  margin-right: 5px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

/* Tombol detail */
tbody td button:first-child {
  background-color: #27ae60; /* Hijau */
  color: white;
}

tbody td button:first-child:hover {
  background-color: #1e8449; /* Warna hover */
}

/* Tombol edit */
tbody td button:nth-child(2) {
  background-color: #f39c12; /* Oranye */
  color: white;
}

tbody td button:nth-child(2):hover {
  background-color: #e67e22; /* Warna hover */
}

/* Tombol delete */
tbody td button:last-child {
  background-color: #e74c3c; /* Merah */
  color: white;
}

tbody td button:last-child:hover {
  background-color: #c0392b; /* Warna hover */
}
</style>

