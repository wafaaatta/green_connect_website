import ApiInterface from "../ApiInterface";
import User from "../User";

interface UserState extends ApiInterface{
    users: User[]
}

export default UserState