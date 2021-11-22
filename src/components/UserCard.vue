<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import UserModel from "../models/UserModel";

@Component
export default class UserCard extends Vue {
  @Prop({ required: true }) private user!: UserModel;

  private data() {
    return {
      userData: this.$props.user,
    };
  }
}
</script>

<template>
  <div class="container">
    <img :src="userData.avatar_url" :alt="`${userData.login} photo`" />
      <h3>
        <router-link :to="`/user/${userData.login}`" class="link">{{
          userData.login
        }}</router-link>
      </h3>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  word-wrap: break-word;
  justify-content: center;
  margin:40px 0;

  img {
    width: 20%;
    height: auto;
    border-radius: 50%;
  }
  h2 {
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>