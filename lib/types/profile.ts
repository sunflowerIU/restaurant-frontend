export type UpdateProfile = {
  name: string;
  phone: string | undefined;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  addresses?: Address[];
  phone: string | undefined;
  avatarSrc: string | undefined;
};

export type Address = {
  _id: string;
  label: string;
  addressLine: string;
  city: string;
  notes?: string | null;
};

export type AddressAction =
  | { type: "add"; address: Address }
  | { type: "remove"; id: string };

export type PasswordState = {
  current: string;
  new: string;
  confirm: string;
};

export type NewAddressInput = Omit<Address, "_id">;
