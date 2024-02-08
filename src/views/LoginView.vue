<template>
  <div class="app-layout">
    <nav class="vertical-nav">
      <img src="@/assets/brand/logo.svg" alt="Brand Logo" class="brand-logo" />
      <h1><strong>FACILITA</strong>TASKS</h1>
    </nav>
    <div class="content-wrapper">
      <main></main>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../styles/variables.styl';

.app-layout {
  display flex
  height 100vh
}

.vertical-nav {
  background brand-blue-500
  color #fff
  padding 20px
  width 100%
  flex 0.5
  position block
  display flex
  flex-direction column
  justify-content center
  align-items baseline

  .brand-logo {
    width 100px
    margin 1rem 2rem
  }
  h1 {
    text-styles(48px, 300, #fff,0)
  }
  span {
    text-align center
    font-size 12px
  }
}

.content-wrapper {
  width 100%
  flex 1

  main {
    background-color: brand-gray-150
    width 100%
    height 100vh
    display flex
    justify-content center
    align-items center
    color brand-gray-200
  }
}
</style>
