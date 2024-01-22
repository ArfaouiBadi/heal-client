<template>
  <div class="navbarContainer">
    <span class="p-input-icon-left">
      <i v-show="!isInputFocused" class="pi pi-search searchIcon" />
      <InputText
        placeholder="Search"
        class="searchField"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
    </span>
    <div>
      <div class="circleContainer">
        <i v-badge="0" class="pi pi-bell p-overlay-badge circleIcon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";

export default {
  components: {
    InputText,
  },
  data() {
    return {
      isInputFocused: false,
    };
  },
  methods: {
    handleInputFocus() {
      this.isInputFocused = true;
    },
    handleInputBlur() {
      this.isInputFocused = false;
    },
  },
};
</script>

<style lang="css" scoped>
.searchField {
  background-color: #f4f4f4;
  color: black;
  height: 50%;
  border: none;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
}

.searchField::placeholder {
  color: black;
  padding-left: 10%;
  transition: opacity 0.3s ease-in-out;
}

.searchIcon {
  color: black;
  padding-left: 2%;
}

.navbarContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #f5f5f5;
}

.searchField:focus {
  width: 100%;
}

.searchField:focus::placeholder {
  opacity: 0;
}

.searchIcon {
  transition: opacity 0.3s ease-in-out;
}

.searchField:focus + .searchIcon {
  opacity: 0;
}

.circleContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f4f4f4; /* Adjust the background color as needed */
  cursor: pointer;
}

.circleIcon {
  font-size: 1.4rem;
  color: black;
}
</style>
