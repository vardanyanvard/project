import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleCancelRequest,
  handleGetAccount,
  handleSendFollow,
  handleSendUnFollow,
} from "../../../helpers/api";
import { IAccount } from "../../../helpers/types";
import { BASE, DEF } from "../../../helpers/default";
import { Gallery } from "../../../components/Gallery";

export function Account() {
  const [found, setFound] = useState<IAccount | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      handleGetAccount(id).then((response) => {
        if (!response.payload) {
          navigate("/profile");
        } else {
          setFound(response.payload as IAccount);
        }
      });
    }
  }, [id]);

  const handleRequest = () => {
    if (found) {
      if (found.connection.following) {
        unFollowUser();
      } else if (found.connection.requested) {
        cancelRequest();
      } else {
        followUser();
      }
    }
  };
  const followUser = () => {
    if (found && found.id) {
      handleSendFollow(found.id).then((response) => {
        setFound({
          ...found,
          connection: {
            ...found.connection,
            [response.status]: true,
          },
        });
      });
    }
  };
  const unFollowUser = () => {
    if (found && found.id) {
      handleSendUnFollow(found.id).then((response) => {
        console.log(response);
        setFound({
          ...found,
          connection: { ...found.connection, following: false },
        });
      });
    }
  };
  const cancelRequest = () => {
    if (found && found.id) {
      handleCancelRequest(found.id).then((response) => {
        console.log(response);
        setFound({
          ...found,
          connection: { ...found.connection, requested: false },
        });
      });
    }
  };

  return (
    found && (
      <div className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="container py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src={found.picture ? BASE + found.picture : DEF}
                      className="rounded-circle"
                      fluid
                      style={{ width: "100px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">
                    {found.name} {found.surname}
                  </MDBTypography>
                  <div>
                    <span>
                      {found.isPrivate ? "private profile" : "public profile"}
                    </span>
                    <img
                      className="prifileStatusImg"
                      src={
                        found.isPrivate
                          ? "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678129-lock-256.png"
                          : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/lock-open-512.png"
                      }
                      alt=""
                      style={{
                        width: 40,
                        height: 40,
                        marginBottom: 10,
                      }}
                    />
                  </div>
                  {found.posts && <Gallery posts={found.posts} />}
                  <button onClick={handleRequest} className="btn btn-info">
                    {found.connection.following
                      ? "Unfollow"
                      : found.connection.followsMe
                      ? "Follow Back"
                      : found.connection.requested
                      ? "Cancel Request"
                      : "Follow"}
                  </button>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">8471</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Wallets Balance
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">8512</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">4751</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Total Transactions
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )
  );
}
