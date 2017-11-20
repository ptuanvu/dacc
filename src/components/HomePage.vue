<template>
<div id="address-list" class="address-list">
  <div class="row">
    <div class="col-sm-4 col-12">
      <div class="list-group">
        <a href="#" class="list-group-item" v-for="point in points" v-on:click="addMapAddress">{{ point.place }}</a>
      </div>
    </div>
    <div class="col-sm-8 col-12">
      <div class="card">
        <h4 class="card-header">Định vị bản đồ</h4>
        <div class="card-body">
          <div class="input-group">
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button" v-on:click="resetMapAddress">Bỏ qua</button>
            </span>
            <gmap-autocomplete
              id="my-place-search-box"
              class="form-control"
              placeholder="Nhập địa chỉ vào đây"
              v-model="mapAddress"
              :selectFirstOnEnter="true"
              @place_changed="handlePlaceChanged"
            >
          </gmap-autocomplete>
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button">Tìm kiếm</button>
            </span>
          </div>
          <div id="geomap" class="geomap">
            <my-google-map></my-google-map>
          </div>
        </div>
        <div class="card-footer">
          <div class="float-right">
            <button class="btn btn-warning" v-on:click="resetMapAddress">Huỷ bỏ</button>
            <button class="btn btn-primary">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'
import { pointsRef } from '../firebase.js'

export default {
  name: 'VinhNguyen',
  firebase: {
    points: pointsRef
  },
  methods: {
    addMapAddress: function (event) {
      this.mapAddress = event.target.text
      if (!global.service) {
        global.service = new google.maps.places.PlacesService(global.map.$mapObject)
      }
      const request = { query: event.target.text }
      global.service.textSearch(
        request,
        (response) => {
          console.log('GMAP_SEARCH___', response)
          if (!response || response.length === 0) {
            console.error('Search failed')
            return
          }
          const place = response[0].geometry
          if (!place) {
            console.error('Place not found')
            return
          }
          this.$store.commit('SET_MARKER_POSITION', place.location)
        },
        (err) => console.error(err)
      )
    },
    resetMapAddress: function (event) {
      this.mapAddress = ''
    },
    handlePlaceChanged: function (place) {
      if (!place || !place.geometry) {
        console.log('Place was not found')
        return
      }

      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.$store.commit('SET_MARKER_POSITION', position)
    }
  },
  modules: { GoogleMap },
  data () {
    return {
      mapAddress: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address-list {
  height: 85vh;
  width: 100%;
}
.address-list .list-group {
  height: 85vh;
  overflow-y: scroll;
}
.address-list .card {
  height: 85vh;
  overflow-y: scroll;
}
</style>
