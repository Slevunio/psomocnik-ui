<template>
    <div class="form-group">
        <label class="control-label" :for="id"><h5 class="display-6 text-secondary">{{label}}</h5></label>
        <input :class="valid + ' form-control'" :id="id" placeholder="yyyy-mm-dd" type="text"/>
    </div>
</template>

<script>
    export default {
        name: "DatePicker",

        props: {
            label: String,
            id: String
        },
        data() {
            return {
                pickedDate:'',
                valid:''
            }
        },
        mounted() {
            $('#'+this.id).datepicker({
                format: 'yyyy-mm-dd',
                todayHighlight: true,
                autoclose: true,
            }).on('changeDate', () => {
                this.pickedDate = $('#'+this.id).val();
            })
        },
        watch:{
            pickedDate(val){
                console.log("date picked: " + val);
                this.valid = 'is-valid';
                this.$emit('date-picked', val);
            }
        }
    }
</script>

<style scoped>

</style>
