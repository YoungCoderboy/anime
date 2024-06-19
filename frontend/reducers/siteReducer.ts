import { SIDEBAR_CLICK, USER_ICON_CLICK } from "../utils/actions";
interface UserState {
  showUserMenu: boolean;
  showSidebar: boolean;
}

type UserAction = {
  type: string;
  payload?: any;
};

const user_reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case USER_ICON_CLICK:
      return {
        ...state,
        showUserMenu: !state.showUserMenu,
      };
    case SIDEBAR_CLICK:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    default:
      return state;
  }
};

export default user_reducer;
