import {Link} from "react-router-dom";
import {Component} from "react";


class HomePage extends Component {
    render() {
        return (
            <div>
                <h1 className="text-3xl mb-3">О приложении</h1>
                <p className="mb-2"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta eius enim omnis quo quos tempora tempore vitae. Aliquid consequatur consequuntur distinctio non perferendis quae ratione repellat totam vel, vero.</span><span>Animi architecto at beatae deserunt dolorem eligendi enim exercitationem, facilis illo ipsa laboriosam modi molestiae mollitia nostrum officiis quae quisquam quo ratione rem saepe sit ullam, veritatis vitae voluptas voluptatem?</span><span>Ad deleniti dolores hic molestias, ratione rem reprehenderit soluta veniam voluptate voluptatibus. A accusantium autem dolore facilis ipsum libero maxime molestiae nulla officia omnis perferendis, possimus qui velit, voluptas voluptatibus.</span><span>Accusantium at dicta expedita hic, nesciunt non nulla odio quae sunt veniam. Cum dignissimos ex laborum magnam nesciunt tenetur. Blanditiis culpa, debitis earum eius hic itaque iure minima quas vel.</span><span>Debitis ea, ex hic ipsa officiis tempora tenetur. Accusantium ad, aliquam dignissimos distinctio id iste numquam odio officiis quaerat repudiandae! Deleniti, distinctio enim nihil nostrum quam vel vero! Beatae, provident?</span></p>

                <Link to='/tickers' className="link">
                    <button className="bg-blue-400 p-3 hover:bg-green-400 hover:text-white rounded-xl transition-colors">К тикерам</button>
                </Link>
            </div>
        );
    }
}

export default HomePage
