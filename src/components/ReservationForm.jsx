export default function ReservationForm({ compact = false }) {
  return (
    <form className={`grid gap-3 ${compact ? '' : 'rounded-sm bg-moss-300 p-6'}`}>
      <label className="grid gap-1 text-[11px] font-bold text-earth-900/70">
        Nama
        <input className="field" placeholder="Nama lengkap" />
      </label>
      <label className="grid gap-1 text-[11px] font-bold text-earth-900/70">
        Email
        <input className="field" type="email" placeholder="nama@email.com" />
      </label>
      <label className="grid gap-1 text-[11px] font-bold text-earth-900/70">
        Pilihan sesi
        <select className="field" defaultValue="">
          <option value="" disabled>
            Pilih jadwal lokakarya
          </option>
          <option>Wheel Trial - 12 Mei</option>
          <option>Glazing - 18 Mei</option>
          <option>Handbuilding - 24 Mei</option>
        </select>
      </label>
      <label className="grid gap-1 text-[11px] font-bold text-earth-900/70">
        Catatan
        <textarea
          className="field min-h-24 resize-y"
          placeholder="Jumlah peserta atau kebutuhan khusus"
        />
      </label>
      <button type="button" className="btn-primary mt-1 w-full">
        Kirim Reservasi
      </button>
    </form>
  )
}
