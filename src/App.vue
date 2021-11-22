<template>
  <div>
    <nav>
      <router-link to="/repos" class="navItem"
        >Wyszukaj repozytoria</router-link
      >
      <router-link to="/users" class="navItem"
        >Wyszukaj użytkowników</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
nav {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 60px;
  background: $mainColor;
  padding: 15px;
  -webkit-box-shadow: 0px 30px 75px -6px rgba(64, 168, 79, 1);
  -moz-box-shadow: 0px 30px 75px -6px rgba(64, 168, 79, 1);
  box-shadow: 0px 30px 75px -6px rgba(64, 168, 79, 1);
  .navItem {
    padding:10px;
    text-decoration: none;
    color: black;
    &:first-child {
      border-right: 2px black solid;
    }
  }
  .router-link-active {
    color: black;
    font-weight: 700;
  }
}
</style>

