<template>
  <div class="app-layout">
    <header class="header-section">
      <article class="header-content">
        <img src="@/assets/brand/logo.svg" alt="Brand Logo" class="brand-logo" />
        <h1><strong>FACILITA</strong>TASKS</h1>
      </article>
    </header>
    <section class="main-content">
      <main class="centered-content">
        <form class="login-form">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" class="form-input" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" class="form-input" />
          </div>
          <button type="submit" class="login-btn">Login</button>
        </form>
      </main>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

.app-layout
  display flex
  height 100vh
  @media screen and (max-width: 768px)
    flex-direction column

.header-section
  background brand-blue-500
  color #fff
  width 100%
  flex 0.5
  display flex
  flex-direction column
  align-items center
  justify-content center

.header-content
  display flex
  flex-direction column
  align-items flex-start
  justify-content flex-start

  .brand-logo
    width 100px
    margin 1rem 2

.main-content
  flex 1
  padding 20px

.centered-content
  display flex
  justify-content center
  align-items center
  height 100%

.login-form
  max-width 300px
  width 100%
  margin 0 auto

.form-group
  margin-bottom 1rem

label
  display block
  margin-bottom 0.5rem

.form-input
  width 100%
  padding 0.5rem
  font-size 1rem
  border 1px solid #ccc
  border-radius 4px

.login-btn
  background brand-blue-500
  color #fff
  padding 0.5rem 1rem
  border none
  border-radius 4px
  cursor pointer
  &:hover
    background darken(brand-blue-500, 10%)
</style>
