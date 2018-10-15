const tagsView = {
  state: {
    visitedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW(state, view) {
      if (state.visitedViews.some(tag => tag.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, { title: view.meta.title })
      )
    },
    DEL_VISITED_VIEW(state, view) {
      if(state.visitedViews.length<0)return false
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    delVisitedView({commit,state},view){
      return new Promise((resolve,reject)=>{
        commit('DEL_VISITED_VIEW',view)
        resolve([...state.visitedViews])
      })
    }
  }
}
export default tagsView
