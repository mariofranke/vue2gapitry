<template>
  <v-col class="" cols="4">
    <v-card
        elevation="5"
        height="350px"

        mr="0"
    >
      <v-card-title class="grey--text">
        <img v-if="googlelogo" :src="appIcon.icon"
             alt="app.name " class="mr-2" height="30px" width="30px">

        <v-icon v-if="!googlelogo"
                class="mr-2"
                size="32"
                v-bind:color="icon_color"
        >
          {{ icon }}
        </v-icon>
        {{ title }}
      </v-card-title>
      <div class="v-sheet--offset ">


        <percircle v-if="!reveal" :displayTextAtZero="true" :progressBarColor=getProgressBarColor()
                   size="big" v-bind:percent="percent"/>


      </div>

      <v-card-text class="pt-0 text-right">

        <div class="text-h6 font-weight-bold mb-2">
          {{ metric + "%" }}
        </div>
        <div class="subheading font-weight-light grey--text">
          {{ metric_text }}
        </div>

      </v-card-text>
      <v-card-actions>
        <v-btn
            color="blue accent-4"
            text
            @click="reveal = true"
        >
          <v-icon>mdi-chevron-up</v-icon>

          Learn More
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
            v-if="reveal"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%;"
        >
          <v-card-title class="grey--text">


            {{ help_title }}
          </v-card-title>
          <v-card-text>

            <v-card-text> {{
                help_text
              }}

            </v-card-text>

            <v-btn v-if='!!help_btn' color="primary"
                   v-bind:href="help_btn_scr"
                   x-small>
              {{ help_btn_text }}
            </v-btn>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn
                color="blue accent-4"
                text
                @click="reveal = false"
            >
              <v-icon>mdi-chevron-down</v-icon>
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>

    </v-card>
  </v-col>
</template>

<script>
import Percircle from "@/components/base/PercircleChart";
import {logos} from "@/assets/Google-Workspace-logos/googleLogos";

export default {
  name: "ScoreCard",
  components: {

    Percircle
  },
  data: () => ({
    reveal: false,
    app: Object
  }),
  mounted() {
  },
  computed: {
    appIcon() {
      let tmp;
      tmp = logos.filter(logo => logo.name === this.googlelogo)[0]
      return {
        icon: require(`@/assets/Google-Workspace-logos/${tmp.name}/${tmp.img}`)
      }
    }
  },
  //:src="require(`@/assets/Google-Workspace-logos/${app.name}/${app.img}`
  methods: {
    getProgressBarColor() {
      if (this.percent < 25) {
        return "red";
      } else if (this.percent < 50) {
        return "orange";
      } else {
        return "green";
      }
    }
  },
  props: {
    icon: {
      type: String,
      default: "mdi-chart-line"
    },
    metric: {
      type: String,
      default: "Score"
    },
    metric_text: {
      type: String,
      default: "This is a Score"
    },
    title: {
      type: String,
      default: "Title"
    },
    help_title: {
      type: String,
      default: "Help"
    },
    help_text: {
      type: String,
      default: "This is a help text"
    },
    help_btn_text: {
      type: String,
      default: "Learn More"
    },
    help_btn: {
      type: Boolean,
      default: false
    },
    help_btn_scr: {
      type: String,
      default: "https://www.google.com"
    },
    icon_color: {
      type: String,
      default: "yellow darken-2"
    },
    percent: {
      type: Number,
      default: 50
    },
    progressBarColor: {
      type: String,
      default: "#0c52bd"
    },
    googlelogo: {
      type: String,
      default: ""
    }
  },
}
</script>

<style scoped>
.v-sheet--offset {
  top: +0px;
  left: 0px;

  position: relative;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
