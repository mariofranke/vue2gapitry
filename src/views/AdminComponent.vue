<template>
  <v-app>
    <v-container>
      <v-row>

        <v-col>
          <h1 class="text-center grey--text">Team Indicators</h1>
        </v-col>
      </v-row>
      <v-row>

        <ScoreCard
            :metric="40"
            :percent="10"
            dark-mode="true"
            help_text='The Score shows your usage of Google Workspace. The higher the score, the more you use Google
                              Workspace and its tools.
                              Your usage data of Google-Workspace is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-star-circle"
            icon_color="yellow darken-2"
            metric_text="increase since last week"
            title="Workspace Adaption Score"
        />
        <ScoreCard
            :metric="20"
            :percent="10"
            help_text='The Score shows your usage of Collaboration inside Google Workspace. The higher the score,
                              the more you use the collaboration tools inside Google
                              Workspace.
                              Your interaction inside of Google-Workspace is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-account-group"
            icon_color="yellow darken-2"
            metric_text="increase since last week"
            title="Collaboration Score"
        />
        <ScoreCard
            :metric="80"
            :percent="10"
            help_text='The Score shows your usage of Google Workspace. The Score is based of the amount of Devices you use and if you use an mobile device.'
            help_title="Scoring"
            icon="mdi-cellphone-link"
            icon_color="yellow darken-2"
            metric_text="increase since last week"
            title="Mobility Score"
        />
      </v-row>
      <v-row>
        <v-col>
          <h1 class="text-center grey--text">Team in Detail</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-data-table
                :headers="headers"
                :items="userXScores"
                class="elevation-1"
            >

              <template v-slot:[`item.meetAdoption`]="{ item }">
                <v-chip
                    :color="getColor(item.meetAdoption)"
                    dark
                >
                  {{ item.meetAdoption.toFixed(2) }}
                </v-chip>
              </template>
              <template v-slot:[`item.meetAdoptionLastWeek`]="{ item }">
                <v-chip
                    :color="getColor(item.meetAdoptionLastWeek)"
                    dark
                >
                  {{ item.meetAdoptionLastWeek.toFixed(2) }}
                </v-chip>
              </template>
              <template v-slot:[`item.calendarAdoption`]="{ item }">
                <v-chip
                    :color="getColor(item.calendarAdoption)"
                    dark
                >
                  {{ item.calendarAdoption.toFixed(2) }}
                </v-chip>
              </template>
              <template v-slot:[`item.calendarAdoptionLastWeek`]="{ item }">
                <v-chip
                    :color="getColor(item.calendarAdoptionLastWeek)"
                    dark
                >
                  {{ item.calendarAdoptionLastWeek.toFixed(2) }}
                </v-chip>
              </template>
              <template v-slot:[`item.userMobilityScore`]="{ item }">
                <v-chip
                    :color="getColor(item.userMobilityScore)"
                    dark
                >
                  {{ item.userMobilityScore.toFixed(2) }}
                </v-chip>
              </template>
              <template v-slot:[`item.userMobilityScoreLastWeek`]="{ item }">
                <v-chip
                    :color="getColor(item.userMobilityScoreLastWeek)"
                    dark
                >
                  {{ item.userMobilityScoreLastWeek.toFixed(2) }}

                </v-chip>
              </template>
              <template v-slot:[`item.userWorkspaceAdaptionScore`]="{ item }">
                <v-chip
                    :color="getColor(item.userWorkspaceAdaptionScore)"
                    dark
                >
                  {{ item.userWorkspaceAdaptionScore.toFixed(2) }}
                </v-chip>
              </template>
              <template v-slot:[`item.userWorkspaceAdaptionScoreLastWeek`]="{ item }">
                <v-chip
                    :color="getColor(item.userWorkspaceAdaptionScoreLastWeek)"
                    dark
                >
                  {{ item.userWorkspaceAdaptionScoreLastWeek.toFixed(2) }}
                </v-chip>
              </template>

            </v-data-table>
          </v-card>
        </v-col>

      </v-row>
      <!--      <v-row>
              <v-col cols="12">
                <UserActivityCard/>
              </v-col>
            </v-row>-->

      <!--      <v-row>
              <v-col>
                <h1 class="text-center grey&#45;&#45;text">Communication Indicator</h1>
              </v-col>
            </v-row>-->
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
import {useLoggedInUserStore} from "@/store/user";

