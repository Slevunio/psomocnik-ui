<template>
    <div class="form-group">
        <label for="name"><h5>{{label}}</h5></label>
        <input :type="type" :id="name" :name="name" :placeholder="placeholder" class="form-control" :value="value"
               v-model="inputValue">
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
            'value'
        ],

        data() {
            return {inputValue: ''}
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