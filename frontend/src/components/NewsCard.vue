<template>
  <div class="news-card">
    <h3 class="news-card-title">{{ title }}</h3>
    <p class="news-card-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    title: String,
    description: String,
  },
};
</script>

<style scoped>
.news-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.news-card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px;
}

.news-card-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .news-card {
    padding: 10px;
  }

  .news-card-title {
    font-size: 18px;
  }

  .news-card-description {
    font-size: 14px;
  }
}
</style>
