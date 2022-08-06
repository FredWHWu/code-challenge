export class IssueModel {
  id: string;
  imageUri: string;
  title: string;
  issueNumber: number;
  issueDate: string;

  constructor(
    id: string,
    imageUri: string,
    title: string,
    issueNumber: number,
    issueDate: string,
  ) {
    this.id = id;
    this.imageUri = imageUri;
    this.title = title;
    this.issueNumber = issueNumber;
    this.issueDate = issueDate;
  }
}
