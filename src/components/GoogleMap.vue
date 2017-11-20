<template>
  <div id="my-gmap">
    <gmap-map
      :center="center"
      :zoom="7"
      class="my-google-map"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBO0eTaMrFybrl6x4z7XCLbhaLRA2CsHtg'
    }
  })

  const ggmap = {
    name: 'myGoogleMap',
    data () {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    }
  }
  export default ggmap
</script>

<style>
  .my-google-map {
    width: 100%;
    height: 100%;
    min-height: 500px;
    margin-top: 20px;
  }
</style>
