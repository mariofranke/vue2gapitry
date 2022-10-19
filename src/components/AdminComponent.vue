<template>
  <v-app>
    <v-container>
      <v-row>

        <v-col>
          <h1 class="text-center grey--text">Global Indicators</h1>
        </v-col>
      </v-row>
      <v-row>

        <ScoreCard
            help_text='The Score shows your usage of Google Workspace. The higher the score, the more you use Google
                        Workspace and its tools.
                        Your usage data of Google-Workspace is used to determine your score.
                        The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-star-circle"
            icon_color="yellow darken-2"
            metric="+5%"
            metric_text="since last week"
            percent="37"
            title="Workspace Experience Score"
        />
        <ScoreCard
            help_text='The Score shows your usage of Collaboration inside Google Workspace. The higher the score,
                        the more you use the collaboration tools inside Google
                        Workspace.
                        Your interaction inside of Google-Workspace is used to determine your score.
                        The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-account-group"
            icon_color="yellow darken-2"
            metric="+5%"
            metric_text="since last week"
            title="Collaboration Score"
        />
        <ScoreCard
            help_text='The Score shows your usage of Google Workspace. The higher the score, the more you use Google
                        Workspace and its tools.
                        Your usage data of Google-Workspace is used to determine your score.
                        The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-cellphone-link"
            icon_color="yellow darken-2"
            metric="+2%"
            metric_text="since last week"
            percent="20"
            title="Mobility Score"
        />
      </v-row>
      <v-row>
        <v-col>
          <h1 class="text-center grey--text">Team</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
            >
              <template v-slot:[`item.adaption`]="{ item }">
                <v-chip
                    :color="getColor(item.adaption)"
                    dark
                >
                  {{ item.adaption }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
          <UserActivityCard/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h1 class="text-center grey--text">Communication Indicator</h1>
        </v-col>
      </v-row>
      <!--      <v-row>
              <v-col cols="3">
                <v-card class="" elevation="5" outlined>
                  <v-card-title class="grey&#45;&#45;text">Communication Efficiency</v-card-title>
                  &lt;!&ndash;            <v-card-subtitle class="grey&#45;&#45;text">Title</v-card-subtitle>&ndash;&gt;
                  <v-divider></v-divider>
                  <Bar :chart-data="messagesData" :chartOptions="messagesChartOptions" class="px-4 mt-3"/>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card class="" elevation="5" outlined>
                  <v-card-title class="grey&#45;&#45;text">Meeting Efficiency</v-card-title>
                  &lt;!&ndash;            <v-card-subtitle class="grey&#45;&#45;text">Title</v-card-subtitle>&ndash;&gt;
                  <v-divider></v-divider>
                  <Bar :chart-data="meetingData" :chartOptions="messagesChartOptions" class="px-4 mt-3"/>
                </v-card>
              </v-col>

            </v-row>-->


      <!--      <v-row>
              <v-col cols="12">
                Emails
                {{ this.userStore.emails }}
              </v-col>
              <v-col>Chats {{ this.userStore.chatMessages }}</v-col>
            </v-row>-->
    </v-container>
  </v-app>
</template>

<script>
import {useCounterStore} from "@/store/counter";
import {useLoggedInUserStore} from "@/store/user";

import ScoreCard from "@/components/base/ScoreCard";
import UserActivityCard from "@/components/base/UserActivityCard";


export default {
  name: "AdminComponent",
  components: {UserActivityCard, ScoreCard,},
  methods: {
    getColor(adaption) {
      if (adaption < 25) {
        return 'red'
      } else if (adaption < 50) {
        return 'orange'
      } else {
        return 'green'
      }
    }
  },
  setup() {
    const counterStore = useCounterStore();
    const userStore = useLoggedInUserStore();
    return {
      userStore,
      counterStore,
    };
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    plugins: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      messagesData: {
        labels: ['1.9', '10.9', '17.9'],
        datasets: [
          {
            label: 'Chats',
            backgroundColor: "#0D47A1",
            data: [2, 4, 2]
          },
          {
            label: 'Emails',
            backgroundColor: '#64B5F6',
            data: [3, 7, 9]
          }
        ]
      },
      meetingData: {
        labels: ['1.9', '10.9', '17.9'],
        datasets: [
          {
            label: 'Teams',
            backgroundColor: "#0D47A1",
            data: [2, 4, 2]
          },
          {
            label: 'Zoom',
            backgroundColor: '#64B5F6',
            data: [0, 1, 4]
          },
          {
            label: 'Google Meet',
            backgroundColor: '#f6de64',
            data: [2, 1, 1]
          },
          {
            label: 'Skype',
            backgroundColor: '#bc64f6',
            data: [3, 3, 6]
          }
        ]
      },
      headers: [
        {
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Adaption Score', value: 'adaption'},
        {text: 'Collaboration', value: 'collaboration'},
        {text: 'Mobility', value: 'mobility'},
        {text: 'Communication', value: 'communication'},
      ],
      desserts: [
        {
          name: 'User 1',
          adaption: 30,
          collaboration: 33,
          mobility: 24,
          communication: 40,
        },
        {
          name: 'User 2',
          adaption: 57,
          collaboration: 9,
          mobility: 37,
          communication: 4,
        },
        {
          name: 'User 3',
          adaption: 62,
          collaboration: 16,
          mobility: 23,
          communication: 6,
        },
        {
          name: 'User 4',
          adaption: 5,
          collaboration: 3,
          mobility: 67,
          communication: 4,
        },
      ],
      workingHoursData: {
        labels: [
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ],
        datasets: [
          {
            label: 'Hours User 1',
            backgroundColor: "#0D47A1",
            data: [[7, 13], [3, 17], [3, 18], [0, 0], [3, 15], [13, 18]]
          },
          {
            label: 'Hours User 2',
            backgroundColor: "#be9750",
            data: [[[5, 15], 15], [7, 13], [3, 17], [3, 18], [0, 0], [7, 15], [17, 18]]
          },
          {
            label: 'Hours User 3',
            backgroundColor: "#a119c2",
            data: [[5, 15], [7, 13], [3, 17], [3, 18], [0, 0], [7, 15],]
          },
          {
            label: 'Hours User 4',
            backgroundColor: "#2bc580",
            data: [[5, 8],]
          },
        ]
      },
      progressData: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
          }
        ]
      },
      revealMeetings: false,
      revealFocusTime: false,
      revealMessages: false,
      revealTop: false,
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      workingHoursChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
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

      progressOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 85,
        rotation: Math.PI / 2,
        legend: {
          display: false,
        },
      },

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
    }
  },


}
</script>

<style scoped>
.v-sheet--offset {
  top: +24px;
  left: +44px;

  position: relative;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
