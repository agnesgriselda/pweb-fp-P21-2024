<template>
  <div class="user-dashboard p-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-xl">
    <h1 class="text-4xl font-semibold text-gray-800 mb-8 text-center">Daftar Crowdfunds</h1>
    
    <!-- Tombol untuk ke halaman Favorit -->
    <button @click="goToFavorite" class="favorite-button bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 mb-8 shadow-lg w-full max-w-xs mx-auto block">
      Lihat Favorit
    </button>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center text-xl text-gray-500 mb-6">
      <div class="loader"></div> <!-- Spinner loader -->
    </div>

    <!-- Jika tidak ada crowdfunds -->
    <div v-else-if="crowdfunds.length === 0" class="flex justify-center">
      <p class="text-xl text-gray-500">Tidak ada crowdfunds tersedia saat ini.</p>
    </div>

    <!-- Katalog crowdfunds -->
    <div v-else class="crowdfund-catalog grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="crowdfund in crowdfunds"
        :key="crowdfund._id"
        class="crowdfund-card bg-white rounded-lg shadow-2xl p-6 flex flex-col items-start transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ crowdfund.name }}</h3>
        <p class="text-lg text-gray-600 mb-2">Target: Rp {{ crowdfund.target.toLocaleString() }}</p>
        <p class="text-lg text-gray-600 mb-4">Donasi Terkumpul: Rp {{ crowdfund.current_donation.toLocaleString() }}</p>
        
        <!-- Tombol Donasi -->
        <button @click="goToDonate(crowdfund._id)" class="mt-auto bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
          Donasi Sekarang
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Pastikan axios sudah terinstal

export default {
  data() {
    return {
      crowdfunds: [], // Menyimpan data crowdfunds
      loading: true, // Status loading
    };
  },
  methods: {
    // Method untuk mengambil data crowdfunds dari backend
    async fetchCrowdfunds() {
      try {
        console.log("Fetching crowdfunds...");
        const response = await axios.get(
          "http://localhost:5000/api/crowdfunds/active"
        ); // Panggil API
        console.log("API Response:", response.data);
        this.crowdfunds = response.data; // Simpan data ke state
      } catch (error) {
        console.error("Error fetching crowdfunds:", error);
      } finally {
        this.loading = false; // Matikan loader
      }
    },
    // Method untuk navigasi ke halaman donasi
    goToDonate(crowdfundId) {
      this.$router.push(`/User/donate/${crowdfundId}`);
    },
    // Method untuk navigasi ke halaman Favorit
    goToFavorite() {
      this.$router.push("/User/favorite"); // Navigasi ke halaman favorite
    },
  },
  mounted() {
    // Ambil data saat komponen di-mount
    this.fetchCrowdfunds();
  },
};
</script>

<style scoped>
/* Loader Styling */
.loader {
  border: 4px solid #f3f4f6; /* Light gray background */
  border-top: 4px solid #4caf50; /* Green color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

/* Animasi untuk loader */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Grid and Card Styling */
.crowdfund-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
}

.crowdfund-card h3 {
  font-size: 1.25rem;
}

.crowdfund-card p {
  font-size: 1rem;
}

/* Hover effects on crowdfund cards */
.crowdfund-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Button hover */
button:hover {
  background-color: #45a049; /* Darker green */
  transform: translateY(-3px);
}

button:active {
  transform: translateY(1px);
}

/* Responsiveness */
@media (max-width: 768px) {
  .crowdfund-catalog {
    grid-template-columns: 1fr;
  }
  .favorite-button {
    width: 100%;
    margin-bottom: 16px;
  }
  .crowdfund-card {
    padding: 16px;
  }
}
</style>
