import { useState } from 'react'
import { ROOMS } from './habits'
import './Today.css'

function HabitRow({ habit, done, onToggle }) {
  return (
    <div
      className={`habit-row ${habit.locked ? 'locked' : ''}`}
      onClick={() => !habit.locked && onToggle(habit.id)}
    >
      <div className={`habit-dot ${done ? 'done' : ''} ${habit.locked ? 'locked-dot' : ''}`}>
        {done && (
          <svg width="10" height="8" viewBox="0 0 10 8">
            <polyline points="1,4 3.5,6.5 9,1" stroke="#FAF7F2" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {habit.locked && (
          <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
            <rect x="0.75" y="4.5" width="7.5" height="6" rx="1.2" stroke="#A89880" strokeWidth="1.2"/>
            <path d="M2.5 4.5V3C2.5 1.9 6.5 1.9 6.5 3V4.5" stroke="#A89880" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div className="habit-body">
        <div className={`habit-title ${done ? 'struck' : ''}`}>{habit.text}</div>
        <div className="habit-sub">{habit.locked ? 'Locked' : habit.frequency}</div>
      </div>
    </div>
  )
}

function RoomSection({ room, completions, onToggle }) {
  const active = room.habits.filter(h => !h.locked)
  const done = active.filter(h => completions[h.id]).length

  return (
    <div className="room-block">
      <div className="room-label">
        <span className="room-name">{room.name}</span>
        <div className="room-line" />
        <span className="room-count">{done} / {active.length}</span>
      </div>
      <div className="habits-card">
        {room.habits.map(habit => (
          <HabitRow
            key={habit.id}
            habit={habit}
            done={!!completions[habit.id]}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}

export default function Today() {
  const [completions, setCompletions] = useState({})

  const allActive = ROOMS.flatMap(r => r.habits.filter(h => !h.locked))
  const totalDone = allActive.filter(h => completions[h.id]).length
  const progress = Math.round((totalDone / allActive.length) * 100)

  const today = new Date().toLocaleDateString('en-CA', {
    weekday: 'long', month: 'short', day: 'numeric'
  })

  function toggle(id) {
    setCompletions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="today-root">
      <div className="top-bar">
        <div>
          <div className="wordmark">Home in <em>Common</em></div>
        </div>
        <div className="datestamp">{today}</div>
      </div>

      <div className="avatars">
        <div className="avatar-group">
          <div className="avatar avatar-l">L</div>
          <div className="avatar avatar-n">N</div>
        </div>
        <div className="hh-label">Your household</div>
      </div>

      <div className="progress-bar-outer">
        <div className="progress-bar-inner" style={{ width: progress + '%' }} />
      </div>

      <div className="hero">
        <div className="eyebrow">Today</div>
        <div className="hero-title">Let's keep the<br /><em>house steady.</em></div>
      </div>

      <div className="dark-card">
        <div className="dc-blob" />
        <div className="dc-eyebrow">This week</div>
        <div className="dc-headline">You're doing well together <span className="dc-star">✦</span></div>
        <div className="contrib-row">
          <span className="contrib-name">You</span>
          <div className="contrib-track"><div className="contrib-fill" style={{ width: progress + '%' }} /></div>
          <span className="contrib-val">—</span>
        </div>
        <div className="contrib-row">
          <span className="contrib-name">Nick</span>
          <div className="contrib-track"><div className="contrib-fill" style={{ width: '58%' }} /></div>
          <span className="contrib-val">—</span>
        </div>
      </div>

      <div className="section-head">Today's habits</div>

      {ROOMS.map(room => (
        <RoomSection
          key={room.id}
          room={room}
          completions={completions}
          onToggle={toggle}
        />
      ))}

      <div className="bottom-nav">
        <div className="nav-item active">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 8.5L10 2.5L17 8.5V17H13V12H7V17H3V8.5Z" stroke="#B5733A" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          <span className="nav-lbl active-lbl">Today</span>
        </div>
        <div className="nav-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14L7.5 9L11 12L16 6" stroke="#9E8E7C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="nav-lbl">Progress</span>
        </div>
        <div className="nav-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="#9E8E7C" strokeWidth="1.4" fill="none"/><path d="M7 2V5M13 2V5M3 8H17" stroke="#9E8E7C" strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span className="nav-lbl">Week</span>
        </div>
      </div>
    </div>
  )
}
