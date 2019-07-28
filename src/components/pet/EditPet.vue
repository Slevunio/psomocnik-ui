<template>
    <div class="container-fluid" style="margin-top:50px;" id="pet">
        <div class="col-12 text-center">
            <h1 class="display-3">Edytuj zwierzę</h1>
        </div>

        <table class="table">
            <thead class="thead-dark">
            <tr class="text-center">
                <th>
                    Imię
                </th>
                <th>
                    Data przyjęcia
                </th>
                <th>
                    Gatunek
                </th>
                <th>
                    Płeć
                </th>
                <th>
                    Wiek
                </th>
                <th>
                    Może mieszkać z innymi psami
                </th>
                <th>
                    Może mieszkać z innymi kotami
                </th>
                <th>
                    Może mieszkać z dziećmi
                </th>
                <th>
                    Aktywność (skala 1-10)
                </th>
                <th>
                    Choroby
                </th>
            </tr>
            </thead>
            <tbody class="bg-psomocnik">
            <tr class="text-center">
                <td id="name">{{pet.name}}</td>
                <td id="takeInDate">{{formattedDate}}</td>
                <td id="species">{{pet.species}}</td>
                <td id="sex">{{pet.sex}}</td>
                <td id="age">{{pet.age}}</td>
                <td id="canLiveWithOtherDogs">{{pet.canLiveWithOtherDogs}}</td>
                <td id="canLiveWithOtherCats">{{pet.canLiveWithOtherCats}}</td>
                <td id="canLiveWithKids">{{pet.canLiveWithKids}}</td>
                <td id="activity">{{pet.activity}}</td>
                <td><span v-for="(disease, index) in pet.diseases"><span id="diseases">{{disease.name}}</span><span
                        v-if="index!==pet.diseases.length-1">, </span></span></td>
            </tr>
            <tr class="text-center">
                <td>

                    <edit-pet-button elementid="name"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="takeInDate"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="species"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="sex"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="age"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="canLiveWithOtherDog"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="canLiveWithOtherCats"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="canLiveWithKids"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="activity"></edit-pet-button>
                </td>
                <td>
                    <edit-pet-button elementid="diseases"></edit-pet-button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="col-12 text-center">
            <button type="button" class="btn btn-psomocnik btn-lg" data-toggle="modal" data-target="#submitModal">
                Zatwierdź
            </button>
        </div>
        <!-------------------------------------submitModal--------------------------------------->
        <div class="modal fade" id="submitModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h4>Zatwierdzić zmiany?</h4>
                    </div>
                    <div class="modal-footer">
                        <div class="col-6 text-center">
                            <button type="submit" class="btn btn-psomocnik" v-on:click.capture="editPet()"
                                    data-dismiss="modal">Ok
                            </button>
                        </div>
                        <div class="col-6 text-center">
                            <button type="button" class="btn btn-psomocnik" data-dismiss="modal">Anuluj</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------- editModal------------------------------------------>
        <div class="modal fade" id="editModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Wprowadź zmianę</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="text" class="form-control" id="editInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-psomocnik" v-on:click.capture="editValue()"
                                data-dismiss="modal">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import EditPetButton from '../customTags/EditPetButton'
    import api from '../backend-api'

    export default {
        name: "EditPet",
        components: {
            EditPetButton
        },

        data() {
            return {
                pet: '',
                formattedDate: '',
                elementId: '',
                updatedPet: {
                    name: '',
                    takeInDate: '',
                    species: '',
                    sex: '',
                    age: '',
                    canLiveWithOtherDogs: '',
                    canLiveWithOtherCats: '',
                    canLiveWithKids: '',
                    activity: '',
                    diseases: ''
                }
            }
        },
        mounted() {
            this.getPet();
        },
        beforeUpdate() {
            this.formatDate();
        },
        methods: {
            getPet() {
                api.readPet(this.getPetId()).then(response => {
                    this.pet = response.data;
                });
            },
            formatDate() {
                var splitted = this.pet.takeInDate.split('T');
                this.formattedDate = splitted[0] + ' ' + splitted[1];
            },
            getPetId() {
                var splitted = window.location.href.split('/');
                return splitted[splitted.length - 1];
            },
            setElementId(id) {
                this.elementId = id;
                this.setDefaultInputValue();
            },
            setDefaultInputValue() {
                document.getElementById("editInput").value = document.getElementById(this.elementId).innerHTML;
            },
            editValue() {
                var newValue = document.getElementById("editInput").value;
                document.getElementById(this.elementId).innerHTML = newValue;
                this.updatedPet[this.elementId] = newValue;
            },
            editPet() {
                api.updatePet(this.getPetId(), this.updatedPet).then(
                    document.location.replace("/managePets")
                );
            }
        }
    }
</script>

<style scoped>

</style>