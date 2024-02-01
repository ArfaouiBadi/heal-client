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
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08),
    0px 1px 30px 5px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
}
</style>
