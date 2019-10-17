import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsersAndPosts } from "../actions";
import UserHeader from "./UserHeader";

const PostList = ({ posts, users, fetchUsersAndPosts }) => {
  useEffect(() => {
    fetchUsersAndPosts();
  }, []);

  function renderList() {
    return posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader user={users[post.userId]} />
          </div>
        </div>
      );
    });
  }

  console.log(users);
  return <div className="ui relaxed divided list">{renderList()}</div>;
};

const mapStateToProps = state => {
  return { posts: state.posts, users: state.users };
};

export default connect(
  mapStateToProps,
  { fetchUsersAndPosts }
)(PostList);
