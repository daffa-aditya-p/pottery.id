import { workshopSlots } from '../data/potteryData'

const days = Array.from({ length: 30 }, (_, index) => index + 1)

export default function WorkshopCalendar() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
      <div className="rounded-sm bg-white p-5 shadow-sm">
        <div className="mb-4 grid grid-cols-7 gap-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-earth-900/45">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {days.map((day) => {
            const slot = workshopSlots.find((item) => Number(item.date) === day)

            return (
              <button
                key={day}
                type="button"
                className={`min-h-10 rounded-sm border border-earth-900/8 transition hover:border-clay-600 ${
                  slot ? slot.tone : 'bg-clay-50 text-earth-900/55'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <aside className="rounded-sm bg-clay-100 p-5">
        <p className="eyebrow">Jadwal Mei</p>
        <div className="mt-4 grid gap-3">
          {workshopSlots.map((slot) => (
            <div key={slot.date} className="border-b border-earth-900/10 pb-3">
              <p className="text-sm font-bold text-earth-900">
                {slot.date} Mei 2026
              </p>
              <p className="text-xs text-earth-900/60">{slot.label}</p>
            </div>
          ))}
        </div>
        <button type="button" className="btn-primary mt-5 w-full">
          Lihat Detail Sesi
        </button>
      </aside>
    </div>
  )
}
