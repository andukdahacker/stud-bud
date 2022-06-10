import { RelationshipStatusCode } from "@prisma/client";

export interface RelationShipInput {
  addressee_id: string;
  requester_id: string;
  specifier_id: string;
  status: "ACCEPTED" | "DECLINED" | "REQUESTED";
}

export type Relationship = {
  data: {
    requester_id: string;
    addressee_id: string;
    specifier_id: string;
    status: RelationshipStatusCode;
    createdAt: Date;
    updatedAt: Date;
  };
};
