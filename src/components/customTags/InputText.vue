<template>
  <div class="form-group">
    <label for="name" v-if="!!label">
      <h5 class="display-6 text-secondary">{{label}}</h5>
    </label>
    <input
      v-if=(!multiline)
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :class="valid + ' form-control'"      
      v-model="input"      
    />
    <textarea
        v-else
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :class="valid + ' form-control'"      
        v-model="input"
        rows="3"
    />
    <div class="invalid-feedback" v-if="!!error">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "input-text",
  props: [
    "type",
    "name",
    "id",
    "label",
    "placeholder",
    "valid", // '' or 'is-valid' or 'is-invalid'
    "error",
    "defaultVal",
    "multiline"
  ],
  data(){
      return{
          inputValue: null
      }
  },
  computed:{
      input: {
          get(){
              return (this.inputValue === null ? this.defaultVal : this.inputValue)
          },
          set(value){
              this.inputValue = value;
          }
      }
  },
  watch: {
    inputValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style scoped>
</style>