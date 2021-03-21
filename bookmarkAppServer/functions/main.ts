import { addBookmark } from "./addBookmark";
import { deleteBookmark } from "./deleteBookmark";
import { getBookmarks } from "./getBookmark";
import { updateBookmark } from "./updateBookmark";

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        bookmark: Bookmark,
        editedBookmark: UpdateBookmark,
        bookmarkId: string,
        user: string
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "getBookmark":
            return await getBookmarks(event.arguments.user)
        case "addBookmark":
            return await addBookmark(event.arguments.bookmark);
        case "updateBookmark":
            return await updateBookmark(event.arguments.editedBookmark)
        case "deleteBookmark":
            return await deleteBookmark(event.arguments.bookmarkId)
        default:
            return "Update not called"
    }
}