<template>
  <div>
    <baidu-map class="map" :center="center" :zoom="12" :scroll-wheel-zoom="true">
      <!-- <bm-navigation anchor="BMap_ANCHOR_TOP_RIGHT" /> -->
      <bm-geolocation anchor="BMap_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
      <bm-city-list anchor="BMap_ANCHOR_TOP_LEFT" :offset="cityListOffset" />
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
      <bm-local-search :keyword="keyword" :auto-viewport="false" :location="location" :force-local="true" :select-first-result="true" />
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT" />
      <bm-control :offset="controlOffset">
        <!-- <el-button :type="type1" size="small" round @click="changeAllBtnType">全部设备</el-button> -->
        <el-input
          v-model="keyword"
          placeholder="请输入关键字搜索"
          clearable
          size="medium"
          maxlength="10"
          show-word-limit
          class="search"
        />
        <el-button :type="type2" size="small" round @click="changeOnBtnType">在线</el-button>
        <el-button :type="type3" size="small" round @click="changeOffBtnType">离线</el-button>
      </bm-control>
      <bm-marker v-for="(maker,index) in points" :key="index" :position="{lng: maker.lon,lat: maker.lat}" :icon="{url:'http://www.zjzctc.com/images/logo.png',size:{width:40,height:42}}" @mouseover="infoWindowOpen(maker,maker.ge_id)" @mouseout="infoWindowClose(maker)" @click="clickHandler(maker.ge_id,maker.status_)">
        <bm-info-window class="infoService" :show="maker.show" :position="{lng: detail.lon,lat: detail.lat}">
          <span>{{ '宁波'+serviceBasis.ge_id+'号设备' }}</span>
          <div class="basis">
            <div>
              <span>使用单位</span>
              <span>{{ serviceBasis.ge_site }}</span>
            </div>
            <div>
              <span>生产日期</span>
              <span>{{ serviceBasis.manufacture }}</span>
            </div>
            <div>
              <span>设备型号</span>
              <span>{{ serviceBasis.ge_version }}</span>
            </div>
            <div>
              <span>设备编号</span>
              <span>{{ serviceBasis.ge_id }}</span>
            </div>
            <div>
              <span>设备序列号</span>
              <span>{{ serviceBasis.ge_serial }}</span>
            </div>
            <div>
              <span>设备总质量</span>
              <span>{{ serviceBasis.ge_weight+'kg' }}</span>
            </div>
            <div>
              <span>垃圾吞吐量</span>
              <span>{{ serviceBasis.handling_capacity+'kg' }}</span>
            </div>
            <div>
              <span>{{ serviceBasis.remark }}</span>
            </div>
          </div>
        </bm-info-window>
      </bm-marker>
      <!-- <bm-info-window :show="show" :position="position" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window> -->
    </baidu-map>
  </div>
</template>
<script>
import { serviceBasis } from '@/api/service'

export default {
  name: 'TestBaiDu',
  data() {
    return {
      location: '',
      keyword: '',
      center: '宁波',
      // input: '',
      cityListOffset: { width: 10, height: 25 },
      controlOffset: { width: 85, height: 20 },
      // show: false,
      detail: {},
      points: [],
      // type1: 'primary',
      type2: 'primary',
      type3: 'primary',
      // flag1: true,
      flag2: true,
      flag3: true,
      onService: [],
      offService: [],
      serviceBasis: {}
    }
  },
  computed: {

  },
  mounted() {
    this.addShow()
  },
  methods: {
    infoWindowClose(maker) {
      maker.show = false
      this.detail = {}
      this.serviceBasis = {}
    },
    async infoWindowOpen(maker, id) {
      maker.show = true
      this.detail = maker
      var query = { ge_id: id }
      const { data: res } = await serviceBasis(query)
      res.data.manufacture = res.data.manufacture.slice(0, 9)
      this.serviceBasis = res.data
    },
    clickHandler(id, status) {
      this.$router.push('/detail')
      window.sessionStorage.setItem('onServiceId', id)
      window.sessionStorage.setItem('onServiceStatus', status)
    },
    addShow() {
      this.points = this.$store.getters.userService
      this.points.forEach(item => {
        item.show = false
      })
      console.log(this.points)
    },
    // changeAllBtnType() {
    //   if (this.flag1) {
    //     this.type1 = ''
    //     this.points = []
    //     this.flag1 = false
    //   } else {
    //     this.type1 = 'primary'
    //     this.points = this.$store.getters.userService
    //     this.flag1 = true
    //   }
    // },
    changeOnBtnType() {
      if (this.flag2) {
        this.type2 = ''
        this.offBtnSearch()
        this.points = this.offService
        this.flag2 = false
      } else {
        this.points = this.$store.getters.userService
        this.type2 = 'primary'
        this.onBtnSearch()
        this.points = [...this.offService, ...this.onService]
        this.onService = []
        this.offService = []
        this.flag2 = true
      }
    },
    onBtnSearch() {
      var on = []
      this.points.forEach(item => {
        if (item.status_ === '1') {
          on.push(item)
          this.onService = on
        }
      })
      console.log(on)
    },
    offBtnSearch() {
      var off = []
      this.points.forEach(item => {
        if (item.status_ === '0') {
          off.push(item)
          this.offService = off
        }
      })
      console.log(off)
    },
    changeOffBtnType() {
      if (this.flag3) {
        this.type3 = ''
        this.onBtnSearch()
        this.points = this.onService
        this.flag3 = false
      } else {
        this.points = this.$store.getters.userService
        this.type3 = 'primary'
        this.offBtnSearch()
        this.points = [...this.offService, ...this.onService]
        this.onService = []
        this.offService = []
        this.flag3 = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 1080px;
}
.infoService{
    text-align: center;
  >span{
    color: #3a4268;
    font-size: 16px
  }
  .basis{
    margin-top: 10px;
    font-size: 14px;
    div{
      display: flex;
      justify-content:space-between;
    }
  }
}
</style>
<style lang="scss">
.search{
  width: 60%;
  margin-right: 10px;
}
</style>

