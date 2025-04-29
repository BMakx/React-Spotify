import axios from "axios"


export async function CreatePlaylist(token, user_set, playlist_id_set)  {
    const {data} = await axios.get("https://api.spotify.com/v1/me",
    {
    
        headers: {
            Authorization: `Bearer ${token}`,
            
        }
      })
      setTimeout(() => {
        user_set(data.id)
        console.log("Moje ID =" + data.id)
    }, 100)
    { 
    const reqOptions = 
    {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
            name: "SpotEx",
            description : "Ostatnie 10 sluchanych utworów"
        })
    }
    fetch(`https://api.spotify.com/v1/users/${data.id}/playlists`, reqOptions)
    .then(response => response.json())
    .then(data => {
        playlist_id_set(data.id)
        console.log("ID Playlisty = "+ data.id)
    })
  }
  }