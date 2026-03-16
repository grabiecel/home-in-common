export const ROOMS = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    habits: [
      { id: 'k1', text: 'Clear the sink and put away clean dishes', frequency: 'Daily' },
      { id: 'k2', text: 'Clear counters and wipe down before bed', frequency: 'Daily' },
      { id: 'k3', text: 'Sweep the floor', frequency: 'Daily' },
      { id: 'k4', text: 'Wipe down the stove and check the garbage', frequency: 'Daily' },
    ]
  },
  {
    id: 'entryway',
    name: 'Entryway',
    habits: [
      { id: 'e1', text: 'Shoes, coats and bags put away when you walk in', frequency: 'Daily' },
      { id: 'e2', text: 'Clear any surfaces — table, shelf, console', frequency: 'Daily' },
      { id: 'e3', text: 'Quick sweep', frequency: 'Daily' },
    ]
  },
  {
    id: 'living-room',
    name: 'Living Room',
    habits: [
      { id: 'l1', text: 'Cushions straightened, throws folded', frequency: 'Daily' },
      { id: 'l2', text: 'Clear the coffee table, remotes and books in their place', frequency: 'Daily' },
      { id: 'l3', text: 'Nothing left on the floor by end of day', frequency: 'Daily', locked: true },
    ]
  }
]