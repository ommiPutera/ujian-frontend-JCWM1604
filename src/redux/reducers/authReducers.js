const INITIAL_STATE = {
  id: 0,
  username: "",
  password: "",
  role: "",
  islogin: false,
  loading: false,
  error: "",
  cart: [],
  stok: 0,
};

const AuthReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        islogin: true,
        loading: false,
        error: "",
      };
    case "LOADING":
      return { ...state, loading: true };
    case "ERROR":
      return { ...state, error: action.error, loading: false };
    case "RESET":
      return { ...state, loading: false };
    case "LOGOUT":
      return INITIAL_STATE;
    case "ADDCART":
      return { ...state, cart: action.cart };
    default:
      return state;
  }
};

export default AuthReducers;