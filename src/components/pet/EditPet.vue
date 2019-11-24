<template>
    <div>
        <div class="container-fluid" style="margin-top:50px;" id="pet">
            <div class="container">
                <h1 class="display-3 text-center">Edytuj zwierzę</h1>
                <br>
                <table class="table table-light">
                    <thead>
                        <tr>
                            <th>
                                Imię
                            </th>
                            <td id="name">
                                {{pet.name}}
                            </td>
                            <td>
                                <edit-pet-button elementid="name"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Data przyjęcia
                            </th>
                            <td id="takeInDate">
                                {{pet.takeInDate}}
                            </td>
                            <td>
                                <edit-pet-button elementid="takeInDate"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Gatunek
                            </th>
                            <td id="species">
                                {{pet.species}}
                            </td>
                            <td>
                                <edit-pet-button elementid="species"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Płeć
                            </th>
                            <td id="sex">
                                {{pet.sex}}
                            </td>
                            <td>
                                <edit-pet-button elementid="sex"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Wiek
                            </th>
                            <td id="age">
                                {{pet.age}}
                            </td>
                            <td>
                                <edit-pet-button elementid="age"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Może mieszkać z innymi psami
                            </th>
                            <td id="canLiveWithOtherDogs">
                                {{pet.canLiveWithOtherDogs}}
                            </td>
                            <td>
                                <edit-pet-button elementid="canLiveWithOtherDogs"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Może mieszkać z innymi kotami
                            </th>
                            <td id="canLiveWithOtherCats">
                                {{pet.canLiveWithOtherCats}}
                            </td>
                            <td>
                                <edit-pet-button elementid="canLiveWithOtherCats"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Może mieszkać z dziećmi
                            </th>
                            <td id="canLiveWithKids">
                                {{pet.canLiveWithKids}}
                            </td>
                            <td>
                                <edit-pet-button elementid="canLiveWithKids"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Aktywność (skala 1-10)
                            </th>
                            <td id="activity">
                                {{pet.activity}}
                            </td>
                            <td>
                                <edit-pet-button elementid="activity"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Umaszczenie
                            </th>
                            <td id="coat">
                                {{pet.coat}}
                            </td>
                            <td>
                                <edit-pet-button elementid="coat"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Długość sierści
                            </th>
                            <td id="fur">
                                {{pet.fur}}
                            </td>
                            <td>
                                <edit-pet-button elementid="fur"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Czy jest chory?
                            </th>
                            <td id="isIll">
                                {{pet.isIll}}
                            </td>
                            <td>
                                <edit-pet-button elementid="isIll"></edit-pet-button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Uwagi dodatkowe
                            </th>
                            <td id="additionalNotes">
                                {{pet.additionalNotes}}
                            </td>
                            <td>
                                <edit-pet-button elementid="additionalNotes"></edit-pet-button>
                            </td>
                        </tr>
                    </thead>
                </table>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal"
                            data-target="#submitModal">
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
                                    <button type="submit" class="btn btn-primary" v-on:click.capture="editPet()"
                                            data-dismiss="modal">Ok
                                    </button>
                                </div>
                                <div class="col-6 text-center">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Anuluj</button>
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
                                <button type="button" class="btn btn-primary" v-on:click.capture="editValue()"
                                        data-dismiss="modal">
                                    Ok
                                </button>
                            </div>
                        </div>
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
                    diseases: '',
                    coat: '',
                    fur: ''
                }
            }
        },
        mounted() {
            this.getPet();
        },

        methods: {
            getPet() {
                api.readPet(this.getPetId()).then(response => {
                    this.pet = response;
                    console.log(JSON.stringify(response));
                });
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
                document.getElementById("editInput").value = document.getElementById(this.elementId).innerHTML.trim();
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
td {
    vertical-align: bottom;
}
</style>