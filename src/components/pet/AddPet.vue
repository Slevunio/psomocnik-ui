<template>
    <div class="container-fluid" style="margin-top:50px;">
            <h1 class="display-4 text-center">Dodaj zwierzę</h1>
        <div class="container">
            <form id="pet" enctype="multipart/form-data" @submit.prevent="createPet()">

                <input-text type="text" name="name" label="Imię" v-model="pet.name"
                            placeholder="Wprowadź imię zwierzęcia"></input-text>
                <input-text type="datetime-local" name="takeInDate" label="Data przyjęcia" v-model="pet.takeInDate"
                            placeholder="yyyy-mm-dd --:--"></input-text>
                <add-pet-input-radio label="Gatunek" name="species" :values="['Pies', 'Kot']"
                                     v-model="pet.species"></add-pet-input-radio>

                <add-pet-input-radio label="Płeć" name="sex" :values="['Męska', 'Żeńska']"
                                     v-model="pet.sex"></add-pet-input-radio>
                <input-text type="number" label="Wiek" name="age" placeholder="Wprowadź wiek zwierzęcia"
                            v-model="pet.age"></input-text>
                <add-pet-input-radio label="Czy może mieszkać z innymi psami" name="canLiveWithOtherDogs"
                                     :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherDogs"></add-pet-input-radio>
                <add-pet-input-radio label="Czy może mieszkać z innymi Kotami" name="canLiveWithOtherCats"
                                     :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherCats"></add-pet-input-radio>
                <add-pet-input-radio label="Czy może mieszkać z dziećmi" name="canLiveWithKids" :values="['Tak', 'Nie']"
                                     v-model="pet.canLiveWithKids"></add-pet-input-radio>
                <input-text type="number" label="Aktywność w skali 1-10 (1 - nieaktywny, 10 - bardzo aktywny)"
                            name="activity" placeholder="Aktywność" v-model="pet.activity"></input-text>
                <h5>Choroby</h5>
                <div class="dropdown">
                    <button class="btn btn-psomocnik dropdown-toggle" data-toggle="dropdown">Wybierz chorobę</button>
                    <ul class="dropdown-menu">
                        <li v-for="disease in diseases" @click="addDisease(disease)"><a href="javascript:void(0)">{{disease.name}}</a>
                        </li>
                    </ul>
                </div>
                <table class="table">
                    <tr v-for="disease in pet.diseases">
                        <td>{{disease.name}}</td>
                        <td>
                            <button type="button" class="btn btn-psomocnik" @click="deleteDisease(disease)">Usuń
                            </button>
                        </td>
                    </tr>
                </table>
                <br>
                <div><!-- class="large-12 medium-12 small-12 cell">-->
                    <h5>Zdjęcia</h5>
                        <input type="file" id="photos" ref="photos" multiple @change="handlePhotosUpload()"/>
                </div>
                <div> <!--class="large-12 medium-12 small-12 cell"-->
                    <div v-for="(photo) in photos"> <!--class="file-listing"-->{{ photo.name }}
                    </div>
                </div>
                <br>
                <br>
                <div class="row">
                    <div class="col text-center">
                        <button type="submit" class="btn btn-lg btn-psomocnik">Wyślij</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'
    import InputText from '../customTags/InputText'
    import AddPetInputRadio from '../customTags/AddPetInputRadio'

    export default {
        name: "AddPet",
        components: {
            InputText,
            AddPetInputRadio
        },
        data() {
            return {
                //Pet properties
                pet: {
                    name: '',
                    takeInDate: '',
                    species: '',
                    sex: '',
                    age: '',
                    canLiveWithOtherDogs: '',
                    canLiveWithOtherCats: '',
                    canLiveWithKids: '',
                    activity: '',
                    diseases: []
                },
                diseases: [],
                photos: []
            }
        },

        mounted() {
            this.readDiseases();
        },
        methods: {
            addDisease(disease) {
                this.pet.diseases.push(disease);
            },
            deleteDisease(disease) { //JQUERY
                for (var i = 0; i < this.pet.diseases.length; i++) {
                    if (this.pet.diseases[i] === disease) {
                        this.pet.diseases.splice(i, 1);
                    }
                }
            },
            readDiseases() {
                api.readDiseases().then(response => {
                    this.diseases = response.data;
                });
            },
            handlePhotosUpload() {
                let uploadedPhotos = this.$refs.photos.files;
                for (var i = 0; i < uploadedPhotos.length; i++) {
                    this.photos.push(uploadedPhotos[i]);
                }
            },

            createPet() {
                let formData = new FormData();
                for (var item in this.pet) { //check var let const
                    if (item === 'diseases') {
                        formData.append(item, JSON.stringify(this.pet[item]));
                    } else {
                        formData.append(item, this.pet[item]);
                    }
                }
                for (var i = 0; i < this.photos.length; i++) {
                    formData.append('photos', this.photos[i]);
                }

                api.createPet(formData)
                .then(
                    document.location.replace("/managePets")
                );
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-family: "Trebuchet MS";
        font-weight: bold;
    }
</style>