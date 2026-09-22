import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const Protected = ({ children, role }) => {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  console.log("USER:", user);
console.log("ROLE:", user?.role);
console.log("REQUIRED ROLE:", role);
  // 1. Agar Redux mein abhi bhi loading true hai, to RUKO aur loading screen dikhao
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>Loading data, please wait...</h3>
      </div>
    );
  }

  // 2. Agar loading false ho chuki hai, aur PHIR BHI user nahi mila, tab login par bhejo
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Agar user mil gaya hai, lekin role match nahi karta
  if (role && user.role !== role) {
    console.log(`Role mismatch! User is ${user.role} but route requires ${role}`);
    return <Navigate to="/" replace />; 
  }

  // Sab theek hai to page render karo
  return children;
};

export default Protected;
