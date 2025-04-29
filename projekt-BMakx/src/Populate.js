import axios from "axios";
import useState  from 'react-usestateref';


export async function PopulateLastPlayed (token, playlist_id,amount,setstring,setstring3) {
    const {data} = await axios.get("https://api.spotify.com/v1/me/player/recently-played",
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            limit: `${amount}`,
            
        }
    })
    let i = 0
    let str = ""
    let strid = ""
    console.log("Last Played = " + data)
    for (i in data.items) {
      console.log("ID" + i + "=" + data.items[i].track.id)
      str += '"spotify:track:' + data.items[i].track.id  + '",'
      strid +=  data.items[i].track.id + ','
    }
    str = str.slice(0, -1)
    console.log("Pocięty string url = " + str)
    const obj = JSON.parse('{"uris": ['+ str +']}')
    console.log("Objekt piosenek do dodania -" + JSON.stringify(obj))
    const reqOptions2 = {
      method: "POST",
      headers: {
          "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(obj)
      }
    
  const response = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, reqOptions2)
  
  console.log(strid)
  setstring(strid)
  let str2 = strid.split(",")[0]
  setstring3(str2)
  console.log("Osateczny string piosenek -" + str2)
  }

  
