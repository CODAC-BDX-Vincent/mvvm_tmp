<template>
  <div class="categoriesDisplay">
    <div
      v-if="!showUpdateNameC"
      class="nameCategory"
      @dblclick="handleUpdateNameC"
    >
      <p class="nameCSS">{{ name }}</p>
      <button class="deleteCategory" @click="handleDeleteCategory">X</button>
    </div>
    <div class="UpdateNameC">
      <form @submit="onSubmitUC" v-if="showUpdateNameC" class="updateNameCForm">
        <input
          name="nameUC"
          v-model="nameUC"
          type="text"
          autofocus
          :placeholder.prop="name"
          minlength="2"
        />
        <input
          type="submit"
          class="updateNameCFormButtonUpdate"
          value="update"
        />
        <button
          class="updateNameFormButtonClose"
          @click="handleUpdateCategoryFormButtonCancel"
        >
          Return
        </button>
      </form>
    </div>
    <div v-for="post in posts" :key="post.id">
      <div class="titlePost" v-if="post.categories[0] === this.id">
        <router-link
          class="titleCSS"
          :to="{ name: 'card', params: { id: post.id } }"
        >
          <p class="titleACSS">{{ post.title.rendered }}</p>
        </router-link>
      </div>
    </div>
    <div>
      <button v-if="showAddPost" class="addCard" @click="handleAddPost">
        + Add a card
      </button>
      <form @submit="onSubmitP" v-if="!showAddPost" class="addPostForm">
        <input
          name="titleP"
          v-model="titleP"
          type="text"
          autofocus
          placeholder="Write the name of the card"
          minlength="2"
        />
        <input type="submit" class="addPostFormButtonAdd" value="Add a card" />
        <button
          class="addPostFormButtonClose"
          @click="handleAddPostFormButtonCancel"
        >
          Return
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "categoriesDisplay",
  props: ["id", "name"],
  data() {
    return {
      showAddPost: true,
      showUpdateNameC: false,
      titleP: "",
      nameUC: "",
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  mounted() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    ...mapActions(["removeCategory", "updateCategory", "addPost"]),
    handleDeleteCategory() {
      this.removeCategory(this.id);
    },
    handleUpdateNameC() {
      this.showUpdateNameC = !this.showUpdateNameC;
    },
    onSubmitUC(e) {
      e.preventDefault();
      const category = { name: this.nameUC, id: this.id };
      // console.log(category);
      this.updateCategory(category);
      this.showUpdateNameC = !this.showUpdateNameC;
    },
    handleUpdateCategoryFormButtonCancel() {
      this.showUpdateNameC = !this.showUpdateNameC;
    },
    handleAddPost() {
      console.log("click");
      this.showAddPost = !this.showAddPost;
    },
    onSubmitP(e) {
      e.preventDefault();
      const post = {
        title: this.titleP,
        categories: this.id,
        status: "publish",
      };
      // console.log(post);
      this.addPost(post);
      this.showAddPost = !this.showAddPost;
      this.titleP = "";
    },
    handleAddPostFormButtonCancel() {
      this.showAddPost = !this.showAddPost;
    },
  },
};
</script>

<style scoped>
.categoriesDisplay {
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 250px;
  max-width: 500px;
  height: fit-content;
  padding: 7px;
  font-size: 20px;
  justify-content: left;
  background-color: #ebecf0;
  color: #172b4d;
  border-radius: 5%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.nameCategory {
  display: flex;
  height: auto;
  width: auto;
  margin-top: 5px;
  font-weight: bold;
  align-items: center;
  margin-bottom: 10px;
}

.nameCSS {
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
}

.deleteCategory {
  display: flex;
  margin-left: auto;
  height: fit-content;
  width: fit-content;
  opacity: 75%;
  font-weight: bold;
  border-radius: 15%;
  font-size: 15px;
}

.updateNameCForm {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

[name="nameUC"] {
  display: flex;
  width: 100%;
  margin-bottom: 8px;
}

.updateNameCFormButtonUpdate {
  display: flex;
  margin-right: auto;
  border-radius: 3px;
}

.updateNameFormButtonClose {
  display: flex;
  margin-left: auto;
  border-radius: 3px;
}

.titlePost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 6px 8px 2px;
  margin-bottom: 10px;
  text-align: left;
  font-size: 18px;
  background-color: #bee5eb;
  border-radius: 3px;
  line-height: 10px;
}

.titleCSS {
  text-decoration: none;
}

.titleACSS {
  font-weight: normal;
}

.addCard {
  display: flex;
  padding: 4px;
  width: 100%;
  height: fit-content;
  border-radius: 8%;
  border: none;
  opacity: 60%;
  font-weight: bold;
}

.addPostForm {
  display: flex;
  flex-wrap: wrap;
}

[name="titleP"] {
  display: flex;
  width: 100%;
  margin-bottom: 8px;
}

.addPostFormButtonAdd {
  display: flex;
  margin-right: auto;
  border-radius: 3px;
}

.addPostFormButtonClose {
  display: flex;
  margin-left: auto;
  border-radius: 3px;
}
</style>
