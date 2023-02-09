<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand"
        >Quản lý khám chữa bệnh
        <font-awesome-icon icon="volume-up" />
      </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item"></li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/typeOfServices" class="nav-link">
            <font-awesome-icon icon="fa-solid fa-book-medical" />
            Loại dịch vụ
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/services" class="nav-link">
            <font-awesome-icon icon="user" />
            Dịch vụ
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/user" class="nav-link">
            <font-awesome-icon icon="user" />
            Nhân viên
          </router-link>
        </li>

        <li v-if="showNurseBoard" class="nav-item">
          <router-link to="/patients" class="nav-link">
            <font-awesome-icon icon="user" />
            Bệnh nhân
          </router-link>
        </li>
        <li v-if="showNurseBoard" class="nav-item">
          <router-link to="/listTypeOfServicesForNurse" class="nav-link">
            <font-awesome-icon icon="user" />
            Danh sách loại dịch vụ
          </router-link>
        </li>
        <li v-if="showNurseBoard" class="nav-item">
          <router-link to="/listServicesForNurse" class="nav-link">
            <font-awesome-icon icon="user" />
            Danh sách dịch vụ
          </router-link>
        </li>

        <li v-if="showDoctorBoard" class="nav-item">
          <font-awesome-icon icon="user" />
          <router-link to="/servicesReg" class="nav-link">
            Đăng ký
          </router-link>
        </li>
        <li v-if="showDoctorBoard" class="nav-item">
          <router-link to="/results" class="nav-link">
            <font-awesome-icon icon="user" />
            Kết quả
          </router-link>
        </li>
        <li v-if="showAccountantBoard" class="nav-item">
          <router-link to="/bills" class="nav-link">
            <font-awesome-icon icon="user" />
            Bản kê
          </router-link>
        </li>
        <li v-if="showAccountantBoard" class="nav-item">
          <router-link to="/sums" class="nav-link">
            <font-awesome-icon icon="user" />
            Tổng viện phí
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Đăng xuất
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
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
@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css);
</style>
