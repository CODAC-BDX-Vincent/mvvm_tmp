<template>
  <div id="blocComment">
    <h2>Comments</h2>
    <input class="inputComment" placeholder="Add a comment" v-on:submit="addComment">
    <div class="comment" > </div>


  </div>
</template>

<script>
export default {
  name: "comments"
}
</script>

<style scoped>
#blocComment{
  display: flex;
  flex-direction: column;
}
</style>