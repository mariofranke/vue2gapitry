<template>
  <v-app>
    <v-container>
      <!--      <v-row>
              <p> {{ userStore.emails.length }}</p>
            </v-row>
            <v-row>

              <v-col>
                <h1 class="text-center grey&#45;&#45;text">Global Indicators</h1>
              </v-col>
            </v-row>
            <v-row>

              <ScoreCard
                  :percent="37"
                  help_text='The Score shows your usage of Google Workspace. The higher the score, the more you use Google
                              Workspace and its tools.
                              Your usage data of Google-Workspace is used to determine your score.
                              The kind and amount of Interaction are added up.'
                  help_title="Scoring"
                  icon="mdi-star-circle"
                  icon_color="yellow darken-2"
                  metric="+5%"
                  metric_text="since last week"
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
                  :percent="20"
                  help_text='The Score shows your usage of Google Workspace. The higher the score, the more you use Google
                              Workspace and its tools.
                              Your usage data of Google-Workspace is used to determine your score.
                              The kind and amount of Interaction are added up.'
                  help_title="Scoring"
                  icon="mdi-cellphone-link"
                  icon_color="yellow darken-2"
                  metric="+2%"
                  metric_text="since last week"
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
                  googlelogo="Gmail"
                  help_btn
                  help_btn_scr="https://support.google.com/calendar/answer/11190973?hl=en&co=GENIE.Platform%3DDesktop"
                  help_btn_text="Learn how to use Focus Time"
                  help_text='To reduce distractions while you work, you can schedule a focus time event in Google Calendar.'
                  help_title="Scoring"
                  icon="mdi-stove"
                  icon_color="blue darken-2"
                  metric="+5%"
                  metric_text="since last week"
                  title="Gmail Adoption"/>


              <ScoreCard
                  googlelogo="Drive"
                  help_btn
                  help_btn_scr="https://support.google.com/calendar/answer/11190973?hl=en&co=GENIE.Platform%3DDesktop"
                  help_btn_text="Learn how to use Focus Time"
                  help_text='To reduce distractions while you work, you can schedule a focus time event in Google Calendar.'
                  help_title="Focus Time"
                  icon="mdi-stove"
                  icon_color="blue darken-2"
                  metric="+5%"
                  metric_text="since last week"
                  title="Drive Adoption"/>

              <ScoreCard
                  googlelogo="Meet"
                  help_btn
                  help_btn_scr="https://www.calendar.com/blog/perfect-amount-of-meetings-per-day-backed-by-science"
                  help_btn_text="Read More"
                  help_text=''
                  help_title=""
                  icon="mdi-account-group"
                  icon_color="blue darken-2"
                  metric="+4%"
                  metric_text="since last week"
                  title="Meet Adoption"/>

              <ScoreCard
                  :percent="3"
                  googlelogo="Calendar"
                  help_btn
                  help_btn_scr="https://support.google.com/calendar/answer/11190973?hl=en&co=GENIE.Platform%3DDesktop"
                  help_btn_text="Learn how to use Focus Time"
                  help_text='To reduce distractions while you work, you can schedule a focus time event in Google Calendar.'
                  help_title="Focus Time"
                  icon="mdi-stove"
                  icon_color="blue darken-2"
                  metric="+5%"
                  metric_text="since last week"
                  title="Calendar Adoption"/>
              <ScoreCard
                  :percent="17"
                  googlelogo="Docs"
                  help_text=''
                  help_title="Scoring"
                  icon="mdi-chat"
                  icon_color="blue darken-2"
                  metric="+5%"
                  metric_text="since last week"
                  title="Docs Adoption"
              />
              <ScoreCard
                  :percent="57"
                  googlelogo="Sheets"
                  help_text=''
                  help_title="Scoring"
                  icon="mdi-chat"
                  icon_color="blue darken-2"
                  metric="+5%"
                  metric_text="since last week"
                  title="Sheets Adoption"
              />
              <ScoreCard
                  :percent="37"
                  googlelogo="Chat"
                  help_text=''
                  help_title="Scoring"
                  icon="mdi-chat"
                  icon_color="blue darken-2"
                  metric="+5%"
                  metric_text="since last week"
                  title="Chat Adoption"
              />
            </v-row>

            <v-row>

              <v-col>
                <h1 class="text-center grey&#45;&#45;text">Time spend</h1>
              </v-col>
            </v-row>



      -->
      <v-row>
        <ScoreCard
            :percent="0"
            help_btn
            help_btn_scr="https://support.google.com/calendar/answer/11190973?hl=en&co=GENIE.Platform%3DDesktop"
            help_btn_text="Learn how to use Focus Time"
            help_text='To reduce distractions while you work, you can schedule a focus time event in Google Calendar.'
            help_title="Focus Time"
            icon="mdi-headphones"
            icon_color="blue darken-2"
            metric="Hours: 0"
            metric_text="this Week"
            title="Focus time"/>

        <ScoreCard
            :percent="0"
            help_btn
            help_btn_scr="https://www.calendar.com/blog/perfect-amount-of-meetings-per-day-backed-by-science"
            help_btn_text="Read More"
            help_text='Excessive meetings can also result in information overload and a sense of failure.
                    As if that weren???t enough, they???re distracting and force you to multitask.
                    All of these aren???t good for your cognitive health.'
            help_title="Meetings"
            icon="mdi-account-group"
            icon_color="blue darken-2"
            metric="Hours: 0"
            metric_text="this Week"
            title="Time in meetings"/>

      </v-row>
      <!--      <v-row>
              <v-col cols="3">
                <WorkingHoursBarChart :data="workingHoursData"/>
              </v-col>
            </v-row>-->
      <v-row>
        <v-col>
          <h1 class="text-center">Communication Indicator</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <MessagesChart/>
        </v-col>


        <v-col cols="3">
          <v-card class="" elevation="5" outlined>
            <v-card-title class="grey&#45;&#45;text">Meeting Efficiency</v-card-title>
            <v-card-subtitle class="grey&#45;&#45;text">Title</v-card-subtitle>
            <v-divider></v-divider>
            <Bar :chart-data="meetingData" class="px-4 mt-3"/>
          </v-card>
        </v-col>
        <v-col cols="3">
          <MeetingsChart></MeetingsChart>
        </v-col>

      </v-row>
      <v-row>
        <v-col>
          <h1 class="text-center text--secondary text--lighten-3">Your recommendated Material</h1>
        </v-col>
      </v-row>
      <v-row>
        <YoutubeCard
            videoId="https://www.youtube.com/embed/UlS9Ll1UNmY?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
        <YoutubeCard
            title="How to Schedule a Focus Time Event in Google Calendar"
            videoId="https://www.youtube.com/emb  ed/CKIajJmgcFk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
        <YoutubeCard
            title="How to: Share multiple files in Google Drive - YouTube"
            videoId="https://www.youtube.com/embed/Nul6ZNHjeiM?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
        <YoutubeCard
            title="How to: Open Google Calendar in Gmail"
            videoId="https://www.youtube.com/embed/qZzE84Gn3Yk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"/>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {useLoggedInUserStore} from "@/store/user";
