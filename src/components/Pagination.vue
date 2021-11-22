<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
  @Prop() count!: number;
  @Prop() max!: number;
  @Prop() page!: number;

  private previosPage() {
    if (this.$data.page > 1) this.$data.page -= 1;
    this.$emit("prev", this.$data.page);
  }

  private nextPage() {
    this.$data.page += 1;
    this.$emit("next", this.$data.page);
  }

}
</script>

<template>
  <div style="font-size: 25px">
    <button @click="previosPage" v-if="page > 1">&lt;</button>
    <button disabled v-else>&lt;</button>
    {{ page }}
    <button @click="nextPage" v-if="count == max">&gt;</button>
    <button disabled v-else>&gt;</button>
  </div>
</template>

<style lang="scss" scoped>
button {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 25px;
  padding: 5px 10px;
  margin: 10px;
  border: 1px transparent solid;
  margin: 10px;
  border-radius: 5px;
  &:hover:not(:disabled) {
    border: 1px black solid;
  }
}
</style>