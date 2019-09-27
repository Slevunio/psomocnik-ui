import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ManageUsers from '@/components/user/ManageUsers'
import EditUser from '@/components/user/EditUser'
import AddUser from '@/components/user/AddUser'
import Login from '@/components/user/Login'
import ManagePets from '@/components/pet/ManagePets'
import EditPet from '@/components/pet/EditPet'
import AddPet from '@/components/pet/AddPet'
import Register from '@/components/user/Register'
import OurPets from '@/components/pet/OurPets'
import PetInfo from '@/components/pet/PetInfo'
import FindPet from "@/components/pet/FindPet"
import Contact from "@/components/Contact"
import MatchedPets from "@/components/pet/MatchedPets"

Vue.use(Router);

const router = new Router({
    mode: 'history', // uris without hashes #, see https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode
    routes: [
        {path: '/', component: Home},
        {
            path: '/manageUsers', component: ManageUsers,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('role') === 'ADMIN' || localStorage.getItem('role') === 'MODERATOR') {
                    next();
                } else if (localStorage.getItem('role') === null) {
                    next("/login")
                } else {
                    next("/")
                }
            }
        },
        {
            path: '/editUser/:userId', component: EditUser, name: 'editUser', beforeEnter: (to, from, next) => {
                if (localStorage.getItem('role') === 'ADMIN') {
                    next();
                } else if (localStorage.getItem('role') === null) {
                    next("/login")
                } else {
                    next("/")
                }
            }
        },
        {
            path: '/addUser', component: AddUser, beforeEnter: (to, from, next) => {
                if (localStorage.getItem('role') === 'ADMIN' || localStorage.getItem('role') === 'MODERATOR') {
                    next();
                } else if (localStorage.getItem('role') === null) {
                    next("/login")
                } else {
                    next("/")
                }
            }
        },
        {path: '/login', component: Login},
        {
            path: '/managePets', component: ManagePets, beforeEnter: (to, from, next) => {
                if (localStorage.getItem('role') === 'ADMIN' || localStorage.getItem('role') === 'MODERATOR') {
                    next();
                } else if (localStorage.getItem('role') === null) {
                    next("/login")
                } else {
                    next("/")
                }
            }
        },
        {
            path: '/editPet/:petId', component: EditPet, name: 'editPet', beforeEnter: (to, from, next) => {
                if (localStorage.getItem('role') === 'ADMIN' || localStorage.getItem('role') === 'MODERATOR') {
                    next();
                } else if (localStorage.getItem('role') === null) {
                    next("/login")
                } else {
                    next("/")
                }
            }
        },
        {
            path: '/addPet', component: AddPet, beforeEnter: (to, from, next) => {
                if (localStorage.getItem('role') === 'ADMIN' || localStorage.getItem('role') === 'MODERATOR') {
                    next();
                } else if (localStorage.getItem('role') === null) {
                    next("/login")
                } else {
                    next("/")
                }
            }
        },
        {
            path: '/matchedPets', component: MatchedPets, beforeEnter: (to, from, next) => {
                if(localStorage.getItem('form') !== null && localStorage.getItem('form') !== 'undefined'){
                    next();
                }
                else{
                    next("/findPet");
                }
            }
        },
        {path: '/register', component: Register},
        {path: '/ourPets', component: OurPets},
        {path: '/petInfo/:petId', component: PetInfo, name: 'petInfo'},
        {path: '/findPet', component: FindPet, beforeEnter:(to, from, next)=>{
                if(localStorage.getItem('form') !== null && localStorage.getItem('form') !== 'undefined'){
                    next("/matchedPets");
                }
                else{
                    next();
                }
            }},
        {path: '/contact', component: Contact}


    ]
});

export default router;