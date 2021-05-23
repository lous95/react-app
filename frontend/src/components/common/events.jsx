const Events = ({
    event: { _id, eventAddress, eventDescription, eventName, eventPhone }, likeEventFunc, likes, disable
 }) => {
   return (
     <div className="card col-md-offset-6 col-lg-offset-4 mr-5 mt-3" style={{ width: "18rem", borderRadius: "10px" }}>
       <div className="card-body">
         <h5 className="card-title">{eventName}</h5>
         <p className="card-text">Description: {eventDescription}</p>
         <address>Location: {eventAddress}</address>
         <p>Phone: {eventPhone}</p>
         <div>
         <button onClick={likeEventFunc} disabled={disable} className="like-btn"><i class="far fa-thumbs-up"></i> &nbsp;<span className="number-of-likes">{likes}</span></button>
         </div>
       </div>
     </div>
   );
 };
 
 export default Events;
