<template>
    <div>
      <h1>Feedback</h1>
      <FeedbackForm />
    </div>
  </template>
  
  <script>
  import FeedbackForm from '../components/FeedbackForm.vue';
  
  export default {
    name: 'FeedbackView',
    components: { FeedbackForm },
  };
  </script>
  