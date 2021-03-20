/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addBookmark = /* GraphQL */ `
  mutation AddBookmark($bookmark: AddBookmark!) {
    addBookmark(bookmark: $bookmark) {
      id
      title
      url
    }
  }
`;
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark($editedBookmark: UpdateBookmark!) {
    updateBookmark(editedBookmark: $editedBookmark) {
      id
      title
      url
    }
  }
`;
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark($bookmarkId: String!) {
    deleteBookmark(bookmarkId: $bookmarkId)
  }
`;
