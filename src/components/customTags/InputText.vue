<template>
    <div class="form-group">
        <label for="name"><h5 class="display-6 text-secondary">{{label}}</h5></label>
        <input :type="type" :id="name" :name="name" :placeholder="placeholder" :class="valid + ' form-control'" v-model="inputValue">
        <div class="invalid-feedback" v-if="!!error">{{error}}</div>
    </div>
</template>

<script>

    export default {
        name: "input-text",
        props: [
            'type',
            'name',
            'label',
            'placeholder',
            'valid', // '' or 'is-valid' or 'is-invalid'
            'error'
        ],

        data() {
            return {
                inputValue: ''
            }
        },
        watch: {
            inputValue(val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style scoped>
</style>
