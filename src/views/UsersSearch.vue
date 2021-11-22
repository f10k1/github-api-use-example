<script lang="ts">
import { AxiosError } from "axios";
import { Vue, Component, Watch } from "vue-property-decorator";
import UserCard from "../components/UserCard.vue";
import UserModel from "../models/UserModel";
import UserService from "../services/UserService";

@Component({
  components: { UserCard },
})
export default class UsersSearch extends Vue {
  private users!: UserModel[];
  private userService!: UserService;

  private beforeCreate() {
    this.userService = new UserService();
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
      searchVariants: [
        { name: "users", description: "Użytkownicy" },
        { name: "repo", description: "Repozytoria" },
      ],
      users: this.users,
      page: 1,
      sort: [
        { name: "best-match", description: "Najlepsze wyniki" },
        { name: "followers", description: "Liczba osób obserwujących" },
        { name: "repositories", description: "Liczba repozytoriów" },
        { name: "joined", description: "Data dołączenia" },
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
  refreshSort() {
    this.search();
  }
  @Watch("directionChecked")
  refreshDirection() {
    this.search();
  }
  @Watch("page")
  private changePage() {
    this.search();
  }

  private search() {
    if (this.$data.input != "") {
      this.userService
        .getAllUsers(
          this.$data.input,
          this.$data.page,
          this.$data.sortChecked,
          this.$data.directionChecked
        )
        .then((res) => {
          this.users = res;
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
        <label for="search">Wyszukaj użytkowników</label><br />
        <input
          type="text"
          name="search"
          v-model="input"
          autocomplete="off"
          @input="doSearch"
        /><!--<button @click="search" class="search">Szukaj</button>-->
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
      <div class="row container" v-if="typeof users == 'object'">
        <UserCard
          v-for="user in users"
          :key="user.id"
          :user="user"
          class="col-4"
        ></UserCard>
      </div>
    </section>
    <section v-else>
      <h3>
        Coś poszło nie tak! <br />
        Być może skończył ci się limit zapytań?
      </h3>
    </section>
    <Pagination
      v-if="typeof users == 'object'"
      @prev="page--"
      @next="page++"
      :count="users.length"
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
select {
  font-size: 25px;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>