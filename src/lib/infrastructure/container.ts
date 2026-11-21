import { createHash, randomUUID } from "node:crypto";
import "server-only";
import { loginUseCase } from "@/lib/application/usecase/auth/login";
import type { LoginInput } from "@/lib/application/usecase/auth/login";
import { logoutUseCase } from "@/lib/application/usecase/auth/logout";
import type { LogoutInput } from "@/lib/application/usecase/auth/logout";
import { refreshSessionUseCase } from "@/lib/application/usecase/auth/refresh";
import type { AuthTokensResult } from "@/lib/application/usecase/auth/tokens";
import { updatePasswordUseCase } from "@/lib/application/usecase/auth/updatePassword";
import { updateUsernameUseCase } from "@/lib/application/usecase/auth/updateUsername";
import { deleteFileUseCase } from "@/lib/application/usecase/file/deleteFile";
import { getFileUseCase } from "@/lib/application/usecase/file/getFile";
import { getFileContentUseCase } from "@/lib/application/usecase/file/getFileContent";
import {
  listFilesUseCase,
  type FileListScope,
} from "@/lib/application/usecase/file/listFiles";
import { uploadFileUseCase } from "@/lib/application/usecase/file/uploadFile";
import { createUserUseCase } from "@/lib/application/usecase/user/createUser";
import { deleteUserUseCase } from "@/lib/application/usecase/user/deleteUser";
import { listUsersUseCase } from "@/lib/application/usecase/user/listUsers";
import { updateUserRoleUseCase } from "@/lib/application/usecase/user/updateUserRole";
import type { AppRole } from "@/lib/domain/auth/role";
import { ALLOWED_UPLOAD_MIME_TYPES } from "@/lib/domain/entity/uploadedFile";
import { JoseAccessTokenService } from "@/lib/infrastructure/auth/jwtAccessToken";
import { BcryptPasswordHasher } from "@/lib/infrastructure/crypto/bcryptPasswordHasher";
import { CryptoRefreshTokenService } from "@/lib/infrastructure/crypto/refreshTokenService";
import {
  getAccessTokenConfig,
  getRefreshTokenConfig,
  getServerEnv,
  getUploadConfig as getUploadEnvConfig,
} from "@/lib/infrastructure/env";
import { DrizzleFileRepository } from "@/lib/infrastructure/persistence/file/drizzleFileRepository";
import { DrizzleSessionRepository } from "@/lib/infrastructure/persistence/session/drizzleSessionRepository";
import { DrizzleUserRepository } from "@/lib/infrastructure/persistence/user/drizzleUserRepository";
import { LocalFileStorage } from "@/lib/infrastructure/storage/localFileStorage";

let userRepository: DrizzleUserRepository | undefined;
let sessionRepository: DrizzleSessionRepository | undefined;
let fileRepository: DrizzleFileRepository | undefined;
let fileStorage: LocalFileStorage | undefined;
let accessTokenService: JoseAccessTokenService | undefined;
let passwordHasher: BcryptPasswordHasher | undefined;
let refreshTokenService: CryptoRefreshTokenService | undefined;

function getUserRepository(): DrizzleUserRepository {
  userRepository ??= new DrizzleUserRepository();
  return userRepository;
}

function getSessionRepository(): DrizzleSessionRepository {
  sessionRepository ??= new DrizzleSessionRepository();
  return sessionRepository;
}

function getFileRepository(): DrizzleFileRepository {
  fileRepository ??= new DrizzleFileRepository();
  return fileRepository;
}

function getFileStorage(): LocalFileStorage {
  fileStorage ??= new LocalFileStorage(getUploadEnvConfig().uploadDir);
  return fileStorage;
}

function getAccessTokenService(): JoseAccessTokenService {
  accessTokenService ??= new JoseAccessTokenService(getAccessTokenConfig());
  return accessTokenService;
}

