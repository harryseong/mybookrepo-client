export class AuthorDTO {
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;

  constructor(firstName, lastName?, middleName?) {
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
}

export class BookDTO {
  private _id?: string;
  private _title: string;
  private _publisher: string;
  private _publishedDate: number;
  private _description: string;
  private _pageCount: number;
  private _coverImageURL: string;
  private _printType: string;
  private _isbn10: string;
  private _isbn13: string;
  private _otherIdType: string;
  private _authors: AuthorDTO[];
  private _categories: CategoryDTO[];

  constructor(data: any) {
    this._title = data.title !== undefined ? data.title : null;
    this._publisher = data.publisher !== undefined ? data.publisher : null;
    this._publishedDate = data.publishedDate !== undefined ? BookDTO.formatPublishedDate(data.publishedDate) : null;
    this._description = data.description !== undefined ? data.description : null;
    this._pageCount = data.pageCount !== undefined ? data.pageCount : null;
    this._coverImageURL = data.imageLinks !== undefined ? data.imageLinks.thumbnail : null;
    this._printType = data.printType !== undefined ? data.printType : null;
    if (data.industryIdentifiers !== undefined) {
      this._isbn10 = this.formatIdentifier(data.industryIdentifiers, '_isbn10');
      this._isbn13 = this.formatIdentifier(data.industryIdentifiers, '_isbn13');
      this._otherIdType = this.formatIdentifier(data.industryIdentifiers, 'other');
    }
    this._authors = data.authors !== undefined ? this.addAuthors(data.authors) : null;
    this._categories = data.categories !== undefined ? this.addCategories(data.categories) : null;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get publishedDate(): number {
    return this._publishedDate;
  }

  set publishedDate(value: number) {
    this._publishedDate = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get pageCount(): number {
    return this._pageCount;
  }

  set pageCount(value: number) {
    this._pageCount = value;
  }

  get coverImageURL(): string {
    return this._coverImageURL;
  }

  set coverImageURL(value: string) {
    this._coverImageURL = value;
  }

  get printType(): string {
    return this._printType;
  }

  set printType(value: string) {
    this._printType = value;
  }

  get isbn10(): string {
    return this._isbn10;
  }

  set isbn10(value: string) {
    this._isbn10 = value;
  }

  get isbn13(): string {
    return this._isbn13;
  }

  set isbn13(value: string) {
    this._isbn13 = value;
  }

  get otherIdType(): string {
    return this._otherIdType;
  }

  set otherIdType(value: string) {
    this._otherIdType = value;
  }

  get authors(): AuthorDTO[] {
    return this._authors;
  }

  set authors(value: AuthorDTO[]) {
    this._authors = value;
  }

  get categories(): CategoryDTO[] {
    return this._categories;
  }

  set categories(value: CategoryDTO[]) {
    this._categories = value;
  }

  static formatPublishedDate(publishedDate): number {
    const pubDateArray = publishedDate.split('-');
    return pubDateArray[0];
  }

  formatIdentifier(industryIdentifiers, idType: string): string {
    let identifier = null;
    industryIdentifiers.map(industryIdentifier => {
      if (industryIdentifier.type === 'ISBN13' && idType === '_isbn13') {
        identifier = industryIdentifier.identifier;
        console.log('ISBN 13 number found: ' + identifier);
      }
      if (industryIdentifier.type === 'ISBN10' && idType === '_isbn10') {
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
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}

export class UserDTO {
  private _id?: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;

  constructor(firstName: string,
              lastName: string,
              email: string,
              password: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}

