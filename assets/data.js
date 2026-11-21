/* ============================================================
   ASHAR MERAC — single source of truth for all 4 variants.
   Sources: ashar.in/p/ashar-merac (microsite) + "Ashar Merac
   Quick Brochure.pdf". Where the two differ, see `notes`.
   ============================================================ */
window.MERAC = {
  name: "Ashar Merac",
  tagline: "Let’s return to a place where goodness awaits",
  taglineSub: "and your soul finds a home.",
  chapter: "The next chapter in joyous living",
  verticals: ["Residences", "Retail", "School"],
  address: "Shree Nagar, Mulund–Thane Corridor",
  phones: { primary: "9112080911", office: "022-68680025" },
  rera: {
    merac2: "P51700079691",
    url: "https://maharera.mahaonline.gov.in"
  },
  intro: {
    kicker: "Inspired by nature, nurtured by life",
    body: "Welcome to a world where clean air reminds you to take deep breaths. Expansive landscaped spaces with stunning rock gardens, tropical plantations and meandering water bodies invite you to spend more time in the open. And a world of curated experiences adds to everyday joys."
  },
  highlights: [
    { k: "2", u: "Towers", d: "of 36 storeys each*" },
    { k: "1·2·3·4", u: "Bed Residences", d: "with large decks" },
    { k: "1 Lac", u: "Sq.ft. approx.", d: "of indulgences across 3 levels" },
    { k: "2 min", u: "to Mulund", d: "and Wagle Estate" },
    { k: "4", u: "Acres", d: "of an expansive 11-acre canvas" },
    { k: "2-Level", u: "Retail", d: "road-facing high-street frontage" }
  ],
  usps: [
    "Designed by Padma Bhushan Architect Hafeez Contractor",
    "Assured admission to Finland International School",
    "Views of Yogi Hills and SGNP from your homes",
    "2 mins to Mulund and Wagle Estate",
    "Approx. 1 Lac sq.ft. of indulgences across 3 levels",
    "1, 2, 3 & 4 bed residences with large decks",
    "2 towers of 36 storeys each*",
    "2-level road-facing retail frontage"
  ],
  configs: [
    { id: "1bhk", bhk: "1 BHK", carpet: "390 – 444", min: 390, max: 444, img: "../assets/fp/1bhk.webp",
      rooms: ["Living", "Kitchen", "Bedroom", "Bath", "Deck"] },
    { id: "2bhk", bhk: "2 BHK", carpet: "596 – 700", min: 596, max: 700, img: "../assets/fp/2bhk-a.webp",
      rooms: ["Living", "Kitchen", "Bedroom 1", "Bedroom 2", "Bath", "Bath", "Deck"] },
    { id: "3bhk", bhk: "3 BHK", carpet: "830 – 947", min: 830, max: 947, img: "../assets/fp/3bhk.webp",
      rooms: ["Living", "Dining", "Kitchen", "Bedroom 1", "Bedroom 2", "Bedroom 3", "Bath", "Bath", "Deck"] },
    { id: "4bhk", bhk: "4 BHK", carpet: "1342", min: 1342, max: 1342, img: null,
      rooms: ["Living", "Dining", "Kitchen", "Bedroom 1", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Bath", "Bath", "Deck"] }
  ],
  zones: [
    { id: "serengeti", name: "Serengeti", level: "The ground level escapade", line: "Let’s return to greens",
      img: "../assets/img/serengeti.jpg", alt: "../assets/img/savannah.webp",
      body: "At Serengeti, life flows effortlessly. From the vibrant Play Lawn to the dedicated Senior Citizen Corner – there’s something here for every generation to unwind, connect, and thrive.",
      items: ["Portal gate with security cabin", "Entry feature element", "Play lawn", "Senior citizen corner", "Reflexology path", "Box cricket net", "Cycle track", "Seating nooks", "Pets park", "Natural sit-outs", "Community lawn", "Tree-lined driveway"] },
    { id: "springs", name: "The Springs", level: "At the podium", line: "Let’s return to experiences",
      img: "../assets/img/springs.jpg", alt: "../assets/img/oasis.webp",
      body: "At The Springs, every element is designed to help you slow down, breathe deeper, and live fuller. From refreshing dips in the serene pool to cozy alfresco evenings, this is where leisure finds its true rhythm.",
      items: ["Adults’ pool", "Kid’s pool", "Pool deck", "Cabana & outdoor seating", "Alfresco seating", "Barbeque area", "Mini pickleball court", "Squash court", "Skating rink", "Multipurpose court", "Hill view deck", "Healing garden", "Amphi seats", "Play lawn", "Kid’s play area", "Toddlers’ play area", "Board games", "Reading corner", "Youth corner", "Senior citizen plaza"] },
    { id: "club", name: "The Club", level: "At the podium level", line: "Let’s return to togetherness",
      img: "../assets/img/club-pool.jpg", alt: "../assets/img/club.webp",
      body: "At The Club, life comes alive with laughter, connection, and celebration. It’s where everyday moments turn into cherished memories, and neighbours become lifelong friends.",
      items: ["Banquet", "Club lobby", "Meeting rooms", "Guest rooms", "Fully equipped gym", "Work pods", "Library", "Pantry"] },
    { id: "nest", name: "The Nest", level: "On the 20th level", line: "Let’s return to awe",
      img: "../assets/img/nest-facade.jpg", alt: "../assets/img/nest.webp",
      body: "At The Nest, freedom finds its space. It’s a haven for those who long to slow down and reconnect – with themselves, with nature, and with kindred spirits.",
      items: ["Hill view lounge", "Viewing deck", "Hammock seating", "Zumba / dance studio", "Common meditation zone", "Self meditation zone", "Creative corner", "Indoor games", "Reading corner", "Mound seating", "Pebble seating", "Stepped seats", "Social gathering corner", "Pantry area"] }
  ],
  mtc: {
    title: "The Hidden Valley of Mumbai",
    sub: "Mulund Thane Corridor",
    body: "Ashar Merac is nestled in the Mulund Thane Corridor (MTC), locally known as Shree Nagar – a 5 km untouched expanse in Eastern MMR, set against the captivating backdrop of the Yogi Hills. Strategically positioned amidst the lush greenery of SGNP, the potential of Wagle Estate, the culture of Mulund and the City of Lakes, Thane.",
    facts: [
      { k: "SGNP", d: "Located at the foothills of Sanjay Gandhi National Park" },
      { k: "2°", d: "Cooler than both LBS Marg & GB Road" },
      { k: "5 km", d: "Unexplored stretch with mesmerising views of Yogi Hills" },
      { k: "Wagle", d: "Popularly considered Wagle Estate’s residential extension" }
    ]
  },
  phase1: {
    title: "Let’s return to a glorious beginning",
    body: "It all began in June 2024, on a brisk morning in Shree Nagar – where the hum of progress blends seamlessly with the aroma of freshly brewed chai. Ashar Merac Phase 1 was unveiled: four acres of an expansive canvas, three gleaming towers, a world-class lifestyle. The response was extraordinary.",
    stats: [
      { n: 500, s: "", u: "Units", d: "Sold in 5 weeks of launch" },
      { n: 11, s: "%", u: "Appreciation", d: "Within 1 year" },
      { n: 60000, s: "", u: "Families", d: "Have considered us" }
    ],
    construction: "17th slab completed (Phase 1, as of Sept 2023)"
  },
  retail: {
    title: "Gated community address with high-street retail",
    line: "Let’s return to ‘just two minutes’",
    body: "The high-street retail at Ashar Merac brings everyday convenience right to your doorstep. Thoughtfully designed with a striking façade, it blends style with functionality – a seamless shopping experience just an elevator ride away.",
    points: ["Only high-street retail experience in MTC", "2-level shopping experience", "Grand retail with road frontage", "Shops from 250 to 750 sq.ft.", "Sufficient car parking"]
  },
  homes: {
    line: "Let’s return to ‘home with a view’",
    title: "Supersized homes with large decks",
    images: ["../assets/img/living-view.jpg", "../assets/img/living.jpg", "../assets/img/bedroom.jpg"]
  },
  specs: {
    common: ["Double-height designer entrance lobby", "Biometric access to lobby entrance", "Driver’s room with restrooms", "Society office for each wing", "CCTV surveillance at common covered areas", "Generator backup for lifts", "High-speed elevators", "1 fire tower in each wing", "Rainwater harvesting", "Organic waste management", "LED light fixtures in common areas", "Boom barriers at security gate with cabin", "EV charging for cars and bikes", "Landscape arrival plaza"],
    internal: {
      "Living": ["Vitrified flooring tiles", "Powder-coated aluminium sliding windows", "Video door phone", "Acrylic emulsion wall finish"],
      "Bedroom": ["Vitrified flooring tiles", "Powder-coated aluminium sliding windows", "Acrylic emulsion wall finish"],
      "Kitchen": ["Granite kitchen platform", "Stainless steel sink", "Vitrified flooring", "Dado tiles 2 ft above platform", "Smoke detector", "Water-purifier inlet & outlet", "Washing-machine inlet & outlet", "Support for MGL piped gas", "Roma or equivalent modular switches", "Exhaust fan"],
      "Bathroom": ["Concealed piping", "Anti-skid flooring", "Dado tiles up to door height", "Branded CP fixtures", "Exhaust fan"]
    }
  },
  /* Location: distances from brochure; bearings are approximate
     compass directions from Shree Nagar for the radial locator. */
  location: {
    lat: 19.2018, lng: 72.9596,
    mapQuery: "Ashar Merac, Shree Nagar, Wagle Estate, Thane West",
    categories: [
      { id: "connect", name: "Connectivity", icon: "M3 17h18M6 17V9l6-4 6 4v8", items: [
        ["Mulund Station", 2.5, 200], ["Upcoming Metro (Line 4)", 2.5, 120], ["Mulund Check Naka", 2.9, 165],
        ["Eastern Express Highway", 3.2, 140], ["Thane Station", 5, 95], ["LBS Marg", 9.2, 185], ["Wagle Estate", 0.8, 60] ] },
      { id: "hubs", name: "City Hubs", icon: "M4 20V8l8-4 8 4v12M9 20v-6h6v6", items: [
        ["Powai", 15, 205], ["Andheri", 21, 220], ["Mumbai Int’l Airport", 22, 212], ["BKC", 26, 197] ] },
      { id: "edu", name: "Education", icon: "M2 9l10-5 10 5-10 5-10-5zm4 3v5c3 2 9 2 12 0v-5", items: [
        ["Finland International School", 0.04, 30], ["NES International School", 1.3, 175], ["DAV International School (Proposed)", 3.2, 110],
        ["Billabong High International School", 3.7, 70], ["Sulochanadevi Singhania School", 4, 85] ] },
      { id: "health", name: "Healthcare", icon: "M12 5v14M5 12h14", items: [
        ["Shree Mahavir Jain Hospital", 1.9, 80], ["Platinum Hospital", 1.9, 150], ["Jupiter Hospital", 4.3, 100],
        ["Fortis Hospital", 4.6, 190], ["Bethany Hospital", 5.5, 60] ] },
      { id: "work", name: "IT Parks", icon: "M4 20V4h10v16M14 9h6v11M7 8h4M7 12h4M7 16h4", items: [
        ["Lodha Supremus", 0.9, 75], ["Oriana Business Park", 1, 90], ["Centrum", 1.1, 55],
        ["Ashar IT Park", 1.6, 65], ["Opal Square IT Park", 1.6, 100] ] },
      { id: "life", name: "Lifestyle", icon: "M6 7h12l-1 13H7L6 7zm3 0a3 3 0 016 0", items: [
        ["R Mall", 1.6, 170], ["Kalidas Auditorium", 3.1, 180], ["Korum Mall", 3.2, 105], ["Viviana Mall", 4.6, 90] ] },
      { id: "nature", name: "Nature", icon: "M12 3l7 12H5l7-12zm0 12v6", items: [
        ["Cypress Garden", 2, 130], ["Shri Anand Dighe Garden", 2, 45], ["Sardar Pratap Singh Garden", 2.4, 195],
        ["Yogi Hill", 2.5, 250], ["Mama Bhanja Hills", 2.9, 280], ["Deshmukh Garden", 4.8, 110] ] }
    ],
    infra: ["Goregaon–Mulund Link Road (GMLR)", "Airoli–Katai Naka Tunnel", "Thane–Borivali Tunnel", "Mumbai–Ahmedabad Bullet Train", "Thane–Chembur Eastern Freeway", "Thane Bypass Road", "Mulund 90 ft Road", "Metro Line 6 (Lokhandwala–Vikhroli)", "Metro Line 5 (Thane–Bhiwandi–Kalyan)", "Wadala–Mulund Cycling & Jogging Track"]
  },
  developer: {
    title: "Defined by trust, celebrated by promises delivered",
    body: "At Ashar Group, we’ve been shaping skylines and building trust since 2001. Headquartered in the Mumbai Metropolitan Region, we are recognised for our commitment to transparency, quality, and timely delivery – named among Thane’s Top 10 builders, and the only developer in the MMR with zero RERA complaints.",
    body2: "Our portfolio includes Thane’s largest IT park, Billabong High International School and premium residential and commercial developments – and initiatives like the Mahavir Jain Hospital, supporting accessible healthcare for all.",
    footprint: [
      { n: 24, s: " yrs", d: "Of legacy" },
      { n: 9, s: "M", d: "Sq.ft. completed" },
      { n: 17, s: "M", d: "Sq.ft. under development" },
      { n: 30, s: "+", d: "Projects" }
    ],
    lives: [
      { n: 29000, s: "", d: "Happy customers" }, { n: 200, s: "", d: "Retail brands" },
      { n: 250, s: "+", d: "Corporate offices" }, { n: 5000, s: "+", d: "Students" },
      { n: 710, s: "+", d: "Multispeciality hospital beds" }
    ],
    film: { title: "The Journey of a Promise", sub: "Carried across 25 years, by thousands of hands", yt: "tp0yrsLG6QY", yt2: "Mca534p96CM",
      body: "For 25 years, every promise we made at Ashar Group has been carried forward by thousands of hands – with our customers, partners, landowners, teams and their families too. To all of them belongs this milestone." }
  },
  offices: [
    { t: "Sales Office", a: "Ashar Merac, Opp. Finland International School, Road No. 27, Mulund–Thane Corridor, Shreenagar, Thane 400604" },
    { t: "Experience Centre", a: "Ashar Aria, Next to Sapphire Hospital, Kharegaon Road, Kalwa (W), Thane 400605" }
  ],
  disclaimer: "This advertisement does not constitute any form of an offer and/or agreement and all purchases/leases shall solely be governed by the terms and conditions of the agreement for sale/lease. All images are artist’s impressions for representative purposes unless otherwise noted. Timings shown are approximate and may vary with traffic. On availability of further FSI, number of floors may increase. *T&C apply."
};
