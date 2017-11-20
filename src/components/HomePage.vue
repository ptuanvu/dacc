<template>
<div id="address-list" class="address-list">
  {{ mapAddress }}
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
              :selectFirstOnEnter="false"
              @place_changed="handlePlaceChanged"
            >
          </gmap-autocomplete>
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button" v-on:click="handleSearchPlace">Tìm kiếm</button>
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
import { searchPlace } from '../map-utils'

export default {
  name: 'VinhNguyen',
  firebase: {
    points: pointsRef
  },
  methods: {
    addMapAddress: function (event) {
      this.mapAddress = event.target.text
      searchPlace(this, event.target.text)
    },
    handleSearchPlace: function () {
      const element = $('#my-place-search-box')
      if (!element || element.length === 0) {
        console.error('Search box not found')
        return
      }
      const query = element[0].value
      console.log('query__', query)
      if (!query || query === '') {
        console.error('Query null')
        return
      }
      searchPlace(this, query)
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
