import { useState, useEffect } from "react";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { Link } from "react-router-dom";

function Post({ onePost }) {
  // GET the contact info

  const [contact, setContact] = useState({});
  const [comments, setComments] = useState([]);

  // 3. useEffect
  useEffect(() => {
    fetchData();
    fetchComments();
  }, [onePost]);

  // 2. Fetch post

  const fetchData = () => {
    fetch(
      `https://boolean-api-server.fly.dev/ps975076/contact/${onePost.contactId}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "data");
        setContact(data);
      });
  };

  const fetchComments = () => {
    fetch(
      `https://boolean-api-server.fly.dev/ps975076/post/${onePost.id}/comment`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data, "data");
        setComments(data);
      });
  };

  return (
    <div className="commentContainer">
      <div className="commentSection">
        <div className="userInfoCon">
          <div className="intialsInCommentCon">
            <p>
              {contact?.firstName?.charAt(0) || "F"}
              {contact?.lastName?.charAt(0) || "L"}
            </p>
          </div>
          <div className="nameTitleCon">
            <div className="name">
              <p>
                <strong>
                  {contact?.firstName || "First"} {contact?.lastName || "Last"}
                </strong>
              </p>
            </div>
            <div className="title">
              <Link to={`/${onePost.id}`}>{onePost.title}</Link>
            </div>
          </div>
        </div>
        <div className="comment">
          <p>{onePost.content}</p>
        </div>
      </div>

      <hr />
      <Comments comments={comments} />

      <AddComment
        postId={onePost.id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default Post;
