const Events = ({
    event: { _id, eventAddress, eventDescription, eventName, eventPhone }, likeEventFunc, likes, disable
 }) => {
   return (
     <div className="card col-md-6 col-lg-4 m-4" style={{ width: "18rem" }}>
       <div className="card-body">
         <h5 className="card-title">{eventName}</h5>
         <p className="card-text">{eventDescription}</p>
         <address>{eventAddress}</address>
         <p>{eventPhone}</p>
         <button onClick={likeEventFunc} disabled={disable}>Like me!</button>
         <h6>{likes}</h6>
       </div>
     </div>
   );
 };
 
 export default Events;
