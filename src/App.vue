<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Quản lý khám chữa bệnh</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item"></li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/typeOfServices" class="nav-link"
            >Loại dịch vụ
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/services" class="nav-link">Dịch vụ </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/user" class="nav-link">Nhân viên </router-link>
        </li>

        <li v-if="showNurseBoard" class="nav-item">
          <router-link to="/patients" class="nav-link">Bệnh nhân </router-link>
        </li>
        <li v-if="showNurseBoard" class="nav-item">
          <router-link to="/listTypeOfServicesForNurse" class="nav-link"
            >Danh sách loại dịch vụ
          </router-link>
        </li>
        <li v-if="showNurseBoard" class="nav-item">
          <router-link to="/listServicesForNurse" class="nav-link"
            >Danh sách dịch vụ
          </router-link>
        </li>

        <li v-if="showDoctorBoard" class="nav-item">
          <router-link to="/servicesReg" class="nav-link">Đăng ký </router-link>
        </li>
        <li v-if="showDoctorBoard" class="nav-item">
          <router-link to="/results" class="nav-link">Kết quả </router-link>
        </li>
        <li v-if="showAccountantBoard" class="nav-item">
          <router-link to="/bills" class="nav-link">Bản kê </router-link>
        </li>
        <li v-if="showAccountantBoard" class="nav-item">
          <router-link to="/sums" class="nav-link">Tổng viện phí </router-link>
        </li>
        <li v-if="showAccountantBoard" class="nav-item">
          <router-link to="/reports" class="nav-link">Báo cáo </router-link>
        </li>
      </div>

      <!-- <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div> -->

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
