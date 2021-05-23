import PageHeader from "./common/pageheader";

const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <PageHeader titleText="Events Application"/>
                <div className="row">
                    <div className="col-12 ml-3">
                        This Application is for creating any kind of events. Share your events with everyone and check how many will attend your event. All you need to do is 
                        create a new account and start adding Events!.  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;