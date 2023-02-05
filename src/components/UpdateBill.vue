<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentBill">
          <div class="mb-3">
            <label class="form-label">Số tiền đã thu</label>
            <input
              type="text"
              class="form-control"
              v-model="currentBill.moneyReceived"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã đăng ký dịch vụ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentBill.serviceReg"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã kế toán</label>
            <input
              type="text"
              class="form-control"
              v-model="currentBill.accountantId"
            />
          </div>
          <div class="mb-3">
            <button @click="updateBill" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
        <router-link to="/bills" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import Bill from "../services/bill-service";

export default {
  data() {
    return {
      currentBill: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getBill(id) {
      Bill.getBillById(id)
        .then((response) => {
          this.currentBill = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateBill() {
      Bill.updateBill(this.currentBill.id, this.currentBill)
        .then(() => {
          this.message = "Đã sửa";
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  mounted() {
    this.getBill(this.$route.params.id);
  },
};
</script>

<style></style>
