import { FeatureButton, IssueBox, IssueSkeleton } from './components';
import { IssueModel } from './model/issue.model';
import { AiOutlineMenu } from 'react-icons/ai';
import { useIssueData } from './hooks/useIssueData';
import 'react-loading-skeleton/dist/skeleton.css';
import { Fragment, useState } from 'react';
import { UpdateIssueModal } from './components/UpdateIssueModal';

const App = () => {
  const [isLoading, issueData, createOrUpdateIssue, deleteIssue] =
    useIssueData();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IssueModel>();

  const updateIssue = (data?: IssueModel) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleModelClose = () => {
    setIsModalOpen(false);
  };

  const renderIssue = (issueData: IssueModel[]) =>
    issueData.map((data) => (
      <Fragment key={data.id}>
        <div className="relative">
          <FeatureButton
            onClick={() => deleteIssue(data.id)}
            size={'small'}
            className={'absolute right-[20px]'}>
            X
          </FeatureButton>
          <div className="cursor-pointer" onClick={() => updateIssue(data)}>
            <IssueBox issue={data} />
          </div>
        </div>
      </Fragment>
    ));

  const renderIssueLoading = (count: number) =>
    Array(count).fill(<IssueSkeleton />);

  return (
    <div className="w-screen">
      <header className="md:hidden flex items-center p-4 shadow-md">
        <div>
          <AiOutlineMenu />
        </div>
        <h1 className="w-full flex justify-center md:justify-start text-[#002B5B]">
          Past Issues
        </h1>
      </header>
      <main className="width-full p-4">
        <h2 className="mb-2 h-10 pr-4">
          Past Issues
          <FeatureButton className="float-right" onClick={() => updateIssue()}>
            +
          </FeatureButton>
        </h2>
        <div className="flex flex-col md:grid md:gap-4 md:grid-cols-[repeat(auto-fill,_320px)]">
          {isLoading ? renderIssueLoading(5) : renderIssue(issueData)}
        </div>
        <UpdateIssueModal
          isOpen={isModalOpen}
          handleClose={handleModelClose}
          data={modalData}
          onSubmit={(data) => {
            handleModelClose();
            createOrUpdateIssue?.(data);
          }}
        />
      </main>
    </div>
  );
};
export default App;
