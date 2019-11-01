const clientId = "psomocnik-ui";
const clientSecret = "secret";


export default {
    login(username, password) {
        return $.ajax({
            method: "POST",
            url: "/api/oauth/token",
            username: "psomocnik-ui",
            password: "secret",
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
            data: JSON.stringify(user),
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
            data: JSON.stringify(user)
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
            data: JSON.stringify(user)
        });
    },
    deleteUsers(usersIds) {
        return $.ajax({
            method: "DELETE",
            url: "/api/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: {
                ids: JSON.stringify(usersIds)
            }
        });
    },
    readRoles() {
        return $.ajax({
            method: "GET",
            url: "/api/role"
        })
    },

    readRole(name) {
        return $.ajax({
            method: "GET",
            url: "/api/role/" + name
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
                Authorization: "Bearer " + localStorage.getItem("token"),
                boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        });
    },

    readPets() {
        return $.ajax({
            method: "GET",
            url: "/api/pet"
        })
    },
    readPet(petId) {
        return $.ajax({
            method: "GET",
            url: "/api/pet/" + petId

        })
    },

    updatePet(petId, pet) {
        return $.ajax({
            method: "PUT",
            url: "/api/pet/" + petId,
            data: JSON.stringify(pet),
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        });
    },

    deletePets(petsIds) {
        return $.ajax({
                method: "DELETE",
                url: "/api/pet",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    ids: JSON.stringify(petsIds)

                }
            }
        )
            ;
    },

/*    readDiseases() {
        return $.ajax({
            method: "GET",
            url: "/api/disease"
        })
    }
    ,

    readPhoto(photoId) {
        return $.ajax({
            method: "GET",
            url: "/api/photos/" + photoId
        })
    }
    ,*/

    findMatchedPets(form) {
        return $.ajax({
            method: "POST",
            url: "/api/findPet",
            data: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    //////////////////////// VALIDATION ///////////////////////////

    checkUsernameExists(username){
        return $.ajax({
           method: "GET",
           url: "/api/checkUsernameExists",
           data: {
               username: username
           }
        });
    }
}


