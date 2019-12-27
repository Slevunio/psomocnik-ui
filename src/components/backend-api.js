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

    updatePet(formData, petId) {
        return $.ajax({
            method: "PUT",
            url: "/api/pet/" + petId,
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW'
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

    deletePhoto(id) {
        return $.ajax({
            method: "DELETE",
            url: "/api/photos",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: {
                id: id
            }
        });
    },

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

    checkUsernameExists(username) {
        return $.ajax({
            method: "GET",
            url: "/api/checkUsernameExists",
            data: {
                username: username
            }
        });
    },
    checkEmailExists(email) {
        return $.ajax({
            method: "GET",
            url: "/api/checkEmailExists",
            data: {
                email: email
            }
        });
    }
}


