import { Project } from './types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Carbon Capture Nanotechnology',
    description: 'Revolutionary nanomaterials for atmospheric CO2 capture at scale',
    longDescription: 'Our research team is developing next-generation nanomaterials that can capture CO2 directly from the atmosphere with 10x efficiency compared to current technologies. This breakthrough could make carbon capture economically viable at global scale.',
    category: 'Climate Science',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
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
    researchArea: 'Materials Engineering',
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
    title: 'Quantum Error Correction',
    description: 'Novel algorithms for stable quantum computing systems',
    longDescription: 'Developing breakthrough error correction algorithms that could make quantum computers 100x more stable, bringing us closer to practical quantum computing applications in drug discovery and cryptography.',
    category: 'Quantum Computing',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
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
    title: 'Ocean Plastic Enzyme',
    description: 'Engineered enzymes that break down ocean plastics naturally',
    longDescription: 'Our bioengineered enzymes can break down microplastics in ocean water without harming marine life. This could be deployed at scale to clean our oceans within a decade.',
    category: 'Ocean Conservation',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
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
    title: 'Neural Interface Therapy',
    description: 'Brain-computer interfaces for paralysis treatment',
    longDescription: 'Developing non-invasive neural interfaces that allow paralyzed patients to control computers and prosthetics with thought alone, restoring independence and quality of life.',
    category: 'Medical Research',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
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
    title: 'Vertical Farm Automation',
    description: 'AI-powered vertical farming for food security',
    longDescription: 'Creating fully automated vertical farms that use 95% less water and produce 10x more food per square foot than traditional farming, powered by renewable energy.',
    category: 'Agricultural Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
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
];
