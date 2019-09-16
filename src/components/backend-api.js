const clientId = "psomocnik-ui";
const clientSecret = "secret";


export default {
    login(username, password) {
        return $.ajax({
            method: "POST",
            url: "/api/oauth/token",
            username: "psomocnik-ui",
            password: "secret",
            /*headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },*/
            data: {
                username: username,
                password: password,
                grant_type: "password"
            }
        })
    },
    createUser(user) {
        return $.ajax({
            method: "POST",
            url: "/api/user",
            data: JSON.stringify({
                username: user.username,
                email: user.email,
                role: user.role,
                password: user.password
            }),
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
    },
    registerUser(user) {
        return $.ajax({
            method: "POST",
            url: "/api/register",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            })
        })
    },
    readUsers() {
        return $.ajax({
            method: "GET",
            url: "/api/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    },
    readUser(userId) {
        return $.ajax({
            method: "GET",
            url: "/api/user/" + userId,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    },
    updateUser(userId, user) {
        return $.ajax({
            method: "PUT",
            url: "/api/user/" + userId,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                username: user.username,
                email: user.email,
                role: user.role
            })
        });
    },
    deleteUser(userId) {
        return $.ajax({
            method: "DELETE",
            url: "/api/user/" + userId,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    },
    readRoles() {
        return $.ajax({
            method: "GET",
            url: "/api/role",
            /*headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }*/
        })
    },

    readRole(name) {
        return $.ajax({
            method: "GET",
            url: "/api/role/" + name,
            /*headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }*/
        })
    },
    createPet(formData) {
        return $.ajax({
            method: "POST",
            url: "/api/pet",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                //'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + localStorage.getItem("token"),
                boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        });
    },

    readPets() {
        return $.ajax({
            method: "GET",
            url: "/api/pet"/*,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }*/
        })
    },
    readPet(petId) {
        return $.ajax({
            method: "GET",
            url: "/api/pet/" + petId/*,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }*/
        })
    },

    updatePet(petId, pet) {
        return $.ajax({
            method: "PUT",
            url: "/api/pet/" + petId,
            data: JSON.stringify({
                name: pet.name, takeInDate: pet.takeInDate, species: pet.species,
                sex: pet.sex, age: pet.age,
                canLiveWithOtherDogs: pet.canLiveWithOtherDogs,
                canLiveWithOtherCats: pet.canLiveWithOtherCats,
                canLiveWithKids: pet.canLiveWithKids,
                activity: pet.activity,
                diseases: pet.diseases
            }),
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        });
    },

    deletePet(petId) {
        return $.ajax({
            method: "DELETE",
            url: "/api/pet/" + petId,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    },

    readDiseases() {
        return $.ajax({
            method: "GET",
            url: "/api/disease",
            /*headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }*/
        })
    },

    readPhoto(photoId) {
        return $.ajax({
            method: "GET",
            url: "/api/photos/" + photoId/*,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }*/
        })
    },

    findPet(form) {
        return $.ajax({
            method: "POST",
            url: "/api/findPet",
            data: JSON.stringify({
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
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}


