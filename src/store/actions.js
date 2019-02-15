import axios from 'axios'

axios.defaults.baseURL = 'https://app.renhead.test'
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJpdiI6IjFvZHJMRWZJNENiUzBZTk1cL0dYa0pRPT0iLCJ2YWx1ZSI6ImxLbU5xTXVxVVFHZnIzVUVRN0c5NjdiOTJkVDNuU0IyR29IRENGK0tIZyt4bEh0MWIrY0xPeUp4U1RVOFlMdlwvIiwibWFjIjoiZjE0YzZiMjJkYjUyNjM5MDk0ZjQ1N2RjMTM5NzcxMjU0N2Y2YzU4ZjVmZTY1YzkyYzIzNTZkMTY3ZjMxM2E0NiJ9'

const mockResponse1 = require('./recruiting_counts_response.json')
const mockResponse2 = require('./candidates_pipeline_response.json')
const reportTypes = require('./report_types.json')

const res1data = mockResponse1.data
const res2data = mockResponse2.data

export default {
  // loadCubes({ state, commit }) {
  //   if (state.cubes.length) return state.cubes
  //   return axios.get('/reports/cubes').then(response => {
  //     commit('addCubes', response.data.data)
  //   })
  // },
  getCube({ commit }, cube) {
    commit('addMeasuresDimensions', {
      res1: {
        cube,
        measures: res1data.measures,
        dimensions: res1data.dimensions
      },
      res2: {
        cube,
        measures: res2data.measures,
        dimensions: res2data.dimensions
      }
    })
  }
  // getCube({ commit }, cube) {
  //   return axios
  //     .get(`/reports/cubes/${cube}`)
  //     .then(response => {
  //       commit('addMeasuresDimensions', {
  //         cube,
  //         ...response.data.data
  //       })
  //       return response.data.data
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
}
