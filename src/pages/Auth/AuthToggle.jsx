import React from 'react';

const AuthToggle = ({ isSignUp, setIsSignUp }) => (
  <p className="toggle-form" onClick={() => setIsSignUp(!isSignUp)}>
    {isSignUp
      ? 'Already have an account? Sign In'
      : 'Don’t have an account? Sign Up'}
  </p>
);

export default AuthToggle;
