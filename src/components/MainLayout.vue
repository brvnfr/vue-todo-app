<!-- src/components/AppLayout.vue -->

<template>
  <div class="app-layout">
    <nav class="vertical-nav">
      <!-- Adicione links de navegação aqui -->
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/tasks">Tarefas</router-link>
      <router-link to="/settings">Configurações</router-link>
    </nav>
    <div class="content-wrapper">
      <header>
        <!-- Conteúdo do cabeçalho aqui -->
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <!-- Conteúdo do rodapé aqui -->
      </footer>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

@import '../styles/variables.styl';
.app-layout {
  display: flex;
}

.vertical-nav {
  background: brand-blue-400;
  color: #fff;
  padding: 20px;
  width: 200px;
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;

  a {
    color: #fff;
    text-decoration: none;
    margin-bottom: 10px;
  }
}

.content-wrapper {
  margin-left: 200px;
  padding: 20px;
  flex: 1;

  header, main, footer {
    margin-bottom: 20px;
  }
}

header, main, footer {
  background-color: brand-gray-100;
  padding: 20px;
}
</style>
