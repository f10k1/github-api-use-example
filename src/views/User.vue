<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import UserModel from "../models/UserModel";
import UserService from "../services/UserService";
import RepoModel from "../models/RepoModel";
import RepoService from "../services/RepoService";
import RepoCard from "../components/RepoCard.vue";

@Component({
  components: { RepoCard },
})
export default class User extends Vue {
  private user!: UserModel;
  private userService!: UserService;
  private repos!: RepoModel[];
  private repoService!: RepoService;

  private getUserInfo() {
    this.repoService
      .getUserRepos(
        this.user.login,
        this.$data.page,
        this.$data.sortChecked,
        this.$data.directionChecked
      )
      .then((res) => {
        this.repos = res;
      });
  }

  @Watch("sortChecked")
  private changeSort() {
    this.getUserInfo();
  }

  @Watch("directionChecked")
  private changeDirection() {
    this.getUserInfo();
  }

  private beforeMount() {
    this.userService = new UserService();
    this.repoService = new RepoService();
    this.userService
      .getUser(this.$route.params.name)
      .then((res) => {
        this.user = res;
        this.$data.errorStatus = 0;
        this.getUserInfo();
      })
      .catch((error) => {
        this.$data.errorStatus = error.response.status;
      });
  }

  @Watch("page")
  changePage() {
    this.getUserInfo();
  }

  private data() {
    return {
      user: this.user,
      repos: this.repos,
      errorStatus: 0,
      page: 1,
      sort: [
        { name: "full_name", description: "Alfabetycznie" },
        { name: "created", description: "Data utworzenia" },
        { name: "updated", description: "Data aktualizacji" },
        { name: "pushed", description: "Data spushowania" },
      ],
      sortChecked: "full_name",
      directions: [
        { name: "desc", description: "Malejąco" },
        { name: "asc", description: "Rosnąco" },
      ],
      directionChecked: "desc",
    };
  }
}
</script>
<template>
  <div>
    <section v-if="typeof user == 'object' && !errorStatus">
      <img :src="user.avatar_url" alt="" />
      <h2>{{ user.name }}</h2>
      <i>Login: {{ user.login }}</i>
      <p>Dołączył: {{ user.created_at.replace(/[a-z]/gi, " ") }}</p>
      <p v-if="user.bio">Opis: {{ user.bio }}</p>
      <br />
      <Btn :to="user.blog" text="Strona domowa" v-if="user.blog"></Btn>
      <Btn :to="user.html_url" text="GitHub" v-else></Btn>
      <div v-if="user.public_repos">
        <h3>Publiczne repozytoria ({{user.public_repos}}):</h3>
        <div class="row container">
          <div class="col-4">
            <label for="sort">Sortuj po:</label><br />
            <select name="sort" id="sort" v-model="sortChecked">
              <option
                :value="option.name"
                v-for="option in sort"
                :key="option.name"
              >
                {{ option.description }}
              </option>
            </select>
          </div>
          <div class="col-4">
            <label for="direction">Sortuj:</label><br />
            <select name="direction" id="direction" v-model="directionChecked">
              <option
                :value="direction.name"
                v-for="direction in directions"
                :key="direction.name"
              >
                {{ direction.description }}
              </option>
            </select>
          </div>
        </div>
        <div class="row container">
          <RepoCard
            :repo="repo"
            v-for="repo in repos"
            :key="repo.id"
            class="col-4"
          ></RepoCard>
        </div>
        <Pagination
          v-if="typeof repos == 'object'"
          @prev="page--"
          @next="page++"
          :count="repos.length"
          :page="page"
          :max="6"
        ></Pagination>
      </div>

      <h3 v-else>Użytkownik nie posiada żadnego publicznego repozytorium</h3>
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
.container {
  display: flex;
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