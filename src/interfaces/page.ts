import { User } from '~/interfaces/user';

export type Page = {
  id: string,
  path: string,
  status: string,
  revision: Revision,
}

export type BookmarkInfo = {
  sumOfBookmarks: number,
  isBookmarked: boolean,
}

export type LikeInfo = {
  sumOfLikers: number,
  isLiked: boolean,
}

export type Tag = {
  name: string,
}

export type Comment = {
  _id: string,
  page: Page,
  comment: string,
  replyTo?: string,
  creator: User,
}

export type Revision = {
  _id: string;
}