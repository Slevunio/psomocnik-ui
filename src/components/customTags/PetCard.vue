<template>
    <router-link :to="{name: route, params:{petId:petId}}">
        <div class="card">
            <div class="card-header"><h4>{{name}}</h4></div>
            <div class="card-body bg-psomocnik text-center">
                <div v-if="this.image!==undefined">
                    <img class="card-img-top" :src="url">
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    import api from "../backend-api"
    export default {
        name: "pet-card",
        props: [
            'petId',
            'image',
            'name',
            'route'
        ],
        data() {
            return {
                url: ''
            }
        },
        mounted() {
            this.getUrl();
        },
        methods: {
            getUrl() {
                /*let self=this;
                api.readPhoto(self.image).then(response=>{
                    this.url=response.data;*});*/
                this.url="/api/photos/"+this.image;
            }

        }


    }
</script>

<style scoped>

        .card {
            display: inline-block;
        }

        .card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            background: transparent;
            border: 5px solid transparent;
        }

        .card:hover:before {
            animation-name: card-animate;
            animation-duration: 0.4s;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
        }

        @keyframes card-animate {
            0% {
                width: 0;
                height: 0;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
            50% {
                width: 100%;
                height: 0;
                border-top-color: #3ed4c2;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
            100% {
                width: 100%;
                height: 100%;
                border-top-color: #3ed4c2;
                border-right-color: #3ed4c2;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
        }

        .card:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            background: transparent;
            border: 5px solid transparent;
        }

        .card:hover:after {
            animation-name: card-animate2;
            animation-duration: 0.4s;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
        }

        @keyframes card-animate2 {
            0% {
                width: 0;
                height: 0;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
            50% {
                width: 0;
                height: 100%;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: #3ed4c2;
            }
            100% {
                width: 100%;
                height: 100%;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: #3ed4c2;
                border-left-color: #3ed4c2;
            }
        }

        .card-body {
            padding: 0rem;
        }


        h4 {
            font-family: "Trebuchet MS";
            font-weight: bold;
            font-size: 30px;
            color: #1e2226;
        }

        .card:hover {
            background-color: rgba(62, 212, 194, 0.2);
            padding-top: 2px;
        }

</style>