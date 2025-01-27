import axios from "axios";
import { useEffect, useState } from "react";
import MovieDetail from './MovieDetail';

const API_KEY='decc67e8f617c228c9c976bb05cd39ca';
const GenreList = () => {
  const [genres, setGenres]=useState([]);
  const [selected,setSelected]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState(null);
  const [movies,setMovies]=useState([]);
  const [isModalOpen, setIsModalOpen]=useState(false);
  const [viewObj,setViewObj]=useState(null);
  const fetchGenreList=async()=>{
    const url=`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
    setIsLoading(true);
    try{
      const response=await axios.get(url);
      console.log(response.data.genres);
      setGenres(response.data.genres);
    } catch(err){
      setErrorMsg('장르 리스트 가져오기 중 실패');
    }
  }
  useEffect(()=>{
    fetchGenreList();
  },[]);
  const handlewrap=(id)=>{
    // let result=[];
    // if(selected.includes(id)){
    //   result=selected.filter((list)=>{
    //     return list !== id;
    //   })
    // } else{
    //   result=[...selected,id];
    // }
    // setSelected(result);
    setSelected((prev)=>{
      return prev.includes(id)? prev.filter((list)=>{return list!==id}):[...prev,id]
    });
  }
  const fetchSearch=async()=>{
    const GENRE_ID=selected.join(",");
    const url=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}&language=ko-KR`;
    
    try{
      const response=await axios.get(url);
      setMovies(response.data.results);
      console.log(response.data.results);
      setIsLoading(false);
    } catch(error){
      setErrorMsg('장르별 영화정보 가려오기 실패');
    }
  }
  const handleSearch=()=>{
    if(selected.length<=0) return;
    setIsLoading(true);
    fetchSearch();
  }
  const handleClick=(info)=>{
    setIsModalOpen(true);
    setViewObj(info);
  }
  const handleClose=()=>{
    setIsModalOpen(false);
    setViewObj(null);
  }
  return (
    <div className="genre-list">
      <div className="list-wrap">
        {
          genres.map((list)=>{
            return <button
                      key={list.id}
                      className={selected.includes(list.id)? "active":''}
                      onClick={()=>{handlewrap(list.id)}}>
                        {list.name}
                    </button>
          })
        }
      </div>
      <button onClick={handleSearch} className="search-btn">검색</button>
      {
        isLoading && <p>Loading...</p>
      }
      {
        errorMsg && <p>{errorMsg}</p>
      }
      <div className="container">
        {
          movies.map((list,idx)=>{
            return (
              <div key={idx} className="movie-card" onClick={()=>{handleClick(list)}}>
                <img src={`https://image.tmdb.org/t/p/w500${list.poster_path}`} alt={list.title}/>
                <div className="overlay">{list.title}</div>
              </div>
            )
          })
        }
      </div>
      {
        isModalOpen && <MovieDetail info={viewObj} onClose={handleClose}/>
      }
    </div>
  );
};

export default GenreList;