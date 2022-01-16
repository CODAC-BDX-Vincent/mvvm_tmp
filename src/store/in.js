import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const URL = "https://yowl-bdx.herokuapp.com/api";

export default createStore({
  state: {
    users: [],
    categories: [],
    comments: [],
    articles: [],

    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    isAdmin: Boolean,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    isAdmin: (state) => state.isAdmin,
  },
  mutations: {
    isAdmin(state, admin) {
      state.isAdmin = admin;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },

    newUser: (state, user) => state.users.unshift(user),
    updUser: (state, updatedUser) => {
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    deleteUser: (state, user) => {
      state.users = state.users.filter((u) => user.id !== u.id);
    },
    newCategory: (state, category) => state.categories.unshift(category),
    updCategory: (state, updatedCategory) => {
      const index = state.categories.findIndex(
        (c) => c.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory);
      }
    },
    deleteCategory: (state, category) => {
      state.categories = state.categories.filter(
        (c) => category.previous.id !== c.id
      );
    },
    newComment: (state, comment) => state.comments.unshift(comment),
    updComment: (state, updatedComment) => {
      const index = state.comments.findIndex((c) => c.id === updatedComment.id);
      if (index !== -1) {
        state.comments.splice(index, 1, updatedComment);
      }
    },
    deleteComment: (state, comment) => {
      state.comments = state.comments.filter((c) => comment.id !== c.id);
    },

    newArticle: (state, article) => state.articles.unshift(article),
    updArticle: (state, updatedArticle) => {
      const index = state.articles.findIndex((a) => a.id === updatedArticle.id);
      if (index !== -1) {
        state.articles.splice(index, 1, updatedArticle);
      }
    },
    deleteArticle: (state, article) => {
      state.articles = state.articles.filter((a) => article.id !== a.id);
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: URL + "/login", data: user, method: "POST" })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data;
            console.log("ici");
            if (user.user.is_admin) {
              commit("isAdmin", user.user.is_admin);
            }
            localStorage.setItem("token", token);
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: URL + "/register", data: user, method: "POST" })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    },

    getAllUsers({ commit }) {
      axios
        .get(`${URL}/users`)
        .then((response) => {
          commit("SET_USERS", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllComments({ commit }) {
      axios
        .get(`${URL}/comments`)
        .then((response) => {
          commit("SET_COMMENTS", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCategories({ commit }) {
      axios
        .get(`${URL}/categories`)
        .then((response) => {
          commit("SET_CATEGORIES", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllArticles({ commit }) {
      axios
        .get(`${URL}/articles`)
        .then((response) => {
          commit("SET_ARTICLES", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addUser({ commit }, user) {
      const config = {
        method: "post",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: user,
        url: `${URL}/users`,
      };
      axios(config)
        .then((response) => {
          commit("newUser", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUser({ commit }, user) {
      const config = {
        method: "put",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: user,
        url: `${URL}/users/${user.id}`,
      };
      axios(config)
        .then((response) => {
          commit("updUser", response.data);
          commit("SET_CURRENT_USER", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeUser({ commit }, user) {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        url: `${URL}/users/${user}`,
      };
      axios(config)
        .then((response) => {
          commit("deleteUser", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addCategory({ commit }, category) {
      const config = {
        method: "post",
        key: "value",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: category,
        url: `${URL}/categories`,
      };
      axios(config)
        .then((response) => {
          commit("newCategory", response.data);
        })
        .catch((error) => {
          if (error.response.data.code === "term_exists") {
            alert("Nom de catégorie déja utilisé");
          } else {
            console.log(error.response.data.code);
          }
        });
    },
    updateCategory({ commit }, category) {
      const config = {
        method: "put",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: category,
        url: `${URL}/categories/${category.id}`,
      };
      axios(config)
        .then((response) => {
          commit("updCategory", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeCategory({ commit }, category) {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        url: `${URL}/categories/${category}`,
      };
      axios(config)
        .then((response) => {
          commit("deleteCategory", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.code);
        });
    },

    addComment({ commit }, comment) {
      const config = {
        method: "post",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: comment,
        url: `${URL}/comments`,
      };
      axios(config)
        .then((response) => {
          commit("newComment", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateComment({ commit }, comment) {
      const config = {
        method: "put",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: comment,
        url: `${URL}/comments/${comment.id}`,
      };
      axios(config)
        .then((response) => {
          commit("updComment", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeComment({ commit }, comment) {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: {
          force: true,
        },
        url: `${URL}/comments/${comment}`,
      };
      axios(config)
        .then((response) => {
          commit("deleteComment", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addArticle({ commit }, article) {
      const config = {
        method: "post",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: article,
        url: `${URL}/articles`,
      };
      axios(config)
        .then((response) => {
          commit("newArticle", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateArticle({ commit }, article) {
      const config = {
        method: "put",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        data: article,
        url: `${URL}/articles/${article.id}`,
      };
      axios(config)
        .then((response) => {
          commit("updArticle", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeArticle({ commit }, article) {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },

        url: `${URL}/articles/${article}`,
      };
      axios(config)
        .then((response) => {
          commit("deleteArticle", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  plugins: [vuexLocal.plugin],
});
