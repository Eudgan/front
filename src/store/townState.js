import axios from '../axios/index.js';

export default {
    state: {
        currentTown: null,
        allTowns: null,
        isFirstVisit: localStorage.getItem('isFirstVisit') || true,
    },
    getters: {
    },
    mutations: {
        installTown(state) {
            state.currentTown = JSON.parse(localStorage.getItem('currentTown'));
            this.dispatch('requestTowns');      
        },
        setTown(state, towns) {
            state.allTowns = towns;
            if (localStorage.getItem('currentTown') === null) {
                state.currentTown = towns[0];
                localStorage.setItem('currentTown', JSON.stringify(state.currentTown));
            }
        },
        changeTown(state, townName) {
            state.currentTown = state.allTowns.find(town => town.name === townName);
            localStorage.setItem('currentTown', JSON.stringify(state.currentTown));
        },
        changeFirstVisit(state) {
            state.isFirstVisit = false;
            localStorage.setItem('isFirstVisit', state.isFirstVisit);
        },
    },
    actions: {
        async requestTowns({ commit }) {
            try {
                const response = await axios.post('/cities:search');
                commit('setTown', response.data.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        },
    },
};