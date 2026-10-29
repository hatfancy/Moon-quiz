export interface MoonMission {
  id: string;
  name: string;
  year: number;
  date: string;
  country: string;
  agency: string;
  flag: string;
  type: 'Lander' | 'Rover' | 'Orbiter' | 'Crewed' | 'Impactor' | 'Flyby';
  outcome: 'Success' | 'Partial Success' | 'Failed';
  description: string;
  objective: string;
  achievements: string[];
  keyFact: string;
  iconName: string;
}

export const MOON_MISSIONS: MoonMission[] = [
  {
    id: 'luna-2',
    name: 'Luna 2',
    year: 1959,
    date: 'September 12, 1959',
    country: 'Soviet Union',
    agency: 'Soviet Space Program',
    flag: '🚀',
    type: 'Impactor',
    outcome: 'Success',
    description: 'The first spacecraft in human history to reach the surface of the Moon, impacting near the Palus Putredinis region.',
    objective: 'Demonstrate direct impact on the Moon and measure lunar radiation and magnetic fields.',
    achievements: [
      'First artificial object to reach celestial body',
      'Confirmed the Moon has no significant magnetic field',
      'Delivered Soviet pennants to the lunar surface'
    ],
    keyFact: 'Traveled at ~3.3 km/s on impact and verified zero Van Allen radiation belts around the Moon.',
    iconName: 'Sparkles'
  },
  {
    id: 'luna-9',
    name: 'Luna 9',
    year: 1966,
    date: 'January 31, 1966',
    country: 'Soviet Union',
    agency: 'Soviet Space Program',
    flag: '📡',
    type: 'Lander',
    outcome: 'Success',
    description: 'The first spacecraft to achieve a survivable soft landing on another celestial body, sending back first close-up surface pictures.',
    objective: 'Soft land safely on the lunar surface and transmit panoramic photography.',
    achievements: [
      'First soft landing on the Moon',
      'Proved lunar soil could support spacecraft weight without sinking',
      'Transmitted 9 photographic panoramas'
    ],
    keyFact: 'Bounced on airbags before opening 4 petal-like antennas to stabilize itself upright.',
    iconName: 'Radio'
  },
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    year: 1969,
    date: 'July 16, 1969',
    country: 'United States',
    agency: 'NASA',
    flag: '🇺🇸',
    type: 'Crewed',
    outcome: 'Success',
    description: 'The historic first crewed lunar landing mission. Neil Armstrong and Buzz Aldrin walked on the Sea of Tranquility while Michael Collins orbited above.',
    objective: 'Perform a crewed lunar landing, deploy experiments, collect samples, and return safely to Earth.',
    achievements: [
      'First humans to walk on the Moon',
      'Collected 21.55 kg of lunar rock and soil samples',
      'Deployed passive seismometer and laser-ranging retroreflector',
      'Watched live by over 650 million viewers worldwide'
    ],
    keyFact: '“That\'s one small step for man, one giant leap for mankind.” Neil Armstrong spent 2h 31m outside.',
    iconName: 'Footprints'
  },
  {
    id: 'apollo-15',
    name: 'Apollo 15',
    year: 1971,
    date: 'July 26, 1971',
    country: 'United States',
    agency: 'NASA',
    flag: '🇺🇸',
    type: 'Crewed',
    outcome: 'Success',
    description: 'First of the Apollo "J-missions" capable of extended scientific stays. First mission to drive the Lunar Roving Vehicle (LRV).',
    objective: 'Explore Hadley Rille and Apennine mountains, sample ancient anorthosite crust.',
    achievements: [
      'First use of the Lunar Roving Vehicle (27.9 km traveled)',
      'Discovered the Genesis Rock (4 billion years old)',
      'Galileo hammer-feather drop experiment demonstrated in vacuum'
    ],
    keyFact: 'Dave Scott dropped a falcon feather and a geology hammer simultaneously in lunar vacuum.',
    iconName: 'Compass'
  },
  {
    id: 'luna-24',
    name: 'Luna 24',
    year: 1976,
    date: 'August 9, 1976',
    country: 'Soviet Union',
    agency: 'Soviet Space Program',
    flag: '🔬',
    type: 'Lander',
    outcome: 'Success',
    description: 'Third Soviet robotic sample return mission, extracting a 2-meter core sample from Mare Crisium.',
    objective: 'Drill deep core sample from Mare Crisium and return to Earth autonomously.',
    achievements: [
      'Extracted 170.1 grams of subsurface lunar material',
      'First definitive detection of trace water (0.1 wt%) in lunar soil later confirmed'
    ],
    keyFact: 'Last spacecraft to land on the Moon until China\'s Chang\'e 3 touched down 37 years later in 2013.',
    iconName: 'Layers'
  },
  {
    id: 'lunar-prospector',
    name: 'Lunar Prospector',
    year: 1998,
    date: 'January 7, 1998',
    country: 'United States',
    agency: 'NASA',
    flag: '🇺🇸',
    type: 'Orbiter',
    outcome: 'Success',
    description: 'A dedicated polar orbiter mapped lunar composition, gravity anomalies, and confirmed potential water ice trapped in permanently shadowed polar craters.',
    objective: 'Map lunar surface composition, gravity, magnetic fields, and volatile outgassing.',
    achievements: [
      'High-resolution global maps of elemental abundance',
      'Confirmed signature of hydrogen indicating water ice at both poles'
    ],
    keyFact: 'Carried a portion of geologist Eugene Shoemaker\'s ashes, making him the first human buried on the Moon.',
    iconName: 'Satellite'
  },
  {
    id: 'kaguya',
    name: 'Kaguya (SELENE)',
    year: 2007,
    date: 'September 14, 2007',
    country: 'Japan',
    agency: 'JAXA',
    flag: '🇯🇵',
    type: 'Orbiter',
    outcome: 'Success',
    description: 'Japan\'s flagship lunar orbiter carrying 14 scientific instruments including iconic high-definition cameras capturing Earthrise in 1080p.',
    objective: 'Comprehensive study of lunar origin and geological evolution using 3 interconnected satellites.',
    achievements: [
      'First ultra-HD videos of Earthrise and Earthset over lunar mountains',
      'Precise gravity map of the far side of the Moon',
      'Identified deep lava tube skylights at Marius Hills'
    ],
    keyFact: 'Lava skylights discovered by Kaguya could serve as natural radiation shielding for future astronaut habitats.',
    iconName: 'Camera'
  },
  {
    id: 'chandrayaan-1',
    name: 'Chandrayaan-1',
    year: 2008,
    date: 'October 22, 2008',
    country: 'India',
    agency: 'ISRO',
    flag: '🇮🇳',
    type: 'Orbiter',
    outcome: 'Success',
    description: 'India\'s first deep space mission, which made the landmark global discovery of water-hydroxyl molecules across lunar polar soil.',
    objective: 'High-resolution chemical and mineralogical mapping of the Moon.',
    achievements: [
      'Conclusive detection of widespread lunar water molecules (M3 instrument)',
      'Released the Moon Impact Probe (MIP) striking Shackleton crater',
      'Mapped 3D topography across complex polar terrain'
    ],
    keyFact: 'NASA\'s Moon Mineralogy Mapper aboard Chandrayaan-1 provided unmistakable proof of lunar H2O molecules.',
    iconName: 'Droplets'
  },
  {
    id: 'lro-lcross',
    name: 'LRO & LCROSS',
    year: 2009,
    date: 'June 18, 2009',
    country: 'United States',
    agency: 'NASA',
    flag: '🇺🇸',
    type: 'Orbiter',
    outcome: 'Success',
    description: 'Lunar Reconnaissance Orbiter created the most comprehensive meter-scale 3D atlas of the Moon while LCROSS impacted Cabeus crater.',
    objective: 'Scout landing sites, radiation hazard, temperature extremes, and volatile deposits.',
    achievements: [
      'LCROSS impact verified pure water ice crystals ejected from Cabeus crater',
      'Over 1 petabyte of high-res imagery and topographic altimetry',
      'Photographed Apollo landing descent stages, rovers, and astronaut footpaths from orbit'
    ],
    keyFact: 'LRO has been continuously operating in lunar orbit for over 15 years, still imaging today.',
    iconName: 'Map'
  },
  {
    id: 'change-4',
    name: 'Chang\'e 4 & Yutu-2',
    year: 2019,
    date: 'December 7, 2018',
    country: 'China',
    agency: 'CNSA',
    flag: '🇨🇳',
    type: 'Rover',
    outcome: 'Success',
    description: 'First ever soft landing on the mysterious far side of the Moon (South Pole–Aitken basin), supported by Queqiao relay satellite.',
    objective: 'Explore the oldest and deepest lunar impact basin without direct Earth line-of-sight.',
    achievements: [
      'First landing on the Moon\'s far side',
      'Longest operating lunar rover in history (Yutu-2 > 5 years)',
      'Subsurface radar probing up to 300 meters deep into regolith layers'
    ],
    keyFact: 'Because the far side never faces Earth, all telemetry passes through the Queqiao relay satellite at Earth-Moon L2.',
    iconName: 'Radio'
  },
  {
    id: 'chandrayaan-3',
    name: 'Chandrayaan-3',
    year: 2023,
    date: 'July 14, 2023',
    country: 'India',
    agency: 'ISRO',
    flag: '🇮🇳',
    type: 'Rover',
    outcome: 'Success',
    description: 'Historic mission achieving the first successful soft landing in the Moon\'s rugged southern polar region (Shiv Shakti point).',
    objective: 'Safely land near 69°S latitude and deploy Pragyan rover for in-situ chemical analysis.',
    achievements: [
      'First nation to land in the lunar south polar region',
      'Pragyan rover confirmed elemental sulfur, iron, and calcium via LIBS',
      'ChaSTE probe recorded dramatic surface vs 8cm depth temperature gradients (+60°C to -10°C)'
    ],
    keyFact: 'India became only the fourth country to achieve a soft lunar landing, and the first near the South Pole.',
    iconName: 'Zap'
  },
  {
    id: 'slim',
    name: 'SLIM (Moon Sniper)',
    year: 2024,
    date: 'January 19, 2024',
    country: 'Japan',
    agency: 'JAXA',
    flag: '🇯🇵',
    type: 'Lander',
    outcome: 'Success',
    description: 'Smart Lander for Investigating Moon demonstrated pinpoint landing technology within 100 meters, touching down 55m from target.',
    objective: 'Demonstrate pinpoint landing within 100 meters on a 15-degree slope.',
    achievements: [
      'Landed within an unprecedented 55 meters of pinpoint target',
      'Deployed LEV-1 hopping robot and LEV-2 spherical transforming rover',
      'Survived multiple freezing lunar nights beyond original design life'
    ],
    keyFact: 'Nicknamed the "Moon Sniper" for achieving the most accurate planetary landing in spaceflight history.',
    iconName: 'Target'
  },
  {
    id: 'artemis-program',
    name: 'Artemis Program (Artemis II & III)',
    year: 2025,
    date: '2025-2026+',
    country: 'International',
    agency: 'NASA / ESA / JAXA / CSA',
    flag: '🌍',
    type: 'Crewed',
    outcome: 'Success',
    description: 'Next-generation lunar exploration returning humans, including the first woman and person of colour, to establish sustainable bases.',
    objective: 'Establish permanent lunar camp, explore Shackleton crater water deposits, build Lunar Gateway station.',
    achievements: [
      'Artemis I completed flawless uncrewed distant retrograde orbit test',
      'SLS rocket and Orion capsule deep space human-rating validation'
    ],
    keyFact: 'Planning permanent sustainable exploration to act as a proving ground for human missions to Mars.',
    iconName: 'Rocket'
  }
];

