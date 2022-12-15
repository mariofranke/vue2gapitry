<template>
  <BarChart
      :data="messagesData"
      :options="messagesChartOptions"
      title="Communication Efficiency">
  </BarChart>
</template>

<script>
import BarChart from "@/components/base/BarChart";
import Moment from "moment/moment";
import {useLoggedInUserStore} from "@/store/user";

function getEmailsInDateRange() {
  let today1 = Moment().format("DD-MM")
  let lastWeek1 = Moment().subtract(7, 'days').format("DD-MM")
  let twoWeeksAgo1 = Moment().subtract(14, 'days').format("DD-MM")
  let threeWeeksAgo = Moment().subtract(21, 'days').format("DD-MM")
  let emailsInRange = {
    twoWeeksAgo: 0,
    lastWeek: 0,
    today: 0,
  }
  emailsInRange.today = this.emails.reduce((acc, email) => {
    if (dateCheck(lastWeek1, today1, Moment(email.date).format("DD-MM"))) {
      return acc + 1
    }
    return acc
  }, 0)
  emailsInRange.lastWeek = this.emails.reduce((acc, email) => {
    if (dateCheck(twoWeeksAgo1, lastWeek1, Moment(email.date).format("DD-MM"))) {
      return acc + 1
    }
    return acc
  }, 0)
  emailsInRange.twoWeeksAgo = this.emails.reduce((acc, email) => {
    if (dateCheck(threeWeeksAgo, twoWeeksAgo1, Moment(email.date).format("DD-MM"))) {
      return acc + 1
    }
    return acc
  }, 0)
  return Object.values(emailsInRange);

}

function getChatsInDateRange() {
  let today1 = Moment().format("DD-MM")
  let lastWeek1 = Moment().subtract(7, 'days').format("DD-MM")
  let twoWeeksAgo1 = Moment().subtract(14, 'days').format("DD-MM")
  let threeWeeksAgo = Moment().subtract(21, 'days').format("DD-MM")
  let chatsInRange = {
    twoWeeksAgo: 0,
    lastWeek: 0,
    today: 0,
  }
  chatsInRange.today = this.chats.reduce((acc, chat) => {
    if (dateCheck(lastWeek1, today1, Moment(chat.date).format("DD-MM"))) {
      return acc + 1
    }
    return acc
  }, 0)
  chatsInRange.lastWeek = this.chats.reduce((acc, chat) => {
    if (dateCheck(twoWeeksAgo1, lastWeek1, Moment(chat.date).format("DD-MM"))) {
      return acc + 1
    }
    return acc
  }, 0)
  chatsInRange.twoWeeksAgo = this.chats.reduce((acc, chat) => {
    if (dateCheck(threeWeeksAgo, twoWeeksAgo1, Moment(chat.date).format("DD-MM"))) {
      return acc + 1
    }
    return acc
  }, 0)
  console.log(chatsInRange)
  return Object.values(chatsInRange);

}

function dateCheck(from, to, check) {

  let fDate, lDate, cDate;
  fDate = from
  lDate = to
  cDate = check;
  return (cDate <= lDate && cDate >= fDate);
}

function getEmailsData() {
  try {
    for (const email of this.getEmails()) {
      if (email.body !== null) {
        console.log("email", email)
        let body = JSON.parse(email.body)
        let chat = body.labelIds[0] === "CHAT"
        if (!chat) {
          let date = body.payload.headers.find(header => header.name === "Date").value
          date = new Date(date)
          console.log(date)
          this.emails.push(
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
    console.log(this.emails)
  } catch (e) {
    console.log(e)
  }


}

function getChatsData() {
  console.log("chats", this.getChats())
  for (const chat of this.getChats()) {
    if (chat.events[0].name !== "direct_message_started") {
      this.chats.push(
          {
            date: chat.id.time,
          }
      )
    }
  }
  console.log(this.chats)
  /*try {
    for (const chat of this.getChats()) {
      console.log("chat", chat)
    }
  } catch (e) {
    console.log(e)
  }*/

}

export default {
  name: "MessagesChart",
  components: {BarChart},
  setup() {
    const userStore = useLoggedInUserStore();
    return {
      userStore,
    };
  },
  methods: {
    getEmailsInDateRange,
    getEmailsData,
    dateCheck,
    getChatsData,
    getChatsInDateRange,
    getEmails() {
      return this.userStore.emails;
    },
    getChats() {
      return this.userStore.chatActivityData.data;
    },
    getUser() {
      return this.userStore.userData.email;
    },
  },
  mounted() {
    /*this.getEmailsData()
    this.getChatsData()
    let today = Moment().format("DD-MM")
    let lastWeek = Moment().subtract(7, 'days').format("DD-MM")
    let twoWeeksAgo = Moment().subtract(14, 'days').format("DD-MM")
    this.messagesData = {
      labels: [twoWeeksAgo, lastWeek, today],
      datasets: [
        {
          label: 'Emails',
          data: this.getEmailsInDateRange(),
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Chats',
          data: this.getChatsInDateRange(),
          backgroundColor: '#8e5ea2',
          borderColor: '#8e5ea2',
          borderWidth: 1,
          fill: false,
        }
      ]
    }*/
  },
  props: {
    messagesData: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    emails: [],
    chats: [],
    messagesData: {},
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
