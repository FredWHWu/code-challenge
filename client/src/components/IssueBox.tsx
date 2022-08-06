import { FC } from 'react';
import { IssueModel } from '../model/issue.model';

type IssueBoxProp = {
  className?: string;
  issue: IssueModel;
};

export const IssueBox: FC<IssueBoxProp> = (props) => {
  const { className = '', issue } = props;
  console.log(issue);
  return (
    <div className={`${className}`}>
      <img className="mb-2" src={issue.imageUri} alt="" />
      <h2>{issue.title}</h2>
      <div className="flex">
        <p>{issue.title}</p>
        <p>|</p>
        <p>{issue.issueDate}</p>
      </div>
    </div>
  );
};
