import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  registeredUsers: [], // simulated user "database"
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const { name, email, password } = action.payload;

      // Check if email already exists
      const exists = state.registeredUsers.find((u) => u.email === email);
      if (exists) {
        state.error = 'An account with this email already exists.';
        return;
      }

      // Add user to "database"
      state.registeredUsers.push({ name, email, password });
      state.user = { name, email };
      state.isAuthenticated = true;
      state.error = null;
    },

    login(state, action) {
      const { email, password } = action.payload;

      const found = state.registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        state.error = 'Invalid email or password.';
        return;
      }

      state.user = { name: found.name, email: found.email };
      state.isAuthenticated = true;
      state.error = null;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
