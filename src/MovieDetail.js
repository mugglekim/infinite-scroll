// import CircleBar from "./CircleBar";
import LibCircle from "./LibCircle";

const MovieDetail = ({info,onClose}) => {
  const style={
    backgroundImage: (`url(https://image.tmdb.org/t/p/w500${info.backdrop_path})`),
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <div className="movie-detail">
      <div className="popup" style={style}>
        <span className="close-icon" onClick={onClose}>❌</span>
        <div className="popup-title">
          <div className="title-left">
            <h2>{info.title}</h2>
            <p className="release-date">개봉일 <span>{info.release_date.replaceAll("-",".")}</span></p>
          </div>
          <LibCircle percentage={Math.floor(info.vote_average*10)}/>
        </div>
        {/* <ul>
          <li>평점 <span>{info.vote_average}</span></li>
          <li><CircleBar percent={info.vote_average*10}/></li>
        </ul> */}
        {/* <img src={`https://image.tmdb.org/t/p/w500${info.backdrop_path}`} alt={info.title}/> */}
        <p>{info.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;