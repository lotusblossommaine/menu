import classnames from 'classnames';
import image from "../../assets/fbLogo.jpg";

import "./Header.css";

export const Header = ({ isTakeout, setIsTakeout }) => {
    return (
        <div className="header">
            <div className="headerLabel"><h1>Lotus Blossom</h1></div>
            <div className="navContainer">
                <a href="https://www.facebook.com/lotusblossommaine/" target="_blank" className="fbLink">
                    <img src={image} alt="Facebook" />
                </a>
                <div className="nav">
                    <div className={classnames("navItem", { isSelected: !isTakeout })} onClick={() => { setIsTakeout(false) }}>Dine-in Menu</div>
                    <div className={classnames("navItem", { isSelected: isTakeout })} onClick={() => { setIsTakeout(true) }}>Takeout Menu</div>
                </div>
            </div>
        </div>
    )
}