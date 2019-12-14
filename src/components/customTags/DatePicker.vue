<template>
  <div class="form-group">
    <label class="control-label" :for="id">
      <h5 class="display-6 text-secondary">{{label}}</h5>
    </label>
    <input
      :class="valid + ' form-control'"
      :id="id"
      :value="defaultValue"
      placeholder="yyyy-mm-dd"
      type="text"
      onkeydown="return false"
    />
  </div>
</template>

<script>
export default {
  name: "DatePicker",

  props: ["label", "id", "defaultValue"],
  data() {
    return {
      valid: "",
      pickedDate: ""
    };
  },
  mounted() {
    $("#" + this.id)
      .datepicker({
        format: "yyyy-mm-dd",
        //todayHighlight: true,
        autoclose: true
      })
      .on("changeDate", () => {
        this.pickedDate = $("#" + this.id).val();
      });
  },
  watch: {
    pickedDate(val) {
      //                this.valid = 'is-valid';
      if (val !== "") {
        this.$emit("date-picked", val);
      }
    }
  }
};
</script>

<style scoped>
</style>
