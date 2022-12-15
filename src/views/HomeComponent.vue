<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <div class="text-center">


          <div class="logo">
            <h1 class="animate__animated animate__backInUp grey--text lighten-2"><b>Google</b> Workspace Dashboard</h1>
            <p class="grey--text animate__animated animate__backInUp">
              A dashboard for Google Workspace users.<br>
              Login to use all the features.<br>
            </p>


            <row v-for="logo in this.logos" :key="logo.name" :name=logo.name class="col">
              <Google_icon :id="logo.id" :img="logo.img" :name="logo.name"></Google_icon>
            </row>


          </div>
        </div>

      </v-col>

    </v-row>
  </v-container>
</template>
<script>
import {logos} from "@/assets/Google-Workspace-logos/googleLogos";
import Google_icon from "@/components/base/Google_icon";
import '../../node_modules/animate.css/animate.css';

export default {
  name: "HomeComponent",
  components: {Google_icon},
  methods: {},
  data: () => ({
    logos
  }),
}
</script>

<style scoped>
.animate__animated {
  animation-duration: 2s;
}

.logo {
  font-size: 2vw;
}

</style>
