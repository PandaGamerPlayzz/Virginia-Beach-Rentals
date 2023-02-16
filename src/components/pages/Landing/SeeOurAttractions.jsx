import Styles from './SeeOurAttractions.module.css';

const SeeOurAttractions = () => {
    return (
        <div className={Styles["attractions"]}>
            <img src="https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_860,q_75,w_1000/https://assets.simpleviewinc.com/simpleview/image/upload/crm/virginiabeachva/Beaches---Oceanfront-Resort-Beach---Oceanfront-Resort-Beach-20---Neptune-Sunrise-2-of-2-.jpg-4f8caec85056a36_4f8cb691-5056-a36a-0888f0452a057e49.jpg" alt="" />
            <div>
                <h2>Nearby Attractions</h2>
                <hr />
                <p>
                    Here's a short list of some of the most popular attractions near Virginia Beach:

                    <ul>
                        <li>The Beach & Ocean</li>
                        <li>Neptune's Park</li>
                        <li>Virginia Aquarium & Marine Science Center</li>
                        <li>Grommet Island Park</li>
                    </ul>

                    See our <a href="/attractions/">attractions page</a> for more information.
                </p>
            </div>
        </div>
    );
}

export default SeeOurAttractions;