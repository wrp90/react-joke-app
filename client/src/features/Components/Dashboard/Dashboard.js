import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserInformation } from "../../../app/slices/userSlice";
import './Dashboard.css'

const Dashboard = () => {
    const userInformation = useSelector(selectUserInformation);
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        console.log("Dashboard User Info:", userInformation)
        return (
            <div className="dashboard-container">
                <h1>Hello {userInformation.firstName}!</h1>
            </div>
        )
    }
};

export default Dashboard;