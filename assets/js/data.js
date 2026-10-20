/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Shared Data Layer (data.js)
 * Single source of truth for fictional models, reviews, test-ride centers, and scoring criteria.
 * All models, prices, and specifications are fictional demo data.
 */

window.VoltData = {
  // 9 Fictional E-Bike Models
  models: [
    {
      id: "apex-urban-x",
      name: "Urban-X Commuter",
      brand: "Apex Cycles",
      type: "commuter",
      tagline: "The benchmark lightweight urban commuter with responsive torque sensing.",
      price: 2199,
      editorialScore: 9.4,
      userRating: 4.8,
      reviewCount: 142,
      badge: "Best Value",
      motorType: "mid",
      motorLabel: "Mid-Drive Crank",
      motorWatts: 250,
      motorTorque: 65,
      batteryWh: 504,
      batterySpec: "36V 14Ah LG Cells",
      claimedRange: 58,
      weight: 42,
      maxLoad: 275,
      brakes: "Shimano MT200 Hydraulic Disc (180mm)",
      gears: "Shimano Deore 10-Speed 11-42T",
      display: "2.8\" High-Contrast Color LCD with USB-C",
      lights: "Integrated 80-Lux StVZO Headlight & Brake Light",
      ebikeClass: "Class 1",
      warranty: "3-Year Frame & Electrical Warranty",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["torque_sensor", "removable_battery", "integrated_lights", "hydraulic_brakes", "rack_mounts"],
      categoryScores: {
        ride: 9.6,
        battery: 9.1,
        build: 9.4,
        value: 9.5
      },
      pros: {
        ride: ["Natural torque sensor matches pedal cadence flawlessly", "Agile 42 lb frame feels just like an acoustic bike"],
        battery: ["Removable down-tube battery charges to 80% in 2.2 hours", "Consistent power discharge even under 20% remaining"],
        build: ["Neat internal cable routing with weather-sealed rubber ports", "Class-leading Shimano hydraulic brake stopping power"],
        value: ["Includes fenders, kickstand, and rear pannier rack as standard"]
      },
      cons: {
        ride: ["Firm rigid fork transmits sharp cobblestone chatter", "Flat handlebar may require ergonomic grips for touring"],
        battery: ["Key latch can feel snug during winter operation"],
        build: ["Gloss paint finish shows minor scuffs easily"],
        value: ["Proprietary 4A fast charger sold separately"]
      },
      verdict: {
        forWho: "Daily city commuters wanting an agile, natural-feeling ride that looks sleek and carries groceries effortlessly.",
        skipWho: "Riders needing a throttle for steep hill-starts or those seeking full plush suspension for rough off-road terrain."
      },
      reviewSnippet: "“Clocked 1,800 commuting miles through Seattle rain without a single electrical hiccup. The torque sensor is buttery smooth.”"
    },
    {
      id: "voltstrider-velo-8",
      name: "Strider Velo 8",
      brand: "VoltStrider",
      type: "commuter",
      tagline: "Effortless throttle-assisted cruiser engineered for flat and mixed suburban corridors.",
      price: 1849,
      editorialScore: 8.8,
      userRating: 4.6,
      reviewCount: 98,
      badge: "Popular Pick",
      motorType: "hub",
      motorLabel: "Geared Rear Hub",
      motorWatts: 500,
      motorTorque: 55,
      batteryWh: 624,
      batterySpec: "48V 13Ah Samsung Cells",
      claimedRange: 48,
      weight: 52,
      maxLoad: 300,
      brakes: "Tektro Aries Mechanical Disc (180mm)",
      gears: "Microshift 8-Speed RapidFire",
      display: "Backlit Matrix Monochrome LCD",
      lights: "Front 50-Lux LED & Battery-Tied Rear Tail",
      ebikeClass: "Class 2",
      warranty: "2-Year Comprehensive Limited",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["removable_battery", "integrated_lights", "rack_mounts"],
      categoryScores: {
        ride: 8.5,
        battery: 9.0,
        build: 8.7,
        value: 9.2
      },
      pros: {
        ride: ["Thumb throttle provides instant launch at busy traffic lights", "Upright swept-back bars ease lower back and wrist strain"],
        battery: ["Large 624Wh battery easily covers two days of round-trip riding", "Integrated rear battery brake light increases visibility"],
        build: ["Sturdy welded rear rack carries 55 lbs of cargo", "Puncture-resistant 2.2\" balloon street tires"],
        value: ["Sub-$1,900 price point includes throttle and large capacity pack"]
      },
      cons: {
        ride: ["Cadence sensor has a slight half-turn pedal delay on starts", "Heavy 52 lb weight makes apartment stair carry difficult"],
        battery: ["Standard 2A charger takes nearly 6 hours for full replenish"],
        build: ["Mechanical disc brakes require periodic cable tension tuning"],
        value: ["Display is non-color and lacks active turn prompts"]
      },
      verdict: {
        forWho: "Suburban riders looking for relaxed, upright riding with a helpful throttle for traffic starts and easy cruising.",
        skipWho: "Lightweight bike seekers or riders in extremely steep mountain regions where mid-drives excel."
      },
      reviewSnippet: "“The thumb throttle is a lifesaver when pulling away from red lights on 45mph roads. Very solid cruiser.”"
    },
    {
      id: "terrapeak-trail-9",
      name: "PeakEnduro Trail 9",
      brand: "TerraPeak",
      type: "mountain",
      tagline: "High-torque all-mountain eMTB built for steep climbs, rocky descents, and backcountry singletrack.",
      price: 3499,
      editorialScore: 9.6,
      userRating: 4.9,
      reviewCount: 116,
      badge: "Best Overall",
      motorType: "mid",
      motorLabel: "Ultra-Torque Mid-Drive",
      motorWatts: 750,
      motorTorque: 95,
      batteryWh: 720,
      batterySpec: "48V 15Ah Panasonic 21700 Cells",
      claimedRange: 65,
      weight: 49,
      maxLoad: 320,
      brakes: "Magura MT5 4-Piston Hydraulic (203mm)",
      gears: "SRAM Eagle NX 12-Speed 11-50T",
      display: "Stealth Top-Tube OLED with Bluetooth App",
      lights: "Modular 1200-Lumen Trail Blaster Light",
      ebikeClass: "Class 1",
      warranty: "4-Year Frame & Motor Warranty",
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["torque_sensor", "removable_battery", "integrated_lights", "hydraulic_brakes"],
      categoryScores: {
        ride: 9.8,
        battery: 9.4,
        build: 9.7,
        value: 9.3
      },
      pros: {
        ride: ["95Nm torque climbs 25% technical dirt gradients with ease", "RockShox 150mm air suspension eats rocks, drops, and roots"],
        battery: ["720Wh pack provides 4+ hours of spirited backcountry trail riding", "Deeply integrated battery creates low center of gravity"],
        build: ["Hydroformed 6061 alloy frame with carbon rocker link", "Quad-piston Magura MT5 brakes stop on a dime"],
        value: ["True eMTB components at a direct-to-consumer price advantage"]
      },
      cons: {
        ride: ["Knobby Maxxis Minion tires produce loud buzz on city asphalt", "Aggressive stance is not designed for relaxed grocery runs"],
        battery: ["Removal requires hex key lock pin for trail security"],
        build: ["No rear rack or fender mount eyelets on swingarm"],
        value: ["Higher upfront investment for dedicated off-road capability"]
      },
      verdict: {
        forWho: "Trail enthusiasts and mountain adventurers tackling steep singletrack, bike parks, and backcountry wilderness routes.",
        skipWho: "Pavement-only commuters who will never venture onto dirt and want kickstands or pannier baskets."
      },
      reviewSnippet: "“Conquered Colorado passes that used to destroy my knees. The 95Nm torque makes technical rock steps feel effortless.”"
    },
    {
      id: "kitefold-aero-1",
      name: "AeroFold One",
      brand: "Kite Mobility",
      type: "folding",
      tagline: "Ultra-compact 36 lb folding e-bike built for train connections and tight apartment closets.",
      price: 1449,
      editorialScore: 8.9,
      userRating: 4.7,
      reviewCount: 84,
      badge: "Compact Pick",
      motorType: "hub",
      motorLabel: "Mini Geared Front Hub",
      motorWatts: 350,
      motorTorque: 42,
      batteryWh: 360,
      batterySpec: "36V 10Ah Seatpost Concealed",
      claimedRange: 38,
      weight: 36,
      maxLoad: 240,
      brakes: "Zoom Hydraulic Flat-Mount Disc (160mm)",
      gears: "Shimano Nexus 7-Speed Internal Gear Hub",
      display: "Mini OLED Handlebar Remote",
      lights: "Integrated Low-Profile LED Head and Seatpost Halo",
      ebikeClass: "Class 2",
      warranty: "2-Year Worldwide Warranty",
      image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["removable_battery", "integrated_lights", "hydraulic_brakes"],
      categoryScores: {
        ride: 8.6,
        battery: 8.7,
        build: 9.1,
        value: 9.3
      },
      pros: {
        ride: ["Folds in 12 seconds to fit under office desks or in car trunks", "Internal gear hub lets you shift gears while fully stopped at lights"],
        battery: ["Seatpost-integrated battery doubles as lockable carry handle", "Charges from standard wall outlet in just 3 hours"],
        build: ["Magnetic clasp keeps folded frame securely clamped during transit", "Clean belt-drive option eliminates grease stains on work slacks"],
        value: ["Unbeatable urban packability at under $1,500"]
      },
      cons: {
        ride: ["16-inch wheels are sensitive to deep street potholes", "Maximum rider height capped at 6'2\" for optimal leg extension"],
        battery: ["360Wh battery is meant for short hops, not 50-mile epics"],
        build: ["Lower 240 lb max payload restricts heavy cargo bags"],
        value: ["Custom proprietary seatpost battery replacement cost"]
      },
      verdict: {
        forWho: "Multimodal commuters taking trains/subways and urban apartment dwellers with zero ground-floor storage space.",
        skipWho: "Long-distance touring riders or anyone riding over rough washboard gravel roads."
      },
      reviewSnippet: "“I take this on the commuter train every morning. Fits neatly between my knees and folds down in ten seconds flat.”"
    },
    {
      id: "haulcraft-cargo-max",
      name: "HaulCraft Cargo Max",
      brand: "HaulCraft",
      type: "cargo",
      tagline: "Heavy-duty long-tail utility cargo rig capable of hauling two children plus weekly groceries.",
      price: 3899,
      editorialScore: 9.5,
      userRating: 4.9,
      reviewCount: 168,
      badge: "Heavy Duty",
      motorType: "mid",
      motorLabel: "Cargo Heavy-Duty Mid-Drive",
      motorWatts: 750,
      motorTorque: 90,
      batteryWh: 960,
      batterySpec: "48V 20Ah Dual-Ready Samsung Pack",
      claimedRange: 70,
      weight: 68,
      maxLoad: 450,
      brakes: "Tektro Orion 4-Piston Hydraulic (203mm)",
      gears: "Enviolo Heavy-Duty Stepless Internal Hub",
      display: "3.5\" Center Color Console with Key Fob Start",
      lights: "Twin 100-Lux High-Beam Front & Dual Rear Flashers",
      ebikeClass: "Class 3",
      warranty: "5-Year Frame & 3-Year Powertrain",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cargo_Pedelec_CP1.jpg/960px-Cargo_Pedelec_CP1.jpg",
      mustHaves: ["torque_sensor", "removable_battery", "integrated_lights", "hydraulic_brakes", "rack_mounts"],
      categoryScores: {
        ride: 9.4,
        battery: 9.8,
        build: 9.6,
        value: 9.2
      },
      pros: {
        ride: ["Massive 450 lb total capacity carries two kids + 4 grocery bags", "Enviolo stepless hub allows infinite shifting under heavy pedal torque"],
        battery: ["Gigantic 960Wh pack withstands heavy wind and hilly kid-hauling", "Secondary battery mount pre-wired for 1,920Wh expansion"],
        build: ["Low step-through frame ensures confident ground reach at stops", "Heavy-duty double kickstand holds bike rock-solid while loading kids"],
        value: ["Replaces a second family vehicle for urban school and shopping runs"]
      },
      cons: {
        ride: ["68 lb dry weight requires dedicated garage or outdoor locked shed", "Turning radius requires wide street space"],
        battery: ["Large battery takes 7.5 hours with included standard 3A brick"],
        build: ["Cannot be mounted on standard hitch bicycle racks"],
        value: ["High initial purchase price plus child seat accessories"]
      },
      verdict: {
        forWho: "Car-free families, school-run parents, and local business couriers replacing motor vehicle trips.",
        skipWho: "Walk-up apartment owners with no ground-level secure charging access."
      },
      reviewSnippet: "“Replaced our family hatchback for 90% of school drop-offs and grocery runs. Hauls two kids up our steep neighborhood hill without breaking a sweat.”"
    },
    {
      id: "aeroshift-neo-step",
      name: "NeoStep Low-Entry",
      brand: "AeroShift",
      type: "commuter",
      tagline: "Low step-through geometry with buttery belt drive and zero-maintenance internal gearing.",
      price: 1699,
      editorialScore: 9.0,
      userRating: 4.7,
      reviewCount: 77,
      badge: "Easy Entry",
      motorType: "hub",
      motorLabel: "Silent Geared Rear Hub",
      motorWatts: 350,
      motorTorque: 50,
      batteryWh: 480,
      batterySpec: "36V 13.3Ah In-Tube Removable",
      claimedRange: 45,
      weight: 45,
      maxLoad: 280,
      brakes: "Shimano MT200 Hydraulic Disc (160mm)",
      gears: "Gates Carbon Drive Belt with Shimano 5-Speed Hub",
      display: "Minimalist Stem-Integrated LED Indicator",
      lights: "Integrated 60-Lux Headlight and Fender Tail",
      ebikeClass: "Class 1",
      warranty: "2-Year Comprehensive",
      image: "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["removable_battery", "integrated_lights", "hydraulic_brakes", "rack_mounts"],
      categoryScores: {
        ride: 9.1,
        battery: 8.8,
        build: 9.2,
        value: 9.0
      },
      pros: {
        ride: ["Ultra-low 14\" step-through makes mounting effortless in any attire", "Gates carbon belt drive is clean, grease-free, and dead silent"],
        battery: ["Hidden in-tube pack looks clean and balances front-rear weight", "Simple key release lifts battery straight up out of frame"],
        build: ["Full coverage aluminum fenders keep puddle splashes off trousers", "Comfort gel saddle with built-in suspension seatpost"],
        value: ["Rare belt drive e-bike priced comfortably under $1,700"]
      },
      cons: {
        ride: ["350W motor slows down on grades steeper than 12%", "5-speed gear range runs out of cadence above 22 mph"],
        battery: ["480Wh capacity requires daily charging for 25+ mile commuters"],
        build: ["Frame flex can be felt under aggressive out-of-the-saddle sprints"],
        value: ["Optional front cargo basket is an expensive add-on"]
      },
      verdict: {
        forWho: "Commuters, older riders, or casual city cruisers wanting clean belt-drive simplicity and zero greasy chain maintenance.",
        skipWho: "Speed demons and aggressive hill climbers who want punchy 750W acceleration."
      },
      reviewSnippet: "“No chain grease on my work clothes, no derailleur adjustments, and getting on and off is painless for my knees. Outstanding city bike.”"
    },
    {
      id: "summitridge-enduro",
      name: "SummitRidge Pro E-8",
      brand: "SummitTrail",
      type: "mountain",
      tagline: "Competition-grade carbon electric mountain bike with race-spec Fox suspension and massive 840Wh battery.",
      price: 4150,
      editorialScore: 9.7,
      userRating: 4.9,
      reviewCount: 92,
      badge: "Top Spec",
      motorType: "mid",
      motorLabel: "Torque-Sensing Performance Mid-Drive",
      motorWatts: 750,
      motorTorque: 90,
      batteryWh: 840,
      batterySpec: "48V 17.5Ah High-Discharge Pack",
      claimedRange: 75,
      weight: 47,
      maxLoad: 310,
      brakes: "Shimano XT 4-Piston Hydraulic (203/180mm)",
      gears: "Shimano XT 12-Speed Hyperglide+",
      display: "Top-Tube Integrated HUD with Bar Remote",
      lights: "Quick-Release 1000-Lumen Night Trail Light",
      ebikeClass: "Class 1",
      warranty: "5-Year Carbon Frame / 3-Year Electrical",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cube_Mountain_ebike_%2850198895002%29.jpg/960px-Cube_Mountain_ebike_%2850198895002%29.jpg",
      mustHaves: ["torque_sensor", "removable_battery", "integrated_lights", "hydraulic_brakes"],
      categoryScores: {
        ride: 9.9,
        battery: 9.6,
        build: 9.8,
        value: 8.9
      },
      pros: {
        ride: ["Carbon fiber front triangle keeps overall trail weight under 48 lbs", "Fox Float 36 Factory Kashima fork provides pro-level dampening"],
        battery: ["Massive 840Wh capacity handles alpine ascents with elevation gain", "Quick 4A charger included in box"],
        build: ["Shimano XT drivetrain shifts smoothly even under full assist motor load", "Internal dropper post with 170mm travel included"],
        value: ["Competes with $8,000 retail brand flagships at nearly half the price"]
      },
      cons: {
        ride: ["Suspension setup requires careful air pressure sag tuning", "High-performance brake pads can squeak when damp"],
        battery: ["Large battery makes the down-tube noticeably chunky"],
        build: ["No provisions for kickstand or heavy kickback commute racks"],
        value: ["Premium price point represents significant enthusiast investment"]
      },
      verdict: {
        forWho: "Hardcore mountain bikers and enduro riders seeking top-tier suspension and massive range for epic backcountry loops.",
        skipWho: "Budget-conscious buyers or riders looking for casual urban utility."
      },
      reviewSnippet: "“Rode 42 miles and 4,500 vertical feet in the Sierras and still had 2 bars of battery left. The suspension feels unreal on rocky descents.”"
    },
    {
      id: "nomadfold-express",
      name: "Nomad Fold Express",
      brand: "Nomad Cycles",
      type: "folding",
      tagline: "Puncture-protected fat-tire folder that handles sand, gravel, and urban potholes alike.",
      price: 1799,
      editorialScore: 9.1,
      userRating: 4.8,
      reviewCount: 110,
      badge: "All-Terrain Folder",
      motorType: "hub",
      motorLabel: "Brawny 500W Geared Rear Hub",
      motorWatts: 500,
      motorTorque: 65,
      batteryWh: 500,
      batterySpec: "48V 10.4Ah Frame-Enclosed",
      claimedRange: 42,
      weight: 56,
      maxLoad: 300,
      brakes: "Hydraulic Disc Brakes (180mm)",
      gears: "Shimano Altus 7-Speed",
      display: "Backlit Waterproof Color Screen with Throttle",
      lights: "Front LED Projector and Rear Strobe",
      ebikeClass: "Class 2",
      warranty: "2-Year Frame and Motor Warranty",
      image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["removable_battery", "integrated_lights", "hydraulic_brakes", "rack_mounts"],
      categoryScores: {
        ride: 9.0,
        battery: 8.9,
        build: 9.2,
        value: 9.3
      },
      pros: {
        ride: ["20\" × 3\" fat tires cushion curb drops, light gravel, and train tracks", "500W motor provides confident hill climbing punch with throttle"],
        battery: ["Concealed frame battery locks securely inside the central hinge", "Key ignition cylinder prevents unauthorized motor startup"],
        build: ["Sturdy front suspension fork takes sting out of rough roads", "Folds into trunk of an SUV without requiring bike racks"],
        value: ["Includes heavy-duty rear rack, full fenders, and phone holder"]
      },
      cons: {
        ride: ["56 lb weight makes lifting up multi-story stairs demanding", "Wider tires have higher rolling resistance when unpowered"],
        battery: ["Removing battery requires unfolding the main frame latch"],
        build: ["Large folded footprint compared to 16\" micro-folders"],
        value: ["Standard cadence sensor lacks subtle pressure gradation"]
      },
      verdict: {
        forWho: "Campers, RV owners, and commuters wanting all-terrain stability, pothole comfort, and trunk portability.",
        skipWho: "Daily train commuters who have to sprint up subway stairs carrying their folded bicycle."
      },
      reviewSnippet: "“Packs into the back of our camper van in seconds. Handles campsite gravel and beach trails like a champ.”"
    },
    {
      id: "urbanporter-compact-cargo",
      name: "UrbanPorter Short-Tail",
      brand: "HaulCraft",
      type: "cargo",
      tagline: "Compact mid-tail cargo bike that parks like a standard bicycle but carries 350 lbs.",
      price: 2850,
      editorialScore: 9.3,
      userRating: 4.8,
      reviewCount: 79,
      badge: "Compact Cargo",
      motorType: "mid",
      motorLabel: "Mid-Drive High-Efficiency",
      motorWatts: 500,
      motorTorque: 75,
      batteryWh: 672,
      batterySpec: "48V 14Ah Semi-Integrated",
      claimedRange: 52,
      weight: 58,
      maxLoad: 350,
      brakes: "Hydraulic Disc Brakes with Motor Cutoff (180mm)",
      gears: "Shimano Cues 9-Speed LinkGlide",
      display: "Compact Handlebar Color Display",
      lights: "Continuous Daytime Running Lights & Brake Pulse",
      ebikeClass: "Class 2",
      warranty: "3-Year Commercial & Consumer",
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=900&q=80",
      mustHaves: ["torque_sensor", "removable_battery", "integrated_lights", "hydraulic_brakes", "rack_mounts"],
      categoryScores: {
        ride: 9.3,
        battery: 9.2,
        build: 9.5,
        value: 9.2
      },
      pros: {
        ride: ["Same overall length as standard commuter so it fits on bus racks and standard elevators", "Can be parked vertically on rear rack bumpers to save floor space"],
        battery: ["672Wh battery provides healthy buffer even when fully loaded with 100 lbs of cargo", "Fast-charge ready port on top side of battery"],
        build: ["LinkGlide chain and cassette lasts 3x longer under electric motor torque", "Integrated cafe wheel lock immobilizes rear wheel in seconds"],
        value: ["Versatile modular deck fits panniers, crates, or one child seat"]
      },
      cons: {
        ride: ["Cannot fit two child seats simultaneously (single passenger only)", "Solid front fork transfers vibration over brick paving"],
        battery: ["Heavy battery pack requires firm pull to extract"],
        build: ["Weight is concentrated toward rear when carrying heavy packs"],
        value: ["Front basket and passenger handrails sold separately"]
      },
      verdict: {
        forWho: "Apartment or townhouse residents wanting serious cargo capability without dealing with an unwieldy 7-foot tandem.",
        skipWho: "Families needing to carry two kids or couriers moving industrial-sized parcels."
      },
      reviewSnippet: "“Stores vertically in our apartment elevator! Fits our 4-year-old on the back seat with plenty of room for grocery panniers.”"
    }
  ],

  // Verified User Reviews (Seeded for highlight section & modal)
  reviews: [
    {
      id: "rev-101",
      modelId: "apex-urban-x",
      modelName: "Apex Urban-X Commuter",
      reviewer: "Marcus Vance",
      initials: "MV",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&facepad=3&w=160&h=160&q=80",
      rating: 5,
      date: "October 4, 2026",
      distanceRidden: "1,840 mi",
      verified: true,
      title: "The torque sensor makes all the difference on hills",
      body: "Coming from a cheap cadence-sensor e-bike, the difference is night and day. With the Urban-X, the motor feels like an invisible hand gently assisting your legs rather than an on/off light switch. Commuted through rain and shine in Seattle for 6 months—not a single loose bolt or electrical fault."
    },
    {
      id: "rev-102",
      modelId: "terrapeak-trail-9",
      modelName: "TerraPeak Enduro Trail 9",
      reviewer: "Elena Rostova",
      initials: "ER",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&facepad=3&w=160&h=160&q=80",
      rating: 5,
      date: "September 28, 2026",
      distanceRidden: "920 mi",
      verified: true,
      title: "Climbs rock gardens that used to stop me dead",
      body: "The 95Nm mid-drive combined with the 720Wh pack is pure trail magic. Rode up 3,200 ft elevation at Tahoe last weekend, and the motor stayed cool the entire climb. The 4-piston Magura brakes provide unreal stopping confidence on steep loose scree."
    },
    {
      id: "rev-103",
      modelId: "haulcraft-cargo-max",
      modelName: "HaulCraft Cargo Max",
      reviewer: "David & Sarah K.",
      initials: "DK",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&facepad=3&w=160&h=160&q=80",
      rating: 5,
      date: "September 15, 2026",
      distanceRidden: "2,400 mi",
      verified: true,
      title: "Genuinely replaced our second family car",
      body: "We sold our 2014 hatchback in April and haven't looked back. Drop two kids off at primary school, do the weekly Costco grocery haul, and ride home up an 8% grade without sweating through my work shirt. The dual battery option gives complete peace of mind."
    },
    {
      id: "rev-104",
      modelId: "kitefold-aero-1",
      modelName: "Kite Mobility AeroFold One",
      reviewer: "Julian Chen",
      initials: "JC",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&crop=faces&facepad=3&w=160&h=160&q=80",
      rating: 4,
      date: "August 22, 2026",
      distanceRidden: "680 mi",
      verified: true,
      title: "The ultimate multimodal commuter companion",
      body: "Folds in literally ten seconds and sits between my knees on the subway train. Battery hidden in the seatpost is clever engineering. Only knocked one star because 16-inch wheels hate deep potholes, so you definitely have to stay alert on badly paved streets."
    },
    {
      id: "rev-105",
      modelId: "aeroshift-neo-step",
      modelName: "AeroShift NeoStep Low-Entry",
      reviewer: "Barbara Thornton",
      initials: "BT",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&facepad=3&w=160&h=160&q=80",
      rating: 5,
      date: "August 10, 2026",
      distanceRidden: "1,150 mi",
      verified: true,
      title: "Clean belt drive means no more chain grease",
      body: "At 64, high crossbars were getting difficult for my hip. The low step-through is effortless to mount, and the carbon belt never needs oil or adjustments. I ride it to the community garden and farmer's market almost every morning."
    },
    {
      id: "rev-106",
      modelId: "voltstrider-velo-8",
      modelName: "VoltStrider Strider Velo 8",
      reviewer: "Gareth P.",
      initials: "GP",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&facepad=3&w=160&h=160&q=80",
      rating: 4,
      date: "July 30, 2026",
      distanceRidden: "830 mi",
      verified: true,
      title: "Comfortable cruiser, great throttle for intersections",
      body: "The balloon tires absorb cracked pavement nicely, and having the thumb throttle to get across four lanes of traffic from a dead stop is indispensable. It's on the heavier side (around 52 lbs), so get a ramp if you plan to carry it on a car rack."
    }
  ],

  // Test-Ride Partner Centers (used by services.html #test-ride)
  testRideCenters: [
    {
      id: "ctr-seattle",
      city: "Seattle, WA",
      name: "Voltcycle Pacific Hub & Demo Track",
      address: "1420 Westlake Ave N, Suite 110, Seattle, WA 98109",
      postcode: "98109",
      lat: 47.6290, lng: -122.3405,
      phone: "(206) 555-0192",
      hours: "Tue–Sat: 10:00 AM – 6:30 PM",
      modelsAvailable: ["Apex Urban-X", "TerraPeak Trail 9", "HaulCraft Cargo Max", "KiteFold One"],
      trackType: "Paved Grade Loop + Gravel Transition Track"
    },
    {
      id: "ctr-denver",
      city: "Denver, CO",
      name: "Rocky Mountain Elevation Testing Lab",
      address: "2850 Larimer St, RiNo Arts District, Denver, CO 80205",
      postcode: "80205",
      lat: 39.7625, lng: -104.9810,
      phone: "(303) 555-0144",
      hours: "Mon–Sat: 9:00 AM – 6:00 PM",
      modelsAvailable: ["TerraPeak Trail 9", "SummitRidge Pro E-8", "HaulCraft Cargo Max", "Nomad Fold Express"],
      trackType: "Steep Incline Ramp + Natural Singletrack Test Area"
    },
    {
      id: "ctr-sf",
      city: "San Francisco, CA",
      name: "Bay Area Urban Mobility Center",
      address: "580 4th Street, SOMA, San Francisco, CA 94107",
      postcode: "94107",
      lat: 37.7790, lng: -122.3970,
      phone: "(415) 555-0188",
      hours: "Tue–Sun: 10:00 AM – 7:00 PM",
      modelsAvailable: ["Apex Urban-X", "KiteFold One", "AeroShift NeoStep", "VoltStrider Velo 8"],
      trackType: "18% Hill Simulator + Commuter Pavement Circuit"
    },
    {
      id: "ctr-austin",
      city: "Austin, TX",
      name: "Voltcycle Texas Experience Studio",
      address: "1603 S Congress Ave, Austin, TX 78704",
      postcode: "78704",
      lat: 30.2490, lng: -97.7500,
      phone: "(512) 555-0177",
      hours: "Wed–Sun: 10:00 AM – 6:00 PM",
      modelsAvailable: ["Apex Urban-X", "HaulCraft Cargo Max", "Nomad Fold Express", "UrbanPorter Compact"],
      trackType: "Trail Connector & Urban Obstacle Course"
    },
    {
      id: "ctr-chicago",
      city: "Chicago, IL",
      name: "Midwest Commuter Demo Lounge",
      address: "1122 N Milwaukee Ave, Wicker Park, Chicago, IL 60642",
      postcode: "60642",
      lat: 41.9020, lng: -87.6640,
      phone: "(312) 555-0163",
      hours: "Tue–Sat: 10:00 AM – 6:00 PM",
      modelsAvailable: ["Apex Urban-X", "AeroShift NeoStep", "KiteFold One", "VoltStrider Velo 8"],
      trackType: "Indoor Test Straightaway + City Bike Lane Direct Access"
    },
    {
      id: "ctr-portland",
      city: "Portland, OR",
      name: "Cascadia Green Commute Proving Ground",
      address: "1028 SE Water Ave, Central Eastside, Portland, OR 97214",
      postcode: "97214",
      lat: 45.5160, lng: -122.6650,
      phone: "(503) 555-0129",
      hours: "Mon–Fri: 9:30 AM – 6:30 PM",
      modelsAvailable: ["Apex Urban-X", "HaulCraft Cargo Max", "TerraPeak Trail 9", "AeroShift NeoStep"],
      trackType: "Wet-Weather Braking Grid + Cargo Agility Course"
    }
  ],

  // Range Estimation Calculation Engine
  calculateRange: function(batteryWh, assistPreference, weightLbs, terrain) {
    // Baseline consumption in Wh per mile based on assist mode
    let baseWhPerMile = 12.0; // balanced default
    if (assistPreference === 'light') baseWhPerMile = 8.5;
    else if (assistPreference === 'max') baseWhPerMile = 18.0;

    // Weight penalty factor (baseline benchmark rider + bike = 175 lbs)
    // heavier loads require more kinetic energy
    const weightFactor = Math.max(0.70, Math.min(1.25, 1.0 - ((weightLbs - 175) * 0.0014)));

    // Terrain modifier
    let terrainFactor = 1.0;
    if (terrain === 'flat') terrainFactor = 1.08;
    else if (terrain === 'mixed') terrainFactor = 0.94;
    else if (terrain === 'hilly') terrainFactor = 0.76;

    // Estimated real-world range in miles
    const estimatedMiles = (batteryWh / baseWhPerMile) * weightFactor * terrainFactor;
    return Math.round(estimatedMiles);
  }
};
