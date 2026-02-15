export type LoginRequestType = {
    email: string;
    password: string;
};


export type SignUpRequestType = {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: Gender;
    address: string;
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NONBINARY = "OTHER"

}
export enum UserRoles {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
    SELLER = "SELLER"

}

export interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: Gender
    address: string;
    role: UserRoles;
    balance: number;
    availableBalance: number;
    profilePicture: string | null;
    bio: string | null;
    created: string;
    updated: string;
}

export interface UserInfo{
    userId: string;
    username: string;
    email: string;
    roles: UserRoles[];
    balance: number;
    address: string;
    bio: string | null;
    created: string;
  }

export type AuthResponseType={
      accessToken:string;
      idToken:string;
     
      tokenType:string;
      expiresIn:number

}

export type LoginResponseType = AuthResponseType & {
     refreshToken:string;
}

export type ValidateTokenRequestType = {
    token: string;
}


export type ValdateTokenResponseType={
    valid:boolean;
    message:string;
    userInfo:UserInfo;
}

export type RefreshTokenRequestType = {
    refreshToken: string;
    userId:string;
}