<template>
    <div>
        <div class="container-fluid" style="margin-top:50px;">
            <h1 class="display-4 text-center">Dodaj zwierzę</h1>
            <div class="container">
                <form id="pet" enctype="multipart/form-data" method="POST" @submit.prevent="createPet()">

                    <input-text type="text" name="name" label="Imię" v-model="pet.name"
                                placeholder="Wprowadź imię zwierzęcia"></input-text>
                    <date-dropdown label="Data przyjęcia" v-model="pet.takeInDate"></date-dropdown>
                    <input-radio label="Gatunek" name="species" :values="['Pies', 'Kot']"
                                 v-model="pet.species"></input-radio>

                    <input-dropdown label="Płeć" name="sex" :values="['Męska', 'Żeńska']"
                                 v-model="pet.sex"></input-dropdown>
                    <input-dropdown label="Wiek" name="age" :values="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]" v-model="pet.age"></input-dropdown>
                    <input-dropdown label="Czy może mieszkać z innymi psami" name="canLiveWithOtherDogs"
                                 :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherDogs"></input-dropdown>
                    <input-dropdown label="Czy może mieszkać z innymi Kotami" name="canLiveWithOtherCats"
                                 :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherCats"></input-dropdown>
                    <input-dropdown label="Czy może mieszkać z dziećmi" name="canLiveWithKids" :values="['Tak', 'Nie']"
                                 v-model="pet.canLiveWithKids"></input-dropdown>
                    <input-dropdown label="Aktywność w skali 1-10 (1 - nieaktywny, 10 - bardzo aktywny)" :values="[1,2,3,4,5,6,7,8,9,10]"
                                name="activity" v-model="pet.activity"></input-dropdown>
                    <input-text label="Umaszczenie" type="text"
                                name="coat" placeholder="Wpisz rodzaj umaszczenia" v-model="pet.coat"></input-text>
                    <input-dropdown label="Sierść" name="fur" :values="['Długa', 'Krótka']"
                                 v-model="pet.fur"></input-dropdown>
                    <h5 class="display-6 text-secondary">Choroby</h5>
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Wybierz chorobę
                        </button>
                        <ul class="dropdown-menu">
                            <li v-for="disease in diseases" @click="addDisease(disease)"><!--sprawdz czy potrzebne--><a
                                    class="dropdown-item"
                                    href="javascript:void(0)">{{disease.name}}</a>
                            </li>
                        </ul>
                    </div>
                    <table class="table">
                        <tr v-for="disease in pet.diseases">
                            <td>{{disease.name}}</td>
                            <td>
                                <button type="button" class="btn btn-primary" @click="deleteDisease(disease)">Usuń
                                </button>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <div>
                        <h5 class="display-6 text-secondary">Zdjęcia</h5>
                        <input type="file" id="photos" ref="photos" class="input-file" multiple
                               @change="handlePhotosUpload()"/>
                    </div>
                    <div class="row" v-for="(photo,index) in photos">
                        <div class="col-2">{{ photo.name }}</div>

                        <div class="col-2">
                            <button type="button" class="btn btn-primary" @click="deletePhoto(index)">Usuń
                            </button>
                        </div>
                    </div>

                    <br>
                    <br>
                    <div class="text-center">
                        <button type="submit" class="btn btn-lg btn-primary">Wyślij</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'
    import InputText from '../customTags/InputText'
    import InputDropdown from '../customTags/InputDropdown'
    import DateDropdown from '../customTags/DateDropdown'

    export default {
        name: "AddPet",
        components: {
            InputText,
            InputDropdown,
            DateDropdown
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
                unformattedTakeInDate: {
                    year: '',
                    month: '',
                    day: '',
                    hour:'',
                    minute:''
                }
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
                    }
                    else if(item==='takeInDate'){
                        this.pet[item] = this.unformattedTakeInDate.year+'-'+this.unformattedTakeInDate.month+'-'
                        +this.unformattedTakeInDate.day+' '+this.unformattedTakeInDate.hour+':'+this.unformattedTakeInDate.minute;
                        formData.append(item, this.pet[item]);
                    }
                    else {
                        formData.append(item, this.pet[item]);
                    }
                }
                for (var i = 0; i < this.photos.length; i++) {
                    formData.append('photos', this.photos[i]);
                }

                api.createPet(formData)
                    .then(response => {
                            document.location.replace("/managePets")
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>