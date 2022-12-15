<template>
  <BarChart
      :data="data"
      :options="workingHoursChartOptions"
      title="Hours on Workspace">
  </BarChart>
</template>

<script>
import BarChart from "@/components/base/BarChart";

export default {
  name: "WorkingHoursBarChart",
  components: {BarChart},
  props: {
    data: Object,
  },
  data: () => ({
    workingHoursChartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      borderWidth: 1,
      borderSkipped: false,
      borderRadius: 10,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          }
        },
        y: {
          display: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            stepSize: 2,
          }
        },
      },
    },
  }),
}
</script>

<style scoped>

</style>
