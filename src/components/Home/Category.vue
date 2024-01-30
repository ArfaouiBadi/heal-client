<template lang="html">
  <div class="categoryWrapper" @click="selectCategory">
    {{ category!.name }}
  </div>
</template>
<script lang="ts">
export default {
  props: {
    category: Object,
  },
  methods: {
    selectCategory() {
      this.$emit("categorySelected", this.category);
    },
  },
};
</script>
<style lang="css" scoped>
.categoryWrapper {
  margin: 01px 2px;
  border: 1px solid #163300;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 0 10px;
}
.categoryWrapper:hover {
  background-color: #163300;
  color: white;
}
</style>
