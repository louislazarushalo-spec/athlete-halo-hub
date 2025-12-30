import { AthleteEvent } from "./athletes";

// Tennis Events (ATP/WTA)
export const tennisEvents: AthleteEvent[] = [
  { id: "ao-2026", name: "Australian Open", date: "12", month: "Jan", year: "2026", location: "Melbourne, Australia", country: "Australia", countryFlag: "🇦🇺", category: "Grand Slam", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "First Grand Slam of the season on hard courts." },
  { id: "iw-2026", name: "Indian Wells Masters", date: "6", month: "Mar", year: "2026", location: "Indian Wells, USA", country: "USA", countryFlag: "🇺🇸", category: "Masters 1000", categoryColor: "bg-orange-500", description: "The fifth Grand Slam - prestigious Masters 1000 event." },
  { id: "miami-2026", name: "Miami Open", date: "19", month: "Mar", year: "2026", location: "Miami, USA", country: "USA", countryFlag: "🇺🇸", category: "Masters 1000", categoryColor: "bg-orange-500", description: "Masters 1000 event in sunny Florida." },
  { id: "mc-2026", name: "Monte-Carlo Masters", date: "6", month: "Apr", year: "2026", location: "Monte-Carlo, Monaco", country: "Monaco", countryFlag: "🇲🇨", category: "Masters 1000", categoryColor: "bg-orange-500", description: "Clay court Masters on the French Riviera." },
  { id: "rg-2026", name: "Roland-Garros", date: "25", month: "May", year: "2026", location: "Paris, France", country: "France", countryFlag: "🇫🇷", category: "Grand Slam", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "The French Open - clay court Grand Slam." },
  { id: "wim-2026", name: "Wimbledon", date: "29", month: "Jun", year: "2026", location: "London, UK", country: "UK", countryFlag: "🇬🇧", category: "Grand Slam", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "The Championships - grass court Grand Slam." },
  { id: "uso-2026", name: "US Open", date: "31", month: "Aug", year: "2026", location: "New York, USA", country: "USA", countryFlag: "🇺🇸", category: "Grand Slam", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Final Grand Slam of the season in New York." },
  { id: "paris-2026", name: "Rolex Paris Masters", date: "26", month: "Oct", year: "2026", location: "Paris, France", country: "France", countryFlag: "🇫🇷", category: "Masters 1000", categoryColor: "bg-orange-500", description: "Indoor Masters 1000 in Paris." },
];

// Football Events
export const footballEvents: AthleteEvent[] = [
  { id: "ucl-r16", name: "UEFA Champions League R16", date: "18", month: "Feb", year: "2025", location: "Various", country: "Europe", countryFlag: "🇪🇺", category: "Champions League", categoryColor: "bg-gradient-to-r from-blue-600 to-indigo-600", description: "Round of 16 in Europe's premier club competition." },
  { id: "ucl-qf", name: "UEFA Champions League QF", date: "8", month: "Apr", year: "2025", location: "Various", country: "Europe", countryFlag: "🇪🇺", category: "Champions League", categoryColor: "bg-gradient-to-r from-blue-600 to-indigo-600", description: "Quarter-finals of the Champions League." },
  { id: "ucl-final", name: "UEFA Champions League Final", date: "31", month: "May", year: "2025", location: "Munich, Germany", country: "Germany", countryFlag: "🇩🇪", category: "Champions League", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "The biggest night in club football at Allianz Arena." },
  { id: "cwc-2025", name: "FIFA Club World Cup", date: "15", month: "Jun", year: "2025", location: "USA", country: "USA", countryFlag: "🇺🇸", category: "FIFA", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "New 32-team Club World Cup in the USA." },
  { id: "league-start", name: "League Season 2025/26", date: "15", month: "Aug", year: "2025", location: "Various", country: "Europe", countryFlag: "🇪🇺", category: "League", categoryColor: "bg-emerald-500", description: "New domestic league season kicks off." },
];

// Women's Football Events
export const womenFootballEvents: AthleteEvent[] = [
  { id: "uwcl-qf", name: "UEFA Women's Champions League QF", date: "18", month: "Mar", year: "2025", location: "Various", country: "Europe", countryFlag: "🇪🇺", category: "Champions League", categoryColor: "bg-gradient-to-r from-blue-600 to-indigo-600", description: "Quarter-finals of Europe's premier women's club competition." },
  { id: "uwcl-final", name: "UWCL Final", date: "24", month: "May", year: "2025", location: "Lisbon, Portugal", country: "Portugal", countryFlag: "🇵🇹", category: "Champions League", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Women's Champions League Final." },
  { id: "wwc-2027", name: "FIFA Women's World Cup", date: "24", month: "Jun", year: "2027", location: "Brazil", country: "Brazil", countryFlag: "🇧🇷", category: "World Cup", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Women's World Cup in Brazil." },
  { id: "euros-2025", name: "UEFA Women's Euro 2025", date: "2", month: "Jul", year: "2025", location: "Switzerland", country: "Switzerland", countryFlag: "🇨🇭", category: "Euro", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "European Championship for women's national teams." },
];

// Rugby Events
export const rugbyEvents: AthleteEvent[] = [
  { id: "6n-2025", name: "Six Nations Championship", date: "1", month: "Feb", year: "2025", location: "Various", country: "Europe", countryFlag: "🇪🇺", category: "Six Nations", categoryColor: "bg-gradient-to-r from-emerald-500 to-green-500", description: "Annual rugby union competition between six European nations." },
  { id: "6n-fr-en", name: "France vs England", date: "8", month: "Feb", year: "2025", location: "Paris, France", country: "France", countryFlag: "🇫🇷", category: "Six Nations", categoryColor: "bg-gradient-to-r from-emerald-500 to-green-500", description: "Le Crunch - historic rivalry at Stade de France." },
  { id: "6n-fr-ir", name: "France vs Ireland", date: "8", month: "Mar", year: "2025", location: "Dublin, Ireland", country: "Ireland", countryFlag: "🇮🇪", category: "Six Nations", categoryColor: "bg-gradient-to-r from-emerald-500 to-green-500", description: "Crucial Six Nations clash at Aviva Stadium." },
  { id: "top14-sf", name: "TOP 14 Semi-Finals", date: "14", month: "Jun", year: "2025", location: "Various", country: "France", countryFlag: "🇫🇷", category: "TOP 14", categoryColor: "bg-blue-500", description: "French rugby league playoffs." },
  { id: "top14-final", name: "TOP 14 Final", date: "21", month: "Jun", year: "2025", location: "Paris, France", country: "France", countryFlag: "🇫🇷", category: "TOP 14", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "TOP 14 Final at Stade de France." },
  { id: "rc-2025", name: "Rugby Championship", date: "16", month: "Aug", year: "2025", location: "Southern Hemisphere", country: "Various", countryFlag: "🌍", category: "International", categoryColor: "bg-purple-500", description: "Southern hemisphere's premier international competition." },
];

// Basketball Events (NBA)
export const basketballEvents: AthleteEvent[] = [
  { id: "nba-asw", name: "NBA All-Star Weekend", date: "14", month: "Feb", year: "2025", location: "San Francisco, USA", country: "USA", countryFlag: "🇺🇸", category: "All-Star", categoryColor: "bg-gradient-to-r from-red-500 to-blue-500", description: "NBA All-Star Game at Chase Center." },
  { id: "nba-playoffs", name: "NBA Playoffs Begin", date: "19", month: "Apr", year: "2025", location: "Various", country: "USA", countryFlag: "🇺🇸", category: "Playoffs", categoryColor: "bg-orange-500", description: "NBA postseason tips off." },
  { id: "nba-conf-finals", name: "Conference Finals", date: "15", month: "May", year: "2025", location: "Various", country: "USA", countryFlag: "🇺🇸", category: "Playoffs", categoryColor: "bg-orange-500", description: "Final four teams compete for Finals berth." },
  { id: "nba-finals", name: "NBA Finals", date: "5", month: "Jun", year: "2025", location: "TBD", country: "USA", countryFlag: "🇺🇸", category: "NBA Finals", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Championship series for the Larry O'Brien Trophy." },
  { id: "eurobasket", name: "EuroBasket 2025", date: "27", month: "Aug", year: "2025", location: "Various", country: "Europe", countryFlag: "🇪🇺", category: "FIBA", categoryColor: "bg-blue-500", description: "European Basketball Championship." },
];

// WNBA Events
export const wnbaEvents: AthleteEvent[] = [
  { id: "wnba-start", name: "WNBA Season Start", date: "16", month: "May", year: "2025", location: "Various", country: "USA", countryFlag: "🇺🇸", category: "Regular Season", categoryColor: "bg-orange-500", description: "WNBA regular season tips off." },
  { id: "wnba-asw", name: "WNBA All-Star Game", date: "19", month: "Jul", year: "2025", location: "TBD", country: "USA", countryFlag: "🇺🇸", category: "All-Star", categoryColor: "bg-gradient-to-r from-orange-500 to-pink-500", description: "WNBA All-Star showcase." },
  { id: "wnba-playoffs", name: "WNBA Playoffs", date: "17", month: "Sep", year: "2025", location: "Various", country: "USA", countryFlag: "🇺🇸", category: "Playoffs", categoryColor: "bg-purple-500", description: "WNBA postseason begins." },
  { id: "wnba-finals", name: "WNBA Finals", date: "10", month: "Oct", year: "2025", location: "TBD", country: "USA", countryFlag: "🇺🇸", category: "Finals", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Championship series for the WNBA title." },
];

// F1 Events
export const f1Events: AthleteEvent[] = [
  { id: "f1-aus", name: "Australian GP", date: "16", month: "Mar", year: "2025", location: "Melbourne, Australia", country: "Australia", countryFlag: "🇦🇺", category: "Grand Prix", categoryColor: "bg-red-600", description: "Season opener at Albert Park." },
  { id: "f1-monaco", name: "Monaco GP", date: "25", month: "May", year: "2025", location: "Monte-Carlo, Monaco", country: "Monaco", countryFlag: "🇲🇨", category: "Grand Prix", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "The jewel in F1's crown - Monaco street circuit." },
  { id: "f1-france", name: "French GP", date: "22", month: "Jun", year: "2025", location: "Le Castellet, France", country: "France", countryFlag: "🇫🇷", category: "Grand Prix", categoryColor: "bg-red-600", description: "Home race at Circuit Paul Ricard." },
  { id: "f1-monza", name: "Italian GP", date: "7", month: "Sep", year: "2025", location: "Monza, Italy", country: "Italy", countryFlag: "🇮🇹", category: "Grand Prix", categoryColor: "bg-red-600", description: "Temple of Speed - historic Monza circuit." },
  { id: "f1-abudhabi", name: "Abu Dhabi GP", date: "7", month: "Dec", year: "2025", location: "Abu Dhabi, UAE", country: "UAE", countryFlag: "🇦🇪", category: "Grand Prix", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Season finale under the lights at Yas Marina." },
];

// Cycling Events (Men)
export const cyclingEvents: AthleteEvent[] = [
  { id: "msf", name: "Milan-San Remo", date: "22", month: "Mar", year: "2025", location: "Milan-San Remo, Italy", country: "Italy", countryFlag: "🇮🇹", category: "Monument", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "La Primavera - first monument of the season." },
  { id: "flanders", name: "Tour of Flanders", date: "6", month: "Apr", year: "2025", location: "Flanders, Belgium", country: "Belgium", countryFlag: "🇧🇪", category: "Monument", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "De Ronde - cobbled classic in Flanders." },
  { id: "pr", name: "Paris-Roubaix", date: "13", month: "Apr", year: "2025", location: "Roubaix, France", country: "France", countryFlag: "🇫🇷", category: "Monument", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Hell of the North - the queen of the classics." },
  { id: "giro", name: "Giro d'Italia", date: "9", month: "May", year: "2025", location: "Italy", country: "Italy", countryFlag: "🇮🇹", category: "Grand Tour", categoryColor: "bg-pink-500", description: "Three weeks racing through Italy." },
  { id: "tdf", name: "Tour de France", date: "5", month: "Jul", year: "2025", location: "France", country: "France", countryFlag: "🇫🇷", category: "Grand Tour", categoryColor: "bg-gradient-to-r from-yellow-400 to-yellow-600", description: "The world's most famous cycling race." },
  { id: "vuelta", name: "Vuelta a España", date: "23", month: "Aug", year: "2025", location: "Spain", country: "Spain", countryFlag: "🇪🇸", category: "Grand Tour", categoryColor: "bg-red-500", description: "The final Grand Tour of the season." },
  { id: "worlds-rr", name: "World Championships", date: "21", month: "Sep", year: "2025", location: "Rwanda", country: "Rwanda", countryFlag: "🇷🇼", category: "World Championship", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "UCI Road World Championships in Africa." },
];

// Women's Cycling Events (UCI Women's World Tour)
export const womenCyclingEvents: AthleteEvent[] = [
  { id: "strade-w-2026", name: "Strade Bianche Women", date: "7", month: "Mar", year: "2026", location: "Siena, Italy", country: "Italy", countryFlag: "🇮🇹", category: "WorldTour", categoryColor: "bg-orange-500", description: "Women's white roads classic in Tuscany." },
  { id: "flanders-w-2026", name: "Tour of Flanders Women", date: "5", month: "Apr", year: "2026", location: "Flanders, Belgium", country: "Belgium", countryFlag: "🇧🇪", category: "Monument", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Women's Ronde van Vlaanderen." },
  { id: "pr-w-2026", name: "Paris-Roubaix Femmes", date: "11", month: "Apr", year: "2026", location: "Roubaix, France", country: "France", countryFlag: "🇫🇷", category: "Monument", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Women's Hell of the North." },
  { id: "giro-w-2026", name: "Giro d'Italia Women", date: "5", month: "Jul", year: "2026", location: "Italy", country: "Italy", countryFlag: "🇮🇹", category: "Grand Tour", categoryColor: "bg-pink-500", description: "Women's Giro - Italy's premier stage race." },
  { id: "tdf-w-2026", name: "Tour de France Femmes", date: "25", month: "Jul", year: "2026", location: "France", country: "France", countryFlag: "🇫🇷", category: "Grand Tour", categoryColor: "bg-gradient-to-r from-yellow-400 to-yellow-600", description: "The women's Tour de France." },
  { id: "worlds-w-2026", name: "World Championships", date: "19", month: "Sep", year: "2026", location: "Montreal, Canada", country: "Canada", countryFlag: "🇨🇦", category: "World Championship", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "UCI Women's Road World Championships." },
];

// Golf Events (PGA Tour)
export const golfEvents: AthleteEvent[] = [
  { id: "masters-2026", name: "The Masters", date: "9", month: "Apr", year: "2026", location: "Augusta, USA", country: "USA", countryFlag: "🇺🇸", category: "Major", categoryColor: "bg-gradient-to-r from-green-500 to-emerald-600", description: "First major of the year at Augusta National." },
  { id: "pga-champ-2026", name: "PGA Championship", date: "14", month: "May", year: "2026", location: "Aronimink GC, USA", country: "USA", countryFlag: "🇺🇸", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Second major at Aronimink Golf Club." },
  { id: "us-open-g-2026", name: "US Open", date: "18", month: "Jun", year: "2026", location: "Shinnecock Hills, USA", country: "USA", countryFlag: "🇺🇸", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Third major at Shinnecock Hills." },
  { id: "the-open-2026", name: "The Open Championship", date: "16", month: "Jul", year: "2026", location: "Royal Birkdale, UK", country: "UK", countryFlag: "🇬🇧", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "The Open at Royal Birkdale." },
];

// LPGA Events
export const lpgaEvents: AthleteEvent[] = [
  { id: "ana", name: "Chevron Championship", date: "17", month: "Apr", year: "2025", location: "Houston, USA", country: "USA", countryFlag: "🇺🇸", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "First LPGA major of the season." },
  { id: "lpga-us", name: "US Women's Open", date: "29", month: "May", year: "2025", location: "Erin Hills, USA", country: "USA", countryFlag: "🇺🇸", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Premier women's golf championship." },
  { id: "lpga-pga", name: "KPMG Women's PGA", date: "19", month: "Jun", year: "2025", location: "Sahalee CC, USA", country: "USA", countryFlag: "🇺🇸", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Women's PGA Championship." },
  { id: "british-women", name: "AIG Women's Open", date: "31", month: "Jul", year: "2025", location: "Muirfield, UK", country: "UK", countryFlag: "🇬🇧", category: "Major", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Women's British Open at Muirfield." },
  { id: "solheim", name: "Solheim Cup", date: "12", month: "Sep", year: "2025", location: "Virginia, USA", country: "USA", countryFlag: "🇺🇸", category: "Solheim Cup", categoryColor: "bg-gradient-to-r from-blue-600 to-red-600", description: "USA vs Europe women's team competition." },
];

// Judo Events
export const judoEvents: AthleteEvent[] = [
  { id: "gs-paris", name: "Paris Grand Slam", date: "1", month: "Feb", year: "2025", location: "Paris, France", country: "France", countryFlag: "🇫🇷", category: "Grand Slam", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Premier judo event at AccorHotels Arena." },
  { id: "gs-tbilisi", name: "Tbilisi Grand Slam", date: "14", month: "Mar", year: "2025", location: "Tbilisi, Georgia", country: "Georgia", countryFlag: "🇬🇪", category: "Grand Slam", categoryColor: "bg-orange-500", description: "Grand Slam in Georgia." },
  { id: "gs-antalya", name: "Antalya Grand Slam", date: "4", month: "Apr", year: "2025", location: "Antalya, Turkey", country: "Turkey", countryFlag: "🇹🇷", category: "Grand Slam", categoryColor: "bg-orange-500", description: "Turkish Grand Slam event." },
  { id: "worlds-judo", name: "World Championships", date: "13", month: "Jun", year: "2025", location: "Budapest, Hungary", country: "Hungary", countryFlag: "🇭🇺", category: "World Championship", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "IJF World Judo Championships." },
];

// Swimming Events
export const swimmingEvents: AthleteEvent[] = [
  { id: "worlds-swim", name: "World Championships", date: "11", month: "Jul", year: "2025", location: "Singapore", country: "Singapore", countryFlag: "🇸🇬", category: "World Championship", categoryColor: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "FINA World Championships." },
  { id: "wc-budapest", name: "World Cup Budapest", date: "3", month: "Oct", year: "2025", location: "Budapest, Hungary", country: "Hungary", countryFlag: "🇭🇺", category: "World Cup", categoryColor: "bg-blue-500", description: "FINA World Cup short course event." },
  { id: "euros-swim", name: "European Championships", date: "4", month: "May", year: "2025", location: "Belgrade, Serbia", country: "Serbia", countryFlag: "🇷🇸", category: "European Championship", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "LEN European Aquatics Championships." },
  { id: "french-champs", name: "French Championships", date: "25", month: "Mar", year: "2025", location: "Chartres, France", country: "France", countryFlag: "🇫🇷", category: "National", categoryColor: "bg-blue-500", description: "French National Swimming Championships." },
];

// Triathlon Events (WTCS - World Triathlon Championship Series)
export const triathlonEvents: AthleteEvent[] = [
  { id: "wtcs-abudhabi-2026", name: "WTCS Abu Dhabi", date: "27", month: "Mar", year: "2026", location: "Abu Dhabi, UAE", country: "UAE", countryFlag: "🇦🇪", category: "WTCS", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "World Triathlon Championship Series in Abu Dhabi." },
  { id: "wtcs-samarkand-2026", name: "WTCS Samarkand", date: "25", month: "Apr", year: "2026", location: "Samarkand, Uzbekistan", country: "Uzbekistan", countryFlag: "🇺🇿", category: "WTCS", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "World Triathlon Championship Series in Samarkand." },
  { id: "wtcs-yokohama-2026", name: "WTCS Yokohama", date: "16", month: "May", year: "2026", location: "Yokohama, Japan", country: "Japan", countryFlag: "🇯🇵", category: "WTCS", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "World Triathlon Championship Series in Yokohama." },
  { id: "wtcs-alghero-2026", name: "WTCS Alghero", date: "5", month: "Jun", year: "2026", location: "Alghero, Italy", country: "Italy", countryFlag: "🇮🇹", category: "WTCS", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "World Triathlon Championship Series in Alghero." },
  { id: "wtcs-quiberon-2026", name: "WTCS Quiberon", date: "20", month: "Jun", year: "2026", location: "Quiberon, France", country: "France", countryFlag: "🇫🇷", category: "WTCS", categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "World Triathlon Championship Series in Quiberon." },
];

// Month name to number mapping
const monthToNumber: Record<string, number> = {
  "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
  "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
};

// Helper function to convert event to Date
const eventToDate = (event: AthleteEvent): Date => {
  const year = parseInt(event.year);
  const month = monthToNumber[event.month] ?? 0;
  const day = parseInt(event.date);
  return new Date(year, month, day);
};

// Sort events chronologically, starting with next upcoming
const sortEventsChronologically = (events: AthleteEvent[]): AthleteEvent[] => {
  const now = new Date();
  
  return [...events].sort((a, b) => {
    const dateA = eventToDate(a);
    const dateB = eventToDate(b);
    
    const isPastA = dateA < now;
    const isPastB = dateB < now;
    
    // Future events come first, sorted by date ascending
    if (!isPastA && !isPastB) {
      return dateA.getTime() - dateB.getTime();
    }
    // Past events come after future events
    if (isPastA && !isPastB) return 1;
    if (!isPastA && isPastB) return -1;
    // Past events sorted by date descending (most recent first)
    return dateB.getTime() - dateA.getTime();
  });
};

// Helper function to get events by sport
export const getEventsBySport = (sport: string, gender?: string): AthleteEvent[] => {
  const sportLower = sport.toLowerCase();
  
  let events: AthleteEvent[];
  
  switch (sportLower) {
    case "tennis":
      events = tennisEvents;
      break;
    case "football":
      events = gender === "female" ? womenFootballEvents : footballEvents;
      break;
    case "rugby":
      events = rugbyEvents;
      break;
    case "basketball":
      events = gender === "female" ? wnbaEvents : basketballEvents;
      break;
    case "f1":
      events = f1Events;
      break;
    case "cycling":
      events = gender === "female" ? womenCyclingEvents : cyclingEvents;
      break;
    case "golf":
      events = gender === "female" ? lpgaEvents : golfEvents;
      break;
    case "judo":
      events = judoEvents;
      break;
    case "swimming":
      events = swimmingEvents;
      break;
    case "triathlon":
      events = triathlonEvents;
      break;
    default:
      events = [];
  }
  
  return sortEventsChronologically(events);
};
