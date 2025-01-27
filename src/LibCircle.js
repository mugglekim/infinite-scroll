import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LibCircle = ({percentage}) => {
  return (
    <div className='lib-circle'>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: '2rem',
          pathColor: `#adff2f`,
          textColor: '#000',
          trailColor: '#d6d6d6',
        })}  
      />
      <p className='circle-txt'>평점</p>
    </div>
  );
};

export default LibCircle;