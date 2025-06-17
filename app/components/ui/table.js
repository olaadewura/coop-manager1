export const Table = ({ children }) => <table className='w-full'>{children}</table>;
export const TableHeader = ({ children }) => <thead>{children}</thead>;
export const TableRow = ({ children }) => <tr>{children}</tr>;
export const TableHead = ({ children }) => <th className='text-left p-2'>{children}</th>;
export const TableBody = ({ children }) => <tbody>{children}</tbody>;
export const TableCell = ({ children, className }) => <td className={`p-2 ${className || ''}`}>{children}</td>;