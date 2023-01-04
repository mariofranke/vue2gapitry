<template>
  <v-card className="" elevation="5" outlined>
    <v-card-title className="grey--text">{{ title }}</v-card-title>
    <!--            <v-card-subtitle class="grey&#45;&#45;text">Title</v-card-subtitle>-->
    <v-divider></v-divider>
    <Doughnut :chart-data="data" :chartOptions="options" class="ma-5"/>
  </v-card>
</template>

<script>
import {Bar, Doughnut} from 'vue-chartjs/legacy'

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "BarChart",
  components: {Doughnut},
  props: {
    data: Object,
    title: String
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    },

  }),
}
</script>

<style scoped>

</style>
