import { API_URL } from "../../helper";
import axios from "axios";

export const LoginAction = (input) => {
  return {
    type: "LOGIN",
    payload: input,
  };
};

export const CartAction = (input) => {
  return {
    type: "ADDCART",
    cart: input,
  };
}

export const LoginActionThunk = (input) => {
  var { email, password } = input;
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`${API_URL}/users?email=${email}&password=${password}`)
      .then((res) => {
        if (res.data.length) {
          localStorage.setItem("id", res.data[0].id);
          dispatch({ type: "LOGIN", payload: res.data[0] });
        } else if (password != res.data.password) {
          dispatch({ type: "ERROR", error: "password salah" });
        }
        else {
          dispatch({ type: "ERROR", error: "user tidak ditemukan" });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR", error: "server error" });
      });
  };
};


export const RegActionThunk = (input) => {
  return (dispatch) => {
    var { password, email } = input;
    let data = {
      password,
      email,
      role: 'users',
      cart: [],
    };
    if (password, email) {
      axios
        .get(`${API_URL}/users?email=${email}`, data)
        .then((res1) => {
          let validation = new RegExp("^(?=.*[a-z])(?=.*[0-9])").test(password)
          console.log(validation)
         if (res1.data.length) {
            localStorage.setItem("id", res1.data[0].id);
            dispatch({ type: "LOGIN", payload: res1.data[0]})
          } else if (password.length < 6) {
            dispatch({ type: "ERROR", error: "password minimal 6 karakter" })
          }
          else if (validation == false) {
            dispatch({ type: "ERROR", error: "password harus mengandung angka" })
          }
          else if (!password) {
            dispatch({ type: "ERROR", error: "data harus diisi" })
          } else {
            axios
              .post(`${API_URL}/users`, data)
              .then((res2) => {
                console.log('2')
                localStorage.setItem("id", res2.data[0].id);
                dispatch({type: "LOGIN", payload: res2.data[0].id});
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      dispatch({ type: "ERROR", error: "confirm dan pass harus sama" });
    }
  }
}

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};

export const ResetAction = () => {
  return {
    type: "RESET",
  };
};

export const ResetActionthunk = () => {
  return (dispatch) => {
    dispatch({ type: "RESET" });
  };
};
