import Profile from "./Profile.jsx";
import ProfileData from "../../components/ProfileData.jsx";
import ChangePassword from "../../components/ChangePassword.jsx";

export const UpdateData = () => {
    return (
        <Profile>
            <ProfileData/>
            <ChangePassword/>
        </Profile>
    )
}
