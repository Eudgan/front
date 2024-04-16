import { createStore } from 'vuex'
import townState from '../store/townState.js';

export default createStore({
  state: {
    orderItems: JSON.parse(localStorage.getItem('orderItems')) || [],
  },
  getters: {
    getOrderLength: state => {
      return state.orderItems.length;
    },
    getOrderCount: state => {
      let count = 0;
      state.orderItems.forEach((itemOrder) =>{
        count += itemOrder.count;
      })
      return count;
    },
    getOrderByUuid: (state) => (uuid) => {
      return state.orderItems.find(item => item.uuid === uuid);
    },
    getTotalCost: state => {
      let totalCost = 0;
      state.orderItems.forEach((itemOrder) =>{
        totalCost += itemOrder.sumCost;
      })
      return totalCost;
    },
    getUnavailableStatus: state => {
      let countStatus = 1;
      const foundItem = state.orderItems.find(item => item.isThisTown === false);
      if (foundItem) {
        countStatus = 0;
      }
      return countStatus;
    }
  },
  mutations: {
    deleteAllOrder(state) {
      state.orderItems = [];
      localStorage.removeItem('orderItems');
    },
    changeIsThisTown(state, payload) {
      const { id, switcher } = payload;
      let order = state.orderItems.find(order => order.id === id);
      order.isThisTown = switcher;
    },
    addOrderItem(state, orderItem) {
      let isFind = false;
      if (state.orderItems.length === 0) {
        state.orderItems.push(orderItem);
      } else {
        state.orderItems.forEach(element => {
          if (isEqual(element, orderItem, ['uuid', 'sumCost', 'count'])) {
            ++element.count;
            isFind = true;
          } 
        });
        if (isFind === false) {
          state.orderItems.push(orderItem);
        }
      }
      localStorage.setItem('orderItems', JSON.stringify(state.orderItems));
    },
    changeOrderItem(state, changedOrderItem) {
      const index = state.orderItems.findIndex(item => item.uuid === changedOrderItem.uuid);
      if (index !== -1) {
        state.orderItems[index] = changedOrderItem;
      }
      localStorage.setItem('orderItems', JSON.stringify(state.orderItems));
    },
    addOrderItemCount(state, uuid) {
        let orderItem = state.orderItems.find(item => item.uuid === uuid);
        ++orderItem.count;
        orderItem.sumCost = orderItem.cost * orderItem.count;
        localStorage.setItem('orderItems', JSON.stringify(state.orderItems));
    },
    reduceOrderItemCount(state, uuid) {
      let orderItem = state.orderItems.find(item => item.uuid === uuid);
      --orderItem.count;
      orderItem.sumCost -= orderItem.cost;
      localStorage.setItem('orderItems', JSON.stringify(state.orderItems));
    },
    deleteOrderItem(state, uuid) {
      state.orderItems = state.orderItems.filter(item => item.uuid !== uuid);
      localStorage.setItem('orderItems', JSON.stringify(state.orderItems));
    }
  },
  actions: {
  },
  modules: {
    townState
  }
})

function isEqual(a, b, excludeKeys = []) {
  // Проверка на null
  if (a === null || b === null) {
      return a === b;
  }

  // Если оба объекта являются массивами
  if (Array.isArray(a) && Array.isArray(b)) {
      // Проверка длины массивов
      if (a.length !== b.length) return false;
      // Проверка каждого элемента массива
      for (let i = 0; i < a.length; i++) {
          if (!isEqual(a[i], b[i], excludeKeys)) return false;
      }
      return true;
  }

  // Если оба объекта являются объектами
  if (typeof a === 'object' && typeof b === 'object') {
      // Проверка количества ключей в объектах
      const aKeys = Object.keys(a).filter(key => !excludeKeys.includes(key));
      const bKeys = Object.keys(b).filter(key => !excludeKeys.includes(key));
      if (aKeys.length !== bKeys.length) return false;
      // Проверка каждого ключа и значения в объектах
      for (let key of aKeys) {
          if (!isEqual(a[key], b[key], excludeKeys)) return false;
      }
      return true;
  }

  // Если оба объекта являются примитивными типами
  return a === b;
}