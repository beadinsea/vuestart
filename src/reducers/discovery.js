export function bannerReducer(state, action) {
  switch (action.type) {
    case 'BANNER_ADD':
      return [action.newBanner, ...state]
    default:
      throw new Error()
  }
}
