<template>

  <v-col v-if="reveal">
    <v-card
        class=" "
        elevation="5"
    >
      <v-layout></v-layout>

      <v-card-title class="grey--text">

        {{ title }}


      </v-card-title>

      <v-card-text class="pt-0 text-right">
        <iframe :src=videoId allowfullscreen frameborder="0"
                marginheight="0"
                marginwidth="0"
                scrolling="no"
                type="text/html"
                width="100%"></iframe>


      </v-card-text>


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
    },
    revealBreakpoint: {
      type: Number,
      default: 0
    },
    revealData: {
      type: Number,
      default: 30
    }
  },
  data: () => ({}),
  computed: {
    reveal() {
      return this.revealData > this.revealBreakpoint;
    }
  },
  methods: {}
}
</script>

<style scoped>
.button--offset {
  top: +4px;
  right: -94px;

  position: relative;
}
</style>
