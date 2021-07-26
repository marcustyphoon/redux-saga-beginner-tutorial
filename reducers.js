export default function counter(state = '', action) {
  switch (action.type) {
    case 'DONOTHING':
      return state;
    case 'NEWLIST':
      return action.payload
      // return 'hi';
    default:
      return state
  }
}
