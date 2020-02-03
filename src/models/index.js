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
    bottom: false,
  },
  reducers: {
    addBy(state, payload) {
      return state + payload;
    },
    toggleDrawers(state, payload) {
      const {event, side, open} = payload;
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      console.log(state);
      
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
