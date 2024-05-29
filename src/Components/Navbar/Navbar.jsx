import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";
function Navbar({ setSidebar }) {
  return (
    <>
      <nav className="flex-div">
        <div className="nav-left flex-div">
          <img
            onClick={() => setSidebar((prev) => (prev == false ? true : false))}
            src={menu_icon}
            className="menu-icon"
          />
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
        </div>
        <div className="nav-middle flex-div">
          <div className="search-box flex-div">
            <input type="text" placeholder="Search" />
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="nav-right flex-div">
          <img src={upload_icon} className="" />
          <img src={more_icon} className="" />
          <img src={notification_icon} className="" />
          <img src={profile_icon} className="user-icon" />
        </div>
      </nav>
    </>
  );
}
export default Navbar;
