import { shallowMount, createLocalVue } from '@vue/test-utils'
import Link from './../link.vue'
import VueRouter from 'vue-router'

const createLink = (options = {}) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const stubs = ['router-link', 'router-view']
  const mountOptions = {
    stubs,
    localVue,
    ...options
  }
  return shallowMount(Link, mountOptions)
}

describe('MiniLink', () => {
  it('renders internal links as router-link', () => {
    expect(createLink({ propsData: { to: '/' }})).toMatchSnapshot()
  })

  it('renders external links as anchor', () => {
    expect(createLink({ propsData: { to: 'https://example.org' }})).toMatchSnapshot()
  })
})
