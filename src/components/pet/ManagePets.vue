<template>
    <div class="container-fluid" style="margin-top:50px;">
        <div class="col-12 text-center">
            <h1 class="display-3">Zarządzaj zwierzętami</h1>
        </div>
        <div class="container" id="pets">
            <table class="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nazwa</th>
                </tr>
                </thead>
                <tbody>
                <tr :id="pet.id" v-for="pet in pets">
                    <td>{{pet.id}}</td>
                    <td>{{pet.name}}</td>
                    <td>{{pet.photos[0]}} </td>
                    <td><router-link :to="{name: 'editPet', params:{petId:pet.id}}" tag="button" class="btn btn-psomocnik">Edytuj</router-link></td>
                    <td>
                        <button type="button" class="btn btn-psomocnik" data-toggle="modal" data-target="#deleteModal"
                                @click.capture="setId(pet.id)">Usuń
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <router-link to="/addPet" tag="button" class="btn btn-psomocnik">Dodaj</router-link>
            <div class="modal fade" id="deleteModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body text-center">
                            <h4>Usunąć?</h4>
                        </div>
                        <div class="modal-footer">
                            <div class="col-6 text-center">
                                <button type="button" class="btn btn-psomocnik" data-dismiss="modal"
                                        @click.capture="deletePet()">Ok
                                </button>
                            </div>
                            <div class="col-6 text-center">
                                <button type="button" class="btn btn-psomocnik" data-dismiss="modal">Anuluj</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'
    export default {
        name: "ManagePets",

        data(){
            return{
                pets:[],
                id: ""
            }
        },

        mounted(){
            this.readPets();
        },

        methods:{
            readPets(){
                api.readPets().then(response=>{
                    this.pets=response.data;
                });
            },
            setId(id){
                this.id=id;
            },
            deletePet(){
                api.deletePet(this.id).then(document.location.replace("/managePets"));
            }
        }
    }
</script>

<style scoped>

</style>