<template>
  <v-card class="" elevation="5" outlined>
    <v-card-title class="grey--text">Hours on Workspace</v-card-title>
    <!--            <v-card-subtitle class="grey&#45;&#45;text">Title</v-card-subtitle>-->
    <v-divider></v-divider>
    <Bar :chart-data="workingHoursData" :chartOptions="workingHoursChartOptions" class="px-4 mt-3"/>
  </v-card>
</template>

<script>
import {Bar} from 'vue-chartjs/legacy'
import {mapGetters} from 'vuex'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart"
}
</script>

<style scoped>

</style>
