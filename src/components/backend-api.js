import axios from 'axios'

const AXIOS = axios.create({
  baseURL: `/api`
});


export default {

    createUser(user){
      return AXIOS.post('/user',{username:user.username, email:user.email, role:user.role});
    },
    registerUser(user){
      return AXIOS.post('/user',{
          username:user.username,
          email:user.email,
          password:user.password,
          role:user.role
      })
    },
    readUsers() {
        return AXIOS.get('/user');
    },

    readUser(userId){
        return AXIOS.get('/user/'+userId);
    },

    updateUser(userId, user){
        return AXIOS.put('/user/'+userId, {username:user.username, email:user.email, role:user.role});
    },

    deleteUser(userId){
        return AXIOS.delete('/user/'+userId);
    },

    createPet(pet){
      return AXIOS.post('/pet',{name: pet.name,
          takeInDate: pet.takeInDate,
          species: pet.species,
          sex: pet.sex,
          age: pet.age,
          canLiveWithOtherDogs: pet.canLiveWithOtherDogs,
          canLiveWithOtherCats: pet.canLiveWithOtherCats,
          canLiveWithKids: pet.canLiveWithKids,
          activity: pet.activity,
          diseases: pet.diseases});
    },

    readPets(){
        return AXIOS.get('/pet');
    },
    readPet(petId){
        return AXIOS.get('/pet/'+petId);
    },

    updatePet(petId, pet){
        return AXIOS.put('/pet/'+petId,{name:pet.name, takeInDate:pet.takeInDate, species:pet.species,
            sex:pet.sex, age:pet.age,
            canLiveWithOtherDogs:pet.canLiveWithOtherDogs,
            canLiveWithOtherCats:pet.canLiveWithOtherCats,
            canLiveWithKids:pet.canLiveWithKids,
            activity:pet.activity,
            diseases:pet.diseases});
    },

    deletePet(petId){
        return AXIOS.delete('/pet/'+petId);
    }
}