export interface QuizQuestion {
  id: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'Easy',
    category: 'History',
    question: 'Who was the first human to step onto the surface of the Moon?',
    options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Michael Collins'],
    correctAnswer: 1,
    explanation: 'Neil Armstrong stepped onto the lunar surface on July 20, 1969, declaring "That\'s one small step for man, one giant leap for mankind."'
  },
  {
    id: 2,
    difficulty: 'Easy',
    category: 'Physics',
    question: 'How strong is gravity on the Moon compared to Earth?',
    options: ['About 1/2 (50%)', 'About 1/6 (16.6%)', 'About 1/10 (10%)', 'Zero gravity'],
    correctAnswer: 1,
    explanation: 'Moon\'s surface gravity is approximately 1.62 m/s², roughly 1/6th or 16.6% of Earth\'s gravity (9.8 m/s²).'
  },
  {
    id: 3,
    difficulty: 'Easy',
    category: 'Missions',
    question: 'In what year did Apollo 11 successfully land on the Moon?',
    options: ['1965', '1969', '1972', '1981'],
    correctAnswer: 1,
    explanation: 'Apollo 11 touched down on July 20, 1969 at the Sea of Tranquility.'
  },
  {
    id: 4,
    difficulty: 'Medium',
    category: 'Discoveries',
    question: 'Which mission delivered decisive global evidence of water molecules across lunar soil?',
    options: ['Luna 9', 'Chandrayaan-1', 'Viking 1', 'Apollo 13'],
    correctAnswer: 1,
    explanation: 'India\'s Chandrayaan-1 carrying NASA\'s Moon Mineralogy Mapper confirmed widespread hydroxyl and water signatures in 2008.'
  },
  {
    id: 5,
    difficulty: 'Medium',
    category: 'Exploration',
    question: 'Which spacecraft achieved the first ever landing on the mysterious far side of the Moon?',
    options: ['Luna 2', 'Chang\'e 4', 'Apollo 17', 'Surveyor 3'],
    correctAnswer: 1,
    explanation: 'China\'s Chang\'e 4 landed in Von Kármán crater on the Moon\'s far side on January 3, 2019, communicating via Queqiao relay.'
  },
  {
    id: 6,
    difficulty: 'Medium',
    category: 'Science',
    question: 'Why do we always see the same side of the Moon from Earth?',
    options: [
      'The Moon does not rotate at all',
      'Tidal locking causes orbital period to equal rotational period',
      'Earth\'s clouds block the far side',
      'The Moon rotates 10x faster than Earth'
    ],
    correctAnswer: 1,
    explanation: 'Tidal locking (synchronous rotation) means the Moon takes roughly 27.3 days to rotate once on its axis and the same time to orbit Earth.'
  },
  {
    id: 7,
    difficulty: 'Hard',
    category: 'Missions',
    question: 'Which country became the first to successfully land a spacecraft near the lunar South Pole in 2023?',
    options: ['United States', 'Russia', 'India', 'Japan'],
    correctAnswer: 2,
    explanation: 'India achieved this historic milestone with Chandrayaan-3\'s Vikram lander on August 23, 2023 at the Shiv Shakti point.'
  },
  {
    id: 8,
    difficulty: 'Hard',
    category: 'Precision',
    question: 'Which Japanese lander earned the nickname "Moon Sniper" for landing within 55 meters of target in 2024?',
    options: ['Hayabusa 2', 'SELENE', 'SLIM', 'Hakuto-R'],
    correctAnswer: 2,
    explanation: 'JAXA\'s SLIM (Smart Lander for Investigating Moon) proved pinpoint lunar landing capability within dozens of meters.'
  },
  {
    id: 9,
    difficulty: 'Hard',
    category: 'Geology',
    question: 'What is the grey, fine, abrasive powdery dust that covers the Moon called?',
    options: ['Basalt gravel', 'Lunar regolith', 'Pumice dust', 'Silica ash'],
    correctAnswer: 1,
    explanation: 'Lunar regolith is a layer of pulverized rock formed over billions of years of meteorite and micrometeorite impacts.'
  }
];

