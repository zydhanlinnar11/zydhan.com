import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../../css/LoadingAnimation.css";

function LoadingAnimation() {
    return (
        <div className="icon-only-div">
            <FontAwesomeIcon
                className="middle-icon loading-animation"
                icon={faSpinner}
            />
            <h4 className="middle-text">Loading...</h4>
        </div>
    );
}

export default LoadingAnimation;
