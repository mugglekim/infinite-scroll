import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

const API_KEY='decc67e8f617c228c9c976bb05cd39ca';

const MovieScroll = () => {
  const [movies,setMovies]=useState([]);
  const [errorMsg,setErrorMsg]=useState(null);
  const [page,setPage]=useState(1);
  const init_info=async()=>{
    const url=`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
    try{
      const response=await axios.get(url);
      // console.log(response);
      console.log(response.data.results);
      setMovies(response.data.results);
    }catch(error){
      setErrorMsg('처음 실행하여 데이터를 가져올 때 오류 발생');
    }
  };
  useEffect(()=>{
    init_info();
  },[]);
  const fetchData=async()=>{
    console.log('추가 데이터를 가져오는 함수');
    const nextPage=page+1;
    const url=`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`;
    try{
      const response=await axios.get(url);
      const data=response.data.results;
      setMovies((prev)=>{return [...prev, ...data]});
      setPage(nextPage+1);
    } catch(error){
      setErrorMsg('추가 데이터 가져올 때 오류 발생');
    }
  }
  return (
    <InfiniteScroll
      dataLength={movies.length} //현재 데이터 길이
      next={fetchData}          //추가 데이터를 가져오는 함수
      hasMore={true}            //더 가져올 데이터가 있는지 확인
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="container">
        {
          movies.map((list,idx)=>{
            return (
              <div key={idx} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${list.poster_path}`} alt={list.title}/>
                <div className="overlay">{list.title}</div>
              </div>
            )
          })
        }
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </InfiniteScroll>
  );
};

export default MovieScroll;