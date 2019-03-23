import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer ", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 250,
          userId: 1450
        }
      )
    ).toEqual({
      token: 250,
      userId: 1450,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
