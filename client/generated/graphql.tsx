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
  email: Scalars['String']
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

export type FilmResponsePagination = {
  __typename?: 'FilmResponsePagination'
  films?: Maybe<Array<Films>>
  hasMore?: Maybe<Scalars['Boolean']>
}

export type Films = {
  __typename?: 'Films'
  createdAt: Scalars['DateTime']
  creatorUID: Scalars['Float']
  id: Scalars['Float']
  playTime: Scalars['DateTime']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  user: User
}

export type LoginInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addFilm: FilmResponse
  createUser: UserResponse
  deleteFilm: Scalars['Boolean']
  logIn: UserResponse
  logout: Scalars['Boolean']
}

export type MutationAddFilmArgs = {
  data: CreateFilmInput
}

export type MutationCreateUserArgs = {
  data: CreateUserInput
}

export type MutationDeleteFilmArgs = {
  id: Scalars['Float']
}

export type MutationLogInArgs = {
  data: LoginInput
}

export type Query = {
  __typename?: 'Query'
  getAllFilms: Array<Films>
  getFilmById: FilmResponse
  getFilmsByCreationDate: FilmResponsePagination
  getUserByID: UserResponse
  getUserByName: UserResponse
  me?: Maybe<User>
  users: Array<UserResponse>
}

export type QueryGetFilmByIdArgs = {
  id: Scalars['Float']
}

export type QueryGetFilmsByCreationDateArgs = {
  cursor?: InputMaybe<Scalars['Float']>
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
  email: Scalars['String']
  id: Scalars['Float']
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type FilmResFragment = {
  __typename?: 'Films'
  id: number
  title: string
  playTime: any
  creatorUID: number
  createdAt: any
  updatedAt: any
}

export type UserResFragment = {
  __typename?: 'User'
  id: number
  username: string
  createdAt: any
  updatedAt: any
}

export type AddFilmMutationVariables = Exact<{
  title: Scalars['String']
  playTime: Scalars['DateTime']
}>

export type AddFilmMutation = {
  __typename?: 'Mutation'
  addFilm: {
    __typename?: 'FilmResponse'
    errors?:
      | Array<{ __typename?: 'FieldError'; field: string; message: string }>
      | null
      | undefined
    film?:
      | {
          __typename?: 'Films'
          id: number
          title: string
          playTime: any
          creatorUID: number
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
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
          id: number
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
  email: Scalars['String']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'UserResponse'
    errors?:
      | Array<{ __typename?: 'FieldError'; field: string; message: string }>
      | null
      | undefined
    user?:
      | {
          __typename?: 'User'
          id: number
          username: string
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type GetAllFilmsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllFilmsQuery = {
  __typename?: 'Query'
  getAllFilms: Array<{
    __typename?: 'Films'
    id: number
    title: string
    playTime: any
    user: { __typename?: 'User'; id: number; username: string }
  }>
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: number
        username: string
        createdAt: any
        updatedAt: any
      }
    | null
    | undefined
}

export const FilmResFragmentDoc = gql`
  fragment FilmRes on Films {
    id
    title
    playTime
    creatorUID
    createdAt
    updatedAt
  }
`
export const UserResFragmentDoc = gql`
  fragment UserRes on User {
    id
    username
    createdAt
    updatedAt
  }
`
export const AddFilmDocument = gql`
  mutation AddFilm($title: String!, $playTime: DateTime!) {
    addFilm(data: { title: $title, playTime: $playTime }) {
      errors {
        field
        message
      }
      film {
        ...FilmRes
      }
    }
  }
  ${FilmResFragmentDoc}
`
export type AddFilmMutationFn = Apollo.MutationFunction<
  AddFilmMutation,
  AddFilmMutationVariables
>

/**
 * __useAddFilmMutation__
 *
 * To run a mutation, you first call `useAddFilmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFilmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFilmMutation, { data, loading, error }] = useAddFilmMutation({
 *   variables: {
 *      title: // value for 'title'
 *      playTime: // value for 'playTime'
 *   },
 * });
 */
export function useAddFilmMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddFilmMutation,
    AddFilmMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddFilmMutation, AddFilmMutationVariables>(
    AddFilmDocument,
    options
  )
}
export type AddFilmMutationHookResult = ReturnType<typeof useAddFilmMutation>
export type AddFilmMutationResult = Apollo.MutationResult<AddFilmMutation>
export type AddFilmMutationOptions = Apollo.BaseMutationOptions<
  AddFilmMutation,
  AddFilmMutationVariables
>
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    logIn(data: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        ...UserRes
      }
    }
  }
  ${UserResFragmentDoc}
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
) {
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
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(
      data: { username: $username, password: $password, email: $email }
    ) {
      errors {
        field
        message
      }
      user {
        ...UserRes
      }
    }
  }
  ${UserResFragmentDoc}
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
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
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
export const GetAllFilmsDocument = gql`
  query GetAllFilms {
    getAllFilms {
      id
      title
      playTime
      user {
        id
        username
      }
    }
  }
`

/**
 * __useGetAllFilmsQuery__
 *
 * To run a query within a React component, call `useGetAllFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFilmsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFilmsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllFilmsQuery,
    GetAllFilmsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllFilmsQuery, GetAllFilmsQueryVariables>(
    GetAllFilmsDocument,
    options
  )
}
export function useGetAllFilmsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllFilmsQuery,
    GetAllFilmsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllFilmsQuery, GetAllFilmsQueryVariables>(
    GetAllFilmsDocument,
    options
  )
}
export type GetAllFilmsQueryHookResult = ReturnType<typeof useGetAllFilmsQuery>
export type GetAllFilmsLazyQueryHookResult = ReturnType<
  typeof useGetAllFilmsLazyQuery
>
export type GetAllFilmsQueryResult = Apollo.QueryResult<
  GetAllFilmsQuery,
  GetAllFilmsQueryVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...UserRes
    }
  }
  ${UserResFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
