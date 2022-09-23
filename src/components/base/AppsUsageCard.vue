<template>
  <v-col cols="4">
    <v-card class="" elevation="5" max-width="400" outlined>
      <v-card-title class="grey--text">Never used</v-card-title>
      <v-card-subtitle class="grey&#45;&#45;text">Try out some Apps you never used</v-card-subtitle>
      <v-divider></v-divider>

      <row class="">
        <v-col v-for="app in apps" :key="app.name" name="asd">
          <v-btn :href="app.link" text>{{ app.name }}
            <img :src="require(`@/assets/Google-Workspace-logos/${app.name}/${app.img}`)"
                 class="animate__animated  animate__rollIn"></v-btn>
        </v-col>
      </row>
    </v-card>
  </v-col>
</template>

<script>
import {logos} from "@/assets/Google-Workspace-logos/googleLogos";

export default {
  name: "AppsUsageCard",
  props: {
    neverUsedApps: Array,
  },
  data: () => ({
    logos,
    apps: Object
  }),
  mounted() {
    this.apps = logos.filter(logo => this.neverUsedApps.includes(logo.name))
  }
}
</script>

<style scoped>

</style>
