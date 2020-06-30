import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Object: any;
  Date: any;
};



export type Car = {
  __typename?: 'Car';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** the schema allows the following query: */
export type Query = {
  __typename?: 'Query';
  car?: Maybe<Array<Maybe<Car>>>;
  train?: Maybe<Array<Maybe<Train>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


/** the schema allows the following query: */
export type QueryCarArgs = {
  name?: Maybe<Scalars['String']>;
};


/** the schema allows the following query: */
export type QueryTrainArgs = {
  name?: Maybe<Scalars['String']>;
};


/** the schema allows the following query: */
export type QueryUserArgs = {
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateCarName?: Maybe<Car>;
  register: Result;
  login: LoginResponse;
  activate?: Maybe<Result>;
};


export type MutationUpdateCarNameArgs = {
  _id: Scalars['String'];
  newName: Scalars['String'];
};


export type MutationRegisterArgs = {
  user: UserInput;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};


export type MutationActivateArgs = {
  password?: Maybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  message?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['String']>;
};

export type Train = {
  __typename?: 'Train';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};



export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  passwordHash?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  desabled?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type UserCreatedAtArgs = {
  format?: Maybe<Scalars['String']>;
};


export type UserUpdatedAtArgs = {
  format?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  passwordHash?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  desabled?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & {
    login: (
      { __typename?: 'LoginResponse' }
      & Pick<LoginResponse, 'token'>
      & {
        user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'email' | 'username' | 'desabled'>
        )>
      }
    )
  }
);

export const LoginDocument = gql`
    mutation login($username: String!, $password: String) {
  login(username: $username, password: $password) {
    token
    user {
      id
      email
      username
      desabled
    }
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
  document = LoginDocument;

}
