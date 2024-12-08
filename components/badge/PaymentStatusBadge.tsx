import React from 'react';
import { Badge, BadgeText } from '../ui/badge';
import { PostStatus } from '@/constants';

interface Props {
  status: boolean;
}

const PaymentStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      action={status ? 'success' : 'error'}
      size="lg"
      className="rounded-xl"
    >
      <BadgeText>{status ? 'Đã thanh toán' : 'Chưa thanh toán'}</BadgeText>
    </Badge>
  );
};

export default PaymentStatusBadge;
