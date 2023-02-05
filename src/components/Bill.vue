<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách bản kê khám / chữa bệnh</h4>
      <br />
      <router-link to="/bills/add" class="row">
        <button class="btn btn-success" v-on:click="addBill()">Thêm</button>
      </router-link>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên bệnh nhân</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Tên dịch vụ</th>
              <th>Tên kế toán</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Số tiền đã thu</th>
              <th>Ngày cập nhật cuối</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bill in bills" v-bind:key="bill.billExId">
              <td>{{ bill.billExId }}</td>
              <td>{{ bill.patientName }}</td>
              <td>{{ bill.gender }}</td>
              <td>{{ bill.birthday }}</td>
              <td>{{ bill.serviceName }}</td>
              <td>{{ bill.accountantName }}</td>
              <td>{{ bill.unit }}</td>
              <td>{{ bill.quantity }}</td>
              <td>{{ bill.moneyReceived }}</td>
              <td>{{ bill.dateCreated }}</td>
              <td>
                <a :href="'/bills/' + bill.billExId" class="btn btn-primary"
                  >Sửa</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  </div>
</template>

<script>
import Bill from "../services/bill-service";
export default {
  name: "billsView",
  data() {
    return {
      bills: [],
    };
  },
  mounted() {
    Bill.getListBill().then(
      (response) => {
        this.bills = response.data;
      },
      (error) => {
        this.bills =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
