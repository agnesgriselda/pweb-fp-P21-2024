<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <a href="#landing">BisaKita</a>
      </div>
      <ul class="navbar-menu">
        <li><a href="#landing">Home</a></li>
        <li><a href="#feedback">Feedback</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>

<style scoped>
/* Base Navbar Styles */
.navbar {
  width: 100%;
  background-color: #007bff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styling */
.navbar-logo a {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-logo a:hover {
  text-decoration: underline;
}

/* Menu Styling */
.navbar-menu {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  list-style-type: none;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s ease;
}

.navbar-menu a:hover {
  color: #ffdd57;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-menu {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
