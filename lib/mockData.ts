import { Project } from './types';

export const mockProjects: Project[] = [
  // Climate & Environmental Projects
  {
    id: '1',
    title: 'Direct Air Carbon Capture Network',
    description: 'Scalable atmospheric CO2 capture using metal-organic frameworks (MOFs)',
    longDescription: 'Our research team at MIT Climate Lab is developing novel metal-organic frameworks that can selectively capture CO2 from ambient air with unprecedented efficiency. These materials operate at low energy costs and can be deployed in modular units, making large-scale carbon removal economically feasible. Each unit can capture 1,000 tons of CO2 annually while using 70% less energy than current direct air capture technologies.',
    category: 'Climate & Environment',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/5XyqiAHDlQE',
    fundingGoal: 500000,
    currentFunding: 342500,
    stakedAmount: 285000,
    backers: 1247,
    daysLeft: 22,
    creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb6',
    createdAt: new Date('2024-01-15'),
    matchingPool: 75000,
    quadraticScore: 8.7,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Open Science',
    institution: 'MIT Climate Lab',
    milestones: [
      {
        id: 'm1',
        title: 'Prototype Development',
        description: 'Complete first working prototype of nanomaterial',
        targetDate: new Date('2024-06-01'),
        fundingRequired: 150000,
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Topological Quantum Error Correction',
    description: 'Fault-tolerant quantum computing through topological qubits',
    longDescription: 'Stanford Quantum Lab is pioneering topological quantum error correction methods that leverage anyonic braiding to create inherently fault-tolerant quantum gates. Our approach reduces error rates by three orders of magnitude compared to surface codes, enabling quantum computers to run complex algorithms for drug discovery, materials science, and cryptographic applications. We\'re building open-source simulation tools to accelerate global quantum research.',
    category: 'Open Science & Education',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/OU9_mrxLl3g',
    fundingGoal: 750000,
    currentFunding: 425000,
    stakedAmount: 380000,
    backers: 892,
    daysLeft: 45,
    creator: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    createdAt: new Date('2024-01-20'),
    matchingPool: 100000,
    quadraticScore: 9.2,
    acceptedTokens: ['USDC', 'DAI', 'USDT', 'NOVA'],
    researchArea: 'Theoretical Physics',
    institution: 'Stanford Quantum Lab',
    milestones: [
      {
        id: 'm2',
        title: 'Algorithm Testing',
        description: 'Complete testing on quantum simulator',
        targetDate: new Date('2024-07-15'),
        fundingRequired: 200000,
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: 'PETase Evolution for Ocean Cleanup',
    description: 'Evolved plastic-eating enzymes for marine microplastic degradation',
    longDescription: 'UC San Diego Marine Lab has evolved a new strain of PETase enzyme that breaks down PET plastics 6x faster than natural variants, while remaining stable in saltwater conditions. Our enzyme cocktail targets the five most common ocean plastics, converting them into biodegradable compounds that marine bacteria can safely process. Field trials show 90% microplastic reduction in test areas within 60 days, with zero impact on marine ecosystems.',
    category: 'Conservation & Biodiversity',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/Y-GqbPmSuj4',
    fundingGoal: 300000,
    currentFunding: 189000,
    stakedAmount: 165000,
    backers: 2341,
    daysLeft: 18,
    creator: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    createdAt: new Date('2024-01-25'),
    matchingPool: 50000,
    quadraticScore: 7.8,
    acceptedTokens: ['USDC', 'NOVA'],
    researchArea: 'Biotechnology',
    institution: 'UC San Diego Marine Lab',
    milestones: [
      {
        id: 'm3',
        title: 'Field Testing',
        description: 'Complete ocean field tests',
        targetDate: new Date('2024-08-01'),
        fundingRequired: 100000,
        completed: false
      }
    ]
  },
  {
    id: '4',
    title: 'BrainBridge Neural Restoration',
    description: 'High-resolution brain-computer interfaces for motor function recovery',
    longDescription: 'Johns Hopkins Medical is developing ultra-high-density neural interfaces using flexible graphene electrodes that can decode motor intentions with millisecond precision. Our system has enabled three paralyzed patients in early trials to control robotic limbs with 95% accuracy for complex tasks like writing and eating. The technology uses machine learning to adapt to each patient\'s unique neural patterns, improving control over time. All hardware designs and software will be open-sourced to accelerate global accessibility.',
    category: 'Public Health',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/USHvnMtUeZQ',
    fundingGoal: 1000000,
    currentFunding: 567000,
    stakedAmount: 512000,
    backers: 1567,
    daysLeft: 60,
    creator: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    createdAt: new Date('2024-02-01'),
    matchingPool: 150000,
    quadraticScore: 9.5,
    acceptedTokens: ['USDC', 'DAI', 'USDT', 'NOVA'],
    researchArea: 'Neuroscience',
    institution: 'Johns Hopkins Medical',
    milestones: [
      {
        id: 'm4',
        title: 'Clinical Trials',
        description: 'Begin Phase 1 clinical trials',
        targetDate: new Date('2024-09-01'),
        fundingRequired: 400000,
        completed: false
      }
    ]
  },
  {
    id: '5',
    title: 'AeroFarms 2.0 - Open Urban Agriculture',
    description: 'Modular AI-optimized vertical farms for community food production',
    longDescription: 'Cornell AgTech has designed open-source vertical farming modules that integrate advanced LED spectrum control, aeroponic nutrient delivery, and computer vision for plant health monitoring. Each 40-foot shipping container module can produce 2 tons of leafy greens monthly using 95% less water than field farming. Our AI optimizer adjusts growing conditions in real-time, increasing yields by 40% while reducing energy use. Complete blueprints and control software will be freely available for communities worldwide.',
    category: 'Agricultural Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/ME_rprRlmMM',
    fundingGoal: 450000,
    currentFunding: 234000,
    stakedAmount: 198000,
    backers: 987,
    daysLeft: 35,
    creator: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    createdAt: new Date('2024-02-05'),
    matchingPool: 60000,
    quadraticScore: 8.1,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Agricultural Technology',
    institution: 'Cornell AgTech',
    milestones: [
      {
        id: 'm5',
        title: 'Pilot Farm',
        description: 'Build first pilot vertical farm',
        targetDate: new Date('2024-10-01'),
        fundingRequired: 200000,
        completed: false
      }
    ]
  }
  ,
  {
    id: '6',
    title: 'DeFi Literacy Centers',
    description: 'Community-run financial inclusion hubs with Web3 education',
    longDescription: 'OpenChain DAO is establishing physical DeFi Literacy Centers in underserved communities across 10 cities. Each center provides free workshops on digital wallets, smart contract safety, and decentralized finance tools. Local mentors help residents set up self-custody wallets, understand yield farming risks, and participate in DAOs. Centers also offer hardware wallet libraries and secure computers for transaction signing. We\'ve already helped 2,000+ people gain financial autonomy through Web3 tools.',
    category: 'Digital Public Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ZDUOb42fS-Q',
    fundingGoal: 150000,
    currentFunding: 82000,
    stakedAmount: 70000,
    backers: 642,
    daysLeft: 27,
    creator: '0x5B3eC4f7C8A6B8A60a9F3dC97E4A7b2D1E45b123',
    createdAt: new Date('2024-03-01'),
    matchingPool: 25000,
    quadraticScore: 7.4,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Community Program',
    institution: 'OpenChain DAO',
    milestones: [
      {
        id: 'm6',
        title: 'First 3 Hubs Launched',
        description: 'Open operational hubs in three cities',
        targetDate: new Date('2024-06-15'),
        fundingRequired: 60000,
        completed: false
      }
    ]
  },
  {
    id: '7',
    title: 'Solar Wells for East Africa',
    description: 'Decentralized water purification systems for rural communities',
    longDescription: 'Global Relief Network is deploying solar-powered water purification systems across 15 villages in Kenya and Tanzania, serving 50,000 people. Each system combines UV sterilization, ceramic filtration, and IoT water quality monitoring that reports data to a public dashboard. Local technicians are trained to maintain the systems, creating sustainable employment. The project includes blockchain-verified water quality certificates and transparent fund allocation tracking.',
    category: 'Community & Social Services',
    imageUrl: 'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/4XHFRGW2L_E',
    fundingGoal: 200000,
    currentFunding: 126500,
    stakedAmount: 110000,
    backers: 1734,
    daysLeft: 14,
    creator: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cB2',
    createdAt: new Date('2024-03-10'),
    matchingPool: 30000,
    quadraticScore: 8.9,
    acceptedTokens: ['USDC', 'USDT', 'NOVA'],
    researchArea: 'Humanitarian Aid',
    institution: 'Global Relief Network',
    milestones: [
      {
        id: 'm7',
        title: 'Drill & Install 5 Wells',
        description: 'Complete drilling, install pumps and filtration',
        targetDate: new Date('2024-07-30'),
        fundingRequired: 120000,
        completed: false
      }
    ]
  },
  {
    id: '8',
    title: 'Coral Reef AI Monitoring',
    description: 'Autonomous underwater drones for reef health tracking',
    longDescription: 'Marine Conservation Institute is deploying a fleet of AI-powered underwater drones to monitor coral reef health across the Great Barrier Reef. Using hyperspectral imaging and machine learning, our drones detect early signs of bleaching, disease, and crown-of-thorns starfish outbreaks. Real-time data feeds enable rapid response teams to intervene before damage becomes irreversible. All monitoring data is published openly for global reef research.',
    category: 'Conservation & Biodiversity',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/Iau2k1PVF38',
    fundingGoal: 650000,
    currentFunding: 412000,
    stakedAmount: 385000,
    backers: 3456,
    daysLeft: 28,
    creator: '0x9A96EC9B57Fb64FbC60B423d1f4da7691Bd35079',
    createdAt: new Date('2024-02-15'),
    matchingPool: 85000,
    quadraticScore: 8.3,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Marine Biology',
    institution: 'Marine Conservation Institute',
    milestones: [
      {
        id: 'm8',
        title: 'Deploy 10 Monitoring Drones',
        description: 'Launch autonomous drone fleet with AI systems',
        targetDate: new Date('2024-08-15'),
        fundingRequired: 300000,
        completed: false
      }
    ]
  },
  {
    id: '9',
    title: 'OpenMRI - Affordable Imaging',
    description: 'Low-cost MRI machines using permanent magnets',
    longDescription: 'Harvard Medical School engineers have designed an MRI machine that costs 90% less than traditional systems by using permanent magnets and advanced computational imaging. Our OpenMRI design uses commodity components and open-source reconstruction software, making medical imaging accessible to rural hospitals worldwide. The entire design, from magnet arrays to pulse sequences, will be open-sourced for local manufacturing.',
    category: 'Public Health',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/hUUTVEQlRs8',
    fundingGoal: 1200000,
    currentFunding: 789000,
    stakedAmount: 702000,
    backers: 4521,
    daysLeft: 52,
    creator: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    createdAt: new Date('2024-02-20'),
    matchingPool: 180000,
    quadraticScore: 9.6,
    acceptedTokens: ['USDC', 'DAI', 'USDT', 'NOVA'],
    researchArea: 'Medical Technology',
    institution: 'Harvard Medical School',
    milestones: [
      {
        id: 'm9',
        title: 'Complete Prototype',
        description: 'Build and test first OpenMRI unit',
        targetDate: new Date('2024-09-30'),
        fundingRequired: 500000,
        completed: false
      }
    ]
  },
  {
    id: '10',
    title: 'Mycelium Building Materials',
    description: 'Carbon-negative construction materials from mushroom roots',
    longDescription: 'BioMason Labs is scaling production of mycelium-based building materials that sequester carbon while providing superior insulation and fire resistance. Our bio-composite panels grow in 5 days using agricultural waste, replace petroleum-based insulation, and are fully compostable. We\'re establishing distributed micro-factories so communities can produce their own sustainable building materials locally.',
    category: 'Climate & Environment',
    imageUrl: 'https://images.unsplash.com/photo-1615147342761-9238e15d8b96?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/Pp7pSlwIlLA',
    fundingGoal: 550000,
    currentFunding: 298000,
    stakedAmount: 265000,
    backers: 1876,
    daysLeft: 40,
    creator: '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
    createdAt: new Date('2024-03-01'),
    matchingPool: 70000,
    quadraticScore: 7.9,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Biomaterials',
    institution: 'BioMason Labs',
    milestones: [
      {
        id: 'm10',
        title: 'Launch Micro-Factory',
        description: 'Establish first community production facility',
        targetDate: new Date('2024-10-15'),
        fundingRequired: 250000,
        completed: false
      }
    ]
  },
  {
    id: '11',
    title: 'Mesh Network for Disaster Zones',
    description: 'Resilient peer-to-peer internet for emergency response',
    longDescription: 'DisasterTech Coalition is building solar-powered mesh network nodes that automatically create local internet infrastructure when traditional networks fail. Each node supports 500+ simultaneous connections, enables offline messaging, and includes emergency service locators. We\'re pre-positioning networks in disaster-prone regions and training local communities in rapid deployment. All hardware and software designs are open-source.',
    category: 'Digital Public Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/arz3zp_aFf0',
    fundingGoal: 380000,
    currentFunding: 245000,
    stakedAmount: 218000,
    backers: 2109,
    daysLeft: 25,
    creator: '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
    createdAt: new Date('2024-03-05'),
    matchingPool: 55000,
    quadraticScore: 8.5,
    acceptedTokens: ['USDC', 'USDT', 'NOVA'],
    researchArea: 'Emergency Technology',
    institution: 'DisasterTech Coalition',
    milestones: [
      {
        id: 'm11',
        title: 'Deploy 100 Nodes',
        description: 'Install mesh nodes in high-risk areas',
        targetDate: new Date('2024-07-30'),
        fundingRequired: 180000,
        completed: false
      }
    ]
  },
  {
    id: '12',
    title: 'Gene Drive Malaria Prevention',
    description: 'CRISPR mosquito modification to eliminate malaria transmission',
    longDescription: 'Target Malaria consortium is developing gene drive mosquitoes that cannot transmit malaria parasites. Using CRISPR technology, we\'ve modified Anopheles mosquitoes to produce antibodies that block Plasmodium development. Our approach includes multiple safety switches and community consent protocols. Field trials in controlled environments show 98% transmission reduction. All research data and safety protocols are publicly available.',
    category: 'Public Health',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/P0HPHUzsHbI',
    fundingGoal: 2000000,
    currentFunding: 1450000,
    stakedAmount: 1320000,
    backers: 5832,
    daysLeft: 70,
    creator: '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
    createdAt: new Date('2024-03-10'),
    matchingPool: 300000,
    quadraticScore: 9.8,
    acceptedTokens: ['USDC', 'DAI', 'USDT', 'NOVA'],
    researchArea: 'Genetic Engineering',
    institution: 'Target Malaria Consortium',
    milestones: [
      {
        id: 'm12',
        title: 'Complete Safety Testing',
        description: 'Finish comprehensive ecological impact studies',
        targetDate: new Date('2024-11-01'),
        fundingRequired: 800000,
        completed: false
      }
    ]
  },
  {
    id: '13',
    title: 'Open Insulin Production',
    description: 'Decentralized insulin manufacturing for diabetic communities',
    longDescription: 'Open Insulin Project has developed a simplified insulin production protocol using genetically modified yeast that communities can implement locally. Our bioreactor design costs $15,000 and can produce insulin for 500 patients annually at $30 per year. We\'re establishing production cooperatives in regions with limited insulin access and training local technicians. All protocols, equipment designs, and quality control procedures are open-source.',
    category: 'Public Health',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/63uqBBrHKTc',
    fundingGoal: 800000,
    currentFunding: 523000,
    stakedAmount: 478000,
    backers: 6721,
    daysLeft: 48,
    creator: '0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
    createdAt: new Date('2024-03-15'),
    matchingPool: 120000,
    quadraticScore: 9.3,
    acceptedTokens: ['USDC', 'DAI', 'USDT', 'NOVA'],
    researchArea: 'Biotechnology',
    institution: 'Open Insulin Project',
    milestones: [
      {
        id: 'm13',
        title: 'Launch First Co-op',
        description: 'Establish community insulin production facility',
        targetDate: new Date('2024-09-15'),
        fundingRequired: 350000,
        completed: false
      }
    ]
  },
  {
    id: '14',
    title: 'Seaweed Carbon Farming',
    description: 'Large-scale kelp cultivation for carbon sequestration',
    longDescription: 'Ocean Forests Initiative is establishing 1000-hectare kelp farms that capture 50 tons of CO2 per hectare annually. Our automated farming systems use biodegradable infrastructure and IoT monitoring to optimize growth. Harvested kelp becomes biofuel, animal feed, and fertilizer, creating carbon-negative products. We\'re training coastal communities in kelp farming techniques and sharing all cultivation data openly.',
    category: 'Climate & Environment',
    imageUrl: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/3UMMwEF5wcw',
    fundingGoal: 900000,
    currentFunding: 567000,
    stakedAmount: 512000,
    backers: 3245,
    daysLeft: 55,
    creator: '0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',
    createdAt: new Date('2024-03-20'),
    matchingPool: 110000,
    quadraticScore: 8.6,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Marine Agriculture',
    institution: 'Ocean Forests Initiative',
    milestones: [
      {
        id: 'm14',
        title: 'Deploy 100 Hectares',
        description: 'Establish first large-scale kelp farm',
        targetDate: new Date('2024-10-30'),
        fundingRequired: 400000,
        completed: false
      }
    ]
  },
  {
    id: '15',
    title: 'Prosthetic Limbs for All',
    description: '3D-printed prosthetics at 1% of traditional cost',
    longDescription: 'Limb Liberation designs parametric prosthetic limbs that can be 3D-printed for $50 using recycled plastics. Our AI fitting system uses phone cameras to create custom designs remotely. We\'ve distributed 5,000 prosthetics across 15 countries and are training local technicians in printing and fitting. All designs, fitting software, and training materials are freely available under open licenses.',
    category: 'Public Health',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/Cl8ijPGEKO8',
    fundingGoal: 420000,
    currentFunding: 312000,
    stakedAmount: 285000,
    backers: 4567,
    daysLeft: 30,
    creator: '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec',
    createdAt: new Date('2024-03-25'),
    matchingPool: 65000,
    quadraticScore: 8.8,
    acceptedTokens: ['USDC', 'DAI', 'NOVA'],
    researchArea: 'Medical Devices',
    institution: 'Limb Liberation',
    milestones: [
      {
        id: 'm15',
        title: 'Train 50 Technicians',
        description: 'Complete prosthetic technician training program',
        targetDate: new Date('2024-08-30'),
        fundingRequired: 180000,
        completed: false
      }
    ]
  }
];
