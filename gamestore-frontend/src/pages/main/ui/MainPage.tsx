import {useSelector} from "react-redux";

import {UsersList} from "@/entities/authentification/ui/UsersList/UsersList";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeleteFromFriendsMutation,
  useGetFriendsQuery,
  useGetIncomingRequestsQuery,
  useGetOutgoingRequestsQuery,
  useRejectFriendRequestMutation,
  useSendFriendRequestMutation,
} from "@/entities/friends/api/friendsAPI";
import {HeroCarousel} from "@/pages/main/ui/hero/ui/HeroCarousel";
import {useGetFewUsersQuery} from "@/entities/authentification/api/authApi";

export const MainPage = () => {
  const {data} = useGetFewUsersQuery();
  const userData = useSelector((state: RootState) => state.session.data);
  const {data: myFriends = []} = useGetFriendsQuery();
  const {data: incomingRequests = []} = useGetIncomingRequestsQuery();
  const {data: outgoingRequests = []} = useGetOutgoingRequestsQuery();
  
  const [addFriend] = useSendFriendRequestMutation();
  const [removeFriend] = useDeleteFromFriendsMutation();
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  
  return (
    <>
      <HeroCarousel/>
      {userData && <UsersList
        users={data}
        myFriends={myFriends}
        incomingRequests={incomingRequests}
        outgoingRequests={outgoingRequests}
        onAddFriend={(user) => addFriend(user.id)}
        onRemoveFriend={(user) => removeFriend(user.id)}
        onCancelRequest={(requestId) => cancelFriendRequest(requestId)}
        onAcceptRequest={(requestId) => acceptFriendRequest(requestId)}
        onRejectRequest={(requestId) => rejectFriendRequest(requestId)}
      />}
    </>
  );
};
