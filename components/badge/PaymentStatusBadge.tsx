import React from "react";
import { Badge, BadgeText } from "../ui/badge";
import { PostStatus } from "@/constants";
import { i18n } from "@/localization";

interface Props {
  status: boolean;
}

const PaymentStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      action={status ? "success" : "error"}
      size="lg"
      className="rounded-xl"
    >
      <BadgeText>
        {status ? i18n.t("word_paid") : i18n.t("word_unpaid")}
      </BadgeText>
    </Badge>
  );
};

export default PaymentStatusBadge;
