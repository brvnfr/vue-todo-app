<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/tasks">Tarefas</RouterLink>
        <RouterLink to="/settings">Configurações</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style lang="stylus" scoped>
@import './styles/variables.styl';

header {
  padding: 10px;
  text-align: center;

  nav {
  background-color: main-color;
    a {
      color: #fff;
      margin: 0 10px;
      text-decoration: none;
      font-weight: bold;
    }
  }
}

main {
  padding: 20px;
}
</style>
