<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/tasks">Tarefas</RouterLink>
        <RouterLink to="/settings">Configurações</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="stylus"></style>
