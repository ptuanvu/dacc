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
            <input type="text" class="form-control" placeholder="Nhập địa chỉ vào đây" v-model="mapAddress">
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
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyBDOa513-q8BmPHmm1zlurdkkot3Z3bX-w',
  authDomain: 'grab-midterm.firebaseapp.com',
  databaseURL: 'https://grab-midterm.firebaseio.com',
  projectId: 'grab-midterm',
  storageBucket: 'grab-midterm.appspot.com',
  messagingSenderId: '495408687232'
}

let app = Firebase.initializeApp(config)
let db = app.database()

let pointsRef = db.ref('points')

export default {
  name: 'VinhNguyen',
  firebase: {
    points: pointsRef
  },
  methods: {
    addMapAddress: function (event) {
      this.mapAddress = event.target.text
    },
    resetMapAddress: function (event) {
      this.mapAddress = ''
    }
  },
  modules: { GoogleMap },
  data () {
    return {
      mapAddress: '',
      addresses: [
        { id: '0McLBjWp45', address: '9-19 Hồ Tùng Mậu, Phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh' },
        { id: 'SeZysPBqhP', address: '125/24 đường D1, Phường 25, Quận Bình Thạnh, TP Hồ Chí Minh' },
        { id: 'mUwFUrUsU0', address: '409/23 Nguyễn Trọng Tuyển, Phường 2, Quận Tân Bình, TP Hồ Chí Minh' },
        { id: 'a2qp1D0sFU', address: '276 Pasteur, Phường 08, Quận 3, TP Hồ Chí Minh' },
        { id: 'ovIVSNnbye', address: 'A2/17Z5 ấp 1, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'koKRujkAyF', address: '541/19/4 Tỉnh Lộ 10, Phường Bình Trị Đông B, Quận Bình Tân, TP Hồ Chí Minh' },
        { id: 'WH4ogt3NeQ', address: 'C12/31/8 Tổ 12, ấp 3, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'KpgUH2lqxH', address: '05 Đường 671, Khu Phố 6, Phường Tân Phú, Quận 9, TP Hồ Chí Minh' },
        { id: 'aS6LjPjkEK', address: 'Số 189/7 đường Dương Đình Hội, Phường Phước Long B, Quận 9, TP Hồ Chí Minh' },
        { id: 'T7dnkkVEJn', address: '184/30/19 Đường Bùi Văn Ngữ, Khu Phố 7, phường Hiệp Thành, Quận 12, TP Hồ Chí Minh' },
        { id: '0McLBjWp45', address: '9-19 Hồ Tùng Mậu, Phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh' },
        { id: 'SeZysPBqhP', address: '125/24 đường D1, Phường 25, Quận Bình Thạnh, TP Hồ Chí Minh' },
        { id: 'mUwFUrUsU0', address: '409/23 Nguyễn Trọng Tuyển, Phường 2, Quận Tân Bình, TP Hồ Chí Minh' },
        { id: 'a2qp1D0sFU', address: '276 Pasteur, Phường 08, Quận 3, TP Hồ Chí Minh' },
        { id: 'ovIVSNnbye', address: 'A2/17Z5 ấp 1, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'koKRujkAyF', address: '541/19/4 Tỉnh Lộ 10, Phường Bình Trị Đông B, Quận Bình Tân, TP Hồ Chí Minh' },
        { id: 'WH4ogt3NeQ', address: 'C12/31/8 Tổ 12, ấp 3, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'KpgUH2lqxH', address: '05 Đường 671, Khu Phố 6, Phường Tân Phú, Quận 9, TP Hồ Chí Minh' },
        { id: 'aS6LjPjkEK', address: 'Số 189/7 đường Dương Đình Hội, Phường Phước Long B, Quận 9, TP Hồ Chí Minh' },
        { id: 'T7dnkkVEJn', address: '184/30/19 Đường Bùi Văn Ngữ, Khu Phố 7, phường Hiệp Thành, Quận 12, TP Hồ Chí Minh' },
        { id: '0McLBjWp45', address: '9-19 Hồ Tùng Mậu, Phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh' },
        { id: 'SeZysPBqhP', address: '125/24 đường D1, Phường 25, Quận Bình Thạnh, TP Hồ Chí Minh' },
        { id: 'mUwFUrUsU0', address: '409/23 Nguyễn Trọng Tuyển, Phường 2, Quận Tân Bình, TP Hồ Chí Minh' },
        { id: 'a2qp1D0sFU', address: '276 Pasteur, Phường 08, Quận 3, TP Hồ Chí Minh' },
        { id: 'ovIVSNnbye', address: 'A2/17Z5 ấp 1, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'koKRujkAyF', address: '541/19/4 Tỉnh Lộ 10, Phường Bình Trị Đông B, Quận Bình Tân, TP Hồ Chí Minh' },
        { id: 'WH4ogt3NeQ', address: 'C12/31/8 Tổ 12, ấp 3, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'KpgUH2lqxH', address: '05 Đường 671, Khu Phố 6, Phường Tân Phú, Quận 9, TP Hồ Chí Minh' },
        { id: 'aS6LjPjkEK', address: 'Số 189/7 đường Dương Đình Hội, Phường Phước Long B, Quận 9, TP Hồ Chí Minh' },
        { id: 'T7dnkkVEJn', address: '184/30/19 Đường Bùi Văn Ngữ, Khu Phố 7, phường Hiệp Thành, Quận 12, TP Hồ Chí Minh' },
        { id: '0McLBjWp45', address: '9-19 Hồ Tùng Mậu, Phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh' },
        { id: 'SeZysPBqhP', address: '125/24 đường D1, Phường 25, Quận Bình Thạnh, TP Hồ Chí Minh' },
        { id: 'mUwFUrUsU0', address: '409/23 Nguyễn Trọng Tuyển, Phường 2, Quận Tân Bình, TP Hồ Chí Minh' },
        { id: 'a2qp1D0sFU', address: '276 Pasteur, Phường 08, Quận 3, TP Hồ Chí Minh' },
        { id: 'ovIVSNnbye', address: 'A2/17Z5 ấp 1, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'koKRujkAyF', address: '541/19/4 Tỉnh Lộ 10, Phường Bình Trị Đông B, Quận Bình Tân, TP Hồ Chí Minh' },
        { id: 'WH4ogt3NeQ', address: 'C12/31/8 Tổ 12, ấp 3, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP Hồ Chí Minh' },
        { id: 'KpgUH2lqxH', address: '05 Đường 671, Khu Phố 6, Phường Tân Phú, Quận 9, TP Hồ Chí Minh' },
        { id: 'aS6LjPjkEK', address: 'Số 189/7 đường Dương Đình Hội, Phường Phước Long B, Quận 9, TP Hồ Chí Minh' },
        { id: 'T7dnkkVEJn', address: '184/30/19 Đường Bùi Văn Ngữ, Khu Phố 7, phường Hiệp Thành, Quận 12, TP Hồ Chí Minh' }
      ]
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
