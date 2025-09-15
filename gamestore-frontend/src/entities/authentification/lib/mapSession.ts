import type {Session} from "@/entities/authentification/model/types";
import type {User} from "@/shared/api";

export const mapSession = (dto: User): Session => ({
  userId: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  email: dto.email,
  games: dto.games,
  avatarURL: dto.avatarURL,
  createdAt: dto.createdAt,
});