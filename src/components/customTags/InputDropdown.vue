<template>
    <div>
        <h5 class="display-6 text-secondary">{{label}}</h5>
        <div class="form-group">
            <select :class="valid+' form-control'" style="appearance: none;" v-model="choosedVal">
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
            values: Array,
            defaultValue: String
        },

        data() {
            return {
                choosedVal: '',
                valid: ''
            }
        },
        mounted(){
            this.choosedVal = this.defaultValue;
        },
        watch: {
            choosedVal(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
<style>
</style>
