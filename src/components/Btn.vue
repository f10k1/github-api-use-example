<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class Btn extends Vue {
  @Prop({
    required: true,
    default: "",
  })
  public to!: string;
  @Prop({
    required: true,
    default: "",
  })
  public text!: string;

  private data() {
    return {
      link: this.$props.to,
      caption: this.$props.text,
    };
  }
}
</script>

<template>
  <a :href="link" target="_blank" v-if="link != ''" class="btn">{{ caption }}</a>
</template>

<style lang="scss" scoped>
a {
  padding: 15px;
  border-radius: 10px;
  border: 1px solid black;
  color:black;
  text-decoration: none;
  transition: 1s;
  &:hover {
    background: black;
    color: white;
  }
}
</style>