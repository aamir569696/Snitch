import { useDispatch } from "react-redux";
import { registerUser, loginUser,getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../state/auth.slice";

const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    fullname,
    password,
    contact,
    isSeller = false,
  }) {
    const data = await registerUser({
      email,
      fullname,
      password,
      contact,
      isSeller,
    });
    dispatch(setUser(data.user));
    return data.user;
  }

  async function handleLogin({ email, password }) {
    const data = await loginUser({ email, password });
    dispatch(setUser(data.user));
    return data.user;
  }

  async function handleGetMe() {
  try {
    dispatch(setLoading(true));
    const data = await getMe();
    
    // 1. Check karein backend se actual mein kya data aa raha hai
    console.log("Backend API Full Response Data:", data);
    
    if (data && data.user) {
      dispatch(setUser(data.user));
    } else if (data) {
      // Agar backend direct user object bhej raha hai bina '.user' wrapper ke
      dispatch(setUser(data));
    } else {
      dispatch(setUser(null));
    }
  } catch (error) {
    console.log("khan g API Error:", error);
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
}

  return { handleRegister, handleLogin,handleGetMe};
};

export default useAuth;
