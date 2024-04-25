<template>
  <div class="card flex justify-content-center align-items-center chartWrapper">
    <Chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-30rem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import axios from "axios";
const getProductsByProductUserID = async () => {
  const user = localStorage.getItem("userId");
  const response = await axios.get(
    `http://localhost:3000/commandproduct/allProduct/${user}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.status === 200) {
    const labelCount: { [key: string]: number } = {};

    const labelArray: any[] = [];
    const dataArray: number[] = [];
    console.log(response.data);
    response.data.map((product: any) => {
      const productName = product.product.productName;

      labelCount[productName] = (labelCount[productName] || 0) + 1;
      return productName;
    });

    Object.entries(labelCount).forEach(([label, count]) => {
      labelArray.push(label);
      dataArray.push(count);
    });

    return { labelArray, dataArray };
  }

  return { labelArray: [], dataArray: [] };
};

const labelArray = ref([] as number[]);
const chartData = ref();
const chartOptions = ref();
const dataArray = ref([] as number[]);

onMounted(async () => {
  const { labelArray: fetchedLabelArray, dataArray: fetchedDataArray } =
    await getProductsByProductUserID();

  labelArray.value = fetchedLabelArray.slice(0, 5);
  dataArray.value = fetchedDataArray.slice(0, 5);

  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: labelArray,
    datasets: [
      {
        data: dataArray,
        backgroundColor: [
          documentStyle.getPropertyValue("--cyan-500"),
          documentStyle.getPropertyValue("--orange-500"),
          documentStyle.getPropertyValue("--gray-500"),
          documentStyle.getPropertyValue("--cyan-200"),
          documentStyle.getPropertyValue("--orange-100"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--cyan-400"),
          documentStyle.getPropertyValue("--orange-400"),
          documentStyle.getPropertyValue("--gray-400"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");

  return {
    plugins: {
      legend: {
        labels: {
          cutout: "60%",
          color: textColor,
        },
      },
    },
  };
};
</script>
<style lang="css" scoped>
.chartWrapper {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
