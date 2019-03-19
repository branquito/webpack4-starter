import uuid4 from 'uuid4'
const createList = ({ name }) => ({
  name,
  id: uuid4(),
  questions: []
})

export default createList
