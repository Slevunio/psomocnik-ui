<template>
    <div>
        <h5 class="display-6 text-secondary">{{label}}</h5>
        <div class="form-group">
            <select :class="valid+' form-control'" style="appearance: none;" v-model="choosedVal">
                <option disabled value="" name="choose">Wybierz</option>
                <option v-for="value in values">{{value}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputDropdown",
        props: {
            label: String,
            values: Array
        },

        data() {
            return {
                choosedVal: '',
                valid: ''
            }
        },

        mounted() {
            $("option[name='choose']").hide();
        },

        watch: {
            choosedVal(val) {
                this.valid = 'is-valid';
                this.$emit('input', val);
            }
        }
    }
</script>
<style>
</style>
