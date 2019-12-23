<template>
    <div id="petInfo">
        <div id="photos" class="carousel slide" data-ride="carousel" v-if="pet.photosUrls.length > 0">
            <!--Indicators (w dolnej czesci karuzeli, pokazuja ilosc zdjec i na ktorym sie aktualnie znajduje)-->
            <ul class="carousel-indicators">
                <li v-for="(photo, index) in pet.photosUrls" data-target="#photos" data-slide-to="'index'"></li>
            </ul>
            <!--pokaz slajdow-->
            <div class="carousel-inner">
                <div class="carousel-item" v-for="(photo, index) in pet.photosUrls" :class="{active: index==0}">
                    <img :src='photo' class="img-fluid">
                </div>
            </div>
            <!--Strzalki w lewo/prawo-->
            <a class="carousel-control-prev" href="#photos" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#photos" role="button" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        <div class="container">
            <br>
            <h1 class="display-5 text-center text-dark">{{pet.name}}</h1>
            <br>
            <div>
                <h2 class="display-6 text-secondary"><p class="pet-info-paragraph">Opis</p></h2>
            </div>
            <br>
            <div style="margin-left: 10px">
                <blockquote>
                    <p class="mb-0">{{pet.additionalNotes}}</p>                    
                </blockquote>
            </div>
            <br>
            <div>
                <h2 class="display-6 text-secondary"><p class="pet-info-paragraph">Cechy szczególne</p></h2>
            </div>
            <br>
            <table class="table table-primary">
                <tr>
                    <td class="td-left">Płeć</td>
                    <td class="td-right">{{pet.sex}}</td>
                </tr>
                <tr>
                    <td class="td-left">Data przyjęcia</td>
                    <td class="td-right">{{pet.takeInDate}}</td>
                </tr>
                <tr>
                    <td class="td-left">Wiek</td>
                    <td class="td-right">{{pet.age}}</td>
                </tr>
                <tr>
                    <td class="td-left">Czy może mieszkać z psami</td>
                    <td class="td-right">{{pet.canLiveWithOtherDogs}}</td>
                </tr>
                <tr>
                    <td class="td-left">Czy może mieszkać z kotami</td>
                    <td class="td-right">{{pet.canLiveWithOtherCats}}</td>
                </tr>
                <tr>
                    <td class="td-left">Czy może mieszkać z dziećmi</td>
                    <td class="td-right">{{pet.canLiveWithKids}}</td>
                </tr>
                <tr>
                    <td class="td-left">Aktywność (w skali 1-10)</td>
                    <td class="td-right">{{pet.activity}}</td>
                </tr>
                <tr>
                    <td class="td-left">Umaszczenie</td>
                    <td class="td-right">{{pet.coat}}</td>
                </tr>
                <tr>
                    <td class="td-left">Sierść</td>
                    <td class="td-right">{{pet.fur}}</td>
                </tr>
                <tr>
                    <td class="td-left">Choroby</td>
                    <td>{{pet.isIll}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import api from "../backend-api"

    export default {
        name: "PetInfo",
        data() {
            return {
                pet: ''
            }
        },
        mounted() {
            this.readPet();
        },

        methods: {
            getPetId() {
                var splitted = window.location.href.split('/');
                return splitted[splitted.length - 1];

            },
            readPet() {
                api.readPet(this.getPetId()).then(response => {
                    this.pet = response;
                });
            }
        }
    }
</script>

<style scoped>
    .pet-info-paragraph {
        display: inline-block;
        margin-bottom: 4px;
    }

    .pet-info-paragraph:after {
        content: '';
        display: block;
        width: 100%;
        height: 3px;
        background-color: #17a2b8;
    }
    .td-left {
        font-weight: bold;
    }

</style>
