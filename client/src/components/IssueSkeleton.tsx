import Skeleton from 'react-loading-skeleton';

export const IssueSkeleton = () => {
  return (
    <div>
      <Skeleton height={200} />
      <Skeleton height={30} count={2} />
    </div>
  );
};
