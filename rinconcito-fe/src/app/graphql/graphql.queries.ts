import {gql} from 'apollo-angular'

const GET_PRODUCTS = gql`
  query {
    products {
        edges {
          id
          name
          store
          quantity
          unitPrice
          dateAdded
          pic
        }
    }
  }
`

const GET_PRODUCT_BY_ID = gql`
  query product($productId: ID!) {
    product (id: $productId) {
      id
      name
      store
      quantity
      unitPrice
      dateAdded
      pic
    }
  }
`

const ADD_PRODUCT = gql`
  mutation createProductAdmin($name: String!, $store: String!, $quantity: Int!, $dateAdded: String!, $unitPrice: Float!, $pic: String!) {
    createProductAdmin(name: $name, store: $store, quantity: $quantity, dateAdded: $dateAdded, unitPrice: $unitPrice, pic: $pic) {
      id
      name
      store
      quantity
      unitPrice
      dateAdded
      pic
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $name: String!, $store: String!, $quantity: Int!, $unitPrice: Float!, $pic: String!) {
    updateProduct(id: $id, name: $name, store: $store, quantity: $quantity, unitPrice: $unitPrice, pic: $pic) {
      id
      name
      store
      quantity
      unitPrice
      dateAdded
      pic
    }
  }
`

export {GET_PRODUCTS, ADD_PRODUCT, GET_PRODUCT_BY_ID, UPDATE_PRODUCT}