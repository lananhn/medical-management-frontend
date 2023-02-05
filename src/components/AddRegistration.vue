<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Đăng ký khám / chữa bệnh</h4>
        <div class="mb-3">
          <label class="form-label">Mã bệnh nhân</label>
          <input type="text" class="form-control" v-model="reg.patientId" />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã dịch vụ</label>
          <div v-for="service in services" v-bind:key="service.id">
            <input
              type="checkbox"
              v-bind:value="service.id"
              v-on:change="updateCheck"
            />{{ service.name }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Mã bác sỹ</label>
          <input type="text" class="form-control" v-model="reg.doctorId" />
        </div>
        <div class="mb-3">
          <label class="form-label">Đơn vị</label>
          <input type="text" class="form-control" v-model="reg.unit" />
        </div>
        <div class="mb-3">
          <label class="form-label">Số lượng</label>
          <input type="text" class="form-control" v-model="reg.quantity" />
        </div>
        <div class="mb-3">
          <button @click="saveReg" class="btn btn-success">Lưu</button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã thêm thành công</div>
        <router-link to="/servicesReg" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import Reg from "../services/registration-service";
import Service from "../services/service";

export default {
  data() {
    return {
      reg: {
        patientId: "",
        doctorId: "",
        unit: "",
        quantity: "",
        message: null,
      },
      services: [],
      serviceIds: [],
      submitted: false,
    };
  },
  methods: {
    getServices() {
      Service.getListServices().then((response) => {
        this.services = response.data;
      }),
        (error) => {
          this.services =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        };
    },
    saveReg() {
      var data = {
        patientId: this.reg.patientId,
        doctorId: this.reg.doctorId,
        unit: this.reg.unit,
        quantity: this.reg.quantity,
        serviceId: this.serviceIds,
      };
      Reg.createRegis(data)
        .then((response) => {
          this.reg.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateCheck(e) {
      if (e.target.checked) {
        this.serviceIds.push(e.target.value);
      } else {
        var index = this.serviceIds.indexOf(e.target.value);
        if (index !== -1) {
          this.serviceIds.splice(index, 1);
        }
      }
    },
  },
  mounted() {
    this.getServices();
  },
};
</script>

<style></style>
