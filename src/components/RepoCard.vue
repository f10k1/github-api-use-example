<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import RepoModel from "../models/RepoModel";

@Component
export default class RepoCard extends Vue {
  @Prop({ required: true }) private repo!: RepoModel;

  private data() {
    return {
      repoData: this.$props.repo,
    };
  }
}
</script>

<template>
  <div class="container" style='border:1px black solid; border-radius:20px; margin:20px 10px'>
    <span class="row container"
      ><h2 class="col-5">
        <router-link :to="`/repo/${repo.owner.login}/${repo.name}`" class="link">{{
          repo.name
        }}</router-link>
        <br />
        <small v-if="repo.fork">Fork</small>
      </h2>
      <small class="col-6"
        >Ostatnia aktualizacja:
        {{ repo.updated_at.replace(/[a-z]/gi, " ") }}
        <br>
        Liczba gwiazdek: {{repo.stargazers_count}} <br>
        Liczba forków: {{repo.forks_count}} <br>
        Liczba issues: {{repo.open_issues_count}}
        </small
      >
    </span>
    <hr />
    <span class="row">
      <p class="col-12">{{ repo.description }}</p>
    </span>
    <span class="row container"
      ><p class="col-5">
        Właściciel:
        <router-link :to="`/user/${repo.owner.login}`" class="link">
          {{ repo.owner.login }}</router-link
        >
      </p>
      <p class="col-2 empty"></p>
      <Btn :to="repo.html_url" text="GitHub" class="col-3"></Btn
    ></span>
  </div>
</template>

<style lang="scss" scoped>
.link {
  overflow-wrap: break-word;
  text-decoration: none;
  padding: 0 15px;
  text-align: center;
}
.container {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  span.container {
    margin: 0;
    flex-direction: row;
    align-items: center;
  }
  h2 {
    margin: 0;
  }
  hr {
    width: 90%;
  }
}
</style>