export interface MoonFact {
  id: number;
  category: 'Orbit & Size' | 'Surface & Geology' | 'Water & Atmosphere' | 'Human Footprint';
  title: string;
  metric: string;
  description: string;
  icon: string;
}

export const MOON_FACTS: MoonFact[] = [
  {
    id: 1,
    category: 'Orbit & Size',
    title: 'Average Distance from Earth',
    metric: '384,400 km',
    description: 'You could fit all seven other planets of our solar system edge-to-edge in the space between Earth and the Moon.',
    icon: 'Orbit'
  },
  {
    id: 2,
    category: 'Orbit & Size',
    title: 'Lunar Drift',
    metric: '3.8 cm / year',
    description: 'Due to tidal friction transferring orbital energy from Earth to the Moon, the Moon is slowly spiralling away each year.',
    icon: 'ArrowUpRight'
  },
  {
    id: 3,
    category: 'Surface & Geology',
    title: 'Extreme Temperatures',
    metric: '-130°C to +120°C',
    description: 'Without an atmosphere to trap heat or shield sunlight, lunar equator temperatures fluctuate by over 250 degrees Celsius!',
    icon: 'Thermometer'
  },
  {
    id: 4,
    category: 'Surface & Geology',
    title: 'Permanently Shadowed Craters',
    metric: '-246°C (27 K)',
    description: 'Polar craters like Hermite hold temperatures colder than the surface of Pluto, acting as cold traps holding ancient water ice.',
    icon: 'Snowflake'
  },
  {
    id: 5,
    category: 'Water & Atmosphere',
    title: 'Water Ice at Poles',
    metric: '>600M tonnes',
    description: 'Vast deposits of water ice exist at the South Pole, offering rocket fuel (liquid H2 & O2) and drinking water for future bases.',
    icon: 'Droplets'
  },
  {
    id: 6,
    category: 'Human Footprint',
    title: 'Footprints Never Wash Away',
    metric: 'Millions of Years',
    description: 'Because there is virtually no lunar atmosphere, wind, or rain, astronaut footprints will remain crisp for countless generations.',
    icon: 'Footprints'
  }
];
