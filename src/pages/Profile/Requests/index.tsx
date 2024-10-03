import { useEffect, useState } from "react";
import { IFollowsList } from "../../../helpers/types";
import {
  handleAcceptFollow,
  handleDeclineFollow,
  handleFollowersList,
} from "../../../helpers/api";
import { BASE } from "../../../helpers/default";

export function Requests() {
  const [followersList, setFollowersList] = useState<IFollowsList[] | null>(
    null
  );

  useEffect(() => {
    handleFollowersList().then((response) => {
      setFollowersList(response.payload as IFollowsList[]);
    });
  }, []);

  const handleAccept = (id: number) => {
    handleAcceptFollow(id).then(() => {
      setFollowersList(followersList?.filter((item) => item.id !== id) || []);
    });
  };

  const handleDecline = (id: number) => {
    handleDeclineFollow(id).then(() => {
      setFollowersList(followersList?.filter((item) => item.id !== id) || []);
    });
  };

  return (
    <div className="requestComponenet">
      <div className="requestContent">
        {!followersList?.length && <p>Requests not found</p>}
        {followersList?.map((follower) => (
          <div key={follower.id} className="followersListItem">
            <img src={BASE + follower.user.picture} alt="" />
            <p>
              {follower.user.name} {follower.user.surname}
            </p>
            <p className="acceptBtn" onClick={() => handleAccept(follower.id)}>
              Accept
            </p>
            <p className="deleteBtn" onClick={() => handleDecline(follower.id)}>
              Delete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
