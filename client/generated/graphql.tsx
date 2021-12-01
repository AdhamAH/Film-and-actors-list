import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type CreateFilmInput = {
  playTime: Scalars['DateTime']
  title: Scalars['String']
}

export type CreateUserInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type FilmResponse = {
  __typename?: 'FilmResponse'
  errors?: Maybe<Array<FieldError>>
  film?: Maybe<Films>
}

export type Films = {
  __typename?: 'Films'
  createdAt: Scalars['DateTime']
  creator: User
  creatorUID: Scalars['Float']
  id: Scalars['Float']
  playTime: Scalars['DateTime']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Mutation = {
  __typename?: 'Mutation'
  addFilm: FilmResponse
  createUser: UserResponse
  logIn: UserResponse
  logout: Scalars['Boolean']
}

export type MutationAddFilmArgs = {
  data: CreateFilmInput
}

export type MutationCreateUserArgs = {
  data: CreateUserInput
}

export type MutationLogInArgs = {
  data: CreateUserInput
}

export type Query = {
  __typename?: 'Query'
  getAllFilms: Array<Films>
  getFilmById: FilmResponse
  getFilmsByCreationDate: Array<Films>
  getUserByID: UserResponse
  getUserByName: UserResponse
  me?: Maybe<User>
  users: Array<UserResponse>
}

export type QueryGetFilmByIdArgs = {
  id: Scalars['Float']
}

export type QueryGetFilmsByCreationDateArgs = {
  limit: Scalars['Float']
}

export type QueryGetUserByIdArgs = {
  id: Scalars['Float']
}

export type QueryGetUserByNameArgs = {
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  films: Films
  id: Scalars['Float']
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  logIn: {
    __typename?: 'UserResponse'
    errors?:
      | Array<{ __typename?: 'FieldError'; field: string; message: string }>
      | null
      | undefined
    user?:
      | {
          __typename?: 'User'
          username: string
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'UserResponse'
    errors?:
      | Array<{ __typename?: 'FieldError'; field: string; message: string }>
      | null
      | undefined
    user?: { __typename?: 'User'; username: string } | null | undefined
  }
}

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    logIn(data: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        username
        createdAt
        updatedAt
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
): Apollo.MutationTuple<
  LoginMutation,
  Exact<{ username: string; password: string }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
> {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const CreateUserDocument = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(data: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        username
      }
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
): Apollo.MutationTuple<
  CreateUserMutation,
  Exact<{ username: string; password: string }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
> {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  )
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
