<template>
    <div class="container-fluid" style="margin-top: 50px">
        <div id="photos" class="carousel slide" data-ride="carousel">
            <!--Indicators (w dolnej czesci karuzeli, pokazuja ilosc zdjec i na ktorym sie aktualnie znajduje)-->
            <ul class="carousel-indicators">
                <li v-for="(photo, index) in pet.photos" data-target="#photos" data-slide-to="'index'"></li>
            </ul>
            <!--pokaz slajdow-->
            <div class="carousel-inner">
                <div class="carousel-item" v-for="(photo, index) in pet.photos" :class="{active: index==0}">
                    <img :src="photo" class="img-fluid"><!--href wskazujacy na url-->
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
            <h1 class="display-4 text-center">{{pet.pet.name}}</h1>
            <br>
            <div>
                <h2><p class="pet-info-paragraph">Opis</p></h2>
            </div>
            <br>
            <div style="margin-left: 10px">
                <p>Krótki opis:</p>
                <p>- czy potrafi chodzić na smyczy</p>
                <p>- ogólne nastawienie do ludzi i innych zwierząt</p>
                <p>- doświadczenia wolontariuszy opiekujących się zwierzakiem</p>
            </div>
            <br>
            <div>
                <h2><p class="pet-info-paragraph">Cechy szczególne</p></h2>
            </div>
            <br>
                <table>
                    <tr>
                        <td class="td-left">Płeć</td>
                        <td class="td-right">{{pet.pet.sex}}</td>
                    </tr>
                    <tr>
                        <td class="td-left">Data przyjęcia</td>
                        <td class="td-right">{{formattedDate}}</td>
                    </tr>
                    <tr>
                        <td class="td-left">Wiek</td>
                        <td class="td-right">{{pet.pet.age}}</td>
                    </tr>
                    <tr>
                        <td class="td-left">Czy może mieszkać z psami</td>
                        <td class="td-right">{{pet.pet.canLiveWithOtherDogs}}</td>
                    </tr>
                    <tr>
                        <td class="td-left">Czy może mieszkać z kotami</td>
                        <td class="td-right">{{pet.pet.canLiveWithOtherCats}}</td>
                    </tr>
                    <tr>
                        <td class="td-left">Czy może mieszkać z dziećmi</td>
                        <td class="td-right">{{pet.pet.canLiveWithKids}}</td>
                    </tr>
                    <tr>
                        <td class="td-left">Aktywność (w skali 1-10)</td>
                        <td class="td-right">{{pet.pet.activity}}</td>
                    </tr>
                    <tr style="border-bottom: none">
                        <td class="td-left">Choroby</td>
                        <td class="td-right"><span v-for="(disease, index) in pet.pet.diseases"><span id="diseases">{{disease.name}}</span><span
                                v-if="index!==pet.pet.diseases.length-1">, </span></span></td>
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
                pet: '',
                fotmattedDate: ''
            }
        },
        mounted() {
            this.readPet();
        },
        beforeUpdate() {
            this.formatDate();
        },
        methods: {
            getPetId() {
                var splitted = window.location.href.split('/');
                return splitted[splitted.length - 1];

            },

            readPet() {
                api.readPet(this.getPetId()).then(response => {
                    this.pet = response.data;
                });
            },

            formatDate() {
                var splitted = this.pet.pet.takeInDate.split('T');
                this.formattedDate = splitted[0];
            }
        }
    }
</script>

<style scoped>
    .carousel-item {
        width: 100%;
        height: 400px;
    }

    .display-4 {
        font-family: "Goudy Stout";
    }

    h2 {
        font-family: "Arial Rounded MT Bold";
    }

    .pet-info-paragraph {
        display: block;
        margin-bottom: 4px;
    }

    .pet-info-paragraph:after {
        content: '';
        display: block;
        width: 30%;
        height: 3px;
        background-color: #3ed4c2;
    }
    table{
        margin: auto;
        text-align: center;
        font-family: "Arial Rounded MT Bold";
        font-size: 28px;

    }
    tr {
        border-bottom: 2px solid #1e2226;

    }
    tr:hover{
        background-color: rgba(30, 34, 38, 0.6);
    }

    .td-left {
        padding: 10px 50px 10px 50px;
        border-right: 2px solid #1e2226;
        font-weight: bold;
    }

    .td-right {
        padding: 10px 50px 10px 50px;
    }


</style>