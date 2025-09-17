export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  fundingGoal: number;
  currentFunding: number;
  stakedAmount: number;
  backers: number;
  daysLeft: number;
  creator: string;
  createdAt: Date;
  matchingPool: number;
  quadraticScore: number;
  acceptedTokens: string[];
  researchArea: string;
  institution?: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  fundingRequired: number;
  completed: boolean;
}

export interface Stake {
  id: string;
  projectId: string;
  staker: string;
  amount: number;
  token: string;
  timestamp: Date;
  votingPower: number;
}

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoUrl: string;
}

export interface NovaToken {
  totalSupply: number;
  circulatingSupply: number;
  price: number;
  backed: boolean;
  collateralRatio: number;
}

export interface FundingStats {
  totalStaked: number;
  totalProjects: number;
  totalBackers: number;
  averageFunding: number;
  topCategory: string;
  matchingPoolSize: number;
}
