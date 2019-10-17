import jsonPlaceholder from "../apis/jsonPlaceholder";

// Redux-Thunk simply allows us to return a function instead of a plain object.
// From that function we can then call dispatch manually. This is very useful for async
// requests, as it allows us to wait for the request to finish before invoking the dispatcher
export const fetchPosts = () => async (dispatch, getState) => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = userId => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const fetchUsersAndPosts = () => async (dispatch, getState) => {
  console.log("About to fetch posts");
  await dispatch(fetchPosts());
  console.log("Got posts!");

  let userIds = [];
  // Get user IDs
  getState().posts.forEach(post => {
    userIds.push(post.userId);
  });

  // Get unique user IDs
  userIds = new Set(userIds);

  userIds.forEach(id => {
    dispatch(fetchUser(id));
  });
};

// export const fetchUser = userId => dispatch => _fetchUser(userId, dispatch);

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//   // console.log("FETCHING USER: " + userId);
//   const response = await jsonPlaceholder.get(`/users/${userId}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
