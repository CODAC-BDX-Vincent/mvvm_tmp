<template>
  <!-- <div>
   <p>{{post.id}}</p>
   <p>{{post.title.rendered}}</p>
  </div> -->
  <p>test</p>
</template>

<script>
export default {
  name: "Review",
  props: ["post"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
