import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import { HouseCleaningOption, WorkDay } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateNext7Days } from '@/utils/dateUtil';
import { ButtonText, Button } from '@/components/ui/button';
import { Icon, CloseIcon } from '@/components/ui/icon';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from '@/components/ui/modal';
import { Center } from '../ui/center';
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
