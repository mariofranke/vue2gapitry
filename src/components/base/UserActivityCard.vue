<template>
  <div>

    <apexchart :options="options" :series="series1" height="400px" type="rangeBar"></apexchart>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'HelloWorld',
  components: {
    apexchart: VueApexCharts
  },
  data: () => ({
    series1: [
      {
        name: 'Bob',
        data: [
          {
            x: 'User 1',
            y: [
              new Date().getTime() - 100000 * 1,
              new Date().getTime() + 100000 * 2,
            ]
          },
          {
            x: 'User 1',
            y: [
              new Date().getTime() + 100000 * 3,
              new Date().getTime() + 100000 * 4,
            ]
          },
          {
            x: 'User 1',
            y: [
              new Date().getTime() - 100000 * 5,
              new Date().getTime() - 100000 * 3,
            ]
          },
          {
            x: 'User 2',
            y: [
              new Date().getTime() + 100000 * 3,
              new Date().getTime() + 100000 * 4,
            ],
            color: '#FF4560'
          },
          /* {
             x: 'Code',
             y: [
               1601361625000,
               1601383225000
             ]
           },
           {
             x: 'Test',
             y: [
               1601361625000,
               1601383225000
             ]
           },
           {
             x: 'Deploy',
             y: [
               1601361625000,
               1601383225000
             ]
           },
           {
             x: 'Review',
             y: [
               1601361625000,
               1601383225000
             ]
           }*/
        ]
      },
      {
        name: 'Luise',
        data: [
          {
            x: 'User 1',
            y: [
              new Date().getTime() - 100000 * 1,
              new Date().getTime() + 100000 * 2,
            ]
          },
          {
            x: 'User 1',
            y: [
              new Date().getTime() + 100000 * 3,
              new Date().getTime() + 100000 * 4,
            ]
          },
          {
            x: 'User 1',
            y: [
              new Date().getTime() - 100000 * 5,
              new Date().getTime() - 100000 * 3,
            ]
          },
          {
            x: 'User 2',
            y: [
              new Date().getTime() + 100000 * 3,
              new Date().getTime() + 100000 * 4,
            ],
            color: '#FF4560'
          },
          /* {
             x: 'Code',
             y: [
               1601361625000,
               1601383225000
             ]
           },
           {
             x: 'Test',
             y: [
               1601361625000,
               1601383225000
             ]
           },
           {
             x: 'Deploy',
             y: [
               1601361625000,
               1601383225000
             ]
           },
           {
             x: 'Review',
             y: [
               1601361625000,
               1601383225000
             ]
           }*/
        ]
      },

    ],
    chartOptions: {
      chart: {
        height: 450,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%'
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'HH:mm'
        }

      },
      stroke: {
        width: 1
      },
      fill: {
        type: 'solid',
        opacity: 0.6
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    },
    options: {
      chart: {
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      stroke: {
        width: 1
      },
      fill: {
        type: 'solid',
        opacity: 0.6
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    },
    series: [{
      name: 'series-1',
      data: {
        x: 'Design',
        y: [
          new Date('2019-03-05').getTime(),
          new Date('2019-03-08').getTime()
        ]
      },
    }]
  })
}
</script>


