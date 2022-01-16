<template>
  <div class="Home">
    <div class="header">
      <h1>The 3 Brothers's Roadmap</h1>
    </div>
    <div class="allCategories">
      <categories
        :id="category.id"
        v-for="category in categories"
        :key="category.id"
        :name="category.name"
      />

      <div class="addCategory">
        <button
          v-if="showAddCategory"
          class="addCategoryButton"
          @click="handleAddCategory"
        >
          + Add a category
        </button>
        <form
          @submit="onSubmitC"
          v-if="!showAddCategory"
          class="addCategoryForm"
        >
          <input
            name="nameC"
            v-model="nameC"
            type="text"
            autofocus
            placeholder="Write the name of the category"
            minlength="2"
          />
          <input
            type="submit"
            class="addCategoryFormButtonAdd"
            value="Add a category"
          />
          <button
            class="addCategoryFormButtonClose"
            @click="handleAddCategoryFormButtonCancel"
          >
            Return
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "../components/categories";
import { mapActions } from "vuex";
export default {
  props: ["id", "name"],
  components: { categories },
  name: "Home",
  data() {
    return {
      showAddCategory: true,
      nameC: "",
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    categories() {
      return this.$store.state.categories;
    },
    comments() {
      return this.$store.state.comments;
    },
  },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getComments");
  },
  methods: {
    ...mapActions(["addCategory"]),
    handleAddCategory() {
      this.showAddCategory = !this.showAddCategory;
    },
    handleAddCategoryForm() {},
    onSubmitC(e) {
      e.preventDefault();
      const category = { name: this.nameC };
      // console.log(category);
      this.addCategory(category);
      this.showAddCategory = !this.showAddCategory;
      this.nameC = "";
    },
    handleAddCategoryFormButtonCancel() {
      this.showAddCategory = !this.showAddCategory;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  margin-bottom: 40px;
  background-color: #ebecf0;
  width: auto;
  height: fit-content;
  padding: 10px;
  border-radius: 3px;
  justify-content: center;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
body {
  background-color: whitesmoke;
}
.allCategories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 250px));
  grid-template-rows: auto;
  justify-content: center;
  gap: 50px;
}
.addCategory {
  display: flex;
  height: fit-content;
  min-width: 250px;
  max-width: 500px;
}
.addCategoryButton {
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: #172b4d;
  padding: 5px;
  width: 100%;
  height: fit-content;
  background-color: #ebecf0;
  border-radius: 3px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.addCategoryForm {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  background-color: #ebecf0;
  border-radius: 5%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
[name="nameC"] {
  display: flex;
  width: 100%;
  margin-bottom: 8px;
}
.addCategoryFormButtonAdd {
  display: flex;
  margin-right: auto;
  border-radius: 3px;
}
.addCategoryFormButtonClose {
  display: flex;
  margin-left: auto;
  border-radius: 3px;
}
</style>
