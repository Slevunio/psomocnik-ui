<template>
    <div id="home">
        <div id="photos" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li class="active" data-target="#photos" data-slide-to="0"></li>
                <li data-target="#photos" data-slide-to="1"></li>
                <li data-target="#photos" data-slide-to="2"></li>
            </ul>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="@/assets/images/home_cat&dog.jpg" class="img-fluid">
                    <router-link to="/findPet">
                        <div class="carousel-caption bg-light link">
                            <h1 class="display-1 text-secondary text-center">
                                Wypełnij formularz
                            </h1>
                        </div>
                    </router-link>
                </div>
                <div class="carousel-item">
                    <img src="@/assets/images/home_dog&glasses.jpg" class="img-fluid">
                    <div class="carousel-caption bg-light">
                        <h1 class="display-1 text-secondary text-center">Przejrzyj dopasowania</h1>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="@/assets/images/home_cat.jpg" class="img-fluid">
                    <router-link to="/contact">
                        <div class="carousel-caption bg-light link">
                            <h1 class="display-1 text-secondary text-center">Przyjedź poznać nowego kumpla</h1>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .carousel-indicators li {
        background-color: #007bff;
    }

    #photos {
        width: 100%;
    }

    .carousel-caption {
        margin-bottom: 20%;
        opacity: 0.5;
    }

    .link:hover {
        opacity: 0.65;
    }
</style>