<template>
  <v-app>
    <v-container>
      <v-row>

        <v-col>
          <h1 class="text-center grey&#45;&#45;text">Global Indicators</h1>
        </v-col>
      </v-row>
      <v-row>

        <ScoreCard
            :metric="workspaceExperienceScoreIncrease"
            :percent="workspaceExperienceScore"
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
            :metric="collaborationScoreIncrease"
            :percent="collaborationScore"
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
            :metric="mobilityScoreIncrease"
            :percent="mobilityScore"
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
          <h1 class="text-center grey&#45;&#45;text">Application Adoption Indicators</h1>
        </v-col>
      </v-row>
      <v-row>


      </v-row>
      <v-row>

        <ScoreCard
            :metric="gmailAdoptionIncrease"
            :percent="gmailAdoption"
            googlelogo="Gmail"
            help_btn
            help_btn_scr="https://mail.google.com/mail/u/0/"
            help_btn_text="Use Gmail"
            help_text='The Score is determined by your usage of Gmail. The higher the score, the more you use Gmail.
                              Your usage data of Gmail is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-stove"
            icon_color="blue darken-2"
            metric_text="increase since last week"
            title="Gmail Adoption"/>


        <ScoreCard
            :metric="driveAdoptionIncrease"
            :percent="driveAdoption"
            googlelogo="Drive"
            help_btn
            help_btn_scr="https://drive.google.com/drive/u/0/my-drive"
            help_btn_text="Use Google Drive"
            help_text='The Score is determined by your usage of Google Drive. The higher the score, the more you use Google
                              Drive.
                              Your usage data of Google Drive is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-stove"
            icon_color="blue darken-2"
            metric_text="increase since last week"
            title="Drive Adoption"/>

        <ScoreCard
            :metric="meetAdoptionIncrease"
            :percent="meetAdoption"
            googlelogo="Meet"
            help_btn
            help_btn_scr="https://meet.google.com/"
            help_btn_text="Use Google Meet"
            help_text='The Score is determined by your usage of Google Meet. The higher the score, the more you use Google
                              Meet.
                              Your usage data of Google Meet is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title=""
            icon="mdi-account-group"
            icon_color="blue darken-2"
            metric_text="increase since last week"
            title="Meet Adoption"/>

        <ScoreCard
            :metric="calendarAdoptionIncrease"
            :percent="calendarAdoption"
            googlelogo="Calendar"
            help_btn
            help_btn_scr="https://calendar.google.com/calendar/u/0/r"
            help_btn_text="Use Google Calendar"
            help_text='The Score is determined by your usage of Google Calendar. The higher the score, the more you use Google
                              Calendar.
                              Your usage data of Google Calendar is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-stove"
            icon_color="blue darken-2"
            metric_text="increase since last week"
            title="Calendar Adoption"/>
        <ScoreCard
            :metric="chatAdoptionIncrease"
            :percent="chatAdoption"
            googlelogo="Chat"
            help_btn
            help_btn_scr="https://chat.google.com/"
            help_btn_text="Use Google Chat"
            help_text='The Score is determined by your usage of Google Chat. The higher the score, the more you use Google
                              Chat.
                              Your usage data of Google Chat is used to determine your score.
                              The kind and amount of Interaction are added up.'
            help_title="Scoring"
            icon="mdi-chat"
            icon_color="blue darken-2"
            metric_text="increase increase since last week"
            title="Chat Adoption"
        />
      </v-row>
      <v-row>
        <v-col>
          <h1 class="text-center ">Time based usage indicators</h1>
        </v-col>
      </v-row>
      <v-row>
        <ScoreCard
            :metric="0"
            :percent="20"
            help_btn
            help_btn_scr="https://support.google.com/calendar/answer/11190973?hl=en&co=GENIE.Platform%3DDesktop"
            help_btn_text="Learn how to use Focus Time"
            help_text='To reduce distractions while you work, you can schedule a focus time event in Google Calendar.'
            help_title="Focus Time"
            icon="mdi-headphones"
            icon_color="blue darken-2"
            metric_text="hours this week"
            title="Focus time"/>

        <ScoreCard
            :metric=timeInMeetings
            :percent="30"
            help_btn
            help_btn_scr="https://www.calendar.com/blog/perfect-amount-of-meetings-per-day-backed-by-science"
            help_btn_text="Read More"
            help_text='Excessive meetings can also result in information overload and a sense of failure.
                    As if that weren’t enough, they’re distracting and force you to multitask.
                    All of these aren’t good for your cognitive health.'
            help_title="Meetings"
            icon="mdi-account-group"
            icon_color="blue darken-2"

            metric_text="hours this Week"
            title="Time in meetings"/>

      </v-row>

      <v-row>
        <v-col>
          <h1 class="text-center ">Communication indicators</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <MessagesChart :messages-data="getMessagesData()"></MessagesChart>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="4">
          <DoughnutChart :data="meetingAppDataThisWeek" title="Meeting tools this week"></DoughnutChart>

        </v-col>
        <v-col cols="4">
          <DoughnutChart :data="meetingAppDataLastWeek" title="Meeting tools  last week"></DoughnutChart>

        </v-col>
        <v-col cols="4">
          <DoughnutChart :data="meetingAppDataLastLastWeek" title="Communication tools 2 weeks ago"></DoughnutChart>

        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h1 class="text-center text--secondary text--lighten-3 pa-4">Your recommendated Material</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-expansion-panels :value="panel" p-3>
          <v-expansion-panel
          >
            <v-expansion-panel-header>
              <h1>Recommendations for you</h1>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <YoutubeCard v-if="calendarAdoption < 20" title="How to view time insights in Google Calendar"
                             videoId="https://www.youtube.com/embed/UlS9Ll1UNmY?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
                <YoutubeCard v-if="focusTime < 1"
                             title="How to Schedule a Focus Time Event in Google Calendar"
                             videoId="https://www.youtube.com/embed/CKIajJmgcFk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
                <YoutubeCard v-if="driveAdoption < 20"
                             title="How to: Share multiple files in Google Drive - YouTube"
                             videoId="https://www.youtube.com/embed/Nul6ZNHjeiM?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
                <YoutubeCard v-if="calendarAdoption < 20 || gmailAdoption < 20"
                             title="How to: Open Google Calendar in Gmail"
                             videoId="https://www.youtube.com/embed/qZzE84Gn3Yk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel
          >
            <v-expansion-panel-header>
              <h1>All Learn Resources</h1>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <YoutubeCard title="How to view time insights in Google Calendar"
                             videoId="https://www.youtube.com/embed/UlS9Ll1UNmY?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
                <YoutubeCard
                    title="How to Schedule a Focus Time Event in Google Calendar"
                    videoId="https://www.youtube.com/embed/CKIajJmgcFk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
                <YoutubeCard
                    title="How to: Share multiple files in Google Drive - YouTube"
                    videoId="https://www.youtube.com/embed/Nul6ZNHjeiM?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
                <YoutubeCard
                    title="How to: Open Google Calendar in Gmail"
                    videoId="https://www.youtube.com/embed/qZzE84Gn3Yk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <div></div>
    </v-container>
  </v-app>
