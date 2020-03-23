<template>
  <div>
      <p>Saagar</p>
      <div id="vueapp" class="vue-app">
        <kendo-mediaplayer v-on:kendoready="kendoready" v-on:timechange="timechange"
          style="width: 400px; height: 300px;"
          :media-title="'Saagars Radar'"
          :media-source="'https://www.youtube.com/watch?v=qFf3HTo8Kzw&t=437s'">
        </kendo-mediaplayer>
      </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
</style>