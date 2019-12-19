import { advancedGradient } from "../formatting/gradient";

// Initial values taken based on: https://www.polygon.com/destiny-2-forsaken-guide/2018/10/24/17934334/random-roll-weapon-best-perks-static-curated
const PerkRules = {
  "*": {
    Outlaw: 5,
    Rampage: 5,
    "Archer's Tempo": 5,
    "Kill Clip": 5,
    Rangefinder: 3,
    "Explosive Payload": 2,
    "Pulse Monitor": 1,
    Underdog: 4,
    "Fourth Time's the Charm": 3,
    Swashbuckler: 3,
    Quickdraw: 3,
    Dragonfly: 2,
    "Assassin's Blade": 3,
    "En Garde": 1,
    "Tireless Blade": 2,
    "Disruption Break": 1,
    "Explosive Head": 2,
    Genesis: 2,
    "Moving Target": 1,
    "Snapshot Sights": 2,
    "Triple Tap": 2,
    "Elemental Capacitor": 2,
    "Auto-Loading Holster": 1,
    "High-Impact Reserves": 1,
    "Field Prep": -4,
    "Firmly Planted": -4,
    "Hip-Fire Grip": -3,
    "Sneak Bow": -3,
    Headseeker: -2,
    "Backup Plan": 1,
    "Ambitious Assassin": 1,
    Surrounded: 1,
    Demolitionist: 3,
    "Rapid Hit": 4,
    "Grave Robber": 1,
    Slideshot: 2,
    Slideways: 2,
    Subsistence: 1, // Not sure on this one, maybe actually -1
    "Multikill Clip": 2,
    "Dynamic Sway Reduction": 1,
    "Tap the Trigger": -1,
    "Shield Disorient": 2,
    "Feeding Frenzy": 4,
    "Eye of the Storm": 2,
    "Opening Shot": 2,
    "Box Breathing": 4,
    "Threat Detector": 2,
    "Full Auto Trigger System": 1,
    "Zen Moment": -1,
    "Under Pressure": 1
  },
  "Auto Rifle": {
    "High-Impact Reserves": 3
  },
  "Submachine Gun": {
    Rampage: 4
  },
  "Hand Cannon": {
    Rampage: 4
  },
  Sidearm: {
    Rangefinder: 4
  },
  "Fusion Rifle": {
    Rangefinder: 4,
    "Backup Plan": 2
  },
  Shotgun: {
    "Full Auto Trigger System": 3,
    "Moving Target": 3,
    Slideshot: 1
  },
  "Sniper Rifle": {
    "Snapshot Sights": 3
  },
  "Grenade Launcher": {
    "Proximity Grenades": 3,
    "Spike Grenades": 3,
    "Auto-Loading Holster": 2,
    Quickdraw: 4
  },
  Sword: {
    "Relentless Strikes": 3,
    "Whirlwind Blade": 3
  },
  "Rocket Launcher": {
    "Cluster Bomb": 5,
    "Tracking Module": 3,
    Quickdraw: 4
  },
  "Linear Fusion Rifle": {
    Quickdraw: 4,
    "Snapshot Sights": 3
  }
};

const scorePerk = (perk, type) => {
  if (PerkRules[type] && PerkRules[type][perk] !== undefined) {
    return PerkRules[type][perk];
  }
  if (PerkRules["*"][perk] !== undefined) {
    return PerkRules["*"][perk];
  }
  console.warn("No score for perk", { perk, gunType: type });
  return 0;
};

export default scorePerk;

const getColorForScore = s =>
  advancedGradient(
    [
      [-5, "#5c0000"],
      [0, "#333333"],
      [5, "#005c15"]
    ],
    s
  );

export const scoreColors = {
  "-5": getColorForScore(-5),
  "-4": getColorForScore(-4),
  "-3": getColorForScore(-3),
  "-2": getColorForScore(-2),
  "-1": getColorForScore(-1),
  "0": getColorForScore(0),
  "1": getColorForScore(1),
  "2": getColorForScore(2),
  "3": getColorForScore(3),
  "4": getColorForScore(4),
  "5": getColorForScore(5)
};
