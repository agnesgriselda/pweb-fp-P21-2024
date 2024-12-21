<template>
  <div class="homepage">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Landing Page -->
      <section id="landing" class="section landing-section">
        <h1>Empower Dreams with Dana BisaKita</h1>
        <p>Join us to support meaningful campaigns and create real impact. Start your journey today!</p>
        <button class="cta-button">Explore Campaigns</button>
      </section>

      <!-- News Section -->
      <section id="news" class="section news-section">
        <h2>Latest News & Updates</h2>
        <div class="news-container">
          <div class="news-card">
            <h3>Our New Campaign Is Here!</h3>
            <p>We just launched a campaign to help small businesses thrive. Join hands to make it happen!</p>
          </div>
          <div class="news-card">
            <h3>Community Milestone Achieved!</h3>
            <p>Thanks to your efforts, we've surpassed our 70% funding milestone. Let’s keep the momentum going!</p>
          </div>
        </div>
      </section>

      <!-- Login Section -->
      <section id="login" class="section login-section">
        <div class="login-container">
          <h2>Sign In to Your Account</h2>
          <LoginForm />
        </div>
      </section>

      <!-- Feedback Section -->
      <section id="feedback" class="section feedback-section">
        <div class="feedback-container">
          <h2>Share Your Thoughts</h2>
          <p>Your feedback helps us grow and improve. We’d love to hear from you!</p>
          <FeedbackForm />
        </div>
      </section>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/NavbarComponent.vue';
import Footer from '../components/FooterComponent.vue';
import FeedbackForm from '../components/FeedbackForm.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Footer,
    FeedbackForm,
    LoginForm,
  },
};
</script>

<style scoped>
/* General Layout */
.homepage {
  background: url('../assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  color: #fff;
}

.main-content {
  flex: 1;
  padding-top: 70px; /* Offset for fixed navbar */
}

/* Sections */
.section {
  padding: 100px 20px;
  text-align: center;
}

/* Landing Section */
.landing-section h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
}

.landing-section p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #f0f0f0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

.cta-button {
  background: #007bff;
  color: white;
  padding: 12px 25px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.cta-button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

/* News Section */
.news-section h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #007bff;
}

.news-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.news-card {
  background: #fff;
  color: #333;
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #007bff;
}

.news-card p {
  font-size: 1rem;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Login Section */
.login-container {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 50px;
  width: 500px;
  margin: auto;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
}

.login-container h2 {
  margin-bottom: 20px;
  color: #fff;
}

/* Feedback Section */
.feedback-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 50px;
  width: 500px;
  margin: auto;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.feedback-container h2 {
  margin-bottom: 10px;
  color: #007bff;
}

.feedback-container p {
  margin-bottom: 20px;
  color: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .landing-section h1 {
    font-size: 2.5rem;
  }

  .news-card {
    width: 100%;
  }

  .login-container, .feedback-container {
    width: 90%;
    padding: 30px;
  }
}
</style>
