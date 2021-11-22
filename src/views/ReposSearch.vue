<script lang="ts">
import { AxiosError } from "axios";
import { Vue, Component, Watch } from "vue-property-decorator";
import RepoCard from "../components/RepoCard.vue";
import RepoModel from "../models/RepoModel";
import RepoService from "../services/RepoService";

@Component({
  components: {
    RepoCard,
  },
})
export default class UsersSearch extends Vue {
  private repos!: RepoModel[];
  private reposService!: RepoService;

  private beforeCreate() {
    this.reposService = new RepoService();
  }

  private delayTimer: any;
  private doSearch() {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.$data.page = 1;
      this.search();
    }, 1000);
  }

  private data() {
    return {
      input: "",
      searchedInput: "",
      repos: this.repos,
      page: 1,
      sort: [
        { name: "best-match", description: "Najlepsze wyniki" },
        { name: "stars", description: "Liczba gwiazdek" },
        { name: "forks", description: "Liczba forków" },
        { name: "help-wanted-issues", description: "Liczba issues" },
        { name: "updated", description: "Data modyfikacji" },
      ],
      sortChecked: "best-match",
      directions: [
        { name: "desc", description: "Malejąco" },
        { name: "asc", description: "Rosnąco" },
      ],
      directionChecked: "desc",
      errorStatus: 0,
    };
  }

  @Watch("sortChecked")
  refreshSort(){
    this.search()
  }
  @Watch("directionChecked")
  refreshDirection(){
    this.search()
  }

  @Watch("page")
  changePage() {
    this.search();
  }

  private search() {
    if (this.$data.input != "") {
      if (this.$data.direction == "checked") {
        console.log("e");
      }
      this.reposService
        .getAllRepos(
          this.$data.input,
          this.$data.sortChecked,
          this.$data.directionChecked,
          this.$data.page
        )
        .then((res) => {
          this.$data.errorStatus = 0;
          this.repos = res;
        })
        .catch((error) => {
          this.$data.errorStatus = error.response.status;
        });
    }
  }
}
</script>

<template>
  <div>
    <section style="min-height: calc(100vh - 200px)" v-if="!errorStatus">
      <div class="row">
        <label for="search">Wyszukaj repozytoria</label><br />
        <input
          type="text"
          name="search"
          v-model="input"
          autocomplete="off"
          @keyup="doSearch"
        /><!--<button class="search" @click="search">Szukaj</button>-->
      </div>

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
        <div class="col-4" v-if="sortChecked != 'best-match'">
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

      <div class="row container" v-if="typeof repos == 'object'">
        <RepoCard
          :repo="repo"
          class="col-4"
          v-for="repo in repos"
          :key="repo.id"
        ></RepoCard>
      </div>
    </section>
    <section v-else>
      <h3>
        Coś poszło nie tak! <br />
        Być może skończył ci się limit zapytań?
      </h3>
    </section>
    <Pagination
      v-if="typeof repos == 'object' && !errorStatus"
      @prev="page--"
      @next="page++"
      :count="repos.length"
      :page="page"
      :max="9"
    ></Pagination>
  </div>
</template>

<style lang="scss" scoped>
label,
input {
  font-size: 25px;
  margin: 20px 0;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>