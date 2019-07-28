<template>
    <div id="app">
        <div id="nav">
            <b-navbar variant="dark" type="dark">
                <b-navbar-brand to="/">LOGO</b-navbar-brand>

                <b-navbar-nav>
                    <b-nav-item to="/">Strona główna</b-nav-item>
                    <b-nav-item to="/ourPets">Nasze zwierzaki</b-nav-item>
                    <b-nav-item to="/form">Znajdź tego jedynego</b-nav-item>
                    <b-nav-item to="/contact">Kontakt</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/login">Zaloguj</b-nav-item>
                    <b-nav-item to="/register">Zarejestruj</b-nav-item>
                    <b-nav-item-dropdown text="Zarządzaj" right no-caret>
                        <b-dropdown-item to="/managePets">Zwierzęta</b-dropdown-item>
                        <b-dropdown-item to="/manageUsers">Użytkownicy</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'app'
    }
</script>
