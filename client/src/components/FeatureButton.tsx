import { FC, ReactNode } from 'react';

interface FeatureButtonProps {
  className?: string;
  onClick(): void;
  size?: 'small' | 'large';
  children?: ReactNode;
}

export const FeatureButton: FC<FeatureButtonProps> = (
  props: FeatureButtonProps,
) => {
  const { className = '', onClick, size = 'large', children } = props;

  const largeStyle = 'p-4 leading-3 text-xl';
  const smallStyle = 'w-6 h-6 text-sm';

  return (
    <div className={`${className}`}>
      <button
        className={`rounded-full flex justify-center items-center bg-violet-600 text-white cursor-pointer 
                    hover:bg-violet-700 select-none ${
                      size === 'large' ? largeStyle : smallStyle
                    }`}
        onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
