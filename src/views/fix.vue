<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
* {
  padding: 0;
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: "Roboto Light", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #afc4dd;
  color: #241e1e;
  font-size: 15px;
}

header {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-row: auto;
  background-color: #2196f3;
  padding: 15px;
  background-color: #4fa9fd;
}
#logo {
  text-align: left;
  font-size: 48px;
  color: white;
  text-decoration: none;
}
.LoginRegisterBlock {
  text-align: right;
}
#login {
  text-align: right;
  color: white;
  font-size: 48px;
  text-decoration: none;
}
#Register {
  grid-area: auto;
  text-align: right;
  color: white;
  font-size: 24px;
  text-decoration: none;
}
.register {
  text-decoration: none;
}
#Searchbar {
  text-align: center;
  border-radius: 100px;
  height: 48px;
  background: #ffffff;
}
.category {
  display: grid;
  grid-template-columns: repeat(10, minmax(auto, 30vmax));
  grid-template-rows: auto;
  grid-gap: 10px;
  padding: 15px;
  background-color: #afc4dd;
  color: #241e1e;
  font-size: 24px;
}

.titre {
  text-align: left;
}
.content {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #2b78d2;
}
.formulaire {
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.gaucheL {
  background-image: url("assets/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.gaucheD {
  background-image: url("assets/register.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

input {
  width: 100%;
}

input[type="checkbox"] {
  display: inline-block;
  width: 10%;
}

input[type="submit"] {
  color: white;
  background-color: #2b78d2;
  padding: 20px 10px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
}
.ButtonMyComment {
  color: white;
  background-color: #2b78d2;
  padding: 10px 10px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 30px;
}

.lien {
  text-decoration: none;
  color: black;
}

.loginInput {
  float: left;
}

em {
  font-size: small;
}

.AdminTitle {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  border-radius: 10px;
  background-color: #5ca7ff;
  align-self: center;
  width: fit-content;
  height: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 10px;
}

.Admin_Navbar {
  display: flex;
  /*position: absolute;*/
  left: auto;
  flex-direction: column;
  height: 100%;
  width: 150px;
  color: whitesmoke;
  background-color: #5ca7ff;
}

.AdminNavBarGridCSS {
  width: 150px;
}

.AdminlabelCSS {
  display: flex;
  margin-right: auto;
  font-weight: bold;
}
.MyArticlesTitle {
  color: white;
  border: solid 1px #f8f5f5;
  border-radius: 30px;
  background-color: #5ca7ff;
  align-self: center;
  width: fit-content;
  height: auto;
  margin-top: 50px;
  margin-left: 10%;
  margin-bottom: 50px;
  padding: 10px;
}
.Users_ArticlesDetails {
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 25%));
  grid-template-rows: auto;
  grid-gap: 50px;
  padding: 15px;
  margin-right: 20px;
  margin-left: 20px;
}
.InputProfil {
  color: white;
  background-color: #afc4dd;
  padding: 20px 10px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
}

.EditProfil {
  font-size: 24px;
  top: 50%;
  margin-top: 100px;
  margin-left: 30px;
  margin-right: 500px;
}
.ButtonOfUpdateProfil {
  color: white;
  background-color: #2b78d2;
  padding: 20px 20px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
}
.UpdateMyArticleButton {
  color: white;
  background-color: #2b78d2;
  padding: 20px 20px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}
.DeleteMyArticleButton {
  color: white;
  background-color: #2b78d2;
  padding: 20px 20px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}

.ReturnMyArticle {
  color: white;
  background-color: #2b78d2;
  padding: 20px 20px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}
.MyCommentsTitle {
  color: white;
  border: solid 1px #f8f5f5;
  border-radius: 30px;
  background-color: #5ca7ff;
  align-self: center;
  width: fit-content;
  height: auto;
  margin-top: 20px;
  margin-left: 40%;
  margin-bottom: 50px;
  padding: 10px;
}
.MyComments {
  color: white;
  background-color: #afc4dd;
  padding: 20px 10px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 50px;
  font-size: 20px;
  margin-left: 30px;
}
.InputCreateArticle {
  color: white;
  background-color: #afc4dd;
  padding: 20px 10px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
}

.CreateArticle {
  font-size: 24px;
  top: 50%;
  margin-top: 50px;
  margin-left: 30px;
  margin-right: 500px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #5ca7ff;
  border: 1px solid #f8f5f5;
}

.NavUser {
  display: block;
  color: #f8f5f5;
  font-size: 16px;
  padding: 8px 16px;
  text-decoration: none;
  text-align: center;
  border-bottom: 1px solid #f8f5f5;
}
.NavUserLOGOUT {
  display: block;
  color: #f8f5f5;
  font-size: 16px;
  padding: 8px 16px;
  text-decoration: none;
  text-align: center;
  border-bottom: 1px solid #f8f5f5;
  background-color: #2b78d2;
}
/* Change the link color on hover */
.NavUser:hover {
  background-color: #afc4dd;
  color: white;
}
.NavBarUser {
  position: fixed;
  right: 40px;
}
</style>
