<template>
  <v-card class="" elevation="5" outlined>
    <v-card-title class="grey--text">{{ title }}</v-card-title>
    <!--            <v-card-subtitle class="grey&#45;&#45;text">Title</v-card-subtitle>-->
    <v-divider></v-divider>
    <Bar :chart-data="data" :chartOptions="options" class="px-4 mt-3"/>
  </v-card>
</template>

<script>
import {Bar} from 'vue-chartjs/legacy'

import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: {Bar},
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    options: Object,
    title: String
  },
}
</script>

<style scoped>

</style>
