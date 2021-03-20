/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AddBookmark = {
  title: string,
  url: string,
  user: string,
};

export type Bookmark = {
  __typename: "Bookmark",
  id?: string,
  title?: string,
  url?: string,
};

export type UpdateBookmark = {
  id: string,
  title: string,
  url: string,
};

export type AddBookmarkMutationVariables = {
  bookmark?: AddBookmark,
};

export type AddBookmarkMutation = {
  addBookmark?:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } | null,
};

export type UpdateBookmarkMutationVariables = {
  editedBookmark?: UpdateBookmark,
};

export type UpdateBookmarkMutation = {
  updateBookmark?:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } | null,
};

export type DeleteBookmarkMutationVariables = {
  bookmarkId?: string,
};

export type DeleteBookmarkMutation = {
  deleteBookmark?: string | null,
};

export type GetBookmarkQueryVariables = {
  user?: string,
};

export type GetBookmarkQuery = {
  getBookmark?:  Array< {
    __typename: "Bookmark",
    id: string,
    title: string,
    url: string,
  } | null > | null,
};
