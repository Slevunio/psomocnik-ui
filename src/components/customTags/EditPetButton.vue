<template>
    <button type="button" class="btn btn-primary" @click="setElementIdAndGetDefaultInputValue(elementid)" data-toggle="modal"
            data-target="#editModal">
        Edytuj
    </button>
</template>

<script>
    export default {
        name: "edit-button",
        props:[
            'elementid'
        ],
        methods:{
            setElementIdAndGetDefaultInputValue(elementid){
                this.$parent.setElementId(elementid);
                this.$parent.getDefaultInputValue();
            },
        }
    }
</script>

<style scoped>

</style>