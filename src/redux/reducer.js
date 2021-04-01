const INITIAL_STATE = {
  loggedin: false,
};

export const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { loggedin: action.value };
    default:
      return state;
  }
}

export default Reducer;