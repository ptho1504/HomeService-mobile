import { Box } from "@/components/ui/box";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { PackageName } from "@/constants";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { router, useFocusEffect } from "expo-router";
import PostList from "@/components/list/PostList";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { PostModel, RootStackParamList } from "@/types/postTypes";
import { RouteProp } from "@react-navigation/native";
import { useGetPostsByCustomerIdQuery } from "@/services/post";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "@/store/reducers";
import { LinearGradient } from "expo-linear-gradient";
import RequiredAuthenticationModal from "@/components/authentication/RequiredAuthenticationModal";
import { i18n } from "@/localization";

interface Props {
  route:
    | RouteProp<RootStackParamList, "UpcomingWork">
    | RouteProp<RootStackParamList, "PackageWork">
    | RouteProp<RootStackParamList, "PastWork">;
}

const Posts = ({ route }: Props) => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = currentUser?.id ? currentUser.id : "";
  const { status } = route.params;
  const query =
    status === "UPCOMING"
      ? { id: userId, packageName: PackageName._1DAY.key }
      : status === "PACKAGE"
      ? { id: userId, packageName: PackageName._1MONTH.key }
      : { id: userId };

  const { data, error, isFetching, refetch } =
    useGetPostsByCustomerIdQuery(query);

  const toast = useToast();
  const [showModal, setShowModal] = React.useState(!isAuthenticated);
  useEffect(() => {
    if (error || (data && data.returnCode !== 1000)) {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>{i18n.t("st_get_post_info_failed")}</ToastTitle>
              <ToastDescription>{error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  }, []);

  let posts: PostModel[] = data?.items ? data?.items : [];
  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);
  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        setShowModal(false); // Hide the modal if authenticated
      } else {
        setShowModal(true); // Show the modal if not authenticated
      }
    }, [isAuthenticated])
  );
  return (
    <>
      {!isAuthenticated ? (
        <RequiredAuthenticationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <SafeAreaView className="flex h-full bg-[#ebf7eb]">
          <LinearGradient
            // Background Linear Gradient
            colors={["#ebf7eb", "transparent", "#ffffff"]}
            className="absolute h-[1000px] left-0 right-0 top-0"
          />
          {isFetching ? (
            <PostSkeleton />
          ) : (
            <PostList posts={posts} refetch={refetch} />
          )}
          <Box className="sticky bottom-0 p-4">
            <Button
              onPress={() => router.push("../(home)")}
              size="xl"
              className="bg-success-300 flex flex-row items-center justify-center"
              action="positive"
            >
              <ButtonText>{i18n.t("st_post_new_job")}</ButtonText>
            </Button>
          </Box>
        </SafeAreaView>
      )}
    </>
  );
};

export default Posts;
