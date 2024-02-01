<template>
  <div class="thmubnailWrapper">
    <h1>{{ text }}</h1>
    <img :src="image" alt="thumbnail" class="imgThumbnail" />
  </div>
</template>
<script lang="ts">
export default {
  props: {
    text: String,
    image: String,
  },
};
</script>
<style lang="css" scoped>
.thmubnailWrapper {
  background-color: #9fe870;
  height: 100%;
  width: 99%;
  padding: 15px;
  display: flex;
  flex-direction: column; /* Reverse the order of items in the flex container */
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 15px;
  border-radius: 30px 30px 10px 10px;
}

h1 {
  font-size: 5rem; /* Adjusted padding to create space between text and image */
  color: #163300;
}

img {
  width: 30%;
  height: auto; /* Adjusted to maintain the aspect ratio of the image */
}
</style>
