<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="app-breadcrumb">
      厨余垃圾设备管理平台
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <el-button type="primary" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { logout } from '@/api/user'
export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar'
      // 'avatar',
      // 'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await logout()
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // background-image:linear-gradient(bottom, #3d6df8, #5b8cff);
  background-image:#fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;

  }
  .app-breadcrumb{
      display: inline-block;
      font-size: 18px;
      line-height: 50px;
      margin-left: 10px;
      color: #000 !important;
      cursor: text;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    .el-button{
      margin-right: 10px;
    }
    // &:focus {
    //   outline: none;
    // }
    // .name{
    //   color: #fff;
    //   vertical-align: middle;
    //   margin-left: 5px;
    // }
    // .user-dropdowm{
    //   color: #fff;
    // }
    // .right-menu-item {
    //   display: inline-block;
    //   padding: 0 8px;
    //   height: 100%;
    //   font-size: 18px;
    //   color: #5a5e66;
    //   vertical-align: text-bottom;

    //   &.hover-effect {
    //     cursor: pointer;
    //     transition: background .3s;

    //     &:hover {
    //       background: rgba(0, 0, 0, .025)
    //     }
    //   }
    // }

    // .avatar-container {
    //   margin-right: 30px;
    //   line-height: 20px;
    //   .avatar-wrapper {
    //     margin-top: 5px;
    //     position: relative;

    //     .user-avatar{
    //       cursor: pointer;
    //       width: 30px;
    //       height: 30px;
    //       border-radius: 15px;
    //       vertical-align: middle;
    //     }

    //     .el-icon-caret-bottom {
    //       cursor: pointer;
    //       position: absolute;
    //       right: -20px;
    //       top: 25px;
    //       font-size: 12px;
    //       color: #fff;
    //     }
    //   }
    // }
  }
}
</style>