import ScoreCard from "@/components/base/ScoreCard";
import UserActivityCard from "@/components/base/UserActivityCard";
import {data} from "@/components/base/chartConfig";
import {useAdminStore} from "@/store/admin";
import DoughnutChart from "@/components/base/DoughnutChart.vue";
import MeetingsChart from "@/components/MeetingsChart.vue";
import WorkingHoursBarChart from "@/components/WorkingHoursBarChart.vue";
import YoutubeCard from "@/components/base/YoutubeCard.vue";
import {Bar} from "vue-chartjs/legacy";
import MessagesChart from "@/components/MessagesChart.vue";
import moment from "moment/moment";
import Moment from "moment/moment";

let emailDates = []
let chatActivityData = []
let messagesData = []
let calendarEntries = []
let userKeys = []
let userScores = []
let header = []
const calculateDuration = (start, end) => {
  let duration = Moment.duration(Moment(end).diff(Moment(start)))
  return duration.asHours()
}
export default {
  name: "AdminComponent",
  computed: {
    data() {
      return data
    }
  },
  components: {
    DoughnutChart,
    UserActivityCard,
    MeetingsChart,
    WorkingHoursBarChart,
    YoutubeCard,
    ScoreCard,
    Bar,
    MessagesChart
  },

  mounted() {

    let thisWeek = moment()
    let lastWeek = moment().subtract(7, 'days');
    let lastLastWeek = moment().subtract(14, 'days');

    calendarEntries = this.getCalendarEntries()
    // console.log("calendarEntries", calendarEntries)


    let start = moment().startOf('week').format('DD-MM');
    let startLastWeek = moment().subtract(7, 'days').startOf('week').format('DD-MM');
    let startLastLastWeek = moment().subtract(14, 'days').startOf('week').format('DD-MM');


    // Calendar Adoption

    // console.log("calendarAdoptionLastWeek", this.calendarAdoptionLastWeek)
    // console.log("calendarAdoption", this.calendarAdoption)
    // console.log("calendarAdoptionIncrease", this.calendarAdoptionIncrease)

    // Meet Adoption
    let meetData = this.getMeetData()
    let meetDataLastWeek = this.filterDataOlderThen(meetData, thisWeek)
    // console.log("meetDataLastWeek", meetDataLastWeek)
    console.log("meetData", meetData)
    this.meetAdoption = this.countItems(meetData)
    this.meetAdoptionLastWeek = this.countItems(meetDataLastWeek)
    this.meetAdoptionIncrease = this.calculateIncreaseInPercent(this.meetAdoptionLastWeek, this.meetAdoption)
    // console.log("meetAdoption", this.meetAdoption)
    // console.log("meetAdoptionLastWeek", this.meetAdoptionLastWeek)
    // console.log("meetingsAdoptionIncrease", this.meetAdoptionIncrease)
    let mobileActivityData = this.getMobileActivityData()
    let mobileActivityDataLastWeek = this.filterDataOlderThen(mobileActivityData, thisWeek)

    let chatActivityData = this.getChatsData()
    let chatsLastWeek = this.filterChatsByWeek(chatActivityData, lastWeek)

    let calendarActivityData = this.getCalendarActivityData()
    let calendarActivityDataUntilLastWeek = this.filterDataOlderThen(calendarActivityData, thisWeek)


    userKeys = this.getUserKeys()
    for (let i = 0; i < userKeys.length; i++) {

      let userKey = userKeys[i]
      console.log("userKey", userKey)

      let userMeetData = meetData.filter(item => item.email === userKey)
      let userMeetDataLastWeek = meetDataLastWeek.filter(item => item.email === userKey)
      let userMeetAdoption = this.countItems(userMeetData)
      let userMeetAdoptionLastWeek = this.countItems(userMeetDataLastWeek)
      let userMeetAdoptionIncrease = this.calculateIncreaseInPercent(userMeetAdoptionLastWeek, userMeetAdoption)
      console.log("userMeetData", userMeetData)

      let userMobileActivityData = mobileActivityData.filter(item => item.email === userKey)
      let userMobileActivityDataLastWeek = mobileActivityDataLastWeek.filter(item => item.email === userKey)
      let userMobilityScore = this.calculateMobilityActivityScore(userMobileActivityData)
      let userMobilityScoreLastWeek = this.calculateMobilityActivityScore(userMobileActivityDataLastWeek)
      let userMobilityScoreIncrease = this.calculateIncreaseInPercent(userMobilityScoreLastWeek, userMobilityScore)
      console.log("userMobileActivityData", userMobileActivityData)

      let userCalendarActivityData = calendarActivityData.filter(item => item.email === userKey)
      let userCalendarActivityDataUntilLastWeek = calendarActivityDataUntilLastWeek.filter(item => item.email === userKey)
      let userCalendarAdoption = this.countItems(userCalendarActivityData)
      let userCalendarAdoptionLastWeek = this.countItems(userCalendarActivityDataUntilLastWeek)
      let userCalendarAdoptionIncrease = this.calculateIncreaseInPercent(userCalendarAdoptionLastWeek, userCalendarAdoption)
      console.log("userCalendarActivityData", userCalendarActivityData)


      let userWorkspaceAdaptionScore = this.calculateworkspaceAdaptionScore(userMeetAdoption, userMobilityScore, userCalendarAdoption)
      let userWorkspaceAdaptionScoreLastWeek = this.calculateworkspaceAdaptionScore(userMeetAdoptionLastWeek, userMobilityScoreLastWeek, userCalendarAdoptionLastWeek)
      let userWorkspaceAdaptionScoreIncrease = this.calculateIncreaseInPercent(userWorkspaceAdaptionScoreLastWeek, userWorkspaceAdaptionScore)

      let user = {
        userWorkspaceAdaptionScore: userWorkspaceAdaptionScore,
        userWorkspaceAdaptionScoreLastWeek: userWorkspaceAdaptionScoreLastWeek,
        email: userKey.substr(0, userKey.indexOf('@')),
        meetAdoption: userMeetAdoption,
        meetAdoptionLastWeek: userMeetAdoptionLastWeek,
        userMobilityScore: userMobilityScore,
        userMobilityScoreLastWeek: userMobilityScoreLastWeek,
        calendarAdoption: userCalendarAdoption,
        calendarAdoptionLastWeek: userCalendarAdoptionLastWeek,
      }

      userScores.push(user)

    }
    let header_start = {
      text: 'User',
      align: 'start',
      sortable: false,
      value: 'email',
    }
    let userScoreKeys = Object.keys(userScores[0])
    let newHeader = []
    newHeader.push(header_start)
    userScoreKeys.forEach(key => {
      if (key !== "email") {
        let header = {
          text: key,
          value: key,
        }
        newHeader.push(header)
      }
    })

    this.headers = newHeader
    this.userXScores = userScores
    console.log("header", header)

    // create the headers

    console.log("userScores", userScores)
    this.workspaceAdaptionScore = userScores.map(item => item.userWorkspaceAdaptionScore).reduce((a, b) => a + b, 0) / userScores.length
    this.workspaceAdaptionScoreLastWeek = userScores.map(item => item.userWorkspaceAdaptionScoreLastWeek).reduce((a, b) => a + b, 0) / userScores.length
    this.mobilityScore = userScores.map(item => item.userMobilityScore).reduce((a, b) => a + b, 0) / userScores.length
    this.mobilityScoreLastWeek = userScores.map(item => item.userMobilityScoreLastWeek).reduce((a, b) => a + b, 0) / userScores.length

    console.log("workspaceAdaptionScore", this.workspaceAdaptionScore)

    /*//

    // Mobile Score
    let mobileActivityData = this.getMobileActivityData()
    let mobileActivityDataLastWeek = this.filterDataOlderThen(mobileActivityData, lastWeek)
    console.log("mobileActivityData", mobileActivityData)
    console.log("mobileActivityDataLastWeek", mobileActivityDataLastWeek)
    this.mobilityScore = this.calculateMobilityActivityScore(mobileActivityData)
    this.mobileScoreLastWeek = this.calculateMobilityActivityScore(mobileActivityDataLastWeek)
    this.mobilityScoreIncrease = this.calculateIncreaseInPercent(this.mobileScoreLastWeek, this.mobilityScore)
    console.log("mobileScore", this.mobilityScore)
    console.log("mobileScoreLastWeek", this.mobileScoreLastWeek)
    console.log("mobileScoreIncrease", this.mobilityScoreIncrease)


    // console.log("EmailsLastWeek", EmailsLastWeek)
    // console.log("EmailsLastLastWeek", EmailsLastLastWeek)
    let chatsThisWeek = this.filterChatsByWeek(chatActivityData, thisWeek)
    let chatsOlderThenThisWeek = this.filterDataOlderThen(chatActivityData, thisWeek)
    let chatsOlderThenLastWeek = this.filterDataOlderThen(chatActivityData, lastWeek)
    // console.log("chatsThisWeek", chatsThisWeek)
    // console.log("chatsOlderThenThisWeek", chatsOlderThenThisWeek)
    let chatsLastWeek = this.filterChatsByWeek(chatActivityData, lastWeek)
    let chatsLastLastWeek = this.filterChatsByWeek(chatActivityData, lastLastWeek)
    this.chatAdoption = this.calculateChatAdoptionScore(chatsThisWeek, chatsOlderThenThisWeek)
    let chatAdoptionLastWeek = this.calculateChatAdoptionScore(chatsLastWeek, chatsOlderThenLastWeek)
    // console.log("chatAdoption", this.chatAdoption)
    // console.log("chatAdoptionLastWeek", chatAdoptionLastWeek)
    this.chatAdoptionIncrease = this.calculateIncreaseInPercent(chatAdoptionLastWeek, this.chatAdoption)
    // console.log("chatAdoptionIncrease", this.chatAdoptionIncrease)


    // Collaboration

    console.log("chatActivityData", chatActivityData)
    this.collaborationScore = this.calculateCollaborationScore(chatActivityData,)

    // Calendar Adoption
    let calendarActivityData = this.getCalendarActivityData()
    let calendarActivityDataUntilLastWeek = this.filterDataOlderThen(calendarActivityData, lastWeek)
    this.calendarAdoption = this.countItems(calendarActivityData)
    this.calendarAdoptionLastWeek = this.countItems(calendarActivityDataUntilLastWeek)
    console.log("calendarActivityData", calendarActivityData)
    console.log("calendarActivityDataUntilLastWeek", calendarActivityDataUntilLastWeek)
    console.log("calendarAdoption", this.calendarAdoption)
    console.log("calendarAdoptionLastWeek", this.calendarAdoptionLastWeek)
    this.calendarAdoptionIncrease = this.calculateIncreaseInPercent(this.calendarAdoptionLastWeek, this.calendarAdoption)
    console.log("calendarAdoptionIncrease", this.calendarAdoptionIncrease)

    this.workspaceAdaptionScore = this.calculateworkspaceAdaptionScore()
    this.workspaceAdaptionScoreLastWeek = this.calculateworkspaceAdaptionScoreLastWeek()
    this.workspaceAdaptionScoreIncrease = this.calculateIncreaseInPercent(this.workspaceAdaptionScoreLastWeek, this.workspaceAdaptionScore)
    console.log("workspaceAdaptionScore", this.workspaceAdaptionScore)
    console.log("workspaceAdaptionScoreLastWeek", this.workspaceAdaptionScoreLastWeek)
    console.log("workspaceAdaptionScoreIncrease", this.workspaceAdaptionScoreIncrease)*/


    // For each userKey


  },
  setup() {
    const userStore = useAdminStore();
    return {
      userStore,
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
  }, methods: {
    getEmails() {
      return this.userStore.emails;
    },
    getCalendarEntries() {
      return this.userStore.calendarEntries;
    },
    getUser() {
      return this.userStore.userData.email;
    },
    getUserKeys() {
      return this.userStore.userKeys;
    },
    calculateIncreaseInPercent(chatAdoptionLastWeek, chatAdoption) {
      let increase = ((chatAdoption - chatAdoptionLastWeek) / chatAdoptionLastWeek * 100)
      if (increase < 0) {
        return 0
      } else if (increase.isNaN) {
        return 0
      } else if (chatAdoption === 0 && chatAdoptionLastWeek === 0) {
        return 0
      } else {
        return increase
      }
    },
    calculateFocusTime(entries) {
      let focusTime = 0
      entries.forEach((entry) => {
        // console.log("entry", entry.summary)
        if (entry.summary === "Fokuszeit" || entry.summary === "Focus time") {
          focusTime += calculateDuration(entry.start.dateTime, entry.end.dateTime)
        }
      })
      return focusTime
    },

    calculateCollaborationScore(chatActivityData, meetingsPerApp) {
      let collaborationScore = 0
      let chatCollaborationScore = this.calculateChatCollaborationScore(chatActivityData)
      let calendarCollaborationScore = this.calculateCalendarCollaborationScore(meetingsPerApp)

      return chatCollaborationScore + calendarCollaborationScore + this.meetAdoption / 3
    },
    getUserScores() {
      return userScores
    },
    getUserHeaders() {
      return header
    },
    calculateMobilityActivityScore(mobileActivityData) {
      let mobilityActivityScore = 0
      let setOfDevices = new Set()
      let setOfDeviceTypes = new Set()
      mobileActivityData.forEach((data) => {
        if (data.events !== undefined) {
          data.events.forEach((event) => {
            let deviceID = event.parameters.find(function (obj) {
              return obj.name === "DEVICE_ID";
            });
            let deviceType = event.parameters.find(function (obj) {
              return obj.name === "DEVICE_TYPE";
            });


            if (deviceID !== undefined) {
              //console.log("deviceID", deviceID.value)
              if (deviceID.value !== '') {
                setOfDevices.add(deviceID.value)
              }
            }
            if (deviceType !== undefined) {
              //console.log("deviceType", deviceType.value)
              if (deviceType.value !== '') {
                setOfDeviceTypes.add(deviceType.value)
              }
            }
          })
        }
      })
      // check if there are mobile devices
      let hasMobileDevice = setOfDeviceTypes.has("ANDROID") || setOfDeviceTypes.has("IOS")
      if (hasMobileDevice) {
        mobilityActivityScore += 20
      }
      console.log("hasMobileDevice", hasMobileDevice)
      console.log("setOfDevices", setOfDevices)
      console.log("setOfDeviceTypes", setOfDeviceTypes)
      mobilityActivityScore += setOfDevices.size * 10
      if (mobilityActivityScore > 100) {
        mobilityActivityScore = 100
      }
      return mobilityActivityScore


    },
    calculateCalendarCollaborationScore(meetingsPerApp) {
      return 10
    },
    calculateChatCollaborationScore(chatActivityData) {
      let chatCollaborationScore = 0
      chatActivityData.forEach((chat) => {
        chat.events.forEach((event) => {
          let room_name = event.parameters.find(function (obj) {
            return obj.name === "room_name";
          });
          if (room_name !== undefined) {
            if (room_name.value !== '') {
              chatCollaborationScore += 1
            }

          } else if (event.name === "room_created" || event.name === "room_joined" || event.name === "room_left" || event.name === "room_deleted" || event.name === "invite_send" || event.name === "room_message" || event.name === "room_created" || event.name === "room_message_updated") {
            chatCollaborationScore += 1
          }
        })
      })
      if (chatCollaborationScore > 10) {
        chatCollaborationScore = 10
      }
      return chatCollaborationScore
    },


    calculateChatAdoptionScore(chatsThisWeek, chatsOlderThenThisWeek) {
      let chatAdoptionScore = 0
      chatsOlderThenThisWeek.forEach((chat) => {
        chatAdoptionScore += 1
      })
      chatsThisWeek.forEach((chat) => {
        chatAdoptionScore += 1
      })
      if (chatAdoptionScore < 0) {
        return 0
      }
      if (chatAdoptionScore > 99) {
        return 100
      }
      return chatAdoptionScore
    },
    countItems(data) {
      let emailAdoptionScore = 0
      data.forEach((d) => {
        emailAdoptionScore += 1
      })
      if (emailAdoptionScore < 0) {
        return 0
      }
      if (emailAdoptionScore > 99) {
        return 100
      }
      return emailAdoptionScore
    },

    calculateTotalTime(entries) {
      let time = 0
      entries.forEach((entry) => {
        time += calculateDuration(entry.start.dateTime, entry.end.dateTime)
      })
      return time
    },
    calculateTimeInMeetings(calendarEntries) {
      let time = 0
      calendarEntries.forEach((entry) => {
            const meetingsNames = ["Meeting",
              "Besprechung",
              "Meeting",
              "skype",
              "Skype",
              "zoom",
              "Zoom",
              "Call",
              "call",
              "Telefonat",
              "hangout",
              "Hangout",
              "teams",
              "Teams",
            ]
            if (meetingsNames.includes(entry.summary) || 'hangoutLink' in entry) {

              time += calculateDuration(entry.start.dateTime, entry.end.dateTime)

            }
          }
      )
      return time
    },
    getMeetingsWithApp(entries, app) {
      let meetings = {
        skype: [],
        zoom: [],
        teams: [],
        hangout: [],
        call: [],
      }
      entries.forEach((entry) => {
        // console.log("entry", entry.summary)
        if (typeof entry.summary !== 'undefined') {
          if (entry.summary.includes("skype")) {
            // console.log("skype")
            meetings.skype.push(entry)
          } else if (entry.summary.includes("zoom")) {
            meetings.zoom.push(entry)
          } else if (entry.summary.includes("teams")) {
            meetings.teams.push(entry)
          } else if (entry.summary.includes("hangout")) {
            meetings.hangout.push(entry)
          } else if (entry.summary.includes("call") || entry.summary.includes("Call") || entry.summary.includes("Telefonat") || entry.summary.includes("anruf")) {
            meetings.call.push(entry)
          } else if ('hangoutLink' in entry) {
            meetings.hangout.push(entry)
          }
        }


      })
      return meetings
    },
    calculateworkspaceAdaptionScore(meetAdoption, mobilityScore, calendarAdoption) {

      return (mobilityScore + calendarAdoption + meetAdoption) / 3
    },

    getCalendarActivityData() {
      let formattedData = [];
      try {
        console.log("calendarActivityData", this.userStore.calendarActivityData)
        for (const chat of this.userStore.calendarActivityData.data) {
          if (chat.events[0].name !== "direct_message_started") {
            formattedData.push(
                {
                  date: chat.id.time,
                  events: chat.events,
                  email: chat.actor.email
                }
            )
          }
        }
        return formattedData
      } catch (e) {
        // console.log(e)
      }
    },
    getEmailsData() {
      let formattedData = [];
      try {
        for (const email of this.userStore.emails) {
          if (email.body !== null) {
            let body = JSON.parse(email.body)
            let chat = body.labelIds[0] === "CHAT"
            if (!chat) {
              let date = body.payload.headers.find(header => header.name === "Date").value
              date = new Date(date)
              formattedData.push(
                  {
                    date: date,
                    from: body.payload.headers.find(header => header.name === "From").value,
                    subject: body.payload.headers.find(header => header.name === "Subject").value,
                    body: body.snippet,
                    labels: body.labelIds
                  }
              )
            }
          }
        }
        return formattedData
      } catch (e) {
        // console.log(e)
      }
    }
    ,
    getChatsData() {
      let formattedData = [];
      try {
        for (const chat of this.userStore.chatActivityData.data) {
          if (chat.events[0].name !== "direct_message_started") {
            formattedData.push(
                {
                  date: chat.id.time,
                  events: chat.events,
                  email: chat.actor.email
                }
            )
          }
        }
        return formattedData
      } catch (e) {
        // console.log(e)
      }
    }
    ,
    getMeetData() {
      let formattedData = [];
      try {
        for (const meet of this.userStore.meetActivityData.data) {
          if (meet.events[0].name !== "direct_message_started") {
            formattedData.push(
                {
                  date: meet.id.time,
                  email: meet.actor.email
                }
            )
          }
        }
        return formattedData
      } catch (e) {
        // console.log(e)
      }
    },
    getDriveData() {
      let formattedData = [];
      try {
        for (const meet of this.userStore.driveActivityData.data) {
          if (meet.events[0].name !== "direct_message_started") {
            formattedData.push(
                {
                  date: meet.id.time,
                  events: meet.events
                }
            )
          }
        }
        return formattedData
      } catch (e) {
        // console.log(e)
      }
    },
    getMobileActivityData() {
      let formattedData = [];
      try {
        for (const meet of this.userStore.mobileActivityData.data) {
          if (meet.events[0].name !== "direct_message_started") {
            formattedData.push(
                {
                  date: meet.id.time,
                  events: meet.events,
                  email: meet.actor.email
                }
            )
          }
        }
        return formattedData
      } catch (e) {
        // console.log(e)
      }
    },

    getFocusTimePercentage() {
      if (this.totalTime > 0) {
        // console.log("focusTime%", this.focusTime / this.focusTime)
        return Math.round((this.focusTime / this.totalTime) * 100)
      }
      return 0
    }
    ,
    getTimeinMeetingsPercentage() {
      if (this.totalTime > 0) {
        return Math.round((this.timeInMeetings / this.totalTime) * 100)
      }
      return 0
    },
    getMessagesData() {
      //console.log("messagesData", typeof messagesData)
      return messagesData
    }
    ,
    filterDatesByWeek(emails, date) {
      let filteredDates = []
      for (let i = 0; i < emails.length; i++) {
        if (moment(emails[i]).isSame(date, 'week')) {
          filteredDates.push(moment(emails[i]))
        }
      }
      return filteredDates
    }
    ,
    filterCalendarEntriesByWeek(entries, date) {
      let filteredEntries = []
      for (let i = 0; i < entries.length; i++) {
        if (moment(entries[i].start.dateTime).isSame(date, 'week')) {
          filteredEntries.push(entries[i])
        }
      }
      return filteredEntries
    }
    ,
    filterChatsByWeek(chats, date) {
      let filteredDates = []
      for (let i = 0; i < chats.length; i++) {
        if (moment(chats[i].date).isSame(date, 'week')) {
          filteredDates.push(moment(chats[i]))
        }
      }
      return filteredDates
    },
    filterDataOlderThen(data, date) {
      let filteredDates = []
      for (let i = 0; i < data.length; i++) {
        if (moment(data[i].date).isBefore(date)) {
          filteredDates.push(data[i])
        }
      }
      return filteredDates
    },
    filterDataOlderThenDateTime(chats, date) {
      let filteredDates = []
      for (let i = 0; i < chats.length; i++) {
        if (moment(chats[i].start.dateTime).isBefore(date)) {
          filteredDates.push(moment(chats[i]))
        }
      }
      return filteredDates
    },
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
  data() {
    return {
      focusTime: 0,
      totalTime: 0,
      timeInMeetings: 0,
      meetingAppDataThisWeek: {},
      meetingAppDataLastWeek: {},
      meetingAppDataLastLastWeek: {},
      panel: 0,
      chatAdoption: 0,
      chatAdoptionLastWeek: 0,
      chatAdoptionIncrease: 0,
      gmailAdoption: 0,
      gmailAdoptionLastWeek: 0,
      gmailAdoptionIncrease: 0,
      calendarAdoption: 0,
      calendarAdoptionLastWeek: 0,
      calendarAdoptionIncrease: 0,
      driveAdoption: 0,
      driveAdoptionLastWeek: 0,
      driveAdoptionIncrease: 0,
      meetAdoption: 0,
      meetAdoptionLastWeek: 0,
      meetAdoptionIncrease: 0,
      collaborationScore: 0,
      collaborationScorePerUser: {},
      collaborationScoreLastWeek: 0,
      collaborationScoreIncrease: 0,
      mobilityScore: 0,
      mobilityScoreLastWeek: 0,
      mobilityScoreIncrease: 0,
      workspaceAdaptionScore: 0,
      workspaceAdaptionScoreLastWeek: 0,
      workspaceAdaptionScoreIncrease: 0,
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
      userXScores: [
        {
          name: 'Frozen Yogurt',
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
