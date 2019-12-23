<template>
  <router-link :to="{name: route, params:{petId:petId}}">
    <div class="card">
      <div class="card-header text-secondary">
        <h4>{{name}}</h4>
      </div>
      <div class="card-body text-center">
        <div class="petImg" v-if="image !== 'undefined'">
          <img class="card-img-top" :src="image[0]" />
        </div>
      </div>
      <div
        class="card-footer text-center"
        v-if="matchWithUserAccuracy !== undefined"
      >Dopasowanie: {{matchWithUserAccuracy}}%</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "pet-card",
  props: {
    petId: Number,
    image: Array,
    name: String,
    matchWithUserAccuracy: Number,
    route: String
  }
};
</script>

<style scoped>
a {
  color: #6c757d;
}
.petImage {
  max-width: 300px;
  max-height: 400px;
}
</style>