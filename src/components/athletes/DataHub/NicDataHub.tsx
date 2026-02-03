import { Trophy, TrendingUp, Target, Award, Calendar, Waves } from "lucide-react";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Placeholder data - easily replaceable with API/CMS data
const globalStats = {
  biggestWave: "74ft",
  wslRanking: 8,
  careerWins: 12,
  yearsCompeting: 15,
  countriesVisited: 28,
};

const seasonPerformance = [
  { month: 'Oct', waves: 12, biggestFt: 55 },
  { month: 'Nov', waves: 18, biggestFt: 68 },
  { month: 'Dec', waves: 22, biggestFt: 74 },
  { month: 'Jan', waves: 15, biggestFt: 62 },
  { month: 'Feb', waves: 8, biggestFt: 48 },
];

const waveLocations = [
  { location: 'Nazaré', waves: 45, biggest: 74 },
  { location: "Jaws (Pe'ahi)", waves: 18, biggest: 58 },
  { location: 'Mavericks', waves: 12, biggest: 52 },
  { location: 'Teahupoo', waves: 8, biggest: 28 },
  { location: 'Pipeline', waves: 22, biggest: 15 },
];

export const NicDataHub = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Data Hub</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          In-depth big wave analytics and performance insights
        </p>
      </div>
      
      {/* Global Stats Overview */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Career Overview
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <StatCard
            label="Biggest Wave"
            value={globalStats.biggestWave}
            sublabel="Nazaré 2023"
            icon={Waves}
            index={0}
          />
          <StatCard
            label="WSL Big Wave Ranking"
            value={`#${globalStats.wslRanking}`}
            icon={TrendingUp}
            trend="up"
            index={1}
          />
          <StatCard
            label="Career Titles"
            value={globalStats.careerWins}
            sublabel="Big wave events"
            icon={Trophy}
            index={2}
          />
          <StatCard
            label="Years Competing"
            value={globalStats.yearsCompeting}
            icon={Calendar}
            index={3}
          />
          <StatCard
            label="Countries Surfed"
            value={globalStats.countriesVisited}
            sublabel="Worldwide"
            icon={Target}
            index={4}
          />
        </div>
      </div>
      
      {/* Performance Charts */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Season Analytics
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Waves Ridden Per Month */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Waves className="h-4 w-4 text-primary" />
                Waves Ridden by Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seasonPerformance}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="waves" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Biggest Wave Trend */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Biggest Wave (ft) Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonPerformance}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 80]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="biggestFt" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Location Performance */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Performance by Location
        </h4>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Waves Caught by Break
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waveLocations} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="location" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [value, name === 'waves' ? 'Waves Caught' : 'Biggest (ft)']}
                  />
                  <Bar dataKey="waves" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Event */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Next Big Wave Event
        </h4>
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">15</div>
                <div className="text-xs text-muted-foreground">OCT</div>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-foreground">Nazaré Big Wave Season 2025</h5>
                <p className="text-sm text-muted-foreground">Nazaré, Portugal 🇵🇹</p>
                <p className="text-xs text-muted-foreground mt-1">The most anticipated big wave event at Praia do Norte</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                  Big Wave
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
