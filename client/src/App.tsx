import { AddIssueBox, IssueBox, IssueSkeleton } from './components';
import { IssueModel } from './model/issue.model';
import { AiOutlineMenu } from 'react-icons/ai';
import { useIssueData } from './hooks/useIssueData';
import 'react-loading-skeleton/dist/skeleton.css';

const App = () => {
  const [isLoading, issueData] = useIssueData();

  const renderIssue = (issueData: IssueModel[]) =>
    issueData.map((data) => <IssueBox issue={data} />);

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
        <AddIssueBox className='float-right' onClick={()=>{console.log('add!!!')}}/>
        </h2>
        <div className="flex flex-col md:grid md:gap-4 md:grid-cols-[repeat(auto-fill,_300px)]">
          {isLoading ? renderIssueLoading(5) : renderIssue(issueData)}
        </div>
      </main>
    </div>
  );
};
export default App;
