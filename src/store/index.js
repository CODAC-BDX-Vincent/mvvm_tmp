import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
const LOCAL = "http://localhost:8888"; // a modifier pour chaque utilisateur
const URL = "/wordpress/wp-json/wp/v2"; // URL API Rest WORDPRESS

const headers = {
  "X-WP-Nonce": "f2260b280b",
  Cookie:
    "wordpress_logged_in_2b7738476b2cfaf3b5454b1e89821e63=vincent%7C1638187399%7C3FpMTV6XH21MsLRJyDAXICSpmFlA8ngQEWN1TjpYjUv%7C8eaa1b3fb83ed88516e9b16a77b70eedb18eb50c888d5e21893568f5f9ce0eac",
}; // headers a modifier pour chacun

const store = createStore({
  state: {
    posts: [],
    categories: [],
    comments: [],
    currentPost: {},
    currentComment: {},
    currentCategory: {},
    // [{
    //     _id : 1,
    //     title : "POST 1",
    //     content : ["Content POST 1"]
    // }]
  },
  methods: {
    // updatePost : function(newPost){
    //     this.$store.commit('updatePost',newPost);
    // }
  },
  getters: {
    allPosts: (state) => state.posts,
    allCategories: (state) => state.categories,
    allComments: (state) => state.comments,
    getCurrentPost(state) {
      return state.currentPost;
    },
    getCurrentCategory(state) {
      return state.currentCategory;
    },
    getCurrentComment(state) {
      return state.currentComment;
    },
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post;
    },
    SET_CURRENT_CATEGORY(state, category) {
      state.currentCategory = category;
    },
    SET_CURRENT_COMMENT(state, comment) {
      state.currentComment = comment;
    },
    SET_CurrentPostMutation(state, postId) {
      let postFound = {};
      state.posts.forEach((post) => {
        if (postId == post.id) {
          postFound = post;
        }
      });
      state.currentPost = postFound;
    },
    SET_CurrentCommentMutation(state, commentId) {
      let commentFound = {};
      state.comments.forEach((comment) => {
        if (commentId == comment.id) {
          commentFound = comment;
        }
      });
      state.currentComment = commentFound;
    },
    SET_CurrentCategoryMutation(state, categoryId) {
      let categoryFound = {};
      state.categories.forEach((category) => {
        if (categoryId == category.id) {
          categoryFound = category;
        }
      });
      state.currentCategory = categoryFound;
    },

    newPost: (state, post) => state.posts.unshift(post),
    updPost: (state, updatedPost) => {
      const index = state.posts.findIndex((t) => t.id === updatedPost.id);
      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost);
      }
    },
    deletePost: (state, post) =>
      (state.posts = state.posts.filter((p) => post.id !== p.id)),

    newCategory: (state, category) => state.categories.unshift(category),
    updCategory: (state, updatedCategory) => {
      const index = state.categories.findIndex(
        (c) => c.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory);
      }
    },
    deleteCategory: (state, category) =>
      (state.categories = state.categories.filter(
        (c) => category.previous.id !== c.id
      )),

    newComment: (state, comment) => state.comments.unshift(comment),
    updComment: (state, updatedComment) => {
      const index = state.comments.findIndex((c) => c.id === updatedComment.id);
      if (index !== -1) {
        state.comments.splice(index, 1, updatedComment);
      }
    },
    deleteComment: (state, comment) =>
      (state.comments = state.comments.filter((c) => comment.id !== c.id)),
  },
  actions: {
    SET_CURRENT_POST({ commit, state }, postId) {
      let postFound = {};
      state.posts.forEach((post) => {
        if (postId == post.id) {
          postFound = post;
        }
      });
      commit("SET_CURRENT_POST", postFound);
    },
    SET_CURRENT_COMMENT({ commit, state }, commentId) {
      let commentFound = {};
      state.comment.forEach((comment) => {
        if (commentId == comment.id) {
          commentFound = comment;
        }
      });
      commit("SET_CURRENT_COMMENT", commentFound);
    },
    SET_CURRENT_CATEGORY({ commit, state }, categoryId) {
      let categoryFound = {};
      state.categories.forEach((category) => {
        if (categoryId == category.id) {
          categoryFound = category;
        }
      });
      commit("SET_CURRENT_CATEGORY", categoryFound);
    },
    getPosts({ commit }) {
      axios
        .get(LOCAL + URL + "/posts", headers)
        .then((response) => {
          commit("SET_POSTS", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getComments({ commit }) {
      axios
        .get(LOCAL + URL + "/comments", headers)
        .then((response) => {
          commit("SET_COMMENTS", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategories({ commit }) {
      axios
        .get(LOCAL + URL + "/categories", headers)
        .then((response) => {
          commit("SET_CATEGORIES", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addPost({ commit }, post) {
      const config = {
        method: "post",
        withCredentials: true,
        data: post,
        url: LOCAL + URL + "/posts",
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("newPost", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updatePost({ commit }, post) {
      const config = {
        method: "put",
        withCredentials: true,
        data: post,
        url: LOCAL + URL + "/posts/" + post.id,
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("updPost", response.data);
          commit("SET_CURRENT_POST", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removePost({ commit }, post) {
      console.log("delete2");
      const config = {
        method: "DELETE",
        withCredentials: true,
        url: LOCAL + URL + "/posts/" + post,
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("deletePost", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    addCategory({ commit }, category) {
      const config = {
        method: "post",
        withCredentials: true,
        data: category,
        url: LOCAL + URL + "/categories",
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("newCategory", response.data);
        })
        .catch(function (error) {
          if (error.response.data.code == "term_exists") {
            alert("Nom de catégorie déja utilisé");
          } else {
            console.log(error.response.data.code);
          }
        });
    },
    updateCategory({ commit }, category) {
      const config = {
        method: "put",
        withCredentials: true,
        data: category,
        url: LOCAL + URL + "/categories/" + category.id,
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("updCategory", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeCategory({ commit }, category) {
      const config = {
        method: "DELETE",
        withCredentials: true,
        data: {
          force: true,
        },
        url: LOCAL + URL + "/categories/" + category,
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("deleteCategory", response.data);
        })
        .catch(function (error) {
          if (error.response.data.code == "rest_cannot_delete") {
            alert("Impossible de supprimer la catégorie UNCATEGORIZED");
          } else {
            console.log(error.response.data.code);
          }
        });
    },

    addComment({ commit }, comment) {
      const config = {
        method: "post",
        withCredentials: true,
        data: comment,
        url: LOCAL + URL + "/comments",
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("newComment", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateComment({ commit }, comment) {
      const config = {
        method: "put",
        withCredentials: true,
        data: comment,
        url: LOCAL + URL + "/comments/" + comment.id,
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("updComment", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeComment({ commit }, comment) {
      const config = {
        method: "DELETE",
        withCredentials: true,
        data: {
          force: true,
        },
        url: LOCAL + URL + "/comments/" + comment,
        headers: headers,
      };
      axios(config)
        .then(function (response) {
          commit("deleteComment", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  plugins: [vuexLocal.plugin],
});

export default store;

// props : ['id'],
// //created(){
//     this.$store.dispatch('setCurrentPost',this.id);
// },
// computed :{
//     post : function(){
//         return this.$store.getters.getCurrentPost;
//     }
// }
