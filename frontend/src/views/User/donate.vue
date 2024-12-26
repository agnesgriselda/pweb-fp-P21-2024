<template>
    <div class="donate-page p-6 bg-gray-50 min-h-screen">
      <!-- Loader -->
      <div v-if="loading" class="text-center py-8 text-2xl">Loading...</div>
  
      <!-- Detail Crowdfund -->
      <div v-else class="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 class="text-3xl font-bold text-center text-gray-800">{{ crowdfund.name }}</h1>
        <div class="mt-4 text-center text-lg text-gray-600">
          <p>Target: <span class="font-semibold text-green-600">Rp {{ crowdfund.target.toLocaleString() }}</span></p>
          <p>Donasi Terkumpul: <span class="font-semibold text-blue-600">Rp {{ crowdfund.current_donation.toLocaleString() }}</span></p>
        </div>
  
        <!-- Progress bar -->
        <div class="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div class="bg-green-500 h-3 rounded-full" :style="{ width: progressPercentage + '%' }"></div>
        </div>
  
        <!-- Tombol Favorit -->
        <button
          @click="addToFavorite"
          class="mt-6 w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Tambahkan ke Favorit
        </button>
  
        <!-- Form Donasi -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-gray-800">Form Donasi</h3>
          <form @submit.prevent="submitDonation" class="space-y-6">
            <div>
              <label for="payment_method" class="block text-lg font-medium text-gray-700">Metode Pembayaran</label>
              <select v-model="donation.payment_method" id="payment_method" class="mt-2 block w-full px-4 py-2 bg-gray-50 border rounded-md shadow-sm focus:ring-2 focus:ring-green-400">
                <option value="QRIS">QRIS</option>
                <option value="TRANSFER">Transfer</option>
              </select>
            </div>
  
            <div v-if="donation.payment_method === 'TRANSFER'">
              <label for="bank_name" class="block text-lg font-medium text-gray-700">Nama Bank</label>
              <input
                type="text"
                id="bank_name"
                v-model="donation.bank_name"
                placeholder="Masukkan nama bank"
                class="mt-2 block w-full px-4 py-2 bg-gray-50 border rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
              />
            </div>
  
            <div>
              <label for="amount" class="block text-lg font-medium text-gray-700">Nominal Donasi</label>
              <input
                type="number"
                id="amount"
                v-model="donation.amount"
                placeholder="Masukkan jumlah donasi"
                class="mt-2 block w-full px-4 py-2 bg-gray-50 border rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
              />
            </div>
  
            <button
              type="submit"
              class="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300"
            >
              Kirim Donasi
            </button>
          </form>
        </div>
  
        <!-- Form Komentar -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-gray-800">Form Komentar</h3>
          <form @submit.prevent="submitComment" class="space-y-6">
            <div>
              <label for="message" class="block text-lg font-medium text-gray-700">Komentar</label>
              <textarea
                id="message"
                v-model="comment.message"
                placeholder="Tulis komentar Anda"
                class="mt-2 block w-full px-4 py-2 bg-gray-50 border rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
  
            <button
              type="submit"
              class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Kirim Komentar
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "DonatePage",
    data() {
      return {
        crowdfund: {},
        donation: {
          payment_method: "QRIS",
          bank_name: "",
          amount: null,
        },
        comment: {
          message: "",
        },
        loading: true,
      };
    },
    computed: {
      progressPercentage() {
        return (
          (this.crowdfund.current_donation / this.crowdfund.target) * 100 || 0
        );
      },
    },
    methods: {
      async fetchCrowdfundDetails() {
        try {
          const crowdfundId = this.$route.params.crowdfundId;
          const response = await axios.get(
            `http://localhost:5000/api/crowdfunds/${crowdfundId}`
          );
          this.crowdfund = response.data;
        } catch (error) {
          console.error("Error fetching crowdfund details:", error);
        } finally {
          this.loading = false;
        }
      },
  
      async submitDonation() {
        const crowdfundId = this.crowdfund._id;
        const userId = localStorage.getItem("userId");
  
        if (!userId) {
          alert("Anda harus login terlebih dahulu!");
          return;
        }
  
        if (!this.donation.amount || this.donation.amount <= 0) {
          alert("Jumlah donasi harus lebih besar dari 0!");
          return;
        }
  
        if (
          this.donation.payment_method === "TRANSFER" &&
          !this.donation.bank_name
        ) {
          alert("Harap pilih nama bank untuk transfer!");
          return;
        }
  
        let bankName = this.donation.bank_name || null;
  
        try {
          const response = await axios.post("http://localhost:5000/api/donations", {
            user_id: userId,
            crowdfund_id: crowdfundId,
            payment_method: this.donation.payment_method,
            bank_name: bankName,
            amount: this.donation.amount,
          });
  
          alert(response.data.message || "Donasi berhasil!");
  
          this.$router.push({
            name: "ThankYou",
            query: {
              payment_method: this.donation.payment_method,
              bank_name: this.donation.bank_name,
              amount: this.donation.amount,
            },
          });
        } catch (error) {
          console.error("Error submitting donation:", error);
          alert("Terjadi kesalahan saat mengirim donasi. Silakan coba lagi.");
        }
      },
  
      async addToFavorite() {
        const crowdfundId = this.crowdfund._id;
        const userId = localStorage.getItem("userId");
  
        try {
          await axios.post("http://localhost:5000/api/crowdfunds/favorite", {
            user_id: userId,
            crowdfund_id: crowdfundId,
          });
          alert("Berhasil ditambahkan ke favorit!");
        } catch (error) {
          console.error("Error adding to favorite:", error);
        }
      },
  
      async submitComment() {
        const crowdfundId = this.crowdfund._id;
        const userId = localStorage.getItem("userId");
  
        try {
          await axios.post("http://localhost:5000/api/crowdfunds/comment", {
            user_id: userId,
            crowdfund_id: crowdfundId,
            message: this.comment.message,
          });
          alert("Komentar berhasil dikirim!");
          this.comment.message = "";
        } catch (error) {
          console.error("Error submitting comment:", error);
        }
      },
    },
    mounted() {
      this.fetchCrowdfundDetails();
    },
  };
  </script>
  
  <style scoped>
  .donate-page {
    background-color: #f7fafc;
  }
  </style>
  