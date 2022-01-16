<template>
  <div class="entire-post">
    <div class="cardDetail">

      <h1>TITLE</h1>
      <h2 id="titleH1" class="title" v-on:click="updateTitle">{{ card.title.rendered }} </h2>


      <form @submit="onSubmitP">
        <input
            id="inputH1"
            class="input-title"
            placeholder="Modify your title"
            name="newTC"
            v-model="newTC"
            v-on:keyup.enter="recoverTitle"
        />

      </form>

      <h2>Description</h2>
      <div id="descH1" class="description" v-html="card.content.rendered" v-on:click="updateDescription">
      </div>
      <div>
        <form @submit="onSubmitPDesc">
          <input
              id="inputDesc"
              class="input-description"
              placeholder="Modify your description"
              name="newDescC"
              v-model="newDescC"
              v-on:keyup.enter="recoverDescription"
          />

        </form>

      </div>
      <h3>Comments</h3>
      <div v-for="comment in comments" v-bind:key="comment.id">
        <div class="commentCSS" v-if="comment.post == this.id">
          <div
            id="CommentUpdate"
            @dblclick="handleCommentUpdate"
            v-if="showUpdateComment"
            v-html="comment.content.rendered"
          />
          <form
            
            @submit.prevent="onSubmitUComment"
            v-if="!showUpdateComment"
            class="updateCommentCForm"
          >
            <input
              name="commentUC"
              v-model="commentUC"
              type="text"
              autofocus
              :placeholder.prop="comment.content.rendered"
              minlength="2"
            />
            
            <input
              type="submit"
              class="updateCommentFormButtonUpdate"
              value="update"
            />
            <button
              class="updateCommentFormButtonClose"
              @click="handleUpdateCommentFormButtonCancel"
            >
              Cancel
            </button>
          </form>
          <button class="commentDelete">Delete comment</button>
        </div>
      </div>

      <router-link to="/">
        <button class="button-return">Return</button>
      </router-link>

      <router-link to="/">
        <button class="button-delete" v-on:click="deletePost">Delete</button>
      </router-link>
    </div>




  </div>
</template>

<script>
//import axios from "axios";
// import comments from "./comments";
import { mapActions } from "vuex";
/*const LOCAL = "http://localhost:81/";
const URL = "wordpress//wp-json/wp/v2/";*/
export default {
  name: "card-id",
 // components: {comments},
  props: ["id"],
  data(){
    return{
      newTC:"",
      newDescC:"",
      showUpdateComment: true,
      commentId:"",
      commentUC :"",
    }
  },
  created() {
    this.$store.dispatch("SET_CURRENT_POST", this.id);
    this.$store.dispatch("getComments");
  },
  computed: {
    card: function () {
      return this.$store.getters.getCurrentPost;
    },

    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    //...mapActions(["removePost","updatePost"]),
    ...mapActions(["updatePost","removePost"]),
    deletePost() {
      console.log("delete");
      this.removePost(this.card.id);
    },
    onSubmitP(e) {
      e.preventDefault();
      console.log("update");
      const card ={
        id : this.id,
        title : this.newTC,
      };
      console.log(card);
      this.updatePost(card);

    },
    onSubmitPDesc(e) {
      e.preventDefault();
      console.log("update");
      const card ={
        id : this.id,
        content : this.newDescC,
      };
      console.log(card);
      this.updatePost(card);

    },

    handleCommentUpdate() {
      this.showUpdateComment = !this.showUpdateComment
    },

    handleUpdateCommentFormButtonCancel() {
      this.showUpdateComment = !this.showUpdateComment
    },

    updateTitle() {
      let divTitle = document.getElementById('inputH1');
      let h1 = document.getElementById("titleH1");
      if (divTitle.style.display === "none") {
        divTitle.style.display = "block";
        h1.style.display = "none";
      } else {
        divTitle.style.display = "none";
      }
    },
    recoverTitle() {
      let divTitle = document.getElementById('inputH1');
      let h1 = document.getElementById("titleH1");
      if (h1.style.display === "none") {
        h1.style.display = "block";
        divTitle.style.display = "none";
      } else {
        h1.style.display = "none";
      }
    },
    updateDescription() {
      let divDesc = document.getElementById("inputDesc");
      let desc = document.getElementById("descH1");
      console.log(divDesc);
      console.log(desc);
      if (divDesc.style.display === "none") {
        divDesc.style.display = "block";
        desc.style.display = "none";
      } else {
        divDesc.style.display = "none";
      }
    },
    recoverDescription() {
      let divDesc = document.getElementById("inputDesc");
      let desc = document.getElementById("descH1");
      if (divDesc.style.display === "block") {
        divDesc.style.display = "none";
        desc.style.display = "block";
      } else {
        divDesc.style.display = "none";
      }
    },
    onSubmitUComment(e){
      e.preventDefault();
      console.log(this.commentUC);
    }
  },
};
</script>

<style>
.button-delete{

top :10px;
right : 10px;
}
.entire-post {
display: flex;
justify-content: center;
position:relative;
}
.cardDetail {
position: absolute;
width: 500px;
max-width: 500px;
height: 500px;
background-color: #ebecf0;
color: #172b4d;
border-radius: 5%;
display: flex;
flex-direction: column;
justify-content: space-between;
flex-wrap: nowrap;
box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
button {
}
.left-column {
width: 90%;
}
.top-left {
display: flex;
flex-direction: row;
justify-content: space-between;
}
.description {
height: 200px;
border: 1px solid blue;
}
.input-title {
display: none;
height: 37px;
margin-top: 21px;
margin-bottom: 15px;
margin-left: 5px;
font-size: 32px;
}
.input-description {
display: none;
height: 200px;
width: 90%;
border: 1px solid red;
}
.right-column {
display: flex;
flex-direction: column;
justify-content: space-evenly;
}
</style>