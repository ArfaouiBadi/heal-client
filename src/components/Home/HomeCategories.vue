<template lang="html">
  <div class="CategoriesWrapper">
    <CategoryCard text="Bone Care" image="https://i.ibb.co/crKrMSP/pic.jpg" />
    <CategoryCard text="Liver Care" image="https://i.ibb.co/4NDg3Tr/pic2.jpg" />
    <CategoryCard text="Bone Care" image="https://i.ibb.co/crKrMSP/pic.jpg" />
    <CategoryCard text="Liver Care" image="https://i.ibb.co/4NDg3Tr/pic2.jpg" />
    <CategoryCard text="Bone Care" image="https://i.ibb.co/crKrMSP/pic.jpg" />
    <CategoryCard text="Liver Care" image="https://i.ibb.co/4NDg3Tr/pic2.jpg" />
  </div>
</template>
<script lang="ts">
import CategoryCard from "./CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
};
</script>
<style lang="css">
.CategoriesWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  width: 99%;
  background-color: white;
  border-radius: 30px;
  padding: 50px;
  margin: 15px;
  border-radius: 30px;
  margin-top: -50px;
}
</style>
