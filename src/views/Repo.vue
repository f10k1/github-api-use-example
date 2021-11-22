<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import RepoModel from "../models/RepoModel";
import UserModel from "../models/UserModel";
import RepoService from "../services/RepoService";
import beAxios from "@/axios";
import UserCard from "../components/UserCard.vue";

interface CommitModel {
  node_id?: string;
  author?: UserModel;
  commit?: { message?: string };
}

@Component({
  components: {
    UserCard,
  },
})
export default class Repo extends Vue {
  private repo!: RepoModel;
  private commits!: CommitModel;
  private repoService!: RepoService;
  private contributors!: UserModel;

  private beforeCreate() {
    this.repoService = new RepoService();
    this.repoService
      .getRepo(this.$route.params.owner, this.$route.params.name)
      .then((res) => {
        this.$data.errorStatus = 0;
        this.repo = res;
        this.getCommits()
          .then((res) => {
            this.commits = res;
          })
          .catch((error) => {
            this.$data.commitsErrorStatus = error.response.status;
          });
        this.getContributors()
          .then((res) => {
            this.contributors = res;
          })
          .catch((error) => {
            this.$data.contributorsErrorStatus = error.response.status;
          });
      })
      .catch((error) => {
        this.$data.errorStatus = error.response.status;
      });
  }

  @Watch("pageContributors")
  private changePageContributors() {
    this.getContributors().then((res) => {
      this.contributors = res;
    });
  }
  @Watch("pageCommits")
  private changePageCommits() {
    this.getCommits().then((res) => {
      this.commits = res;
    });
  }

  private async getContributors(): Promise<UserModel> {
    return (
      await beAxios(
        `/repos/${this.$route.params.owner}/${this.$route.params.name}/contributors?per_page=10&page=${this.$data.pageContributors}`,
        {
          params: {
            format: "json",
          },
        }
      )
    ).data;
  }

  private async getCommits(): Promise<CommitModel> {
    return (
      await beAxios(
        `/repos/${this.$route.params.owner}/${this.$route.params.name}/commits?per_page=10&page=${this.$data.pageCommits}`,
        {
          params: {
            format: "json",
          },
        }
      )
    ).data;
  }
  private data() {
    return {
      repo: this.repo,
      commits: this.commits,
      contributors: this.contributors,
      errorStatus: 0,
      contributorsErrorStatus: 0,
      commitsErrorStatus: 0,
      pageCommits: 1,
      pageContributors: 1,
    };
  }
}
</script>
<template>
  <div>
    <section v-if="typeof repo == 'object' && !errorStatus">
      <h2>{{ repo.name }}</h2>
      <i
        >Właściciel:
        <router-link :to="`/user/${repo.owner.login}`" class="link">{{
          repo.owner.login
        }}</router-link></i
      >
      <p v-if="repo.fork">Fork</p>
      <p>Utworzone: {{ repo.created_at.replace(/[a-z]/gi, " ") }}</p>
      <p>
        Ostatnio zaktualizowane:
        {{ repo.updated_at.replace(/[a-z]/gi, " ") }}
      </p>
      <p>Liczba gwiazdek: {{ repo.stargazers_count }}</p>
      <p>Liczba forków: {{ repo.forks_count }}</p>
      <p>Liczba issues: {{ repo.open_issues_count }}</p>
      <p v-if="repo.description">Opis: {{ repo.description }}</p>

      <span class="row">
        <Btn :to="repo.html_url" text="Github" v-if="repo.html_url"></Btn>
      </span>

      <span class="row container">
        <section class="col-5 row" v-if="!contributorsErrorStatus">
          <h3>Współtwórcy :</h3>
          <UserCard
            v-for="user in contributors"
            :key="user.id"
            :user="user"
            class="col-5"
          ></UserCard>
          <Pagination
            class="col-12"
            v-if="typeof contributors == 'object'"
            @prev="pageContributors--"
            @next="pageContributors++"
            :count="contributors.length"
            :page="pageContributors"
            :max="10"
          ></Pagination>
        </section>
        <section v-else>
          <h3>
            Coś poszło nie tak! <br />
            Być może skończył ci się limit zapytań?
          </h3>
        </section>
        <section class="col-5" v-if="!contributorsErrorStatus">
          <h3>Commity:</h3>
          <p v-for="commit in commits" :key="commit.node_id">
            <a :href="commit.html_url" target="_blank" class="link">{{
              commit.commit.message
            }}</a>
            <span v-if="commit.author !== null">
              by
              <router-link :to="`/user/${commit.author.login}`" class="link">{{
                commit.author.login
              }}</router-link>
            </span>
          </p>
          <Pagination
            v-if="typeof commits == 'object'"
            @prev="pageCommits--"
            @next="pageCommits++"
            :count="commits.length"
            :page="pageCommits"
            :max="10"
          ></Pagination>
        </section>
        <section v-else>
          <h3>
            Coś poszło nie tak! <br />
            Być może skończył ci się limit zapytań?
          </h3>
        </section>
      </span>
    </section>
    <section v-else>
      <h3>
        Coś poszło nie tak! <br />
        Być może skończył ci się limit zapytań?
      </h3>
    </section>
  </div>
</template>

<style lang="scss" scoped>
* {
  font-size: 20px;
}
.container{
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
}
img {
  width: 15%;
  height: auto;
  border-radius: 50%;
}
h2 {
  font-size: 40px;
}
i {
  font-size: 25px;
}
h3 {
  font-size: 30px;
  font-weight: 100;
}
</style>