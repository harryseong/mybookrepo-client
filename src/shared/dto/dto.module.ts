export class AuthorDTO {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;

  constructor(firstName, lastName?, middleName?) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }
}

export class BookDTO {
  id?: string;
  title: string;
  publisher: string;
  publishedDate: number;
  description: string;
  pageCount: number;
  coverImageURL: string;
  printType: string;
  isbn10: string;
  isbn13: string;
  otherIdType: string;
  authors: AuthorDTO[];
  categories: CategoryDTO[];

  constructor(data: any) {
    this.title = data.title !== undefined ? data.title : null;
    this.publisher = data.publisher !== undefined ? data.publisher : null;
    this.publishedDate = data.publishedDate !== undefined ? BookDTO.formatPublishedDate(data.publishedDate) : null;
    this.description = data.description !== undefined ? data.description : null;
    this.pageCount = data.pageCount !== undefined ? data.pageCount : null;
    this.coverImageURL = data.imageLinks !== undefined ? data.imageLinks.thumbnail : null;
    this.printType = data.printType !== undefined ? data.printType : null;
    if (data.industryIdentifiers !== undefined) {
      this.isbn10 = this.formatIdentifier(data.industryIdentifiers, 'isbn10');
      this.isbn13 = this.formatIdentifier(data.industryIdentifiers, 'isbn13');
      this.otherIdType = this.formatIdentifier(data.industryIdentifiers, 'other');
    }
    this.authors = data.authors !== undefined ? this.addAuthors(data.authors) : null;
    this.categories = data.categories !== undefined ? this.addCategories(data.categories) : null;
  }

  static formatPublishedDate(publishedDate): number {
    const pubDateArray = publishedDate.split('-');
    return pubDateArray[0];
  }

  formatIdentifier(industryIdentifiers, idType: string): string {
    let identifier = null;
    industryIdentifiers.map(industryIdentifier => {
      if (industryIdentifier.type === 'ISBN_13' && idType === 'isbn13') {
        identifier = industryIdentifier.identifier;
        console.log('ISBN 13 number found: ' + identifier);
      }
      if (industryIdentifier.type === 'ISBN_10' && idType === 'isbn10') {
        identifier = industryIdentifier.identifier;
        console.log('ISBN 10 number found: ' + identifier);
      }
      if (industryIdentifier.type === 'OTHER' && idType === 'other') {
        identifier = industryIdentifier.identifier;
        console.log('Other identifier type found: ' + identifier);
      }
    });
    return identifier;
  }

  addAuthors(authors: any): AuthorDTO[] {
    if (authors === undefined) {
      console.log('This book does not have listed authors.');
      return null;
    }
    const authorDTOArray: AuthorDTO[] = [];
    authors.map(author => {
      const nameArray = author.split(' ');
      let authorDTO: AuthorDTO;
      switch (nameArray.length) {
        case 3:
          authorDTO = new AuthorDTO(nameArray[0], nameArray[2], nameArray[1]);
          break;
        case 2:
          authorDTO = new AuthorDTO(nameArray[0], nameArray[1], null);
          break;
        case 1:
          authorDTO = new AuthorDTO(nameArray[0], null, null);
          break;
        default:
          authorDTO = new AuthorDTO(author, null, null);
      }
      console.log('AuthorDTO: ', authorDTO);
      authorDTOArray.push(authorDTO);
    });
    return authorDTOArray;
  }

  addCategories(categories: any): CategoryDTO[] {
    if (categories === undefined) {
      console.log('This book was not assigned any categories.');
      return null;
    }
    const categoryDTOArray: CategoryDTO[] = [];
    categories.map(category => {
      categoryDTOArray.push(new CategoryDTO(category));
    });
    return categoryDTOArray;
  }
}

export class CategoryDTO {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class PlanDTO {
  id?: string;
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export class UserDTO {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  createdDate?: string;

  constructor(firstName: string,
              lastName: string,
              email: string,
              username: string,
              password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

