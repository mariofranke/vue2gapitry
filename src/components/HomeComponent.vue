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
              All Data is stored and processed locally on your device.
            </p>


            <row v-for="logo in this.logos" :key="logo.name" class="col" name="asd">
              <img :src="require(`@/assets/Google-Workspace-logos/${logo.name}/${logo.img}`)"
                   :style="{'animation-delay':logo.id*100+2000+'ms'}"
                   class="animate__animated  animate__rollIn">

            </row>


          </div>
        </div>

      </v-col>

    </v-row>
  </v-container>
</template>
<script>
import {logos} from "@/assets/Google-Workspace-logos/googleLogos";

import 'animate.css';


export default {
  name: "HomeComponent",
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
