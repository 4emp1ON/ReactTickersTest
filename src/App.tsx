import {Link} from "react-router-dom";
import {Component} from "react";

class App extends Component {
    render() {
        return (
            <div>
                <h1>О приложении</h1>
                <div className="links">
                    <Link to={`/`} className="link">Profile</Link>
                    <Link to={`/home/comments`} className="link">Comments</Link>
                    <Link to={`/home/contact`} className="link">Contact</Link>
                </div>
            </div>
        );
    }
}

export default App
