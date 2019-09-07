import axios from 'axios'

const AXIOS = axios.create({
    baseURL: `/api`
});


export default {

    createUser(user, token) {
        return AXIOS.post('/user', {
                username: user.username,
                email: user.email,
                role: user.role,
                password: user.password
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
    },
    registerUser(user) {
        return AXIOS.post('/register', {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        })
    },
    loginUser(user) {
        return AXIOS.post('/login', {
            username: user.username,
            password: user.password
        })
    },
    readUsers(token) {
        return AXIOS.get('/user', {
            headers: {
                Authorization: 'Bearer ' + token
            }

        });
    },

    readUser(userId, token) {
        return AXIOS.get('/user/' + userId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
    ,

    updateUser(userId, user, token) {
        return AXIOS.put('/user/' + userId, {username: user.username, email: user.email, role: user.role}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
    ,

    deleteUser(userId, token) {
        return AXIOS.delete('/user/' + userId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
    ,

    readRoles() {
        return AXIOS.get('/role');
    }
    ,

    readRole(name) {
        return AXIOS.get('/role/' + name);
    }
    ,

    createPet(formData, token) {
        return AXIOS.post('/pet',
            formData
            ,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization : 'Bearer ' + token,
                    boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW'
                }
            }
        );
    }
    ,

    readPets() {
        return AXIOS.get('/pet');
    }
    ,
    readPet(petId) {
        return AXIOS.get('/pet/' + petId);
    }
    ,

    updatePet(petId, pet, token) {
        return AXIOS.put('/pet/' + petId, {
            name: pet.name, takeInDate: pet.takeInDate, species: pet.species,
            sex: pet.sex, age: pet.age,
            canLiveWithOtherDogs: pet.canLiveWithOtherDogs,
            canLiveWithOtherCats: pet.canLiveWithOtherCats,
            canLiveWithKids: pet.canLiveWithKids,
            activity: pet.activity,
            diseases: pet.diseases
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
    ,

    deletePet(petId, token) {
        return AXIOS.delete('/pet/' + petId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
    ,

    readDiseases() {
        return AXIOS.get('/disease');
    }
    ,

    readPhoto(photoId) {
        return AXIOS.get('/photos/' + photoId);
    }
    ,

    findPet(form) {
        return AXIOS.post('/findPet', {
            species: form.species,
            sex: form.sex,
            age: form.age,
            canLiveWithOtherDogs: form.canLiveWithOtherDogs,
            canLiveWithOtherCats: form.canLiveWithOtherCats,
            canLiveWithKids: form.canLiveWithKids,
            activity: form.activity,
            diseases: form.diseases,
            coat: form.coat,
            fur: form.fur
        });
    }

    /*getToken(){
            var self = this;
            var token = this.$session.get("token");
            console.log(token);
            return (this.$session.exists("token")) ? self.$session.get("token") : '';
        Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
    }*/
}


