<template>
  <div class="thank-you-page">
    <div class="container">
      <h1>Terima Kasih atas Donasi Anda!</h1>
      <p>Donasi Anda sangat berarti bagi kami dan akan digunakan untuk tujuan yang baik.</p>
  
      <h3>Detail Donasi</h3>
      <div v-if="donation" class="donation-details">
        <p><strong>Metode Pembayaran:</strong> {{ donation.payment_method }}</p>
        <p v-if="donation.payment_method === 'TRANSFER'"><strong>Nama Bank:</strong> {{ donation.bank_name }}</p>
        <p><strong>Nominal Donasi:</strong> Rp {{ donation.amount.toLocaleString() }}</p>
      </div>
  
      <button @click="generatePDF" class="btn-generate">Cetak PDF</button>
    </div>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';

export default {
  name: 'ThankYouPage',
  data() {
    return {
      donation: {
        payment_method: this.$route.query.payment_method || 'TRANSFER',
        bank_name: this.$route.query.bank_name || 'Mandiri',
        amount: parseInt(this.$route.query.amount) || 0,
      },
    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF();
      const { payment_method, bank_name, amount } = this.donation;
  
      doc.text('Terima Kasih atas Donasi Anda!', 10, 10);
      doc.text('Donasi Anda sangat berarti bagi kami!', 10, 20);
  
      doc.text('Detail Donasi:', 10, 40);
      doc.text(`Metode Pembayaran: ${payment_method}`, 10, 50);
      if (payment_method === 'TRANSFER') {
        doc.text(`Nama Bank: ${bank_name}`, 10, 60);
      }
      doc.text(`Nominal Donasi: Rp ${amount.toLocaleString()}`, 10, 70);
  
      // Menyimpan PDF dengan nama file yang sesuai
      doc.save('donasi_detail.pdf');
    },
  },
};
</script>

<style scoped>
/* Global styling */
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: 'Arial', sans-serif;
background-color: #f4f6f9;
color: #333;
}

.thank-you-page {
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
padding: 20px;
}

.container {
background-color: #ffffff;
padding: 30px;
border-radius: 10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
max-width: 600px;
width: 100%;
text-align: center;
transform: translateY(-50px);
opacity: 0;
animation: fadeInUp 0.6s forwards;
}

h1 {
color: #4caf50;
font-size: 2.5rem;
margin-bottom: 10px;
font-weight: bold;
}

p {
font-size: 1.2rem;
margin-bottom: 20px;
color: #555;
}

h3 {
font-size: 1.6rem;
margin-top: 30px;
color: #333;
font-weight: bold;
}

.donation-details p {
font-size: 1.1rem;
color: #555;
margin-bottom: 10px;
}

.donation-details strong {
color: #4caf50;
}

button {
background-color: #4caf50;
color: white;
border: none;
padding: 12px 25px;
cursor: pointer;
border-radius: 8px;
font-size: 1rem;
transition: background-color 0.3s ease, transform 0.3s ease;
margin-top: 20px;
width: 100%;
max-width: 250px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button:hover {
background-color: #45a049;
transform: translateY(-3px);
}

button:active {
transform: translateY(2px);
}

@keyframes fadeInUp {
from {
  transform: translateY(-50px);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
}

/* Responsive Design */
@media (max-width: 768px) {
.container {
  padding: 20px;
}

h1 {
  font-size: 2rem;
}

p, h3 {
  font-size: 1rem;
}

button {
  width: 100%;
}
}
</style>