<script setup></script>

<template>
  <RouterView></RouterView>
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
