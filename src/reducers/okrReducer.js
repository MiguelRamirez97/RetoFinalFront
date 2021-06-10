import * as actions from "../actions/okrActions";

export const initialState = {
  OKR: {
    userId: "",
    title: "",
    objective: "",
    responName: "",
    responEmail: "",
    vertical: "",
    description: "",
    krs: [],
  },
  OKRUser: [],
  ProgressOKR: {},
};

export default function okrReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case actions.UPDATE_STATE_OKR:
      return {
        ...state,
        OKR: {
          ...state.OKR,
          ...payload,
        },
      };
    case actions.CREATEKR:
      return {
        ...state,
        OKR: {
          ...state.OKR,
          krs: [...state.OKR.krs, payload],
        },
      };
    case actions.LOGIN:
      return {
        ...state,
        OKR: {
          ...state.OKR,
          userId: payload,
        },
      };
    case actions.UPDATEOKR:
      return {
        ...state,
        OKRUser: payload,
      };
    case actions.POSTOKR:
      return {
        ...state,
        OKR: {
          ...state.OKR,
          title: '',
          objective: '',
          responName: '',
          responEmail: '',
          vertical: '',
          description: '',
          krs: [],
        },
      }
    case actions.OKRMAXPROGRESS:
      return {
        ...state,
        ProgressOKR: payload,
      };
    default:
      return state;
  }
}
