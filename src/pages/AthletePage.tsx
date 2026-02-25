import { useParams, useSearchParams, Link } from "react-router-dom";
import { getAthleteById } from "@/data/athletes";
import { useAuth } from "@/contexts/AuthContext";
import { RegistrationGate } from "@/components/auth/RegistrationGate";
import { UnifiedAthletePage } from "@/components/athletes/UnifiedAthletePage";
import { Button } from "@/components/ui/button";

// DataHub components
import { ArthurDataHub } from "@/components/athletes/DataHub/ArthurDataHub";
import { CassandreDataHub } from "@/components/athletes/DataHub/CassandreDataHub";
import { PierreDataHub } from "@/components/athletes/DataHub/PierreDataHub";
import { TommyDataHub } from "@/components/athletes/DataHub/TommyDataHub";
import { NicDataHub } from "@/components/athletes/DataHub/NicDataHub";

/* ─── DataHub mapping ─── */
const dataHubMap: Record<string, JSX.Element> = {
  "arthur-cazaux": <ArthurDataHub />,
  "cassandre-beaugrand": <CassandreDataHub />,
  "pierre-gasly": <PierreDataHub />,
  "tommy-fleetwood": <TommyDataHub />,
  "nic-von-rupp": <NicDataHub />,
};

const AthletePage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const fromStudio = searchParams.get("from") === "studio";

  const athlete = getAthleteById(id || "");

  if (!athlete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-foreground">Athlete not found</h1>
          <Link to="/athletes">
            <Button variant="gold">Browse Athletes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Registration Gate Overlay for unauthenticated users */}
      {!isAuthenticated && <RegistrationGate athleteName={athlete.name} />}

      <div className={!isAuthenticated ? "blur-lg pointer-events-none select-none" : ""}>
        <UnifiedAthletePage
          athlete={athlete}
          fromStudio={fromStudio}
          dataHubComponent={dataHubMap[athlete.id]}
        />
      </div>
    </div>
  );
};

export default AthletePage;
