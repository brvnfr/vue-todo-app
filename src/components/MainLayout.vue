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
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Layout',
}
</script>

<style lang="stylus" scoped>
/* Adicione estilos do layout aqui conforme necessário */
header {
  background-color: #3498db;
  padding: 10px;
  text-align: center;

  nav {
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