import {Bar} from 'vue-chartjs/legacy'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import ScoreCard from "@/components/base/ScoreCard";
import YoutubeCard from "@/components/base/YoutubeCard";
import WorkingHoursBarChart from "@/components/WorkingHoursBarChart";
import MessagesChart from "@/components/MessagesChart";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import MeetingsChart from "@/components/MeetingsChart";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: "DashboardComponent",
  components: {MeetingsChart, WorkingHoursBarChart, YoutubeCard, ScoreCard, Bar, MessagesChart},
  setup() {
    const userStore = useLoggedInUserStore();
    return {
      userStore,
    };

  },
  mounted() {

  },
  methods: {
    getEmails() {
      return this.userStore.emails;
    },
    getUser() {
      return this.userStore.userData.email;
    },

  },
  props: {},
  data() {
    return {
      emails: [],

      adminActivityData: [],
      calendarActivityData: [],
      chatActivityData: [],
      driveActivityData: [],
      loginActivityData: [],
      mobileActivityData: [],
      meetActivityData: [],
      gmailActivityData: [],

      emailData: [],
      messagesData: {
        labels: [Date.new, '10.9', '17.9'],
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
      workingHoursData: {
        labels: [
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ],
        datasets: [
          {
            label: 'Hours',
            backgroundColor: "#0D47A1",
            data: [[0, 15], [7, 13], [3, 17], [3, 18], [0, 0], [3, 15], [13, 18]]
          },
        ]
      },


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
