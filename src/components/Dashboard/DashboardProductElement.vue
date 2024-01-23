<template>
  <div class="elementWrapper">
    <div class="elementheader">
      <i :class="class" />
      <p>{{ text }}</p>
    </div>
    <p class="data">{{ data }}</p>
    <p class="growth">{{ growth }}</p>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    growth: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="css">
.elementWrapper {
  background-color: white;
  border-radius: 15px;
  padding: 1.5%;
  width: 23%;
  transition: all 0.3s ease-in-out;
}
.elementWrapper:hover {
  background-color: #1b2728;
  color: white;
}

.elementheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.elementheader p {
  margin: 0;
}

.elementWrapper i {
  font-size: 30px;
  color: black;
}
</style>