</template>

<script>
import {useLoggedInUserStore} from "@/store/user";
import {Bar, Doughnut} from 'vue-chartjs/legacy'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import ScoreCard from "@/components/base/ScoreCard";
import YoutubeCard from "@/components/base/YoutubeCard";
import WorkingHoursBarChart from "@/components/WorkingHoursBarChart";
import MessagesChart from "@/components/MessagesChart";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import MeetingsChart from "@/components/MeetingsChart";
import Moment from "moment";
import moment from "moment";
import DoughnutChart from "@/components/base/DoughnutChart.vue";
import {data} from "@/components/base/chartConfig";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,)


let emails = []
let emailDates = []
let chatActivityData = []
let messagesData = []
let calendarEntries = []


const calculateDuration = (start, end) => {
  let duration = Moment.duration(Moment(end).diff(Moment(start)))
  return duration.asHours()
}
export default {
  name: "DashboardComponent",
  computed: {
    data() {
      return data
    }
  },
  components: {DoughnutChart, MeetingsChart, WorkingHoursBarChart, YoutubeCard, ScoreCard, Bar, MessagesChart},
  setup() {
    const userStore = useLoggedInUserStore();
    return {
      userStore,
    };

  },
  mounted() {
    emails = this.getEmailsData()

    chatActivityData = this.getChatsData()
    emailDates = this.getEmailsData().reduce((acc, cur) => {
      acc.push(cur.date)
      return acc
    }, [])

    let thisWeek = moment()
    let lastWeek = moment().subtract(7, 'days');
    let lastLastWeek = moment().subtract(14, 'days');

    calendarEntries = this.getCalendarEntries()
    // console.log("calendarEntries", calendarEntries)


    let start = moment().startOf('week').format('DD-MM');
    let startLastWeek = moment().subtract(7, 'days').startOf('week').format('DD-MM');
    let startLastLastWeek = moment().subtract(14, 'days').startOf('week').format('DD-MM');
    let calendarEntriesThisWeek = this.filterCalendarEntriesByWeek(calendarEntries, thisWeek)
    let calendarEntriesLastWeek = this.filterCalendarEntriesByWeek(calendarEntries, lastWeek)
    let calendarEntriesLastLastWeek = this.filterCalendarEntriesByWeek(calendarEntries, lastLastWeek)

    // Calendar Adoption
    let calendarEntriesUntilLastWeek = this.filterDataOlderThenDateTime(calendarEntries, lastWeek)

    // console.log("calendarAdoptionLastWeek", this.calendarAdoptionLastWeek)
    // console.log("calendarAdoption", this.calendarAdoption)
    // console.log("calendarAdoptionIncrease", this.calendarAdoptionIncrease)

    // Meet Adoption
    let meetData = this.getMeetData()
    let meetDataLastWeek = this.filterDataOlderThen(meetData, thisWeek)
    // console.log("meetDataLastWeek", meetDataLastWeek)
    // console.log("meetData", meetData)
    this.meetAdoption = this.countItems(meetData)
    this.meetAdoptionLastWeek = this.countItems(meetDataLastWeek)
    this.meetAdoptionIncrease = this.calculateIncreaseInPercent(this.meetAdoptionLastWeek, this.meetAdoption)
    // console.log("meetAdoption", this.meetAdoption)
    // console.log("meetAdoptionLastWeek", this.meetAdoptionLastWeek)
    // console.log("meetingsAdoptionIncrease", this.meetAdoptionIncrease)

    // Drive Adoption
    let driveData = this.getDriveData()
    // console.log("driveData", driveData)
    let driveDataLastWeek = this.filterDataOlderThen(driveData, lastWeek)
    // console.log("driveDataLastWeek", driveDataLastWeek)
    this.driveAdoption = this.countItems(driveData) / 10
    this.driveAdoptionLastWeek = this.countItems(driveDataLastWeek)
    this.driveAdoptionIncrease = this.calculateIncreaseInPercent(this.driveAdoptionLastWeek, this.driveAdoption)
    // console.log("driveAdoption", this.driveAdoption)
    // console.log("driveAdoptionLastWeek", this.driveAdoptionLastWeek)
    // console.log("driveAdoptionIncrease", this.driveAdoptionIncrease)

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


    let EmailsThisWeek = this.filterDatesByWeek(emailDates, thisWeek)
    let EmailsLastWeek = this.filterDatesByWeek(emailDates, lastWeek)
    let EmailsLastLastWeek = this.filterDatesByWeek(emailDates, lastLastWeek)
    console.log("EmailsThisWeek", emails)
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

    let emailsUntilLastWeek = this.filterDataOlderThenEmailDateTime2(emails, lastWeek)
    console.log("emailsUntilLastWeek", emailsUntilLastWeek)
    this.gmailAdoption = this.countItems(emails)
    let gmailAdoptionLastWeek = this.countItems(emailsUntilLastWeek)
    console.log("emailAdoption", this.gmailAdoption)
    console.log("emailAdoptionLastWeek", gmailAdoptionLastWeek)
    this.gmailAdoptionIncrease = this.calculateIncreaseInPercent(gmailAdoptionLastWeek, this.gmailAdoption)
    console.log("emailAdoptionIncrease", this.gmailAdoptionIncrease)

    // Collaboration

    console.log("chatActivityData", chatActivityData)
    let meetingsPerApp = this.getMeetingsWithApp(calendarEntries)
    this.collaborationScore = this.calculateCollaborationScore(chatActivityData, emails, meetingsPerApp)

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

    messagesData = {
      labels: [startLastLastWeek, startLastWeek, start],
      datasets: [
        {
          label: 'Chats',
          data: [3, 2, 5],
          backgroundColor: '#8e5ea2',
          borderColor: '#8e5ea2',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Emails',
          data: [3, 4, 1],
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1,
          fill: false,
        }
      ]
    }

    this.focusTime = this.calculateFocusTime(calendarEntriesThisWeek)
    // console.log("focusTime", this.focusTime)
    this.totalTime = this.calculateTotalTime(calendarEntriesThisWeek)
    // console.log("totalTime", this.totalTime)
    this.timeInMeetings = this.calculateTimeInMeetings(calendarEntriesThisWeek)
    // console.log("timeInMeetings", this.timeInMeetings)

    let meetingsPerAppThisWeek = this.getMeetingsWithApp(calendarEntriesThisWeek)
    let meetingsPerAppLastWeek = this.getMeetingsWithApp(calendarEntriesLastWeek)
    let meetingsPerAppLastLastWeek = this.getMeetingsWithApp(calendarEntriesLastLastWeek)

    this.meetingAppDataThisWeek = {
      labels: ['zoom', 'teams', 'hangout', 'call'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          // data: [meetingsPerAppThisWeek.zoom.length, meetingsPerAppThisWeek.teams.length, meetingsPerAppThisWeek.hangout.length, meetingsPerAppThisWeek.call.length]
          data: [1, 3, 4, 5]
        }
      ]
    }
    this.meetingAppDataLastWeek = {
      labels: ['zoom', 'teams', 'hangout', 'call'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          // data: [meetingsPerAppLastWeek.zoom.length, meetingsPerAppLastWeek.teams.length, meetingsPerAppLastWeek.hangout.length, meetingsPerAppLastWeek.call.length]
          data: [1, 0, 0, 5]

        }
      ]
    }
    this.meetingAppDataLastLastWeek = {
      labels: ['zoom', 'teams', 'hangout', 'call'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [meetingsPerAppLastLastWeek.zoom.length, meetingsPerAppLastLastWeek.teams.length, meetingsPerAppLastLastWeek.hangout.length, meetingsPerAppLastLastWeek.call.length]
        }
      ]
    }
    this.workspaceExperienceScore = this.calculateWorkspaceExperienceScore()
    this.workspaceExperienceScoreLastWeek = this.calculateWorkspaceExperienceScoreLastWeek()
    this.workspaceExperienceScoreIncrease = this.calculateIncreaseInPercent(this.workspaceExperienceScoreLastWeek, this.workspaceExperienceScore)
    console.log("workspaceExperienceScore", this.workspaceExperienceScore)
    console.log("workspaceExperienceScoreLastWeek", this.workspaceExperienceScoreLastWeek)
    console.log("workspaceExperienceScoreIncrease", this.workspaceExperienceScoreIncrease)

    // console.log("meetingsPerAppThisWeek", meetingsPerAppThisWeek)
    // console.log("meetingsPerAppLastWeek", meetingsPerAppLastWeek)
    // console.log("meetingsPerAppLastLastWeek", meetingsPerAppLastLastWeek)


  },
  methods: {
    getEmails() {
      return this.userStore.emails;
    },
    getCalendarEntries() {
      return this.userStore.calendarEntries;
    },
    getUser() {
      return this.userStore.userData.email;
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

    calculateCollaborationScore(chatActivityData, emails, meetingsPerApp) {
      let collaborationScore = 0
      let chatCollaborationScore = this.calculateChatCollaborationScore(chatActivityData)
      let calendarCollaborationScore = this.calculateCalendarCollaborationScore(meetingsPerApp)

      return chatCollaborationScore + calendarCollaborationScore + this.meetAdoption / 3
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
      console.log("meetingsPerApp", meetingsPerApp.hangout.length)
      if (meetingsPerApp.hangout.length > 9) {
        return 10
      } else {
        return meetingsPerApp.hangout.length
      }
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
    calculateWorkspaceExperienceScore() {
      return (this.mobilityScore + this.driveAdoption + this.chatAdoption + this.gmailAdoption + this.calendarAdoption) / 5
    },
    calculateWorkspaceExperienceScoreLastWeek() {
      return (this.mobilityScoreLastWeek + this.driveAdoptionLastWeek + this.chatAdoptionLastWeek + this.gmailAdoptionLastWeek + this.calendarAdoptionLastWeek) / 5
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
                  events: chat.events
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
                  events: chat.events
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
    filterDataOlderThenEmailDateTime2(chats, date) {
      let filteredDates = []
      for (let i = 0; i < emails.length; i++) {
        if (moment(emails[i].date).isBefore(date, 'week')) {
          filteredDates.push(moment(emails[i]))
        }
      }
      return filteredDates
    },
  },


  props: {},
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
      collaborationScoreLastWeek: 0,
      collaborationScoreIncrease: 0,
      mobilityScore: 0,
      mobilityScoreLastWeek: 0,
      mobilityScoreIncrease: 0,
      workspaceExperienceScore: 0,
      workspaceExperienceScoreLastWeek: 0,
      workspaceExperienceScoreIncrease: 0,
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

