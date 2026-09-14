import { useDispatch } from "react-redux";
import {registerUser,loginUser} from "../services/auth.api";
import { setUser, setLoading, setError } from "../state/auth.slice";


const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({ email, fullname, password, contact, isSeller=false }) {
     const data = await registerUser({ email, fullname, password, contact, isSeller })
     dispatch(setUser(data))
     return data.user

    }

    async function handleLogin({ email, password }) {
        const data = await loginUser({ email, password })
        dispatch(setUser(data))
        return data.user
    }

    return { handleRegister, handleLogin };

}

export default useAuth;