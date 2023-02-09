<template>
  <div id="app">
    <div class="containter-fluid">
      <div
        class="row text-white"
        style="background-color: #0c713d; padding: 1rem"
      >
        <div
          class="col-1 d-flex d-sm-none align-items-center justify-content-center"
        >
          <span @click="showDrawer()">
            <font-awesome-icon icon="align-justify" />
          </span>
        </div>

        <div
          class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="d-none d-sm-flex">QUẢN LÝ KHÁM CHỮA BỆNH</span>
        </div>

        <div
          class="col-1 d-flex d-sm-none align-items-center justify-content-center"
        >
          <span @click="showDrawerUser()">
            <font-awesome-icon icon="user" />
          </span>
        </div>
      </div>
    </div>

    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-sm-3 d-none d-sm-flex">
          <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
          >
            <a-list bordered style="width: 100%">
              <a-menu-item v-if="showAdminBoard">
                <router-link to="/typeOfServices"> Loại dịch vụ </router-link>
              </a-menu-item>
              <a-menu-item v-if="showAdminBoard">
                <router-link to="/services"> Dịch vụ </router-link>
              </a-menu-item>
              <a-menu-item v-if="showAdminBoard">
                <router-link to="/user">Nhân viên </router-link>
              </a-menu-item>
              <a-menu-item v-if="showNurseBoard">
                <router-link to="/user"> Bệnh nhân </router-link>
              </a-menu-item>
              <a-menu-item v-if="showNurseBoard">
                <router-link to="/listTypeOfServicesForNurse"
                  >Danh sách loại dịch vụ
                </router-link>
              </a-menu-item>
              <a-menu-item v-if="showNurseBoard">
                <router-link to="/listServicesForNurse"
                  >Danh sách dịch vụ
                </router-link>
              </a-menu-item>
              <a-menu-item v-if="showDoctorBoard">
                <router-link to="/servicesReg">Đăng ký dịch vụ </router-link>
              </a-menu-item>
              <a-menu-item v-if="showDoctorBoard">
                <router-link to="/results">Kết quả </router-link>
              </a-menu-item>
              <a-menu-item v-if="showAccountantBoard">
                <router-link to="/bills">Bản kê </router-link>
              </a-menu-item>
              <a-menu-item v-if="showAccountantBoard">
                <router-link to="/sums">Thanh toán viện phí </router-link>
              </a-menu-item>
              <a-menu-item v-if="currentUser">
                <router-link to="/profile">
                  {{ currentUser.username }}
                </router-link>
              </a-menu-item>
              <a-menu-item @click.prevent="logOut"> Đăng xuất </a-menu-item>
              <template #header>
                <div>BẢNG ĐIỀU KHIỂN</div>
              </template>
            </a-list>
          </a-menu>
        </div>

        <div class="col-12 col-sm-9 container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }
      return false;
    },
    showNurseBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_NURSE");
      }
      return false;
    },
    showDoctorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_DOCTOR");
      }
      return false;
    },
    showAccountantBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ACCOUNTANT");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
/* @import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css); */
</style>
