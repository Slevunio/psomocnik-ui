<template>
    <div v-if="role !== 'ADMIN' && role !== 'MODERATOR'"></div>
    <div v-else>
        <div class="container-fluid" style="margin-top:50px;">
            <h1 class="display-4 text-center">Dodaj zwierzę</h1>
            <div class="container">
                <form id="pet" enctype="multipart/form-data" method="POST" @submit.prevent="createPet()">

                    <input-text type="text" name="name" label="Imię" v-model="pet.name"
                                placeholder="Wprowadź imię zwierzęcia"></input-text>
                    <input-text type="datetime-local" name="takeInDate" label="Data przyjęcia" v-model="pet.takeInDate"
                                placeholder="yyyy-mm-dd --:--"></input-text>
                    <input-radio label="Gatunek" name="species" :values="['Pies', 'Kot']"
                                 v-model="pet.species"></input-radio>

                    <input-radio label="Płeć" name="sex" :values="['Męska', 'Żeńska']"
                                 v-model="pet.sex"></input-radio>
                    <input-text type="number" label="Wiek" name="age" placeholder="Wprowadź wiek zwierzęcia"
                                v-model="pet.age"></input-text>
                    <input-radio label="Czy może mieszkać z innymi psami" name="canLiveWithOtherDogs"
                                 :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherDogs"></input-radio>
                    <input-radio label="Czy może mieszkać z innymi Kotami" name="canLiveWithOtherCats"
                                 :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherCats"></input-radio>
                    <input-radio label="Czy może mieszkać z dziećmi" name="canLiveWithKids" :values="['Tak', 'Nie']"
                                 v-model="pet.canLiveWithKids"></input-radio>
                    <input-text type="number" label="Aktywność w skali 1-10 (1 - nieaktywny, 10 - bardzo aktywny)"
                                name="activity" placeholder="Aktywność" v-model="pet.activity"></input-text>
                    <input-text label="Umaszczenie" type="text"
                                name="coat" placeholder="Wpisz rodzaj umaszczenia" v-model="pet.coat"></input-text>
                    <!--change to enum-->
                    <input-radio label="Sierść" name="fur" :values="['Długa', 'Krótka']"
                                 v-model="pet.fur"></input-radio>
                    <h5>Choroby</h5>
                    <div class="dropdown">
                        <button class="btn btn-psomocnik dropdown-toggle" data-toggle="dropdown">Wybierz chorobę
                        </button>
                        <ul class="dropdown-menu">
                            <li v-for="disease in diseases" @click="addDisease(disease)"><!--sprawdz czy potrzebne--><a
                                    href="javascript:void(0)">{{disease.name}}</a>
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
                    <div>
                        <h5>Zdjęcia</h5>
                        <input type="file" id="photos" ref="photos" class="input-file" multiple
                               @change="handlePhotosUpload()"/>
                        <label for="photos" class="photos">Wybierz zdjęcia</label>
                    </div>
                    <div class="row" v-for="(photo,index) in photos">
                        <div class="col-2">{{ photo.name }}</div>

                        <div class="col-2">
                            <button type="button" class="btn btn-psomocnik" @click="deletePhoto(index)">Usuń
                            </button>
                        </div>
                    </div>

                    <br>
                    <br>
                    <div class="text-center">
                        <button type="submit" class="btn btn-lg btn-psomocnik">Wyślij</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'
    import InputText from '../customTags/InputText'
    import InputRadio from '../customTags/InputRadio'

    export default {
        name: "AddPet",
        components: {
            InputText,
            InputRadio
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
                    coat: '',
                    fur: '',
                    diseases: []
                },
                diseases: [],
                photos: [],
                role:''
            }
        },

        mounted() {
            this.checkRole();
            this.readDiseases();
        },
        methods: {
            checkRole() {
                this.role = localStorage.getItem('role');
                if (this.role !== 'ADMIN' && this.role !=='MODERATOR') {
                    document.location.replace("/");
                }
            },
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
                    this.diseases = response;
                });
            },
            handlePhotosUpload() {
                let uploadedPhotos = this.$refs.photos.files;
                for (var i = 0; i < uploadedPhotos.length; i++) {
                    this.photos.push(uploadedPhotos[i]);
                }
            },
            deletePhoto(index) {
                this.photos.splice(index, 1);
            },

            createPet() {
                let formData = new FormData();
                for (var item in this.pet) {
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
                    .then(response=> {
                        document.location.replace("/managePets")
                        }
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

    .input-file {
        width: 0.1px;
        height: 0.1px;
        position: absolute;
        opacity: 0;
        overflow: hidden;
    }

    .photos {
        padding: 0.375rem 0.75rem;
        background-color: #1dc5b3;;
        color: white;
        border-radius: 0.25rem;
    }

    .photos:hover {
        cursor: pointer;
        color: white;
        font-weight: 600;
    }

    /*.photos:focus {
        background-color: rgba(62, 212, 194, 0.9);
    }*/

    .photos:active {
        background-color: #00b3a0;
        color: white;
        border: 2px solid #ffb325;
    }

</style>