<template>
    <button type="button" class="btn btn-psomocnik" @click="setElementId(elementid)" data-toggle="modal"
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
            setElementId(elementid){
                this.$parent.setElementId(elementid);
            }
        }
    }
</script>

<style scoped>

</style>