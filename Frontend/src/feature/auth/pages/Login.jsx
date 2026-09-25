import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../Hook/useAuth";
import ContinueGoogle from "../components/ContinueGoogle";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await handleLogin(form);
      if (user.role == "buyer") {
        navigate("/");
      } else if (user.role == "seller") {
        navigate("/seller/dashboard");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden w-full flex bg-[#FAFAFA] font-sans selection:bg-black selection:text-white">
      {/* ===================== LEFT PANE — Elite Fashion Hero ===================== */}
      <aside className="relative hidden lg:block w-1/2 h-full overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium fashion model" 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-16 xl:p-24 z-10 pointer-events-none">
          <div className="mb-8">
            <span className="text-3xl font-black tracking-tighter text-white drop-shadow-lg">
              SNITCH
            </span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="text-white drop-shadow-md">Welcome back.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 drop-shadow-sm">
              Your style awaits.
            </span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-md leading-relaxed font-medium tracking-wide">
            Step back into your exclusive workspace and pick up exactly where you left off.
          </p>
        </div>
      </aside>

      {/* ===================== RIGHT PANE — Interactive Form ===================== */}
      <main className="w-full lg:w-1/2 h-full flex flex-col relative bg-[#FAFAFA]">
        <div className="flex-1 w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-h-full w-full flex flex-col justify-center items-center px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="w-full max-w-[400px] flex flex-col shrink-0">
              
              <header className="mb-8 text-center lg:text-left shrink-0">
                <span className="text-3xl font-black tracking-tighter text-black lg:hidden block mb-6">SNITCH</span>
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mb-1">Log in to your account</h2>
                <p className="text-zinc-500 text-sm font-medium">Welcome back to the exclusive marketplace.</p>
              </header>

              <form onSubmit={onSubmit} className="flex flex-col gap-4 shrink-0">
                <FloatingField
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                />

                {/* Password */}
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={onChange}
                    className="peer w-full px-4 pt-5 pb-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm transition-all duration-300 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none placeholder-transparent hover:border-zinc-300 shadow-sm pr-12"
                    placeholder="Password"
                  />
                  <label 
                    htmlFor="password" 
                    className="absolute left-4 top-3.5 text-zinc-400 text-sm transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-black font-medium pointer-events-none"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs font-bold text-zinc-400 hover:text-black transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mt-1 mb-2 px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black transition-colors" />
                    <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors select-none">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-bold text-zinc-900 hover:text-black hover:underline focus:outline-none transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>

                {error && (
                  <div className="mt-1 p-3.5 rounded-xl bg-red-50 border border-red-100/50 text-red-600 text-[13px] font-medium flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">{error}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="mt-2 w-full py-3.5 px-6 bg-black hover:bg-zinc-900 text-white text-sm font-bold rounded-xl shadow-md shadow-black/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center active:scale-[0.98] group overflow-hidden relative"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging in…</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Log In
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>

              <div className="flex items-center my-6 shrink-0">
                <div className="flex-1 border-t border-zinc-200"></div>
                <span className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">or</span>
                <div className="flex-1 border-t border-zinc-200"></div>
              </div>

              <div className="w-full mb-6 shrink-0">
                <ContinueGoogle />
              </div>
     
              <p className="text-center text-sm font-medium text-zinc-500 shrink-0">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-bold text-black hover:underline focus:outline-none transition-all ml-1"
                >
                  Sign up
                </button>
              </p>

              <footer className="mt-8 flex justify-between items-center text-[11px] text-zinc-400 w-full pt-5 border-t border-zinc-200 shrink-0">
                <span className="font-medium">© {new Date().getFullYear()} Snitch.</span>
                <div className="flex gap-4 font-medium">
                  <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FloatingField = ({ id, label, ...props }) => (
  <div className="relative group">
    <input 
      id={id} 
      required 
      className="peer w-full px-4 pt-5 pb-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm transition-all duration-300 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none placeholder-transparent hover:border-zinc-300 shadow-sm" 
      placeholder={label}
      {...props} 
    />
    <label 
      htmlFor={id} 
      className="absolute left-4 top-3.5 text-zinc-400 text-sm transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-black font-medium pointer-events-none"
    >
      {label}
    </label>
  </div>
);

export default Login;
