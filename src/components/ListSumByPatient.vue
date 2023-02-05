<template>
  <div class="container">
    <h4>Danh sách bản kê của bệnh nhân: {{ patient.fullName }}</h4>
    <h6>Mã bệnh nhân: {{ patient.patientID }}</h6>
    <h6>Giới tính: {{ patient.gender }}</h6>
    <h6>Ngày sinh: {{ patient.birthday }}</h6>
    <h6>Địa chỉ: {{ patient.phone }}</h6>
    <h6>Địa chỉ: {{ patient.address }}</h6>
    <h6>Ngày vào viện: {{ patient.dateCreated }}</h6>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tên dịch vụ</th>
          <th>Số lượng</th>
          <th>Đơn vị</th>
          <th>Giá</th>
          <th>Thành tiền</th>
          <th>Số tiền đã nộp</th>
          <th>Bảo hiểm chi trả</th>
          <th>Thừa/thiếu</th>
          <th>Ngày thanh toán</th>
          <th>Thanh toán</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bill in bills" v-bind:key="bill.billExId">
          <td>{{ bill.billExId }}</td>
          <td>{{ bill.serviceName }}</td>
          <td>{{ bill.quantity }}</td>
          <td>{{ bill.unit }}</td>
          <td>{{ bill.price }}</td>
          <td>{{ bill.sumMoney }}</td>
          <td>{{ bill.moneyReceived }}</td>
          <td>{{ bill.insurancePayment }}</td>
          <td>{{ bill.surplus }}</td>
          <td>{{ bill.dateCreated }}</td>

          <td>
            <a :href="'/sums/update/' + bill.billExId" class="btn btn-primary"
              >Thanh toán</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <h6>Tổng tiền dịch vụ: {{ sum.sumMoney }}</h6>
    <h6>Tổng số tiền đã nộp: {{ sum.sumMoneyReceived }}</h6>
    <h6>Tổng tiền bảo hiểm chi trả: {{ sum.sumInsurancePayment }}</h6>
    <h6>Thừa/thiếu: {{ sum.sumSurplus }}</h6>
  </div>
</template>

<script>
import Bill from "../services/bill-service";
import PatientService from "../services/patient-service";

export default {
  data() {
    return {
      bills: [],
      patient: "",
      sum: "",
      message: "",
    };
  },
  methods: {
    getSum(id) {
      Bill.getSum(id).then((response) => {
        this.sum = response.data;
      });
    },
    getInForPatient(id) {
      PatientService.getInForPatient(id).then((response) => {
        this.patient = response.data;
      });
    },
    getSumList(id) {
      Bill.getSumListByPatientId(id).then((response) => {
        this.bills = response.data;
      });
    },
  },
  mounted() {
    this.getSumList(this.$route.params.id);
    this.getInForPatient(this.$route.params.id);
    this.getSum(this.$route.params.id);
  },
};
</script>

<style></style>
