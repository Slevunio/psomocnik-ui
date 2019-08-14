<template>
    <div class="container-fluid" style="margin-top:50px;">
        <div class="container" id="pets">
            <h1 class="display-4 text-center">Zarządzaj zwierzętami</h1>
            <br>
            <div class="card-columns text-center">
            <span v-for="pet in pets" style="display: inline-block">
            <pet-card route="editPet" :petId="pet.id" :name="pet.name" :image="pet.photos[0]"></pet-card>
                <button type="button" class="btn btn-delete" data-toggle="modal" data-target="#deleteModal"
                        @click.capture="setId(pet.id)">Usuń
                    </button>
            </span>
            </div>
            <br><br>
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
    import PetCard from '../customTags/PetCard'
    import EditPet from "./EditPet";

    export default {
        name: "ManagePets",
        components: {EditPet, PetCard},
        data() {
            return {
                pets: [],
                id: ""
            }
        },

        mounted() {
            this.readPets();
        },

        methods: {
            readPets() {
                api.readPets().then(response => {
                    this.pets = response.data;
                });
            },
            setId(id) {
                this.id = id;
            },
            deletePet() {
                api.deletePet(this.id).then(document.location.replace("/managePets"));
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-family: "Trebuchet MS";
        font-weight: bold;
    }
    .btn-delete {
        background-color: #3ed4c2;
        width: 100%;
        font-size: 18px;
    }

    .btn-delete:hover {
        background-color: rgba(62, 212, 194, 0.6);
        font-weight: 500;
    }
</style>