import { gql } from "apollo-boost";

const bookListQuery = gql`{
      bookList { 
        id 
        name 
        pageCount
      } 
    }
  `;

export default {
  bookListQuery,
};
