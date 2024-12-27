<template>
    <div>
      <h1>Screen Data</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <pre>{{ screenData }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        screenData: null,
        loading: true,
        error: null
      };
    },
    created() {
      this.fetchScreenData();
    },
    methods: {
      fetchScreenData() {
        axios.get('http://172.28.176.168:9303/screenApi/getScreen')
          .then(response => {
            this.screenData = response.data;
          })
          .catch(error => {
            this.error = error.message;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>