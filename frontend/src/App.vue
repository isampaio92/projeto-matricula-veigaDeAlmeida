<script setup lang="ts">
  import FormularioMatricula from './components/FormularioMatricula.vue';
</script>

<template>
  <main class="container">
    <FormularioMatricula/>
  </main>
</template>

<style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
  }
  .container {
    width: 100%;
    max-width: 600px;
    padding: 20px;
  }
</style>
