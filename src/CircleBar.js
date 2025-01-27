const CircleBar = ({percent}) => {
  console.log(percent);
  const style={
    backgroundImage: `conic-gradient(
                    #adff2f 0% ${percent}%,
                      #ccc ${percent}% 100%  )`
  }
  return (
    <div className="circlebar">
      <div class="progress" style={style}>
        <div class="label">
          <p>{Math.floor(percent)}%</p>
        </div>
      </div>
    </div>
  );
};

export default CircleBar;