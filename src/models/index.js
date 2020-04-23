// function to create a one second delay
const delay = time => new Promise(resolve => setTimeout(() => resolve(), time));

// count model
export const count = {
  state: 0,
  reducers: {
    addBy(state, payload) {
      return state + payload;
    },
    remove(state) {
      return --state;
    }
  },
  effects: dispatch => ({
    async addByAsync(payload, state) {
      await delay(1000);
      dispatch.count.addBy(1);
    },
    async removeAsync() {
      await delay(1000);
      dispatch.count.remove();
    }
  })
};
export const sidePanel = {
  state: {
    left: false,
    bottom: false
  },
  reducers: {
    toggleDrawers(state, payload) {
      const { event, side, open } = payload;
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      return { ...state, [side]: open };
    }
  },
  effects: dispatch => ({
    async addByAsync(payload, state) {
      await delay(1000);
      dispatch.count.addBy(1);
    },
    async removeAsync() {
      await delay(1000);
      dispatch.count.remove();
    }
  })
};
export const isAuth = {
  state: false,
  reducers: {
    setAuth(state, payload) {
      return payload;
    }
  },
  effects: dispatch => ({
    async addByAsync(payload, state) {
      await delay(1000);
      dispatch.count.addBy(1);
    },
    async removeAsync() {
      await delay(1000);
      dispatch.count.remove();
    }
  })
};
export const userData = {
  state: null,
  reducers: {
    setUserData(state, payload) {
      return payload;
    }
  }
};
export const modalSignIn = {
  state: {
    isOpen: false,
    message: ""
  },
  reducers: {
    handleClose(state, payload) {
      return { ...state, isOpen: false };
    },
    handleOpen(state, payload) {
      return { message: payload, isOpen: true };
    }
  }
};
export const groups = {
  state: [],
  reducers: {
    setGroups(state, payload) {
      return payload;
    }
  }
};
export const learningWords = {
  state: [],
  reducers: {
    setLearningWords(state, payload) {
      return payload;
    }
  }
};
export const selectedWords = {
  state: [],
  reducers: {
    setSelectedWords(state, payload) {
      return payload;
    }
  }
};
export const selectedWord = {
  state: null,
  reducers: {
    setselectedWord(state, payload) {
      return payload;
    }
  }
};

// export const groups = {
//   state: [],
//   reducers: {
//     setLearningWords(state, payload) {
//       return payload;
//     }
//   }
// };
export const selectedGroups = {
  state: [],
  reducers: {
    setSelectedGroups(state, payload) {
      return payload;
    }
  }
};
export const selectedGroup = {
  state: null,
  reducers: {
    setSelectedGroup(state, payload) {
      return payload;
    }
  }
};

export const userWords = {
  state: [],
  reducers: {
    setUserWords(state, payload) {
      return payload;
    }
  }
};