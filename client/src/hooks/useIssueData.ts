import { useState, useEffect } from 'react';
import { IssueModel } from '../model/issue.model';

export const useIssueData = (): [boolean, IssueModel[]] => {
  const [issueData, setIssueData] = useState<IssueModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async (): Promise<IssueModel[]> => {
    const response = await fetch('/api/data', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await response.json();
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getData();
      setIssueData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return [isLoading, issueData];
};
