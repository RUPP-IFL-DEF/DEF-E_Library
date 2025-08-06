import React from 'react';

const AuthForm = ({ isSignUp, formData, handleChange, handleSubmit, error }) => {
  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {isSignUp && (
        <>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
        </>
      )}

      {!isSignUp && (
        <div className="form-field">
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter email or username"
            required
          />
        </div>
      )}

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          minLength={6}
        />
      </div>

      <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
    </form>
  );
};

export default AuthForm;
