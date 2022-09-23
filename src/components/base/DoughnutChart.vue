<template>
  <Doughnut
      :chart-data="chartData"
      :height="400"
      :options="options"
      :plugins="plugins"
      :width="400"/>
</template>

<script>
import {Doughnut} from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale, BarElement, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale)

export default {
  name: "DoughnutChart",
  components: {Doughnut},
  data() {
    return {
      chartData: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        }
      },
      plugins: [{
        beforeInit: (chart) => {
          const dataset = chart.data.datasets[0];
          chart.data.labels = [dataset.label];
          dataset.data = [dataset.percent, 100 - dataset.percent];
        }
      },
        {
          beforeDraw: (chart) => {
            let width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
            ctx.restore();
            let fontSize = (height / 150).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.fillStyle = "#9b9b9b";
            ctx.textBaseline = "middle";
            let text = chart.data.datasets[0].percent + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
      ],
    }
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    chartOptions: {
      type: Object,
      default: null
    },
    chartPlugins: {
      type: Array,
      default: () => []
    },

  },
}

</script>

<style scoped>

</style>
