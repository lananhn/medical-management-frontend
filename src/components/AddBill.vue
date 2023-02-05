<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Tạo bản kê</h4>
        <div class="mb-3">
          <label class="form-label">Mã kế toán</label>
          <input type="text" class="form-control" v-model="bill.accountantId" />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã đăng ký dịch vụ</label>
          <input type="text" class="form-control" v-model="bill.serviceReg" />
        </div>
        <div class="mb-3">
          <label class="form-label">Số tiền đã thu</label>
          <input
            type="text"
            class="form-control"
            v-model="bill.moneyReceived"
          />
        </div>
        <div class="mb-3">
          <button @click="saveBill" class="btn btn-success">Lưu</button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã tạo thành công</div>
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
      bill: {
        accountantId: "",
        serviceReg: "",
        moneyReceived: "",
        message: null,
      },
      submitted: false,
    };
  },
  methods: {
    saveBill() {
      var data = {
        accountantId: this.bill.accountantId,
        serviceReg: this.bill.serviceReg,
        moneyReceived: this.bill.moneyReceived,
      };
      Bill.createBill(data)
        .then((response) => {
          this.bill.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
};
</script>

<style></style>
