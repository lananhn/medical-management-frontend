<template>
  <div class="container">
    <header class="jumbotron">
      <Form @submit="handleAdd" :validation-schema="schema">
        <div v-if="!submitted">
          <h4>Tạo bản kê</h4>
          <div class="mb-3">
            <label class="form-label">Mã kế toán</label>
            <Field
              name="accountantId"
              type="text"
              class="form-control"
              v-model="bill.accountantId"
            />
            <ErrorMessage name="accountantId" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã đăng ký dịch vụ</label>
            <Field
              name="serviceReg"
              type="text"
              class="form-control"
              v-model="bill.serviceReg"
            />
            <ErrorMessage name="serviceReg" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Số tiền đã thu</label>
            <Field
              name="moneyReceived"
              type="text"
              class="form-control"
              v-model="bill.moneyReceived"
            />
            <ErrorMessage name="moneyReceived" class="error-feedback" />
          </div>
          <div class="mb-3">
            <button
              @click="saveBill"
              class="btn btn-success"
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span
              >Lưu
            </button>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-success" role="alert">Đã tạo thành công</div>
          <router-link to="/bills" class="mb-3">
            <button class="btn btn-success">Quay lại</button>
          </router-link>
        </div>
      </Form>
    </header>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Bill from "../services/bill-service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      accountantId: yup.string().required("Mã kế toán cần được nhập"),
      serviceReg: yup.string().required("Mã đăng ký cần được nhập"),
      moneyReceived: yup.string().required("Số tiền cần được nhập"),
    });
    return {
      bill: {
        accountantId: "",
        serviceReg: "",
        moneyReceived: "",
        message: null,
      },
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    handleAdd(bill) {
      this.message = "";
      this.submitted = false;
      this.loading = true;

      this.$store.dispatch("", bill).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
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
