<script lang="ts">
import Vue from "vue";
export default class Home extends Vue {}
</script>

<template>
  <div>
    <img src="@/assets/logo.png" alt="" />
    <h1>Zadanie rekrutacyjne Adrian Malec</h1>
    <div :class="$style.container">
      <router-link to="/repos" :class="$style.link"
        >Przejdź do wyszukiwania repozytoriów</router-link
      >
      <router-link to="/users" :class="$style.link"
        >Przejdź do wyszukiwania użytkowników</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .link {
    border-radius: 5px;
    border: 1px solid $mainColor;
    padding: 15px;
    margin: 20px;
    position: relative;
    transition: 1s;
    &:hover {
      text-decoration: none;
      color: black;
      &::after {
        width: 55%;
      }
      &::before {
        width: 55%;
      }
    }
    &::before {
      width: 0px;
      content: "";
      top: 0;
      transition: 1s;
      border-radius: 5px;
      z-index: -1;
      right: 0;
      height: 100%;
      position: absolute;
      background: $mainColor;
    }
    &::after {
      width: 0px;
      content: "";
      top: 0;
      transition: 1s;
      border-radius: 5px;
      z-index: -1;
      left: 0;
      height: 100%;
      position: absolute;
      background: $mainColor;
    }
  }
}
</style>