import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ManageUsers from '@/components/user/ManageUsers'
import EditUser from '@/components/user/EditUser'
import AddUser from '@/components/user/AddUser'
import ManagePets from '@/components/pet/ManagePets'
import EditPet from '@/components/pet/EditPet'
import AddPet from '@/components/pet/AddPet'
import Register from '@/components/user/Register'

Vue.use(Router);

const router = new Router({
    mode: 'history', // uris without hashes #, see https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode
    routes: [
        { path: '/', component: Home },
        {path: '/manageUsers', component:ManageUsers},
        {path: '/editUser/:userId', component:EditUser, name: 'editUser'},
        {path: '/addUser', component:AddUser},
        {path: '/managePets', component:ManagePets},
        {path: '/editPet/:petId', component:EditPet, name:'editPet'},
        {path: '/addPet', component:AddPet},
        {path: '/register', component:Register}

    ]
});

export default router;