export type Game = {
  id: string
  title: string
  genres: Genre[]
  price: number
  description: string
  platforms: Platform[]
  publisher: string
  developer: string
  rating: number
  imageUrl: string
  usersOwned: User[]
  multiplayerSupport: boolean
  createdAt: string
};

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  games: Game[]
  createdAt: string
  avatarURL: string
}

export type Friendship = {
  id: string
  status: "pending" | "rejected" | "accepted"
  userId: string
  friendId: string
};

export type Genre = {
  id: string
  name?: string
}
export type Platform = {
  id: string
  name?: string
}