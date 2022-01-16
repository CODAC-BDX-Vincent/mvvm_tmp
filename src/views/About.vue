<template>
  <!-- <review :post="post"/> -->
  <div>
    <p>{{ post.id }}</p>
    <p>{{ post.title.rendered }}</p>
  </div>
</template>

<script>
//import bootstrap from 'bootstrap'

// import Review from '@/components/Review.vue';

export default {
  name: "Note",
  components: {
    // Review
  },
  created() {
    // this.$store.commit('setCurrentPostVersionMutation',this.id);
    this.$store.dispatch("SET_CURRENT_POST", this.id);
  },
  props: ["id"],
  computed: {
    post: function () {
      return this.$store.getters.getCurrentPost;
    },
  },

  mounted() {},
};
</script>

<style scoped>
.note {
  background: #7afcff;
  overflow: hidden;
}
</style>
