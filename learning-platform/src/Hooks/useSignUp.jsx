import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useSignUp = () => {
    const [signUpInfo, setSignUpInfo] = useState(null);
    const navigate = useNavigate();
  
    const signUp = async (signupData) => {
      const { email, username, password } = signupData;
  
      try {
        const response = await fetch('http://localhost:3000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        setSignUpInfo(data);
        if (data.success) {
          navigate('/home'); // Redirect on successful sign-up
        }
      } catch (error) {
        console.error('Error during sign-up:', error);
      }
    };
  
    return signUpInfo; // Return sign-up info and the sign-up function
  };
  
  export default useSignUp;