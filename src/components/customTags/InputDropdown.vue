<template>
    <div>
        <h5 class="display-6 text-secondary">{{label}}</h5>
        <div class="form-group">
            <select :class="myClass+' form-control'" v-model="choosedVal">
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
            values: Array,
            myClass: String
        },

        data() {
            return {
                choosedVal: ''
            }
        },

        mounted(){
            $("option[name='choose']").hide();
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