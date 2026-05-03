const photo = (id, width = 900, height = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82`

export const navItems = [
  { id: 'home', label: 'Beranda' },
  { id: 'catalog', label: 'Katalog' },
  { id: 'reservation', label: 'Reservasi' },
  { id: 'about', label: 'Tentang' },
]

export const images = {
  hero: photo('photo-1578749556568-bc2c40e68b61', 1400, 760),
  studio: photo('photo-1605721911519-3dfeb3be25e7', 760, 620),
  artisan: photo('photo-1610701596007-11502861dcfa', 760, 620),
  workshop: photo('photo-1595351298020-038700609878', 900, 560),
  hands: photo('photo-1565193566173-7a0ee3dbe261', 900, 560),
  kiln: photo('photo-1616046229478-9901c5536a45', 760, 620),
  founder: photo('photo-1568602471122-7832951cc4c5', 720, 720),
}

export const featuredProducts = [
  {
    name: 'Vas Tanah Senja',
    price: 'Rp 250.000',
    tag: 'Baru',
    image: photo('photo-1610701596007-11502861dcfa', 480, 580),
    description: 'Vas dekoratif dengan lengkung organik dan finishing matte hangat.',
  },
  {
    name: 'Piring Tengah Mataram',
    price: 'Rp 175.000',
    tag: 'Best',
    image: photo('photo-1578749556568-bc2c40e68b61', 480, 580),
    description: 'Piring saji bertekstur halus untuk meja makan yang tenang.',
  },
  {
    name: 'Kendi Wulan',
    price: 'Rp 320.000',
    tag: 'Stok',
    image: photo('photo-1605721911519-3dfeb3be25e7', 480, 580),
    description: 'Kendi handmade dengan pola titik dan warna pasir lembut.',
  },
  {
    name: 'Teko Aliran Tenang',
    price: 'Rp 410.000',
    tag: 'Favorit',
    image: photo('photo-1616046229478-9901c5536a45', 480, 580),
    description: 'Teko kecil untuk ritual teh harian dengan pegangan alami.',
  },
]

export const catalogProducts = [
  ...featuredProducts,
  {
    name: 'Amfora Terracotta',
    price: 'Rp 390.000',
    tag: 'Limited',
    image: photo('photo-1581600140682-d4e68c8cde32', 520, 520),
    description: 'Siluet klasik dengan tanah bakar yang kuat dan bersih.',
  },
  {
    name: 'Mangkok Bumi Minimalis',
    price: 'Rp 120.000',
    tag: 'Baru',
    image: photo('photo-1603204077779-bed963ea7d0e', 520, 520),
    description: 'Mangkok rendah untuk sajian kecil, dibuat satu per satu.',
  },
  {
    name: 'Piring Glazed Serenity',
    price: 'Rp 210.000',
    tag: 'Favorit',
    image: photo('photo-1610701596007-11502861dcfa', 520, 520),
    description: 'Lapisan glasir hijau pucat dengan tepian tidak kaku.',
  },
  {
    name: 'Lampu Motif Mekar',
    price: 'Rp 650.000',
    tag: 'Preorder',
    image: photo('photo-1605721911519-3dfeb3be25e7', 520, 520),
    description: 'Lampu meja keramik dengan perforasi cahaya yang lembut.',
  },
]

export const craftNotes = [
  'Kurasi bahan tanah liat lokal dengan karakter warna alami.',
  'Pembentukan manual sehingga setiap karya punya jejak tangan.',
  'Pembakaran bertahap untuk hasil yang kokoh dan tahan lama.',
]

export const galleryImages = [
  photo('photo-1578749556568-bc2c40e68b61', 320, 220),
  photo('photo-1605721911519-3dfeb3be25e7', 320, 220),
  photo('photo-1610701596007-11502861dcfa', 320, 220),
  photo('photo-1616046229478-9901c5536a45', 320, 220),
  photo('photo-1565193566173-7a0ee3dbe261', 320, 220),
  photo('photo-1595351298020-038700609878', 320, 220),
]

export const processSteps = [
  {
    title: 'Mengenal Material',
    text: 'Kami memilih tanah liat dari pemasok kecil dan menguji plastisitasnya sebelum masuk studio.',
    image: images.hands,
  },
  {
    title: 'Dibentuk Perlahan',
    text: 'Setiap bentuk dibuat dalam ritme lambat agar proporsi, berat, dan sentuhan terasa seimbang.',
    image: images.studio,
  },
  {
    title: 'Dibakar Matang',
    text: 'Karya melewati proses pengeringan dan pembakaran yang dijaga suhunya untuk kualitas stabil.',
    image: images.kiln,
  },
]

export const workshopSlots = [
  { date: '12', label: 'Wheel Trial', tone: 'bg-clay-600 text-white' },
  { date: '18', label: 'Glazing', tone: 'bg-moss-300 text-earth-900' },
  { date: '24', label: 'Handbuilding', tone: 'bg-earth-900 text-white' },
]

export const faqs = [
  'Berapa lama waktu pengerjaan pesanan custom?',
  'Apakah Anda melakukan pengiriman internasional?',
  'Apakah lokakarya ini ramah untuk pemula?',
]
