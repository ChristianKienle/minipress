import { Page, ProcessablePage, EmittablePage } from './types'

declare let page: Page
declare let processablePage: ProcessablePage
declare let emittablePage: EmittablePage

page = processablePage
page = emittablePage
processablePage = emittablePage
