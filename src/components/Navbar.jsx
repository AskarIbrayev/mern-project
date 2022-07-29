import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav>
            <Link to={'/about'} className="nav--item">About</Link>
            <Link to={'/texts'} className="nav--item" >Texts</Link>
        </nav>
    )
}
export default Navbar