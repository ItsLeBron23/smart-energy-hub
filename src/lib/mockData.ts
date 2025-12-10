// Mock data for the Smart Home Energy Management System

export interface Device {
  id: string;
  name: string;
  type: 'SMART_PLUG' | 'CT_SENSOR' | 'THERMOSTAT' | 'SMART_SWITCH' | 'APPLIANCE_MONITOR';
  status: 'ACTIVE' | 'OFFLINE' | 'ERROR' | 'MAINTENANCE';
  currentWatts: number;
  maxWatts: number;
  location: string;
  icon: string;
}

export interface Alert {
  id: string;
  type: 'HIGH_USAGE' | 'ANOMALY' | 'COST_THRESHOLD' | 'DEVICE_OFFLINE' | 'PREDICTION_ALERT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface EnergyReading {
  timestamp: Date;
  watts: number;
  cost: number;
}

export interface Prediction {
  hour: number;
  predictedWatts: number;
  confidence: number;
}

export const mockDevices: Device[] = [
  {
    id: 'dev-1',
    name: 'Living Room AC',
    type: 'THERMOSTAT',
    status: 'ACTIVE',
    currentWatts: 1850,
    maxWatts: 3500,
    location: 'Living Room',
    icon: 'thermometer',
  },
  {
    id: 'dev-2',
    name: 'Kitchen Refrigerator',
    type: 'SMART_PLUG',
    status: 'ACTIVE',
    currentWatts: 120,
    maxWatts: 400,
    location: 'Kitchen',
    icon: 'refrigerator',
  },
  {
    id: 'dev-3',
    name: 'Home Office Setup',
    type: 'SMART_PLUG',
    status: 'ACTIVE',
    currentWatts: 450,
    maxWatts: 800,
    location: 'Office',
    icon: 'monitor',
  },
  {
    id: 'dev-4',
    name: 'Washing Machine',
    type: 'APPLIANCE_MONITOR',
    status: 'ACTIVE',
    currentWatts: 680,
    maxWatts: 2200,
    location: 'Laundry',
    icon: 'waves',
  },
  {
    id: 'dev-5',
    name: 'Water Heater',
    type: 'CT_SENSOR',
    status: 'ACTIVE',
    currentWatts: 0,
    maxWatts: 4500,
    location: 'Utility',
    icon: 'flame',
  },
  {
    id: 'dev-6',
    name: 'Bedroom Lights',
    type: 'SMART_SWITCH',
    status: 'OFFLINE',
    currentWatts: 0,
    maxWatts: 200,
    location: 'Bedroom',
    icon: 'lightbulb',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'HIGH_USAGE',
    severity: 'HIGH',
    message: 'Living Room AC consumption is 15% above normal for this time',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    acknowledged: false,
  },
  {
    id: 'alert-2',
    type: 'PREDICTION_ALERT',
    severity: 'MEDIUM',
    message: 'Expected usage spike at 7 PM - estimated $2.50 additional cost',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    acknowledged: false,
  },
  {
    id: 'alert-3',
    type: 'DEVICE_OFFLINE',
    severity: 'LOW',
    message: 'Bedroom Lights sensor went offline',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    acknowledged: true,
  },
];

// Generate hourly readings for the last 24 hours
export const generateHourlyReadings = (): EnergyReading[] => {
  const readings: EnergyReading[] = [];
  const now = new Date();
  const electricityRate = 0.15; // $/kWh

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    
    // Simulate realistic consumption patterns
    let baseWatts = 1500;
    if (hour >= 6 && hour <= 9) baseWatts = 2500; // Morning peak
    if (hour >= 17 && hour <= 21) baseWatts = 3500; // Evening peak
    if (hour >= 23 || hour <= 5) baseWatts = 800; // Night low
    
    const watts = baseWatts + Math.random() * 500 - 250;
    const cost = (watts / 1000) * electricityRate;
    
    readings.push({ timestamp, watts, cost });
  }
  
  return readings;
};

// Generate 24-hour predictions
export const generatePredictions = (): Prediction[] => {
  const predictions: Prediction[] = [];
  const now = new Date();
  const currentHour = now.getHours();

  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24;
    
    let baseWatts = 1500;
    if (hour >= 6 && hour <= 9) baseWatts = 2600;
    if (hour >= 17 && hour <= 21) baseWatts = 3800;
    if (hour >= 23 || hour <= 5) baseWatts = 750;
    
    const predictedWatts = baseWatts + Math.random() * 300 - 150;
    const confidence = 0.85 + Math.random() * 0.1;
    
    predictions.push({ hour, predictedWatts, confidence });
  }
  
  return predictions;
};

export const homeStats = {
  totalConsumption: 3100,
  hourlyAverage: 2450,
  todayCost: 8.72,
  monthCost: 142.50,
  electricityRate: 0.15,
  efficiency: 78,
};
