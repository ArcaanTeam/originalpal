import fa from "./dictionaries/fa";

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  home: {
    title: string;
    tagline: string;
    welcome: string;
    sectionTitle: string;
    profileTitle: string;
    profileDescription: string;
    filesTitle: string;
    filesDescription: string;
    adminTitle: string;
    adminDescription: string;
    roleAdmin: string;
    roleMember: string;
    loading: string;
  };
  login: {
    title: string;
    description: string;
    usernameLabel: string;
    passwordLabel: string;
    submitButton: string;
    errorTitle: string;
  };
  auth: {
    invalidCredentials: string;
    signInFailed: string;
    validationFailed: string;
    logoutButton: string;
    signedInAs: string;
    profileLink: string;
    accountMenu: string;
    themeMode: string;
  };
  profile: {
    pageTitle: string;
    description: string;
  };
  /** Mobile top bar and bottom tab bar. */
  nav: {
    ariaLabel: string;
    home: string;
    files: string;
    profile: string;
    users: string;
  };
  files: {
    title: string;
    description: string;
    backLink: string;
    dropzoneTitle: string;
    dropzoneHint: string;
    selectFileButton: string;
    uploadingLabel: string;
    maxSizeHint: string;
    scopeOwn: string;
    scopeAll: string;
    tableHead: {
      name: string;
      type: string;
      size: string;
      uploader: string;
      createdAt: string;
      actions: string;
    };
    previewButton: string;
    downloadButton: string;
    deleteButton: string;
    confirmDelete: string;
    empty: string;
    loadError: string;
  };
  forbidden: {
    title: string;
    description: string;
  };
  errors: {
    title: string;
    fallback: string;
    reasons: Record<string, string>;
    violations: Record<string, string>;
    codes: Record<string, string>;
  };
  toast: {
    profile: {
      usernameUpdated: string;
      passwordUpdated: string;
    };
    users: {
      created: string;
      roleUpdated: string;
      deleted: string;
    };
    files: {
      uploaded: string;
      deleted: string;
    };
  };
};

export function getDictionary(): Dictionary {
  return fa;
}

export function formatMessage(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    return values[key] ?? `{${key}}`;
  });
}
