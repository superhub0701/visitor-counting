const initialState = {
  pageBgClr: [true, false, false, false, false, false],
  colors: ['#0072bc', '#ddbd0b', '#e75f2c', '#e3165f', '#862683', '#0d9a56', '#646464'],
  user: {}
}

const onChangeBgClr = (i) => {
  let clr = [false, false, false, false, false, false];
  clr[i] = true;
  return clr
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "change_page":
      return { ...state, pageBgClr: onChangeBgClr(action.data) };
    case "set_user":
      return {...state, user: action.data}
    default:
      return;
  }
};

export { reducer, initialState };

