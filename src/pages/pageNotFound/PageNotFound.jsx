import { Link } from "react-router-dom";
import "./pageNotFound.css"

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
        <h1>OOps....</h1>
        <h1>Page Not Found</h1>
        <span><Link to="/">Go to homepage</Link></span>
    </div>
  )
}

export default PageNotFound