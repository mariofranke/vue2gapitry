<template>
  <BarChart
      :data="meetingData"
      :options="messagesChartOptions"
      title="Communication Efficiency">
  </BarChart>
</template>

<script>
import BarChart from "@/components/base/BarChart";
import Moment from "moment/moment";
import {useLoggedInUserStore} from "@/store/user";

//const MeetingApps = ['zoom', 'teams',]

function dateCheck(from, to, check) {

  let fDate, lDate, cDate;
  fDate = from
  lDate = to
  cDate = check;
  return (cDate <= lDate && cDate >= fDate);
}

function getCalendarEntriesData() {
  let calendarEntriesData = {
    twoWeeksAgo: 0,
    lastWeek: 0,
    today: 0,
  }
  try {
    for (const entry of this.getCalendarEntries()) {

      if (entry.start.dateTime) {
        let start = Moment(entry.start.dateTime).format("DD-MM")
        let today = Moment().format("DD-MM")
        let lastWeek = Moment().subtract(7, 'days').format("DD-MM")
        let twoWeeksAgo = Moment().subtract(14, 'days').format("DD-MM")
        let threeWeeksAgo = Moment().subtract(21, 'days').format("DD-MM")
        if (dateCheck(lastWeek, today, start)) {
          calendarEntriesData.today += 1
          this.calendarEntriesData.today.push(entry)
        } else if (dateCheck(twoWeeksAgo, lastWeek, start)) {
          calendarEntriesData.lastWeek += 1
          this.calendarEntriesData.lastWeek.push(entry)
          if (dateCheck(threeWeeksAgo, twoWeeksAgo, start)) {
            calendarEntriesData.twoWeeksAgo += 1
            this.calendarEntriesData.twoWeeksAgo.push(entry)
          }
        }
      }
      console.log("calendarEntriesData", this.calendarEntriesData)
    }
  } catch (e) {
    console.log(e)
  }
}

/*function getCalendarEntriesData() {
  try {
    let entries = this.getCalendarEntries()
    // for (const entry of entries) {
    //   if (entry.start) {
    //     console.log(entry.start.dateTime)
    //     console.log(Moment(entry.start.dateTime).format("DD-MM"))
    //     let today1 = Moment().format("DD-MM")
    //     let lastWeek1 = Moment().subtract(7, 'days').format("DD-MM")
    //     console.log(dateCheck(lastWeek1, today1, Moment(entry.start.dateTime).format("DD-MM")))
    //   }
    // }
    let endOfThisWeek = Moment().endOf('week').format("DD-MM")
    let startOfThisWeek = Moment().startOf('week').format("DD-MM")
    let startOfLastWeek = Moment().subtract(7, 'days').startOf('week').format("DD-MM")
    let endOfLastWeek = Moment().subtract(7, 'days').endOf('week').format("DD-MM")
    let startOfTwoWeeksAgo = Moment().subtract(14, 'days').startOf('week').format("DD-MM")
    let endOfTwoWeeksAgo = Moment().subtract(14, 'days').endOf('week').format("DD-MM")
    console.log(startOfThisWeek, endOfThisWeek)
    /!*let zoom = {
      twoWeeksAgo: 0,
      lastWeek: 0,
      thisWeek: 0,
    }
    let meet = {
      twoWeeksAgo: 0,
      lastWeek: 0,
      thisWeek: 0,
    }
    let teams = {
      twoWeeksAgo: 0,
      lastWeek: 0,
      thisWeek: 0,
    }
    let other = {
      twoWeeksAgo: 0,
      lastWeek: 0,
      thisWeek: 0,
    }*!/
    let entriesThisWeek = entries.filter(entry => {
      isThisWeek(entry.start.dateTime)
      if (entry.start.dateTime) {
        return dateCheck(startOfThisWeek, endOfThisWeek, Moment(entry.start.dateTime).format("DD-MM"))
      }
    })
    entriesThisWeek.forEach(entry => {
      if (entry.start.dateTime) {
        console.log("entriesThisWeek", Moment(entry.start.dateTime).format("YYYY-DD-MM"))
      }
    })
    let entriesLastWeek = entries.filter(entry => {
      if (entry.start.dateTime) {
        return dateCheck(startOfLastWeek, endOfLastWeek, Moment(entry.start.dateTime).format("DD-MM"))
      }
    })
    entriesLastWeek.forEach(entry => {
      if (entry.start.dateTime) {
        console.log("entriesLastWeek", Moment(entry.start.dateTime).format("YYYY-DD-MM"))
      }
    })
    let entriesTwoWeeksAgo = entries.filter(entry => {
      if (entry.start) {
        return dateCheck(startOfTwoWeeksAgo, endOfTwoWeeksAgo, Moment(entry.start.dateTime).format("DD-MM"))
      }
    })
    entriesTwoWeeksAgo.forEach(entry => {
      if (entry.start) {
        console.log("entriesTwoWeeksAgo", Moment(entry.start.dateTime).format("YYYY-DD-MM"))
      }
    })
  } catch (e) {
    console.log(e)
  }
}*/


export default {
  name: "MeetingsChart",
  components: {BarChart},
  setup() {
    const userStore = useLoggedInUserStore();
    return {
      userStore,
    };
  },
  methods: {
    dateCheck,
    getCalendarEntries() {
      console.log("calender", this.userStore.calendarEntries)
      return this.userStore.calendarEntries;
    },
    getCalendarEntriesData,
  },
  mounted() {
    this.getCalendarEntriesData()

  },
  data: () => ({
    calenderEntries: [],
    calendarEntriesData: {
      twoWeeksAgo: [],
      lastWeek: [],
      today: [],
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
