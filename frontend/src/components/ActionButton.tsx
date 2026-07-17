import { Link } from "react-router-dom";

interface ActionButtonProps {
    icon: string;
    text: string;
    to: string;
}

export default function ActionButton({icon, text, to}: ActionButtonProps) {
    return (
        <Link to={to}>
            <button className="action-button">
                <img src={icon} />
                {text}
            </button>
        </Link>
    );
}