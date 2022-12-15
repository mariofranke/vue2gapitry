<template>
  <img :src="require(`@/assets/Google-Workspace-logos/${name}/${img}`)"
       :style="{'animation-delay':id*100+2000+'ms'}"
       class="animate__animated  animate__rollIn">
</template>

<script>
export default {
  name: "Google_icon",
  props: {
    name: String,
    img: String,
    id: Number
  },
}
</script>

<style scoped>

</style>
