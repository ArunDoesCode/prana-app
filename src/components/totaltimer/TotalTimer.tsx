interface TimerProps {
  formattedTotalTime: string; // Add the formatted total time prop
}

const TotalTimer: React.FC<TimerProps> = ({
  formattedTotalTime,
}) => {
  return (
    <div>
      <div>
        <h1>Expected Time</h1>
        <h4>{formattedTotalTime}</h4> {/* Display the formatted total time */}
      </div>
    </div>
  );
};

export default TotalTimer;
