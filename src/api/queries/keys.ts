export const queryKeys = {
  all: ["api"] as const,

  auth: () => [...queryKeys.all, "auth"] as const,
};
