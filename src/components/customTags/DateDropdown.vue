<template>
    <div>
        <h5 class="display-6 text-secondary">{{label}}</h5>
        <div class="form-check-inline form-group">
            <select class="form-control" v-model="year">
                <option disabled value="" name="disabled">Rok</option>
                <option v-for="index in yearRange">{{index+1979}}</option>
            </select>
            <select class="form-control" v-model="month">
                <option disabled value="" name="disabled">Miesiac</option>
                <option v-for="index in 12">{{index}}</option>
            </select>
            <select class="form-control" v-model="day" style="margin-right: 50px;">
                <option disabled value="" name="disabled">Dzień</option>
                <option v-for="index in 31">{{index}}</option>
            </select>
            <select class="form-control" v-model="hour">
                <option disabled value="" name="disabled">Godzina</option>
                <option v-for="index in 24"><span v-if="index<=10">0</span>{{index-1}}</option>
            </select>
            <select class="form-control" v-model="minute">
                <option disabled value="" name="disabled">Minuta</option>
                <option v-for="index in 60"><span v-if="index<=10">0</span>{{index-1}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DateDropdown",

        props: {
            label: String
        },
        data() {
            return {
                yearRange: '',
                year:'',
                month:'',
                day:'',
                hour:'',
                minute:''
            }
        },
        mounted() {
            this.setYearRange();
            $("option[name='disabled']").hide();
        },
        methods: {
            setYearRange() {
                this.yearRange = new Date().getFullYear()-1979;
            }
        },
        watch:{
            year(value){
                this.$parent.unformattedTakeInDate.year = value;
            },
            month(value){
                this.$parent.unformattedTakeInDate.month = value;
            },
            day(value){
                this.$parent.unformattedTakeInDate.day = value;
            },
            hour(value){
                this.$parent.unformattedTakeInDate.hour = value;
            },
            minute(value){
                this.$parent.unformattedTakeInDate.minute = value;
            }
        }
    }
</script>

<style scoped>

</style>