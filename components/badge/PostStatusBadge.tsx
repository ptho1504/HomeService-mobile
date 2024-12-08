import React from 'react';
import { Badge, BadgeText } from '../ui/badge';
import { PostStatus } from '@/constants';

interface Props {
  status: string;
}

const PostStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      action={
        PostStatus[status as keyof typeof PostStatus].action as
          | 'muted'
          | 'info'
          | 'warning'
          | 'success'
          | 'error'
      }
      size="lg"
      className="rounded-xl"
    >
      <BadgeText>
        {PostStatus[status as keyof typeof PostStatus].value}
      </BadgeText>
    </Badge>
  );
};

export default PostStatusBadge;
