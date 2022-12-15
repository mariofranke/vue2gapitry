<template>
  <BarChart
      :data="meetingData"
      :options="messagesChartOptions"
      title="Communication Efficiency">
  </BarChart>
</template>

<script>
import BarChart from "@/components/base/BarChart";
import Moment from "moment/moment";
import {useLoggedInUserStore} from "@/store/user";

//const MeetingApps = ['zoom', 'teams',]


export default {
  name: "MeetingsChart",
  components: {BarChart},
  setup() {
    const userStore = useLoggedInUserStore();
    return {
      userStore,
    };
  },
  methods: {},
  props: {
    meetingData: Object,
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
