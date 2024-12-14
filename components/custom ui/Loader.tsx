const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div 
        className="animate-spin rounded-full border-t-4 border-solid h-12 w-12"
        style={{
          borderTopColor: 'rgb(59, 130, 246)',
          animation: 'spin 1s linear infinite, colorChange 2s ease-in-out infinite',
        }}
      ></div>
      <style jsx>{`
        @keyframes colorChange {
          0% {
            border-top-color: #3b82f6;
          }
          50% {
            border-top-color: #f472b6;
          }
          100% {
            border-top-color: #3b82f6; 
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
