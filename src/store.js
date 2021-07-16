const initialState = {
  pageBgClr: [true, false, false, false, false],
  colors: ['#0072bc', '#0d9a56', '#e3165f', '#e75f2c', '#862683'],
  user: {}
}

const onChangeBgClr = (i) => {
  let clr = [false, false, false, false, false];
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

