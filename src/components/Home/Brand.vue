<template lang="html">
  <div class="brandWrapper">
    <div class="Circle">
      <img src="../../assets/vaseline.png" />
    </div>
    <p>Marque</p>
  </div>
</template>
<script lang="ts" scoped>
export default {};
</script>
<style lang="css" scoped>
.brandWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #163300;
  margin: 10px;
}
.Circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Circle img {
  width: 50px;
}
p {
  font-size: 15px;
  font-weight: 500;
}
</style>
