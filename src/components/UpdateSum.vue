<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentSum">
          <div class="mb-3">
            <label class="form-label">Bảo hiểm chi trả</label>
            <input
              type="text"
              class="form-control"
              v-model="currentSum.healthInsurance"
            />
          </div>
          <div class="mb-3">
            <button @click="updateSum" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
        <router-link to="/sums" class="mb-3">
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
      currentSum: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getSum(id) {
      Bill.getSumById(id)
        .then((response) => {
          this.currentSum = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateSum() {
      Bill.updateSum(this.currentSum.id, this.currentSum)
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
    this.getSum(this.$route.params.id);
  },
};
</script>

<style></style>
