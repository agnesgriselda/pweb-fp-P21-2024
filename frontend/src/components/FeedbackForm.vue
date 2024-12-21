<template>
  <div class="feedback-form-container">
    <form @submit.prevent="submitFeedback" class="feedback-form">
      <h2>Feedback Form</h2>
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model="feedback.name"
        :disabled="feedback.is_anonymous"
        placeholder="Enter your name"
      />

      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="feedback.email"
        :disabled="feedback.is_anonymous"
        placeholder="Enter your email"
      />

      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="feedback.message"
        required
        placeholder="Write your feedback here"
      ></textarea>

      <label for="anonymous" class="checkbox-label">
        <input type="checkbox" id="anonymous" v-model="feedback.is_anonymous" />
        Submit anonymously
      </label>

      <button type="submit">Submit</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import { submitFeedback } from '../services/api';

export default {
  name: 'FeedbackFormComponent',
  data() {
    return {
      feedback: {
        name: '',
        email: '',
        message: '',
        is_anonymous: false,
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async submitFeedback() {
      this.errorMessage = '';
      this.successMessage = '';
      try {
        await submitFeedback(this.feedback);
        this.successMessage = 'Feedback submitted successfully!';
        this.feedback = {
          name: '',
          email: '',
          message: '',
          is_anonymous: false,
        };
      } catch (error) {
        this.errorMessage = 'Failed to submit feedback. Please try again.';
        console.error('Feedback submission error:', error);
      }
    },
  },
};
</script>

<style scoped>
.feedback-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.feedback-form {
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

.feedback-form h2 {
  margin: 0 0 10px;
  text-align: center;
  color: #333;
}

.feedback-form label {
  font-weight: bold;
  color: #555;
}

.feedback-form input,
.feedback-form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.feedback-form textarea {
  resize: none;
  min-height: 100px;
}

.feedback-form input:focus,
.feedback-form textarea:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #218838;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #555;
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

/* Responsive Styles */
@media (max-width: 768px) {
  .feedback-form {
    padding: 15px;
  }

  .feedback-form h2 {
    font-size: 18px;
  }

  .feedback-form input,
  .feedback-form textarea {
    font-size: 13px;
  }

  button {
    font-size: 14px;
  }
}
</style>
