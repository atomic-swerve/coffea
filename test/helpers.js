/*globals describe,it*/
import { message } from '../src/index'
const expect = require('chai').expect

describe('message helper', () => {
  it('should accept just two parameters', () => {
    let m = message('#general', 'Hello World')

    expect(m).to.eql({ type: 'message', chat: '#general', text: 'Hello World' })
  })

  it('should accept more than two parameters', () => {
    let m = message('#general', 'Hello World', 'test')

    expect(m).to.eql({ type: 'message', chat: '#general', text: 'Hello World', '0': 'test' })
  })

  it('should not accept any less than two parameters', () => {
    expect(() => {
      message('#general')
    }).to.throw(Error)
  })
})
