
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";
import { useLocation, useNavigate} from "react-router-dom";



function AuthPage() {

 const location = useLocation();
  const navigate = useNavigate();


  const isLoginForm = location.pathname.endsWith('/login');

  const toggleMode = () => {
   
    navigate(isLoginForm ? '/auth/signup' : '/auth/login');
  };

    return (
        <div>
            {isLoginForm ? <LoginForm /> : <SignUpForm />}

            <div className="mt-4">
                <span className="text-gray-600">
                    {isLoginForm ? "New to the website? " : "Already have an account? "}
                </span>
                <button
                    type="button"
                    onClick={toggleMode}
                    className="font-medium hover:underline"
                >
                    {isLoginForm ? "Signup" : "Login"}
                </button>
            </div>
        </div>
    );
}

export default AuthPage;