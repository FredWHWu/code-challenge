import { FC } from 'react';
import { IssueModel } from '../model/issue.model';

type IssueBoxProp = {
  className?: string;
  issue: IssueModel;
};

export const IssueBox: FC<IssueBoxProp> = (props) => {
  const { className = '', issue } = props;
  return (
    <div className={`${className}`}>
      <img className="mb-2 max-w-xs	max-h-52" src={issue.imageUri} alt="" />
      <h2>{`${issue.title} ${issue.issueNumber}`}</h2>
      <div className="flex">
        <p>{`${issue.title} ${issue.issueNumber}`}</p>
        <p>|</p>
        <p>{issue.issueDate}</p>
      </div>
    </div>
  );
};
