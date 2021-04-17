import { Link } from "react-router-dom";

const Event = ({
   event: { _id, eventAddress, eventDescription, eventName, eventPhone }, eventDeleteFunction
}) => {
  return (
    <div className="card col-md-6 col-lg-4 m-4" style={{ width: "18rem" }}>
      {/* <img className="card-img-top" src={bizImage} alt="Business logo" /> */}
      <div className="card-body">
        <h5 className="card-title">{eventName}</h5>
        <p className="card-text">{eventDescription}</p>
        <address>{eventAddress}</address>
        <p>{eventPhone}</p>
        <Link className="btn btn-primary" to={`./edit/${_id}`}>
          Edit
        </Link>
        <button className="btn btn-danger ml-3" onClick={eventDeleteFunction}>Delete</button>
      </div>
    </div>
  );
};

export default Event;