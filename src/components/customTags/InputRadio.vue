<template>
    <div>
        <h5>{{label}}</h5>
        <div class="btn-group btn-group-toggle">
            <label v-bind:class="'btn btn-psomocnik '+class1">
                <input type="radio" :name="name+1" :value="values[0]" autocomplete="off" @click="setActive1()"
                       v-model="choosedVal">{{values[0]}}
            </label>
            <label v-bind:class="'btn btn-psomocnik '+class2">
                <input type="radio" :name="name+2" :value="values[1]" autocomplete="off" @click="setActive2()"
                       v-model="choosedVal">{{values[1]}}
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddPetInputRadio",
        props:{
            label: String,
            name: String,
            values: Array
        },

        data(){
            return {choosedVal: '',
                class1:'',
                class2:''}
        },

        methods:{
            setActive1(){
                this.class1='active';
                this.class2='';
            },
            setActive2(){
                this.class1='';
                this.class2='active';
            }
        },

        watch:{
            choosedVal(val){
                this.$emit('input', val);
            }
        }
    }
</script>
<style>
    label{
        margin-right: 20px;
    }
    .btn-group > .btn, .btn-group > .btn-group > .btn{
        border-radius: 0.25rem!important;
    }
    .btn-group{
        margin-bottom:15px;
    }
</style>