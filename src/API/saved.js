import axios from "axios"


export async function addSavedAlbum(post_data) {

    try {

        const response = await axios.post("https://album-review-app-lnmu.onrender.com/saved-albums", post_data)

        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log('Error adding album to database: ', error)
        return "error"
    }

}


export async function getSavedAlbums(userid) {
    try {
        const response = await axios.get(`https://album-review-app-lnmu.onrender.com/saved-albums/${userid}`)
        return response.data
    } catch (error) {
        console.log("Error fetching saved albums: ", error)
        return "error"
    }
}

export async function deleteSavedAlbum(id) {
    try {
        const response = await axios.delete(`https://album-review-app-lnmu.onrender.com/saved-albums/${id}`)
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log("error deleting saved album:", error)
        return "error"
    }
}


export async function checkIfSaved(userid, albumid) {
    try {
        const response = await axios.get(`https://album-review-app-lnmu.onrender.com/users/${userid}/saved-albums/${albumid}`)
        if (response.status === 200) {
            return response.data._id
        }
    } catch (error) {
        console.log("error checking saved state: ", error)
    }
}
