<template>
  <div class="chartWrapper">
    <div class="chartContainer">
      <h4>Products per category</h4>
      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import axios from "axios";

const chartData = ref();
const chartOptions = ref();
let labelArray = ref([]);
let dataP = ref([]);

const fetchDataCategories = async () => {
  try {
    const data = await axios.get("http://localhost:3000/category");
    const categories = data.data;
    labelArray.value = categories.map((category) => category.name);
    return labelArray.value;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchDataProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const productPerCategory = async () => {
  try {
    const products = await fetchDataProducts();
    const labels = await fetchDataCategories();
    const dataProductPerCategoryCount = Array(labels.length).fill(0);

    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (products[j].category.name === labels[i]) {
          dataProductPerCategoryCount[i]++;
        }
      }
    }

    return dataProductPerCategoryCount;
  } catch (error) {
    console.error("Error in productPerCategory:", error);
    return [];
  }
};

onMounted(async () => {
  dataP = await productPerCategory();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  return {
    labels: labelArray.value,
    datasets: [
      {
        label: "Products",
        data: dataP,
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

<style lang="css" scoped>
.chartContainer {
  background-color: white;
  width: 70%;
  height: 70%;
  padding: 5%;
  border-radius: 20px;
}
.chartWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
h4 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5%;
}
</style>
