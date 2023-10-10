import "./Welcome.css";
import welcome from "./../../../assets/welcome.png";

const Welcome = () => {
  return (
    <div className="welcome_box">
      <div className="welcome_text">
        <h1>Welcome to Polytasking!</h1>
        <h2>Streamlining life's maintenace</h2>
      </div>
      <div className="welcome_graphic">
        <img alt="graphic" src={welcome} />
      </div>
    </div>
  );
};

export default Welcome;
