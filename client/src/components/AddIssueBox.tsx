interface AddIssueBoxProps {
    className?: string
    onClick(): void
}

export const AddIssueBox = (props: AddIssueBoxProps) => {
    const { className = '', onClick } = props

    return (
        <div className={`${className}`}>
            <button
                className="rounded-full flex justify-center items-center p-4 
                    leading-3 text-xl bg-violet-600 text-white cursor-pointer 
                    hover:bg-violet-700 select-none"
                onClick={onClick}
            >
                +
            </button>
        </div>
    )
}