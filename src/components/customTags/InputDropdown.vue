<template>
    <div>
        <h5 class="display-6 text-secondary">{{label}}</h5>        
        <div class="form-group">
            <select :class="valid+' form-control'" style="appearance: none;" v-model="choosed">
                <option v-for="value in values">{{value}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputDropdown",
        props: [
            'label',
            'values',
            'defaultVal'
        ],

        data() {
            return {
                valid: '',
                choosedVal: ''
            }
        },

        computed:{
            choosed:{
                get(){
                    return(this.choosedVal === '' ? this.defaultVal : this.choosedVal)
                },
                set(value){
                    this.choosedVal = value;
                }
            }
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
