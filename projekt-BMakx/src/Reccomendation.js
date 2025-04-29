import axios from "axios";
import useState  from 'react-usestateref';

export async function GetAudioInfo(token,string,setstring2){
    const {data} = await axios.get("https://api.spotify.com/v1/audio-features/",
    {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            ids: `${string}`
        }
    })
    
    console.log("Audio Features -" + data.audio_features)
    setstring2(data.audio_features)
}

export async function AvgRecc (stridref,string,token,string2,setdanceability,setenergy,setloudness,setspeechiness,setacousticness,setinstrumentalness,setliveness,setvalence,setstrid) {

    var i = 0
    var danceability = 0
    var energy = 0
    var loudness = 0
    var speechiness = 0
    var acousticness = 0
    var instrumentalness = 0
    var liveness = 0
    var valence = 0
    var strid2 = ""
    for (i in string) {
        danceability += string[i].danceability
        energy += string[i].energy
        loudness += string[i].loudness
        speechiness += string[i].speechiness
        acousticness += string[i].acousticness
        instrumentalness += string[i].instrumentalness
        liveness += string[i].liveness
        valence += string[i].valence
    }
   danceability = danceability/string.length
    energy = energy/string.length
    loudness = loudness/string.length
    speechiness = speechiness/string.length
    acousticness = acousticness/string.length
    instrumentalness = instrumentalness/string.length
    liveness = liveness/string.length
    valence = valence/string.length

    setdanceability(danceability)
    setenergy(energy)
    setloudness(loudness)
    setspeechiness(speechiness)
    setacousticness(acousticness)
    setinstrumentalness(instrumentalness)
    setliveness(liveness)
    setvalence(valence)
    console.log(danceability)
    console.log(energy)
    console.log(loudness)
    console.log(speechiness)
    console.log(acousticness)
    console.log(instrumentalness)
    console.log(liveness)
    console.log(valence)

    const {data} = await axios.get("https://api.spotify.com/v1/recommendations",
    {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            limit: 10,
            target_danceability: danceability,
            target_energy: energy,
            target_loudness: loudness,
            target_speechiness: speechiness,
            target_acousticness: acousticness,
            target_instrumentalness: instrumentalness,
            target_liveness: liveness,
            target_valence: valence,
            seed_tracks: `${string2}`
            
        }
    })
    for (i in data.tracks) {
        console.log("Piosenka - " + data.tracks[i].id)
        strid2 += '"spotify:track:' + data.tracks[i].id  + '",'

        
    }
    strid2 = strid2.slice(0, -1)
    console.log("String piosenek -" + strid2)
    setstrid(strid2)
}

export  function ReccPlayCre (token,user,playlist_id_set2) {
    const reqOptions = 
    {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
            name: "SpotEx Reccomendation",
            description : "Rekomendacje od SpotEx"
        })
    }
    fetch(`https://api.spotify.com/v1/users/${user}/playlists`, reqOptions)
    .then(response => response.json())
    .then(data => {
        playlist_id_set2(data.id)
        console.log("ID playlisty rekomendacji -"+ data.id)
    })
    
}
export function ReccomendationPlaylist (token,string,playlist_id2,playlistid2ref) {
    console.log(string.current)
    const obj = JSON.parse('{"uris": ['+ string.current +']}')
    console.log("Polecone piosenki -" + JSON.stringify(obj))
    const reqOptions2 = {
      method: "POST",
      headers: {
          "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(obj)
      }
    
  const response = fetch(`https://api.spotify.com/v1/playlists/${playlistid2ref.current}/tracks`, reqOptions2)
  console.log('Id rekomendacji playlista - ' + playlistid2ref.current)
  console.log(string.current)
  return (
    <body>
    <div>
        <h1>Rekomendacje</h1>
        <h2>Twoja playlista z rekomendacjami została utworzona</h2>
        <h2>Możesz ją znaleźć w twoich playlistach</h2>
    </div>
    </body>
)
}