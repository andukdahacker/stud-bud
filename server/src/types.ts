export interface RelationShipInput {
  addressee_id: string;
  requester_id: string;
  specifier_id: string;
  status: "ACCEPTED" | "DECLINED" | "REQUESTED";
}
