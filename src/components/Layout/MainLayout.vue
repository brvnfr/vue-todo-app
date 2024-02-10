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
        <div class="user-info">
          <img src="@/assets/pics/user.png" alt="user" />
          <div class="user-details">
            <h5>Eduardo Pereira da Costa</h5>
            <p>Front-end Developer</p>
          </div>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import './MainLayout.styl'
</style>
