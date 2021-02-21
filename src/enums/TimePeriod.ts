export enum TimePeriod {
  P2Y = 'P2Y',
  P1Y = 'P1Y',
  P3M = 'P3M',
  P1M = 'P1M',
}

// The full, human-readable form of each TimePeriod to be used in labels
export enum TimePeriodExpanded {
  P2Y = 'Past 2 Years',
  P1Y = 'Past 1 Year',
  P3M = 'Past 3 Months',
  P1M = 'Past 1 Month',
}

// The frequency with which the 'Growth' metric is computed, for each TimePeriod
export enum TimePeriodGrowthFrequency {
  P2Y = 'Monthly',
  P1Y = 'Monthly',
  P3M = 'Weekly',
  P1M = 'Weekly',
}
