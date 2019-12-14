<template>
    <div id="managePets">
        <div class="container" style="margin-top: 50px;">
            <h1 class="display-5 text-center text-dark">Zarządzaj zwierzętami</h1>
            <br>
            <table class="table table-light">
                <thead>
                <th>
                    <input type="checkbox" id="checkAll" @change="checkAll()">
                </th>
                <th>
                    L.p.
                </th>
                <th>
                    Imię
                </th>
                <th>
                    Przyjęty
                </th>
                <th>
                    Ostatnio edytowany
                </th>
                </thead>
                <tr v-for="(pet, index) in pets">
                    <td>
                        <input type="checkbox" name="petCheckbox" :value="pet.id" v-model="checkedPets">
                    </td>
                    <td>
                        {{index+1}}
                    </td>
                    <td>
                        {{pet.name}}
                    </td>
                    <td>
                        {{pet.takeInDate}}
                    </td>
                    <td>
                        {{pet.lastChanged}}
                    </td>
                    <td>
                        <router-link :to="{name:'editPet', params:{petId:pet.id}}">
                            <button class="btn btn-secondary">Edytuj</button>
                        </router-link>
                    </td>
                </tr>
            </table>
            <div class="row">
                <div class="col-sm-6 text-center">
                    <router-link to="/addPet">
                        <button class="btn btn-info btn-lg">Dodaj</button>
                    </router-link>
                </div>
                <div class="col-sm-6 text-center">                    
                    <button class="btn btn-info btn-lg" data-toggle="modal" data-target="#deleteModal" :disabled="checkedPets.length === 0">Usuń</button>
                </div>
            </div>
        </div>
        <div class="modal fade" id="deleteModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h4>Usunąć?</h4>
                    </div>
                    <div class="modal-footer">
                        <div class="col-6 text-center">
                            <button type="button" class="btn btn-success" data-dismiss="modal"
                                    @click.capture="deletePets()">Ok
                            </button>
                        </div>
                        <div class="col-6 text-center">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Anuluj
                            </button>
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
                id: "",
                checkedPets: [],
            }
        },

        mounted() {
            this.readPets();
        },

        methods: {
            readPets() {
                api.readPets().then(response => {
                    this.pets = response;
                });
            },
            setId(id) {
                this.id = id;
            },
            deletePets() {
                api.deletePets(this.checkedPets).then(response => {
                    document.location.replace("/managePets")
                });
            },
            checkAll() {
                $("input[name='petCheckbox']").prop("checked", $("#checkAll").prop('checked'));
                let checkboxes = $("input[name='petCheckbox']");
                Array.prototype.forEach.call(checkboxes, (item)=>{
                    item.dispatchEvent(new Event("change"));
                })
            }
        }
    }
</script>

<style scoped>
</style>