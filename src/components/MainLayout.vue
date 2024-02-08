<template>
  <div class="app-layout">
    <nav class="vertical-nav">
      <img src="@/assets/brand/logo.svg" alt="Brand Logo" class="brand-logo" />
      <ul>
        <li>
          <router-link to="/dashboard" class="nav-link">
            <img src="@/assets/icons/chart-bar.svg" alt="Dashboard" class="icon" />
            <span>Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/tasks" class="nav-link">
            <img src="@/assets/icons/check.svg" alt="Tarefas" class="icon" />
            <span>Tarefas</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings" class="nav-link">
            <img src="@/assets/icons/gear.svg" alt="Configurações" class="icon" />
            <span>Configurações</span>
          </router-link>
        </li>
      </ul>
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
  background: brand-blue-500;
  color: #fff;
  padding: 20px;
  width: 120px;
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .brand-logo {
    width: 60px;
    margin-bottom: 20px;
    position: absolute;
    top: 0;
    margin: 1rem 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 1rem 2rem;
    border: 1px solid brand-blue-400
    transition: background-color .3s ease-in-out;
    &:hover,
    &.active-link {
      background-color: brand-blue-600;
    }
  }

  .nav-link {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    margin:1rem 0;
    text-styles(12px, 600, #fff, 1px);
  }

  .icon {
    width: 36px;
  }

  span {
    text-align: center;
    font-size: 12px;
  }
}

.content-wrapper {
  margin-left: 140px;
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
