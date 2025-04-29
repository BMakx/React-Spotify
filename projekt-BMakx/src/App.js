import axios from "axios";
import {useEffect} from 'react';
import useState  from 'react-usestateref';
import {CreatePlaylist} from "./Create_playlist.js"
import {PopulateLastPlayed} from "./Populate.js"
import {GetAudioInfo, AvgRecc, ReccomendationPlaylist,ReccPlayCre} from "./Reccomendation.js"
import Button from "./komp/przycisk.tsx";
import logo from './komp/logo.png';

function App() {
  
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const response_type = "token";
  const [token, token_set] = useState("")
  const [key_search, key_set] = useState("")
  const [album, album_set] = useState([])
  const [artist, artist_set] = useState([])
  const [l_played, l_played_set] = useState([])
  const [scope, scope_set] = useState(["user-read-currently-playing", "user-read-recently-played", "user-read-playback-state", "user-read-private", "user-read-email","playlist-modify-public","playlist-modify-private"])
  const [user, user_set] = useState([{}])
  const [playlist_id, playlist_id_set] = useState([])
  const [song_id, song_id_set] = useState([])
  const [amount, amount_set] = useState([])

  const [string, setstring,strref] = useState([{}])
  const [string2, setstring2,str2ref] = useState([{}])
  const [strID, setstring3,str3ref] = useState([{}])

  const [danceability, setdanceability] = useState(0)
  const [energy, setenergy] = useState(0)
  const [loudness, setloudness] = useState(0)
  const [speechiness, setspeechiness] = useState(0)
  const [acousticness, setacousticness] = useState(0)
  const [instrumentalness, setinstrumentalness] = useState(0)
  const [liveness, setliveness] = useState(0)
  const [valence, setvalence] = useState(0)
  const [playlist_id2, playlist_id_set2,playlistid2ref] = useState([])
  const [strid, setstrid,stridref] = useState([{}])


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
  }

  token_set(token)
  }, [])

 const login = () => {
  window.location = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join("%20")}&response_type=${response_type}&show_dialog=true`
 }
  const logout = () => {
    localStorage.clear()
}


const album_search = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", 
  {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: key_search,
          type: "album"
      }
  })

  album_set(data.albums.items)
}
const artist_search = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", 
  {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: key_search,
          type: "artist"
      }
  })

  artist_set(data.artists.items)
}

const show_album = () => {
  return album.map(albums => (
      <div key={albums.id}>
          {albums.images.length ? <img width={"100%"} src={albums.images[0].url} alt=""/> : <div>Error</div>}
          {albums.name}
      </div>
  ))
}

const show_artist = () => {
return artist.map(artists => ( 
  <div key={artists.id}>
    {artists.images.length ? <img width={"100%"} src={artists.images[0].url} alt=""/> : <div>Error</div>}
    {artists.name}
  </div>
))

}


  

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} className="App">
      <header className="App-header">
      <img src={logo} alt="Logo" />
      <h1>SpotEx</h1>
                {!token ?
                    <button onClick={login}>Login</button>
                    : <button onClick={logout}>Logout</button>}
      {token &&
      <form onSubmit={album_search}>
      <input type="text" onChange={e => key_set(e.target.value)}/>
      <button type={"submit"}>Search Albums</button>
      {show_album()}
      </form>
      }


        {token &&
      <form onSubmit={artist_search}>
      <Button 
      border="2px solid black"
      background="green"
      color="#1DB954"
      radius="10px"
      width="100px" type={"submit"}>Search Artists</Button>
      {show_artist()}
      </form>

        }


      {token && <Button 
      border="2px solid black"
      background="green"
      color="#1DB954"
      radius="10px"
      width="100px"
      
      onClick={() =>
     {
      
      CreatePlaylist(token, user_set, playlist_id_set)
     }}>

    Create empty playlist</Button>}

    {token && <input type ="number" onChange={e => {amount_set(e.target.value)
console.log(amount)}}/>
    }
    {token &&
    
    <Button 
    border="2px solid black"
    background="green"
    color="#1DB954"
    radius="10px"
    width="100px" onClick={() => {PopulateLastPlayed(token,playlist_id,amount,setstring,setstring3)}}>Last Played</Button>
    }
    {token &&
    <Button 
    border="2px solid black"
    background="green"
    color="#1DB954"
    radius="10px"
    width="120px" onClick={() => 
      {
      GetAudioInfo(token,string,setstring2)
      setTimeout(() => {
      AvgRecc(stridref,string2,token,strID,setdanceability,setenergy,setloudness,setspeechiness,setacousticness,setinstrumentalness,setliveness,setvalence,setstrid)
      ReccPlayCre(token,user,playlist_id_set2)
      setTimeout(() => {
      ReccomendationPlaylist(token,stridref,playlist_id2,playlistid2ref)
      },500)  
    }, 1000)
      }
      }>Reccomendation</Button>
    }


      </header>
    </div>
  );
}

export default App;
