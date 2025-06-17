export const Card = ({ children }) => <div className='rounded-xl shadow p-4'>{children}</div>;
export const CardContent = ({ children, className }) => <div className={className}>{children}</div>;