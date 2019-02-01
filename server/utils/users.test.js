const expect = require('expect')

const { Users } = require('./users')

describe('Users', () => {

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Beavis',
      room: 'Gwar Fan Club'
    }, {
      id: '2',
      name: 'Stewart',
      room: 'Winger Fan Club'
    }, {
      id: '2',
      name: 'Butt-Head',
      room: 'Gwar Fan Club'
    }]
  })

  it('should add new user', () => {
    const users = new Users()
    const user = {
      id: '234',
      name: 'Fred',
      room: 'Party Room'
    }
    const resUser = users.addUser(user.id, user.name, user.room)
  
    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    const id = users.users[0].id
    const user = users.removeUser(id)

    expect(user.id).toBe(id)
    expect(users.users.length).toBe(2)
  })

  it('should NOT remove a user', () => {
    const id = 96847
    const user = users.removeUser(id)
    
    expect(user).toBeFalsy()
    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    const id = users.users[0].id
    const user = users.getUser(id)
    expect(user.id).toBe(id)
  })

  it('should should NOT find user', () => {
    const id = '54'
    const user = users.getUser(id)
    expect(user).toBeFalsy()
  })

  it('should return names in Gwar Fan Club', () => {
    const userList = users.getUserList('Gwar Fan Club')
  
    expect(userList).toEqual(['Beavis', 'Butt-Head'])
  })

  it('should return names in Winger Fan Club', () => {
    const userList = users.getUserList('Winger Fan Club')
  
    expect(userList).toEqual(['Stewart'])
  })
})
