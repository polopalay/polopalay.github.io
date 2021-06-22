import firebase from '../../firebase/firebase'

const initialState = {
  database: firebase.database(),
  stogare: firebase.storage(),
  auth: firebase.auth(),
  entity: {}
};

const template = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ENTITY":
      state.entity = action.data;
      return {...state, entity: action.data};
    default:
      return state;
  }
};

export default template;
