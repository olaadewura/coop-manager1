export const Button = ({ children, onClick, variant = 'default', type = 'button' }) => {
  const styles = variant === 'destructive' ? 'bg-red-600 text-white' : variant === 'outline' ? 'border border-gray-400' : 'bg-blue-600 text-white';
  return <button type={type} onClick={onClick} className={`rounded px-4 py-2 ${styles}`}>{children}</button>;
};