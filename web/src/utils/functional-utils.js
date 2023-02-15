import { ascend, prop, sort } from 'ramda'

export const sortByProp = (propName, comparator = ascend) =>
  sort(comparator(prop(propName)))
