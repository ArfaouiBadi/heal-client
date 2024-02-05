<template lang="html">
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="file" ref="fileInput" />
      <button type="submit">Submit</button>
    </form>

    <div v-if="imageData">
      <h2>Uploaded Image:</h2>
      <img :src="imageData" alt="Uploaded" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      imageData: "", // Corrected variable name
    };
  },
  methods: {
    async handleSubmit() {
      const fileInput = this.$refs.fileInput as HTMLInputElement;
      const file = fileInput.files?.[0];
      console.log("Selected file:", file);
      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      console.log("Uploading file:", file);
      try {
        const response = await axios.post(
          "http://localhost:3000/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Corrected variable name
        this.imageData = `data:image/png;base64, ${response.data}`;
      } catch (error) {
        console.error("An error occurred during file upload:", error);
      }
    },
  },
};
</script>
