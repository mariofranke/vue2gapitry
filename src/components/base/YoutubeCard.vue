<template>

  <v-col v-bind:cols="reveal ? 8 : 4">
    <v-card
        class=" "
        elevation="5"
        max-height="350px"
    >
      <v-card-title class="grey--text">{{ title }}


      </v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>

      <v-card-text class="pt-0 text-right">
        <iframe :src=videoId allowfullscreen frameborder="0"
                marginheight="0"
                marginwidth="0"
                scrolling="no"
                type="text/html" v-bind:height="reveal ? '400px' : '200px'"
                width="100%"></iframe>


      </v-card-text>


      <v-card-actions>
        <v-btn
            color="blue accent-4"
            href="https://calendar.google.com/calendar/u/1/r"
            text

        >
          Open Calendar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="blue accent-4"
            icon
            @click="reveal = !reveal"
        >
          <v-icon>mdi-arrow-expand</v-icon>

        </v-btn>

      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "YoutubeCard",
  props: {
    title: {
      type: String,
      default: "Title"
    },
    subtitle: {
      type: String,
      default: "Subtitle"
    },
    videoId: {
      type: String,
      default: "videoId"
    }
  },
  data: () => ({
    reveal: false
  }),
  methods: {
    toggleReveal() {
      this.reveal = !this.reveal
    }
  }
}
</script>

<style scoped>
.button--offset {
  top: +4px;
  right: -94px;

  position: relative;
}
</style>
