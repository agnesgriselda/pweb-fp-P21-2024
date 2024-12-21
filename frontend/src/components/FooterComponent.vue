<template>
  <footer class="footer">
    <div class="footer-container">
      <p>© 2024 Funding Dana BisaKita P21 - All Rights Reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 20px 10px;
  border-top: 3px solid #0056b3;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.footer p {
  margin: 0;
  font-size: 14px;
}

.footer-socials {
  display: flex;
  gap: 10px;
}

.social-link img {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.social-link img:hover {
  transform: scale(1.2);
}

/* Responsive Styling */
@media (max-width: 768px) {
  .footer {
    padding: 15px 5px;
  }

  .footer-container {
    gap: 10px;
  }

  .footer p {
    font-size: 12px;
  }
}
</style>
