import { useState, useEffect } from 'react';
import { IssueModel } from '../model/issue.model';
import { v4 as uuidv4 } from 'uuid';

type UseIssueDataOutput = [
  boolean,
  IssueModel[],
  (data: IssueModel) => void,
  (id: string) => void,
];

export const useIssueData = (): UseIssueDataOutput => {
  const [issueData, setIssueData] = useState<IssueModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async (): Promise<IssueModel[]> => {
    const response = await fetch('/api/data', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    // await new Promise((resolve) => setTimeout(resolve, 2000));
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

  const createIssue = async (data: IssueModel) => {
    data.id = uuidv4();
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setIssueData((prev) => [...prev, data]);
  };

  const updateIssue = async (data: IssueModel) => {
    const response = await fetch('/api/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setIssueData((prev) =>
      prev.map((pData) => (pData.id === data.id ? data : pData)),
    );
  };

  const createOrUpdateIssue = async (data: IssueModel) => {
    if (data.id === '') {
      createIssue(data);
    } else {
      updateIssue(data);
    }
  };

  const deleteIssue = async (id: string) => {
    const response = await fetch(`/api/data/${id}`, {
      method: 'DELETE',
    });
    setIssueData((prev) => prev.filter((pData) => pData.id !== id));
  };

  return [isLoading, issueData, createOrUpdateIssue, deleteIssue];
};
