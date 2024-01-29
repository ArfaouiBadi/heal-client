<template lang="html">
  <div class="cardWrapper">
    <img :src="image" />
    <div class="cardText">{{ text }}</div>
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
.cardWrapper img {
  width: 170px;
  border-radius: 20px;
}
.cardWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin: 10px;
}
.cardText {
  font-size: 17px;
}
</style>