function getPasswordHasher(): BcryptPasswordHasher {
  const env = getServerEnv();
  passwordHasher ??= new BcryptPasswordHasher(env.BCRYPT_ROUNDS);
  return passwordHasher;
}

function getRefreshTokenService(): CryptoRefreshTokenService {
  refreshTokenService ??= new CryptoRefreshTokenService();
  return refreshTokenService;
}

let loginUseCaseFn: ReturnType<typeof loginUseCase> | undefined;
let refreshUseCaseFn: ReturnType<typeof refreshSessionUseCase> | undefined;
let logoutUseCaseFn: ReturnType<typeof logoutUseCase> | undefined;
let listUsersUseCaseFn: ReturnType<typeof listUsersUseCase> | undefined;
let updateUserRoleUseCaseFn:
  ReturnType<typeof updateUserRoleUseCase> | undefined;
let createUserUseCaseFn: ReturnType<typeof createUserUseCase> | undefined;
let deleteUserUseCaseFn: ReturnType<typeof deleteUserUseCase> | undefined;
let updatePasswordUseCaseFn:
  ReturnType<typeof updatePasswordUseCase> | undefined;
let updateUsernameUseCaseFn:
  ReturnType<typeof updateUsernameUseCase> | undefined;
let uploadFileUseCaseFn: ReturnType<typeof uploadFileUseCase> | undefined;
let listFilesUseCaseFn: ReturnType<typeof listFilesUseCase> | undefined;
let getFileUseCaseFn: ReturnType<typeof getFileUseCase> | undefined;
let getFileContentUseCaseFn:
  ReturnType<typeof getFileContentUseCase> | undefined;
let deleteFileUseCaseFn: ReturnType<typeof deleteFileUseCase> | undefined;

function getLoginUseCase() {
  const { ttlSeconds } = getRefreshTokenConfig();
  loginUseCaseFn ??= loginUseCase({
    userRepository: getUserRepository(),
    sessionRepository: getSessionRepository(),
    passwordHasher: getPasswordHasher(),
    accessTokenIssuer: getAccessTokenService(),
    refreshTokenService: getRefreshTokenService(),
    sessionIdGenerator: () => randomUUID(),
    refreshTtlSeconds: ttlSeconds,
  });
  return loginUseCaseFn;
}

function getRefreshUseCase() {
  const { ttlSeconds } = getRefreshTokenConfig();
  refreshUseCaseFn ??= refreshSessionUseCase({
    userRepository: getUserRepository(),
    sessionRepository: getSessionRepository(),
    accessTokenIssuer: getAccessTokenService(),
    refreshTokenService: getRefreshTokenService(),
    refreshTtlSeconds: ttlSeconds,
  });
  return refreshUseCaseFn;
}

function getLogoutUseCase() {
  logoutUseCaseFn ??= logoutUseCase({
    sessionRepository: getSessionRepository(),
    refreshTokenService: getRefreshTokenService(),
  });
  return logoutUseCaseFn;
}

function getListUsersUseCase() {
  listUsersUseCaseFn ??= listUsersUseCase({
    userRepository: getUserRepository(),
  });
  return listUsersUseCaseFn;
}

function getUpdateUserRoleUseCase() {
  updateUserRoleUseCaseFn ??= updateUserRoleUseCase({
    userRepository: getUserRepository(),
  });
  return updateUserRoleUseCaseFn;
}

function getCreateUserUseCase() {
  createUserUseCaseFn ??= createUserUseCase({
    userRepository: getUserRepository(),
    passwordHasher: getPasswordHasher(),
    idGenerator: () => randomUUID(),
  });
  return createUserUseCaseFn;
}

function getDeleteUserUseCase() {
  deleteUserUseCaseFn ??= deleteUserUseCase({
    userRepository: getUserRepository(),
  });
  return deleteUserUseCaseFn;
}

