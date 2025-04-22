export function Button({ children, ...props }) {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      {...props}
    >
      {children}
    </button>
  );
}
