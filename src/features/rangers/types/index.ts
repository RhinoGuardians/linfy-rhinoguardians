export interface RangerTeamStatus {
  id: string;
  teamName: string;
  status: "available" | "deployed" | "offline";
}

