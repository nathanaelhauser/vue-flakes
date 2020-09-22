import FlakeApi from "@/api/flakes";

const state = () => ({
  flake: null,        // chosen flake
  flakeChosen: false, // keep track of if user has chosen a flake
  flakes: []          // Flakes from DB
});

const getters = {};

const actions = {
  getFlakes: ({ commit, state }) => {
    FlakeApi.getAllFlakes()
      .then(flakes => commit("setFlakes", { flakes }))
      .catch(err => {
        commit("setFlakes", { flakes: [] });
        console.error(err);
      })
  },
  createFlake: ({ commit, state }, value) => {
    // create new flake in db and save locally
    const flake = {
      _id: (state.flakes.length + 1),
      severity: value.severity,
      excuse: value.title
    };
    commit("setFlake", { flake });
    commit("setFlakeChosen", { flakeChosen: true });
  },
  randomFlake: ({ commit, state }, severity) => {
    let filteredFlakes = state.flakes.filter(flake => flake.severity === severity);
    const random = Math.floor(Math.random() * filteredFlakes.length);
    commit("setFlake", { flake: filteredFlakes[random] });
    commit("setFlakeChosen", { flakeChosen: true });
  },
  clearFlakeData: ({ commit, state }) => {
    commit("setFlake", { flake: null });
    commit("setFlakeChosen", { flakeChosen: false });
  }
};

const mutations = {
  setFlakes: (state, { flakes }) => {
    state.flakes = flakes;
  },
  setFlake: (state, { flake }) => {
    state.flake = flake;
  },
  setFlakeChosen: (state, { flakeChosen }) => {
    state.flakeChosen = flakeChosen;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}