<template>
  <BarChart
      :data="messagesData"
      :options="messagesChartOptions"
      title="Communication Efficiency">
  </BarChart>
</template>

<script>
import BarChart from "@/components/base/BarChart";
import Moment from "moment/moment";
import {useLoggedInUserStore} from "@/store/user";


export default {
  name: "MessagesChart",
  components: {BarChart},
  setup() {
    const userStore = useLoggedInUserStore();
    return {
      userStore,
    };
  },
  props: {
    messagesData: Object,
  },
  data: () => ({
    messagesChartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      showLine: false,
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
      legend: {
        display: true,
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',

        },
      },
      tooltips: {
        enabled: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    }

  }),
}

</script>

<style scoped>

</style>
