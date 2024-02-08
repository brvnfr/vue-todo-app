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
@import '../styles/variables.styl'

.app-layout
  display flex
  height 100vh

.vertical-nav
  background brand-blue-500
  color #fff
  padding 20px
  width 120px
  position block
  display flex
  flex-direction column
  justify-content center
  align-items center

  .brand-logo
    width 60px
    position absolute
    top 0
    margin 1rem 2rem
    @media (max-width: 768px)
      position relative
      margin 0
      width 32px

  ul
    list-style none
    padding 0
    margin 0
    display flex
    flex-direction column

  li
    padding 1rem 2rem
    border 1px solid brand-blue-400
    transition background-color .3s ease-in-out

    &:hover,
    &.active-link
      background-color brand-blue-600

  .nav-link
    text-decoration none
    display flex
    flex-direction column
    align-items center
    gap .5rem
    margin 1rem 0
    text-styles(12px, 600, #fff, 1px)

  span
    text-align center
    font-size 12px
    @media (max-width: 768px)
      display none

  @media (max-width: 768px)
    position fixed
    bottom 0
    width 100%
    height 60px
    flex-direction row

    ul
      flex-direction row
      justify-content space-evenly
      width 100%
      padding 0

    li
      border none
      padding 1rem
      &:hover,
      &.active-link
        background-color brand-blue-600

.content-wrapper
  width calc(100% - 120px)
  flex 1

  header
    position relative
    display flex
    align-items center
    justify-content end
    height 80px
    margin-bottom 2px
    box-shadow-mixin(0, 2px, 6px, rgba(40, 56, 72, 0.1))
    @media (max-width: 768px)
      justify-content center

    .user-info
      display flex
      align-items center
      margin 2rem 2.5rem
      gap .4rem
      img
        width 45px
        height 45px
        border-radius 50%
        margin-right 10px

      .user-details
        h5
          text-styles(16px, bold, brand-gray-950, 0.25px)
          margin 0

        p
          text-styles(12px, 600, brand-blue-600, 0.25px)
          margin 0

        @media (max-width: 340px)
          display none

main
  background-color brand-gray-150
  width 100%
  height calc(100vh - 82px)
  display flex
  justify-content center
  align-items center
  color brand-gray-200
</style>