function getUpdatePasswordUseCase() {
  updatePasswordUseCaseFn ??= updatePasswordUseCase({
    userRepository: getUserRepository(),
    passwordHasher: getPasswordHasher(),
  });
  return updatePasswordUseCaseFn;
}

function getUpdateUsernameUseCase() {
  updateUsernameUseCaseFn ??= updateUsernameUseCase({
    userRepository: getUserRepository(),
  });
  return updateUsernameUseCaseFn;
}

function getUploadFileUseCase() {
  const uploadConfig = getUploadConfig();
  uploadFileUseCaseFn ??= uploadFileUseCase({
    fileRepository: getFileRepository(),
    fileStorage: getFileStorage(),
    idGenerator: () => randomUUID(),
    sha256: (content) => createHash("sha256").update(content).digest("hex"),
    maxFileSizeBytes: uploadConfig.maxFileSizeBytes,
    allowedMimeTypes: uploadConfig.allowedMimeTypes,
  });
  return uploadFileUseCaseFn;
}

function getListFilesUseCase() {
  listFilesUseCaseFn ??= listFilesUseCase({
    fileRepository: getFileRepository(),
  });
  return listFilesUseCaseFn;
}

function getGetFileUseCase() {
  getFileUseCaseFn ??= getFileUseCase({
    fileRepository: getFileRepository(),
  });
  return getFileUseCaseFn;
}

function getGetFileContentUseCase() {
  getFileContentUseCaseFn ??= getFileContentUseCase({
    fileRepository: getFileRepository(),
    fileStorage: getFileStorage(),
  });
  return getFileContentUseCaseFn;
}

function getDeleteFileUseCase() {
  deleteFileUseCaseFn ??= deleteFileUseCase({
    fileRepository: getFileRepository(),
    fileStorage: getFileStorage(),
  });
  return deleteFileUseCaseFn;
}

export const login = (input: LoginInput): Promise<AuthTokensResult> =>
  getLoginUseCase()(input);

export const refresh = (input: {
  refreshToken: string;
}): Promise<AuthTokensResult> => getRefreshUseCase()(input);

export const logout = (input: LogoutInput): Promise<void> =>
  getLogoutUseCase()(input);

export const listUsers = () => getListUsersUseCase()();

export const updateUserRole = (input: {
  actorUserId: string;
  targetUserId: string;
  role: AppRole;
}) => getUpdateUserRoleUseCase()(input);

export const createUser = (input: {
  username: string;
  password: string;
  role: AppRole;
}) => getCreateUserUseCase()(input);

export const deleteUser = (input: {
  actorUserId: string;
  targetUserId: string;
}) => getDeleteUserUseCase()(input);

export const updatePassword = (input: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) => getUpdatePasswordUseCase()(input);

export const updateUsername = (input: { userId: string; username: string }) =>
  getUpdateUsernameUseCase()(input);

export const uploadFile = (input: {
  uploaderId: string;
  uploaderUsername?: string;
  originalName: string;
  claimedMimeType: string;
  content: Uint8Array;
}) => getUploadFileUseCase()(input);

export const listFiles = (input: {
  actorUserId: string;
  actorRole: AppRole;
  scope?: FileListScope;
}) => getListFilesUseCase()(input);

export const getFile = (input: {
  actorUserId: string;
  actorRole: AppRole;
  fileId: string;
}) => getGetFileUseCase()(input);

export const getFileContent = (input: {
  actorUserId: string;
  actorRole: AppRole;
  fileId: string;
}) => getGetFileContentUseCase()(input);

export const deleteFile = (input: {
  actorUserId: string;
  actorRole: AppRole;
  fileId: string;
}) => getDeleteFileUseCase()(input);

export function getUploadConfig() {
  return {
    ...getUploadEnvConfig(),
    allowedMimeTypes: ALLOWED_UPLOAD_MIME_TYPES,
  };
}

export { getAccessTokenService as accessTokenService };

export const container = {
  userRepository: getUserRepository(),
};
