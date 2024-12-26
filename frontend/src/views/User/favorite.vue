<template>
    <div class="container mx-auto p-6">
      <!-- Title Section -->
      <h1 class="text-4xl text-center font-bold text-gray-800 mb-8">Favorit Anda</h1>
  
      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
  
      <!-- Display Favorite Crowdfunding -->
      <div v-else>
        <!-- No favorites message -->
        <div v-if="favorites.length === 0" class="bg-yellow-200 p-4 rounded-lg text-center mb-6 shadow-lg">
          <p class="text-lg font-semibold text-gray-600">Belum ada crowdfunding yang ditambahkan ke favorit.</p>
        </div>
  
        <!-- Display List of Favorite Crowdfunds -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(crowdfund, index) in favorites"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            <!-- Card Content -->
            <div class="relative mb-4">
              <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ crowdfund.name }}</h2>
              <p class="text-gray-600 mb-4">Target: <span class="font-bold">Rp {{ crowdfund.target.toLocaleString() }}</span></p>
              <p class="text-gray-600 mb-4">Donasi Terkumpul: <span class="font-bold">Rp {{ crowdfund.current_donation.toLocaleString() }}</span></p>
  
              <!-- Progress Bar -->
              <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  class="bg-green-500 h-2 rounded-full"
                  :style="{ width: calculateProgress(crowdfund) + '%' }"
                ></div>
              </div>
            </div>
  
            <!-- View Detail Button -->
            <div class="flex justify-between">
              <button
                @click="goToCrowdfund(crowdfund._id)"
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-500 transition duration-300"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FavoritePage',
    data() {
      return {
        favorites: [],  // Daftar crowdfunding yang di-favoritkan
        loading: true,   // Status loading
      };
    },
    methods: {
      // Fungsi untuk menghitung persentase progress dari crowdfunding
      calculateProgress(crowdfund) {
        return (crowdfund.current_donation / crowdfund.target) * 100;
      },
  
      // Ambil crowdfunding favorit dari API
      async fetchFavorites() {
        try {
          // Ambil user_id dari localStorage
          const userId = localStorage.getItem("userId");
          
          if (!userId) {
            alert("Anda harus login terlebih dahulu!");
            return;
          }
  
          // Mengambil data favorit dari API dengan user_id sebagai query parameter
          const response = await axios.get(`http://localhost:5000/api/crowdfunds/favorite/show?user_id=${userId}`);
          
          // Menyimpan data favorit ke dalam `favorites`
          this.favorites = response.data;
  
        } catch (error) {
          console.error("Error fetching favorite crowdfunding:", error);
        } finally {
          this.loading = false;
        }
      },
  
      // Arahkan pengguna ke halaman detail crowdfunding
      goToCrowdfund(crowdfundId) {
        this.$router.push({ name: 'Donate', params: { crowdfundId: crowdfundId } });
      }
    },
    mounted() {
      this.fetchFavorites(); // Ambil data favorit saat halaman dimuat
    },
  };
  </script>
  
  <style scoped>
  /* Custom Styling for the Page */
  .container {
    max-width: 1200px;
  }
  
  button {
    transition: all 0.3s ease;
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  /* Custom Progress Bar */
  .progress-bar {
    width: 100%;
    height: 8px;
    border-radius: 10px;
  }
  </style>
  